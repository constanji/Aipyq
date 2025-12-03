const cookies = require('cookie');
const passport = require('passport');
const { isEnabled } = require('@aipyq/api');
const { logger } = require('@aipyq/data-schemas');

/**
 * Custom Middleware to handle JWT authentication, with support for OpenID token reuse
 * Switches between JWT and OpenID authentication based on cookies and environment settings
 */
const requireJwtAuth = (req, res, next) => {
  // Check if token provider is specified in cookies
  const cookieHeader = req.headers.cookie;
  const tokenProvider = cookieHeader ? cookies.parse(cookieHeader).token_provider : null;

  // Callback to handle authentication result
  const callback = (err, user, info) => {
    if (err) {
      logger.error('[requireJwtAuth] Authentication error:', err);
      return res.status(500).json({ 
        error: 'Authentication error',
        message: err.message 
      });
    }
    
    if (!user) {
      logger.warn('[requireJwtAuth] Authentication failed:', info?.message || 'No user');
      return res.status(401).json({ 
        error: 'Unauthorized',
        message: info?.message || 'Authentication required' 
      });
    }
    
    req.user = user;
    next();
  };

  // Use OpenID authentication if token provider is OpenID and OPENID_REUSE_TOKENS is enabled
  if (tokenProvider === 'openid' && isEnabled(process.env.OPENID_REUSE_TOKENS)) {
    return passport.authenticate('openidJwt', { session: false }, callback)(req, res, next);
  }

  // Default to standard JWT authentication
  return passport.authenticate('jwt', { session: false }, callback)(req, res, next);
};

module.exports = requireJwtAuth;
