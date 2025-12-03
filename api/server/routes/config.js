const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const { logger } = require('@aipyq/data-schemas');
const { isEnabled, getBalanceConfig } = require('@aipyq/api');
const {
  Constants,
  CacheKeys,
  removeNullishValues,
  defaultSocialLogins,
  SystemRoles,
  specsConfigSchema,
} = require('aipyq-data-provider');
const { getLdapConfig } = require('~/server/services/Config/ldap');
const { getAppConfig } = require('~/server/services/Config/app');
const { getProjectByName } = require('~/models/Project');
const { getMCPManager } = require('~/config');
const { getLogStores } = require('~/cache');
const { mcpServersRegistry } = require('@aipyq/api');
const requireAdmin = require('~/server/middleware/roles/admin');
const requireJwtAuth = require('~/server/middleware/requireJwtAuth');

const router = express.Router();

// Debug: Log all requests to this router
router.use((req, res, next) => {
  logger.debug(`[Config Router] ${req.method} ${req.path}`);
  next();
});
const emailLoginEnabled =
  process.env.ALLOW_EMAIL_LOGIN === undefined || isEnabled(process.env.ALLOW_EMAIL_LOGIN);
const passwordResetEnabled = isEnabled(process.env.ALLOW_PASSWORD_RESET);

const sharedLinksEnabled =
  process.env.ALLOW_SHARED_LINKS === undefined || isEnabled(process.env.ALLOW_SHARED_LINKS);

const publicSharedLinksEnabled =
  sharedLinksEnabled &&
  (process.env.ALLOW_SHARED_LINKS_PUBLIC === undefined ||
    isEnabled(process.env.ALLOW_SHARED_LINKS_PUBLIC));

const sharePointFilePickerEnabled = isEnabled(process.env.ENABLE_SHAREPOINT_FILEPICKER);
const openidReuseTokens = isEnabled(process.env.OPENID_REUSE_TOKENS);

router.get('/', async function (req, res) {
  const cache = getLogStores(CacheKeys.CONFIG_STORE);

  const cachedStartupConfig = await cache.get(CacheKeys.STARTUP_CONFIG);
  if (cachedStartupConfig) {
    res.send(cachedStartupConfig);
    return;
  }

  const isBirthday = () => {
    const today = new Date();
    return today.getMonth() === 1 && today.getDate() === 11;
  };

  const instanceProject = await getProjectByName(Constants.GLOBAL_PROJECT_NAME, '_id');

  const ldap = getLdapConfig();

  try {
    const appConfig = await getAppConfig({ role: req.user?.role });

    const isOpenIdEnabled =
      !!process.env.OPENID_CLIENT_ID &&
      !!process.env.OPENID_CLIENT_SECRET &&
      !!process.env.OPENID_ISSUER &&
      !!process.env.OPENID_SESSION_SECRET;

    const isSamlEnabled =
      !!process.env.SAML_ENTRY_POINT &&
      !!process.env.SAML_ISSUER &&
      !!process.env.SAML_CERT &&
      !!process.env.SAML_SESSION_SECRET;

    const balanceConfig = getBalanceConfig(appConfig);

    /** @type {TStartupConfig} */
    const payload = {
      appTitle: process.env.APP_TITLE || 'AipyqChat',
      socialLogins: appConfig?.registration?.socialLogins ?? defaultSocialLogins,
      discordLoginEnabled: !!process.env.DISCORD_CLIENT_ID && !!process.env.DISCORD_CLIENT_SECRET,
      facebookLoginEnabled:
        !!process.env.FACEBOOK_CLIENT_ID && !!process.env.FACEBOOK_CLIENT_SECRET,
      githubLoginEnabled: !!process.env.GITHUB_CLIENT_ID && !!process.env.GITHUB_CLIENT_SECRET,
      googleLoginEnabled: !!process.env.GOOGLE_CLIENT_ID && !!process.env.GOOGLE_CLIENT_SECRET,
      appleLoginEnabled:
        !!process.env.APPLE_CLIENT_ID &&
        !!process.env.APPLE_TEAM_ID &&
        !!process.env.APPLE_KEY_ID &&
        !!process.env.APPLE_PRIVATE_KEY_PATH,
      openidLoginEnabled: isOpenIdEnabled,
      openidLabel: process.env.OPENID_BUTTON_LABEL || 'Continue with OpenID',
      openidImageUrl: process.env.OPENID_IMAGE_URL,
      openidAutoRedirect: isEnabled(process.env.OPENID_AUTO_REDIRECT),
      samlLoginEnabled: !isOpenIdEnabled && isSamlEnabled,
      samlLabel: process.env.SAML_BUTTON_LABEL,
      samlImageUrl: process.env.SAML_IMAGE_URL,
      serverDomain: process.env.DOMAIN_SERVER || 'http://localhost:3080',
      emailLoginEnabled,
      registrationEnabled: !ldap?.enabled && isEnabled(process.env.ALLOW_REGISTRATION),
      socialLoginEnabled: isEnabled(process.env.ALLOW_SOCIAL_LOGIN),
      emailEnabled:
        (!!process.env.EMAIL_SERVICE || !!process.env.EMAIL_HOST) &&
        !!process.env.EMAIL_USERNAME &&
        !!process.env.EMAIL_PASSWORD &&
        !!process.env.EMAIL_FROM,
      passwordResetEnabled,
      showBirthdayIcon:
        isBirthday() ||
        isEnabled(process.env.SHOW_BIRTHDAY_ICON) ||
        process.env.SHOW_BIRTHDAY_ICON === '',
      helpAndFaqURL: process.env.HELP_AND_FAQ_URL || '/',
      interface: appConfig?.interfaceConfig,
      turnstile: appConfig?.turnstileConfig,
      modelSpecs: appConfig?.modelSpecs,
      balance: balanceConfig,
      sharedLinksEnabled,
      publicSharedLinksEnabled,
      analyticsGtmId: process.env.ANALYTICS_GTM_ID,
      instanceProjectId: instanceProject._id.toString(),
      bundlerURL: process.env.SANDPACK_BUNDLER_URL,
      staticBundlerURL: process.env.SANDPACK_STATIC_BUNDLER_URL,
      sharePointFilePickerEnabled,
      sharePointBaseUrl: process.env.SHAREPOINT_BASE_URL,
      sharePointPickerGraphScope: process.env.SHAREPOINT_PICKER_GRAPH_SCOPE,
      sharePointPickerSharePointScope: process.env.SHAREPOINT_PICKER_SHAREPOINT_SCOPE,
      openidReuseTokens,
      conversationImportMaxFileSize: process.env.CONVERSATION_IMPORT_MAX_FILE_SIZE_BYTES
        ? parseInt(process.env.CONVERSATION_IMPORT_MAX_FILE_SIZE_BYTES, 10)
        : 0,
    };

    const minPasswordLength = parseInt(process.env.MIN_PASSWORD_LENGTH, 10);
    if (minPasswordLength && !isNaN(minPasswordLength)) {
      payload.minPasswordLength = minPasswordLength;
    }

    const getMCPServers = async () => {
      try {
        if (appConfig?.mcpConfig == null) {
          return;
        }
        const mcpManager = getMCPManager();
        if (!mcpManager) {
          return;
        }
        const mcpServers = await mcpServersRegistry.getAllServerConfigs();
        if (!mcpServers) return;
        for (const serverName in mcpServers) {
          if (!payload.mcpServers) {
            payload.mcpServers = {};
          }
          const serverConfig = mcpServers[serverName];
          payload.mcpServers[serverName] = removeNullishValues({
            startup: serverConfig?.startup,
            chatMenu: serverConfig?.chatMenu,
            isOAuth: serverConfig.requiresOAuth,
            customUserVars: serverConfig?.customUserVars,
          });
        }
      } catch (error) {
        logger.error('Error loading MCP servers', error);
      }
    };

    await getMCPServers();
    const webSearchConfig = appConfig?.webSearch;
    if (
      webSearchConfig != null &&
      (webSearchConfig.searchProvider ||
        webSearchConfig.scraperProvider ||
        webSearchConfig.rerankerType)
    ) {
      payload.webSearch = {};
    }

    if (webSearchConfig?.searchProvider) {
      payload.webSearch.searchProvider = webSearchConfig.searchProvider;
    }
    if (webSearchConfig?.scraperProvider) {
      payload.webSearch.scraperProvider = webSearchConfig.scraperProvider;
    }
    if (webSearchConfig?.rerankerType) {
      payload.webSearch.rerankerType = webSearchConfig.rerankerType;
    }

    if (ldap) {
      payload.ldap = ldap;
    }

    if (typeof process.env.CUSTOM_FOOTER === 'string') {
      payload.customFooter = process.env.CUSTOM_FOOTER;
    }

    await cache.set(CacheKeys.STARTUP_CONFIG, payload);
    return res.status(200).send(payload);
  } catch (err) {
    logger.error('Error in startup config', err);
    return res.status(500).send({ error: err.message });
  }
});

/**
 * POST /config/modelSpecs
 * Updates the modelSpecs configuration in Aipyq.yaml file
 * Requires admin role
 */
router.post('/modelSpecs', requireAdmin, async function (req, res) {
  try {
    const { modelSpecs } = req.body;

    if (!modelSpecs || !Array.isArray(modelSpecs)) {
      return res.status(400).json({ error: 'modelSpecs must be an array' });
    }

    // Validate the modelSpecs using the schema
    const validationResult = specsConfigSchema.safeParse({
      list: modelSpecs,
      enforce: false,
      prioritize: true,
    });

    if (!validationResult.success) {
      return res.status(400).json({
        error: 'Invalid modelSpecs format',
        details: validationResult.error.errors,
      });
    }

    // Get the config file path (same logic as loadCustomConfig)
    // From api/server/routes/config.js, we need to go up 3 levels to reach project root
    // __dirname = api/server/routes -> up 3 levels = project root (Aipyq/Aipyq)
    const projectRoot = path.resolve(__dirname, '..', '..', '..');
    const configPath = process.env.CONFIG_PATH || path.resolve(projectRoot, 'Aipyq.yaml');

    // Check if config file exists and is a local file (not a URL)
    if (/^https?:\/\//.test(configPath)) {
      return res.status(400).json({
        error: 'Cannot update remote config file. Please use a local Aipyq.yaml file.',
      });
    }

    // Read the current config file
    let configContent;
    try {
      configContent = await fs.readFile(configPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: 'Config file not found' });
      }
      throw error;
    }

    // Parse the YAML
    let config;
    try {
      config = yaml.load(configContent);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid YAML format in config file' });
    }

    // Update the modelSpecs
    if (!config.modelSpecs) {
      config.modelSpecs = {};
    }
    config.modelSpecs.list = modelSpecs;

    // Write back to file
    const updatedYaml = yaml.dump(config, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });

    await fs.writeFile(configPath, updatedYaml, 'utf8');

    // Clear the startup config cache
    const cache = getLogStores(CacheKeys.CONFIG_STORE);
    await cache.delete(CacheKeys.STARTUP_CONFIG);

    logger.info('ModelSpecs configuration updated successfully');

    return res.status(200).json({
      success: true,
      message: 'ModelSpecs configuration updated successfully',
    });
  } catch (err) {
    logger.error('Error updating modelSpecs config', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * GET /config/endpoints/custom
 * Gets the custom endpoints configuration from Aipyq.yaml file
 * Requires admin role
 * 
 * Full path: /api/config/endpoints/custom
 */
router.get('/endpoints/custom', requireJwtAuth, requireAdmin, async function (req, res) {
  logger.info('[GET /api/config/endpoints/custom] Route hit');
  try {
    // Get the config file path (same logic as loadCustomConfig)
    // From api/server/routes/config.js, we need to go up 3 levels to reach project root
    // __dirname = api/server/routes -> up 3 levels = project root (Aipyq/Aipyq)
    const projectRoot = path.resolve(__dirname, '..', '..', '..');
    const configPath = process.env.CONFIG_PATH || path.resolve(projectRoot, 'Aipyq.yaml');

    logger.info(`[GET /api/config/endpoints/custom] Reading config from: ${configPath}`);
    
    // Check if file exists
    try {
      await fs.access(configPath);
      logger.debug(`[GET /api/config/endpoints/custom] Config file exists`);
    } catch (accessError) {
      logger.error(`[GET /api/config/endpoints/custom] Config file does not exist: ${configPath}`);
      return res.status(404).json({ 
        error: 'Config file not found',
        path: configPath 
      });
    }

    // Check if config file exists and is a local file (not a URL)
    if (/^https?:\/\//.test(configPath)) {
      logger.warn('[GET /config/endpoints/custom] Remote config file not supported');
      return res.status(400).json({
        error: 'Cannot read remote config file. Please use a local Aipyq.yaml file.',
      });
    }

    // Read the current config file
    let configContent;
    try {
      configContent = await fs.readFile(configPath, 'utf8');
      logger.debug(`[GET /config/endpoints/custom] Config file read successfully, length: ${configContent.length}`);
    } catch (error) {
      logger.error(`[GET /config/endpoints/custom] Error reading config file:`, error);
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: 'Config file not found' });
      }
      throw error;
    }

    // Parse the YAML
    let config;
    try {
      config = yaml.load(configContent);
      logger.debug(`[GET /config/endpoints/custom] YAML parsed successfully`);
    } catch (error) {
      logger.error(`[GET /config/endpoints/custom] Error parsing YAML:`, error);
      return res.status(400).json({ 
        error: 'Invalid YAML format in config file',
        details: error.message 
      });
    }

    // Get custom endpoints
    const customEndpoints = config.endpoints?.custom || [];
    logger.info(`[GET /config/endpoints/custom] Found ${customEndpoints.length} custom endpoints`);

    return res.status(200).json({
      success: true,
      endpoints: customEndpoints,
    });
  } catch (err) {
    logger.error('[GET /config/endpoints/custom] Unexpected error:', err);
    logger.error('[GET /config/endpoints/custom] Error stack:', err.stack);
    return res.status(500).json({ 
      error: err.message || 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

/**
 * POST /config/endpoints/custom
 * Updates the custom endpoints configuration in Aipyq.yaml file
 * Requires admin role
 */
router.post('/endpoints/custom', requireJwtAuth, requireAdmin, async function (req, res) {
  try {
    const { endpoint } = req.body;

    if (!endpoint || typeof endpoint !== 'object') {
      return res.status(400).json({ error: 'endpoint must be an object' });
    }

    // Get the config file path (same logic as loadCustomConfig)
    // From api/server/routes/config.js, we need to go up 3 levels to reach project root
    // __dirname = api/server/routes -> up 3 levels = project root (Aipyq/Aipyq)
    const projectRoot = path.resolve(__dirname, '..', '..', '..');
    const configPath = process.env.CONFIG_PATH || path.resolve(projectRoot, 'Aipyq.yaml');

    // Check if config file exists and is a local file (not a URL)
    if (/^https?:\/\//.test(configPath)) {
      return res.status(400).json({
        error: 'Cannot update remote config file. Please use a local Aipyq.yaml file.',
      });
    }

    // Read the current config file
    let configContent;
    try {
      configContent = await fs.readFile(configPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: 'Config file not found' });
      }
      throw error;
    }

    // Parse the YAML
    let config;
    try {
      config = yaml.load(configContent);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid YAML format in config file' });
    }

    // Initialize endpoints.custom if it doesn't exist
    if (!config.endpoints) {
      config.endpoints = {};
    }
    if (!config.endpoints.custom) {
      config.endpoints.custom = [];
    }

    // Check if endpoint with same name already exists
    const existingIndex = config.endpoints.custom.findIndex((ep) => ep.name === endpoint.name);

    if (existingIndex >= 0) {
      // Update existing endpoint
      config.endpoints.custom[existingIndex] = endpoint;
    } else {
      // Add new endpoint
      config.endpoints.custom.push(endpoint);
    }

    // Write back to file
    const updatedYaml = yaml.dump(config, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });

    await fs.writeFile(configPath, updatedYaml, 'utf8');

    // Clear the startup config cache
    const cache = getLogStores(CacheKeys.CONFIG_STORE);
    await cache.delete(CacheKeys.STARTUP_CONFIG);

    logger.info(`Custom endpoint "${endpoint.name}" ${existingIndex >= 0 ? 'updated' : 'added'} successfully`);

    return res.status(200).json({
      success: true,
      message: `Custom endpoint "${endpoint.name}" ${existingIndex >= 0 ? 'updated' : 'added'} successfully`,
    });
  } catch (err) {
    logger.error('Error updating custom endpoint config', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * DELETE /config/endpoints/custom/:name
 * Deletes a custom endpoint from Aipyq.yaml file
 * Requires admin role
 */
router.delete('/endpoints/custom/:name', requireJwtAuth, requireAdmin, async function (req, res) {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ error: 'Endpoint name is required' });
    }

    // Get the config file path (same logic as loadCustomConfig)
    // From api/server/routes/config.js, we need to go up 3 levels to reach project root
    // __dirname = api/server/routes -> up 3 levels = project root (Aipyq/Aipyq)
    const projectRoot = path.resolve(__dirname, '..', '..', '..');
    const configPath = process.env.CONFIG_PATH || path.resolve(projectRoot, 'Aipyq.yaml');

    // Check if config file exists and is a local file (not a URL)
    if (/^https?:\/\//.test(configPath)) {
      return res.status(400).json({
        error: 'Cannot update remote config file. Please use a local Aipyq.yaml file.',
      });
    }

    // Read the current config file
    let configContent;
    try {
      configContent = await fs.readFile(configPath, 'utf8');
    } catch (error) {
      if (error.code === 'ENOENT') {
        return res.status(404).json({ error: 'Config file not found' });
      }
      throw error;
    }

    // Parse the YAML
    let config;
    try {
      config = yaml.load(configContent);
    } catch (error) {
      return res.status(400).json({ error: 'Invalid YAML format in config file' });
    }

    // Check if endpoints.custom exists
    if (!config.endpoints?.custom || !Array.isArray(config.endpoints.custom)) {
      return res.status(404).json({ error: 'Custom endpoint not found' });
    }

    // Find and remove the endpoint
    const initialLength = config.endpoints.custom.length;
    config.endpoints.custom = config.endpoints.custom.filter((ep) => ep.name !== name);

    if (config.endpoints.custom.length === initialLength) {
      return res.status(404).json({ error: `Custom endpoint "${name}" not found` });
    }

    // Write back to file
    const updatedYaml = yaml.dump(config, {
      indent: 2,
      lineWidth: -1,
      noRefs: true,
      sortKeys: false,
    });

    await fs.writeFile(configPath, updatedYaml, 'utf8');

    // Clear the startup config cache
    const cache = getLogStores(CacheKeys.CONFIG_STORE);
    await cache.delete(CacheKeys.STARTUP_CONFIG);

    logger.info(`Custom endpoint "${name}" deleted successfully`);

    return res.status(200).json({
      success: true,
      message: `Custom endpoint "${name}" deleted successfully`,
    });
  } catch (err) {
    logger.error('Error deleting custom endpoint config', err);
    return res.status(500).json({ error: err.message });
  }
});

// 404 handler for this router - ensures JSON response for unmatched routes
router.use((req, res) => {
  logger.warn(`[Config Router] 404 - Route not found: ${req.method} ${req.path}`);
  res.status(404).json({
    error: 'Route not found',
    message: `The route ${req.method} ${req.path} was not found in the config router`,
    path: req.path,
    method: req.method,
  });
});

module.exports = router;
