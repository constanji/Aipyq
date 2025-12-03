const { SystemRoles } = require('aipyq-data-provider');
const { logger } = require('@aipyq/data-schemas');

function checkAdmin(req, res, next) {
  try {
    // Check if user is authenticated
    if (!req.user) {
      logger.warn('[checkAdmin] Unauthenticated request');
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if user is admin
    if (req.user.role !== SystemRoles.ADMIN) {
      logger.warn(`[checkAdmin] User ${req.user.id} is not admin, role: ${req.user.role}`);
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  } catch (error) {
    logger.error('[checkAdmin] Error checking admin role:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = checkAdmin;
