const { logger, webSearchKeys } = require('@aipyq/data-schemas');
const { Tools, CacheKeys, Constants, FileSources } = require('aipyq-data-provider');
const {
  MCPOAuthHandler,
  MCPTokenStorage,
  normalizeHttpError,
  extractWebSearchEnvVars,
} = require('@aipyq/api');
const {
  getFiles,
  findToken,
  updateUser,
  deleteFiles,
  deleteConvos,
  deletePresets,
  deleteMessages,
  deleteUserById,
  deleteAllSharedLinks,
  deleteAllUserSessions,
} = require('~/models');
const { updateUserPluginAuth, deleteUserPluginAuth } = require('~/server/services/PluginService');
const { updateUserPluginsService, deleteUserKey } = require('~/server/services/UserService');
const { verifyEmail, resendVerificationEmail } = require('~/server/services/AuthService');
const { needsRefresh, getNewS3URL } = require('~/server/services/Files/S3/crud');
const { processDeleteRequest } = require('~/server/services/Files/process');
const { Transaction, Balance, User, Token } = require('~/db/models');
const { SystemRoles } = require('aipyq-data-provider');
const { getAllUserMemories } = require('~/models');
const { getMCPManager, getFlowStateManager } = require('~/config');
const { getAppConfig } = require('~/server/services/Config');
const { deleteToolCalls } = require('~/models/ToolCall');
const { getLogStores } = require('~/cache');
const { mcpServersRegistry } = require('@aipyq/api');

const getUserController = async (req, res) => {
  const appConfig = await getAppConfig({ role: req.user?.role });
  /** @type {IUser} */
  const userData = req.user.toObject != null ? req.user.toObject() : { ...req.user };
  /**
   * These fields should not exist due to secure field selection, but deletion
   * is done in case of alternate database incompatibility with Mongo API
   * */
  delete userData.password;
  delete userData.totpSecret;
  delete userData.backupCodes;
  if (appConfig.fileStrategy === FileSources.s3 && userData.avatar) {
    const avatarNeedsRefresh = needsRefresh(userData.avatar, 3600);
    if (!avatarNeedsRefresh) {
      return res.status(200).send(userData);
    }
    const originalAvatar = userData.avatar;
    try {
      userData.avatar = await getNewS3URL(userData.avatar);
      await updateUser(userData.id, { avatar: userData.avatar });
    } catch (error) {
      userData.avatar = originalAvatar;
      logger.error('Error getting new S3 URL for avatar:', error);
    }
  }
  res.status(200).send(userData);
};

const getTermsStatusController = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ termsAccepted: !!user.termsAccepted });
  } catch (error) {
    logger.error('Error fetching terms acceptance status:', error);
    res.status(500).json({ message: 'Error fetching terms acceptance status' });
  }
};

const acceptTermsController = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, { termsAccepted: true }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'Terms accepted successfully' });
  } catch (error) {
    logger.error('Error accepting terms:', error);
    res.status(500).json({ message: 'Error accepting terms' });
  }
};

const deleteUserFiles = async (req) => {
  try {
    const userFiles = await getFiles({ user: req.user.id });
    await processDeleteRequest({
      req,
      files: userFiles,
    });
  } catch (error) {
    logger.error('[deleteUserFiles]', error);
  }
};

const updateUserPluginsController = async (req, res) => {
  const appConfig = await getAppConfig({ role: req.user?.role });
  const { user } = req;
  const { pluginKey, action, auth, isEntityTool } = req.body;
  try {
    if (!isEntityTool) {
      const userPluginsService = await updateUserPluginsService(user, pluginKey, action);

      if (userPluginsService instanceof Error) {
        logger.error('[userPluginsService]', userPluginsService);
        const { status, message } = normalizeHttpError(userPluginsService);
        return res.status(status).send({ message });
      }
    }

    if (auth == null) {
      return res.status(200).send();
    }

    let keys = Object.keys(auth);
    const values = Object.values(auth); // Used in 'install' block

    const isMCPTool = pluginKey.startsWith('mcp_') || pluginKey.includes(Constants.mcp_delimiter);

    // Early exit condition:
    // If keys are empty (meaning auth: {} was likely sent for uninstall, or auth was empty for install)
    // AND it's not web_search (which has special key handling to populate `keys` for uninstall)
    // AND it's NOT (an uninstall action FOR an MCP tool - we need to proceed for this case to clear all its auth)
    // THEN return.
    if (
      keys.length === 0 &&
      pluginKey !== Tools.web_search &&
      !(action === 'uninstall' && isMCPTool)
    ) {
      return res.status(200).send();
    }

    /** @type {number} */
    let status = 200;
    /** @type {string} */
    let message;
    /** @type {IPluginAuth | Error} */
    let authService;

    if (pluginKey === Tools.web_search) {
      /** @type  {TCustomConfig['webSearch']} */
      const webSearchConfig = appConfig?.webSearch;
      keys = extractWebSearchEnvVars({
        keys: action === 'install' ? keys : webSearchKeys,
        config: webSearchConfig,
      });
    }

    if (action === 'install') {
      for (let i = 0; i < keys.length; i++) {
        authService = await updateUserPluginAuth(user.id, keys[i], pluginKey, values[i]);
        if (authService instanceof Error) {
          logger.error('[authService]', authService);
          ({ status, message } = normalizeHttpError(authService));
        }
      }
    } else if (action === 'uninstall') {
      // const isMCPTool was defined earlier
      if (isMCPTool && keys.length === 0) {
        // This handles the case where auth: {} is sent for an MCP tool uninstall.
        // It means "delete all credentials associated with this MCP pluginKey".
        authService = await deleteUserPluginAuth(user.id, null, true, pluginKey);
        if (authService instanceof Error) {
          logger.error(
            `[authService] Error deleting all auth for MCP tool ${pluginKey}:`,
            authService,
          );
          ({ status, message } = normalizeHttpError(authService));
        }
        try {
          // if the MCP server uses OAuth, perform a full cleanup and token revocation
          await maybeUninstallOAuthMCP(user.id, pluginKey, appConfig);
        } catch (error) {
          logger.error(
            `[updateUserPluginsController] Error uninstalling OAuth MCP for ${pluginKey}:`,
            error,
          );
        }
      } else {
        // This handles:
        // 1. Web_search uninstall (keys will be populated with all webSearchKeys if auth was {}).
        // 2. Other tools uninstall (if keys were provided).
        // 3. MCP tool uninstall if specific keys were provided in `auth` (not current frontend behavior).
        // If keys is empty for non-MCP tools (and not web_search), this loop won't run, and nothing is deleted.
        for (let i = 0; i < keys.length; i++) {
          authService = await deleteUserPluginAuth(user.id, keys[i]); // Deletes by authField name
          if (authService instanceof Error) {
            logger.error('[authService] Error deleting specific auth key:', authService);
            ({ status, message } = normalizeHttpError(authService));
          }
        }
      }
    }

    if (status === 200) {
      // If auth was updated successfully, disconnect MCP sessions as they might use these credentials
      if (pluginKey.startsWith(Constants.mcp_prefix)) {
        try {
          const mcpManager = getMCPManager();
          if (mcpManager) {
            // Extract server name from pluginKey (format: "mcp_<serverName>")
            const serverName = pluginKey.replace(Constants.mcp_prefix, '');
            logger.info(
              `[updateUserPluginsController] Attempting disconnect of MCP server "${serverName}" for user ${user.id} after plugin auth update.`,
            );
            await mcpManager.disconnectUserConnection(user.id, serverName);
          }
        } catch (disconnectError) {
          logger.error(
            `[updateUserPluginsController] Error disconnecting MCP connection for user ${user.id} after plugin auth update:`,
            disconnectError,
          );
          // Do not fail the request for this, but log it.
        }
      }
      return res.status(status).send();
    }

    const normalized = normalizeHttpError({ status, message });
    return res.status(normalized.status).send({ message: normalized.message });
  } catch (err) {
    logger.error('[updateUserPluginsController]', err);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteUserController = async (req, res) => {
  const { user } = req;

  try {
    await deleteMessages({ user: user.id }); // delete user messages
    await deleteAllUserSessions({ userId: user.id }); // delete user sessions
    await Transaction.deleteMany({ user: user.id }); // delete user transactions
    await deleteUserKey({ userId: user.id, all: true }); // delete user keys
    await Balance.deleteMany({ user: user._id }); // delete user balances
    await deletePresets(user.id); // delete user presets
    /* TODO: Delete Assistant Threads */
    try {
      await deleteConvos(user.id); // delete user convos
    } catch (error) {
      logger.error('[deleteUserController] Error deleting user convos, likely no convos', error);
    }
    await deleteUserPluginAuth(user.id, null, true); // delete user plugin auth
    await deleteUserById(user.id); // delete user
    await deleteAllSharedLinks(user.id); // delete user shared links
    await deleteUserFiles(req); // delete user files
    await deleteFiles(null, user.id); // delete database files in case of orphaned files from previous steps
    await deleteToolCalls(user.id); // delete user tool calls
    /* TODO: queue job for cleaning actions and assistants of non-existant users */
    logger.info(`User deleted account. Email: ${user.email} ID: ${user.id}`);
    res.status(200).send({ message: 'User deleted' });
  } catch (err) {
    logger.error('[deleteUserController]', err);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const verifyEmailController = async (req, res) => {
  try {
    const verifyEmailService = await verifyEmail(req);
    if (verifyEmailService instanceof Error) {
      return res.status(400).json(verifyEmailService);
    } else {
      return res.status(200).json(verifyEmailService);
    }
  } catch (e) {
    logger.error('[verifyEmailController]', e);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

const resendVerificationController = async (req, res) => {
  try {
    const result = await resendVerificationEmail(req);
    if (result instanceof Error) {
      return res.status(400).json(result);
    } else {
      return res.status(200).json(result);
    }
  } catch (e) {
    logger.error('[verifyEmailController]', e);
    return res.status(500).json({ message: 'Something went wrong.' });
  }
};

/**
 * OAuth MCP specific uninstall logic
 */
const maybeUninstallOAuthMCP = async (userId, pluginKey, appConfig) => {
  if (!pluginKey.startsWith(Constants.mcp_prefix)) {
    // this is not an MCP server, so nothing to do here
    return;
  }

  const serverName = pluginKey.replace(Constants.mcp_prefix, '');
  const serverConfig =
    (await mcpServersRegistry.getServerConfig(serverName, userId)) ??
    appConfig?.mcpServers?.[serverName];
  const oauthServers = await mcpServersRegistry.getOAuthServers();
  if (!oauthServers.has(serverName)) {
    // this server does not use OAuth, so nothing to do here as well
    return;
  }

  // 1. get client info used for revocation (client id, secret)
  const clientTokenData = await MCPTokenStorage.getClientInfoAndMetadata({
    userId,
    serverName,
    findToken,
  });
  if (clientTokenData == null) {
    return;
  }
  const { clientInfo, clientMetadata } = clientTokenData;

  // 2. get decrypted tokens before deletion
  const tokens = await MCPTokenStorage.getTokens({
    userId,
    serverName,
    findToken,
  });

  // 3. revoke OAuth tokens at the provider
  const revocationEndpoint =
    serverConfig.oauth?.revocation_endpoint ?? clientMetadata.revocation_endpoint;
  const revocationEndpointAuthMethodsSupported =
    serverConfig.oauth?.revocation_endpoint_auth_methods_supported ??
    clientMetadata.revocation_endpoint_auth_methods_supported;
  const oauthHeaders = serverConfig.oauth_headers ?? {};

  if (tokens?.access_token) {
    try {
      await MCPOAuthHandler.revokeOAuthToken(
        serverName,
        tokens.access_token,
        'access',
        {
          serverUrl: serverConfig.url,
          clientId: clientInfo.client_id,
          clientSecret: clientInfo.client_secret ?? '',
          revocationEndpoint,
          revocationEndpointAuthMethodsSupported,
        },
        oauthHeaders,
      );
    } catch (error) {
      logger.error(`Error revoking OAuth access token for ${serverName}:`, error);
    }
  }

  if (tokens?.refresh_token) {
    try {
      await MCPOAuthHandler.revokeOAuthToken(
        serverName,
        tokens.refresh_token,
        'refresh',
        {
          serverUrl: serverConfig.url,
          clientId: clientInfo.client_id,
          clientSecret: clientInfo.client_secret ?? '',
          revocationEndpoint,
          revocationEndpointAuthMethodsSupported,
        },
        oauthHeaders,
      );
    } catch (error) {
      logger.error(`Error revoking OAuth refresh token for ${serverName}:`, error);
    }
  }

  // 4. delete tokens from the DB after revocation attempts
  await MCPTokenStorage.deleteUserTokens({
    userId,
    serverName,
    deleteToken: async (filter) => {
      await Token.deleteOne(filter);
    },
  });

  // 5. clear the flow state for the OAuth tokens
  const flowsCache = getLogStores(CacheKeys.FLOWS);
  const flowManager = getFlowStateManager(flowsCache);
  const flowId = MCPOAuthHandler.generateFlowId(userId, serverName);
  await flowManager.deleteFlow(flowId, 'mcp_get_tokens');
  await flowManager.deleteFlow(flowId, 'mcp_oauth');
};

const listUsersController = async (req, res) => {
  try {
    // 只有管理员可以查看所有用户
    if (req.user.role !== SystemRoles.ADMIN) {
      return res.status(403).json({ error: '只有管理员可以查看用户列表' });
    }

    const users = await User.find({})
      .select('email username name avatar provider role createdAt updatedAt')
      .sort({ createdAt: -1 })
      .lean();

    // 清理敏感信息
    const sanitizedUsers = users.map((user) => ({
      _id: user._id.toString(),
      email: user.email,
      username: user.username || null,
      name: user.name || null,
      avatar: user.avatar || null,
      provider: user.provider || 'email',
      role: user.role || 'USER',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    res.status(200).json({
      success: true,
      users: sanitizedUsers,
      total: sanitizedUsers.length,
    });
  } catch (error) {
    logger.error('[listUsersController] Error listing users:', error);
    res.status(500).json({ error: '获取用户列表失败' });
  }
};

const getUserMemoriesController = async (req, res) => {
  try {
    // 只有管理员可以查看其他用户的记忆
    if (req.user.role !== SystemRoles.ADMIN) {
      return res.status(403).json({ error: '只有管理员可以查看用户记忆' });
    }

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: '用户ID不能为空' });
    }

    // 验证用户是否存在
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 获取用户记忆
    const memories = await getAllUserMemories(userId);

    // 按更新时间排序（最新的在前）
    const sortedMemories = memories.sort(
      (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );

    // 计算总token数
    const totalTokens = memories.reduce((sum, memory) => {
      return sum + (memory.tokenCount || 0);
    }, 0);

    res.status(200).json({
      success: true,
      userId: userId,
      userEmail: user.email,
      userName: user.name || user.username || '未设置名称',
      memories: sortedMemories,
      totalTokens,
      count: sortedMemories.length,
    });
  } catch (error) {
    logger.error('[getUserMemoriesController] Error getting user memories:', error);
    res.status(500).json({ error: '获取用户记忆失败' });
  }
};

const updateUserRoleController = async (req, res) => {
  try {
    // 只有管理员可以更新用户角色
    if (req.user.role !== SystemRoles.ADMIN) {
      return res.status(403).json({ error: '只有管理员可以更新用户角色' });
    }

    const { userId } = req.params;
    const { role } = req.body;

    if (!userId) {
      return res.status(400).json({ error: '用户ID不能为空' });
    }

    if (!role || (role !== SystemRoles.ADMIN && role !== SystemRoles.USER)) {
      return res.status(400).json({ error: '角色必须是 ADMIN 或 USER' });
    }

    // 验证用户是否存在
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 管理员不能将自己设置为普通用户
    if (user._id.toString() === req.user.id && role === SystemRoles.USER) {
      return res.status(400).json({ error: '不能将自己设置为普通用户' });
    }

    // 更新用户角色
    const updatedUser = await updateUser(userId, { role });

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id.toString(),
        email: updatedUser.email,
        username: updatedUser.username || null,
        name: updatedUser.name || null,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    logger.error('[updateUserRoleController] Error updating user role:', error);
    res.status(500).json({ error: '更新用户角色失败' });
  }
};

const deleteUserByIdController = async (req, res) => {
  try {
    // 只有管理员可以删除其他用户
    if (req.user.role !== SystemRoles.ADMIN) {
      return res.status(403).json({ error: '只有管理员可以删除用户' });
    }

    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: '用户ID不能为空' });
    }

    // 不能删除自己
    if (userId === req.user.id) {
      return res.status(400).json({ error: '不能删除自己的账户' });
    }

    // 验证用户是否存在
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).json({ error: '用户不存在' });
    }

    // 删除用户及其所有相关数据
    await deleteMessages({ user: userId });
    await deleteAllUserSessions({ userId });
    await Transaction.deleteMany({ user: userId });
    await deleteUserKey({ userId, all: true });
    await Balance.deleteMany({ user: userId });
    await deletePresets(userId);
    try {
      await deleteConvos(userId);
    } catch (error) {
      logger.error('[deleteUserByIdController] Error deleting user convos, likely no convos', error);
    }
    await deleteUserPluginAuth(userId, null, true);
    await deleteAllSharedLinks(userId);
    // 删除用户文件
    try {
      const userFiles = await getFiles({ user: userId });
      await processDeleteRequest({
        req,
        files: userFiles,
      });
    } catch (error) {
      logger.error('[deleteUserByIdController] Error deleting user files', error);
    }
    await deleteFiles(null, userId);
    await deleteToolCalls(userId);
    await deleteUserById(userId);

    logger.info(`[deleteUserByIdController] Admin ${req.user.email} deleted user ${userToDelete.email} (ID: ${userId})`);
    
    res.status(200).json({
      success: true,
      message: '用户已成功删除',
    });
  } catch (error) {
    logger.error('[deleteUserByIdController] Error deleting user:', error);
    res.status(500).json({ error: '删除用户失败' });
  }
};

module.exports = {
  getUserController,
  getTermsStatusController,
  acceptTermsController,
  deleteUserController,
  verifyEmailController,
  updateUserPluginsController,
  resendVerificationController,
  listUsersController,
  getUserMemoriesController,
  updateUserRoleController,
  deleteUserByIdController,
};
