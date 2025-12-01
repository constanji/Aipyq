const { z } = require('zod');
const { tool } = require('@langchain/core/tools');
const { logger } = require('@aipyq/data-schemas');
const {
  Providers,
  StepTypes,
  GraphEvents,
  Constants: AgentConstants,
} = require('@aipyq/agents');
const {
  sendEvent,
  MCPOAuthHandler,
  normalizeServerName,
  convertWithResolvedRefs,
} = require('@aipyq/api');
const {
  Time,
  CacheKeys,
  Constants,
  ContentTypes,
  isAssistantsEndpoint,
} = require('aipyq-data-provider');
const { getMCPManager, getFlowStateManager, getOAuthReconnectionManager } = require('~/config');
const { findToken, createToken, updateToken } = require('~/models');
const { reinitMCPServer } = require('./Tools/mcp');
const { getAppConfig } = require('./Config');
const { getLogStores } = require('~/cache');
const { mcpServersRegistry } = require('@aipyq/api');

/**
 * @param {object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {string} params.stepId - The ID of the step in the flow.
 * @param {ToolCallChunk} params.toolCall - The tool call object containing tool information.
 */
function createRunStepDeltaEmitter({ res, stepId, toolCall }) {
  /**
   * @param {string} authURL - The URL to redirect the user for OAuth authentication.
   * @returns {void}
   */
  return function (authURL) {
    /** @type {{ id: string; delta: AgentToolCallDelta }} */
    const data = {
      id: stepId,
      delta: {
        type: StepTypes.TOOL_CALLS,
        tool_calls: [{ ...toolCall, args: '' }],
        auth: authURL,
        expires_at: Date.now() + Time.TWO_MINUTES,
      },
    };
    sendEvent(res, { event: GraphEvents.ON_RUN_STEP_DELTA, data });
  };
}

/**
 * @param {object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {string} params.runId - The Run ID, i.e. message ID
 * @param {string} params.stepId - The ID of the step in the flow.
 * @param {ToolCallChunk} params.toolCall - The tool call object containing tool information.
 * @param {number} [params.index]
 */
function createRunStepEmitter({ res, runId, stepId, toolCall, index }) {
  return function () {
    /** @type {import('@aipyq/agents').RunStep} */
    const data = {
      runId: runId ?? Constants.USE_PRELIM_RESPONSE_MESSAGE_ID,
      id: stepId,
      type: StepTypes.TOOL_CALLS,
      index: index ?? 0,
      stepDetails: {
        type: StepTypes.TOOL_CALLS,
        tool_calls: [toolCall],
      },
    };
    sendEvent(res, { event: GraphEvents.ON_RUN_STEP, data });
  };
}

/**
 * Creates a function used to ensure the flow handler is only invoked once
 * @param {object} params
 * @param {string} params.flowId - The ID of the login flow.
 * @param {FlowStateManager<any>} params.flowManager - The flow manager instance.
 * @param {(authURL: string) => void} [params.callback]
 */
function createOAuthStart({ flowId, flowManager, callback }) {
  /**
   * Creates a function to handle OAuth login requests.
   * @param {string} authURL - The URL to redirect the user for OAuth authentication.
   * @returns {Promise<boolean>} Returns true to indicate the event was sent successfully.
   */
  return async function (authURL) {
    await flowManager.createFlowWithHandler(flowId, 'oauth_login', async () => {
      callback?.(authURL);
      logger.debug('Sent OAuth login request to client');
      return true;
    });
  };
}

/**
 * @param {object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {string} params.stepId - The ID of the step in the flow.
 * @param {ToolCallChunk} params.toolCall - The tool call object containing tool information.
 * @param {string} params.loginFlowId - The ID of the login flow.
 * @param {FlowStateManager<any>} params.flowManager - The flow manager instance.
 */
function createOAuthEnd({ res, stepId, toolCall }) {
  return async function () {
    /** @type {{ id: string; delta: AgentToolCallDelta }} */
    const data = {
      id: stepId,
      delta: {
        type: StepTypes.TOOL_CALLS,
        tool_calls: [{ ...toolCall }],
      },
    };
    sendEvent(res, { event: GraphEvents.ON_RUN_STEP_DELTA, data });
    logger.debug('Sent OAuth login success to client');
  };
}

/**
 * @param {object} params
 * @param {string} params.userId - The ID of the user.
 * @param {string} params.serverName - The name of the server.
 * @param {string} params.toolName - The name of the tool.
 * @param {FlowStateManager<any>} params.flowManager - The flow manager instance.
 */
function createAbortHandler({ userId, serverName, toolName, flowManager }) {
  return function () {
    logger.info(`[MCP][User: ${userId}][${serverName}][${toolName}] Tool call aborted`);
    const flowId = MCPOAuthHandler.generateFlowId(userId, serverName);
    flowManager.failFlow(flowId, 'mcp_oauth', new Error('Tool call aborted'));
  };
}

/**
 * @param {Object} params
 * @param {() => void} params.runStepEmitter
 * @param {(authURL: string) => void} params.runStepDeltaEmitter
 * @returns {(authURL: string) => void}
 */
function createOAuthCallback({ runStepEmitter, runStepDeltaEmitter }) {
  return function (authURL) {
    runStepEmitter();
    runStepDeltaEmitter(authURL);
  };
}

/**
 * @param {Object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {IUser} params.user - The user from the request object.
 * @param {string} params.serverName
 * @param {AbortSignal} params.signal
 * @param {string} params.model
 * @param {number} [params.index]
 * @param {Record<string, Record<string, string>>} [params.userMCPAuthMap]
 * @returns { Promise<Array<typeof tool | { _call: (toolInput: Object | string) => unknown}>> } An object with `_call` method to execute the tool input.
 */
async function reconnectServer({ res, user, index, signal, serverName, userMCPAuthMap }) {
  const runId = Constants.USE_PRELIM_RESPONSE_MESSAGE_ID;
  const flowId = `${user.id}:${serverName}:${Date.now()}`;
  const flowManager = getFlowStateManager(getLogStores(CacheKeys.FLOWS));
  const stepId = 'step_oauth_login_' + serverName;
  const toolCall = {
    id: flowId,
    name: serverName,
    type: 'tool_call_chunk',
  };

  const runStepEmitter = createRunStepEmitter({
    res,
    index,
    runId,
    stepId,
    toolCall,
  });
  const runStepDeltaEmitter = createRunStepDeltaEmitter({
    res,
    stepId,
    toolCall,
  });
  const callback = createOAuthCallback({ runStepEmitter, runStepDeltaEmitter });
  const oauthStart = createOAuthStart({
    res,
    flowId,
    callback,
    flowManager,
  });
  return await reinitMCPServer({
    user,
    signal,
    serverName,
    oauthStart,
    flowManager,
    userMCPAuthMap,
    forceNew: true,
    returnOnOAuth: false,
    connectionTimeout: Time.TWO_MINUTES,
  });
}

/**
 * Creates all tools from the specified MCP Server via `toolKey`.
 *
 * This function assumes tools could not be aggregated from the cache of tool definitions,
 * i.e. `availableTools`, and will reinitialize the MCP server to ensure all tools are generated.
 *
 * @param {Object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {IUser} params.user - The user from the request object.
 * @param {string} params.serverName
 * @param {string} params.model
 * @param {Providers | EModelEndpoint} params.provider - The provider for the tool.
 * @param {number} [params.index]
 * @param {AbortSignal} [params.signal]
 * @param {Record<string, Record<string, string>>} [params.userMCPAuthMap]
 * @returns { Promise<Array<typeof tool | { _call: (toolInput: Object | string) => unknown}>> } An object with `_call` method to execute the tool input.
 */
async function createMCPTools({ res, user, index, signal, serverName, provider, userMCPAuthMap }) {
  const result = await reconnectServer({ res, user, index, signal, serverName, userMCPAuthMap });
  if (!result || !result.tools) {
    logger.warn(`[MCP][${serverName}] Failed to reinitialize MCP server.`);
    return;
  }

  const serverTools = [];
  for (const tool of result.tools) {
    const toolInstance = await createMCPTool({
      res,
      user,
      provider,
      userMCPAuthMap,
      availableTools: result.availableTools,
      toolKey: `${tool.name}${Constants.mcp_delimiter}${serverName}`,
    });
    if (toolInstance) {
      serverTools.push(toolInstance);
    }
  }

  return serverTools;
}

/**
 * Creates a single tool from the specified MCP Server via `toolKey`.
 * @param {Object} params
 * @param {ServerResponse} params.res - The Express response object for sending events.
 * @param {IUser} params.user - The user from the request object.
 * @param {string} params.toolKey - The toolKey for the tool.
 * @param {string} params.model - The model for the tool.
 * @param {number} [params.index]
 * @param {AbortSignal} [params.signal]
 * @param {Providers | EModelEndpoint} params.provider - The provider for the tool.
 * @param {LCAvailableTools} [params.availableTools]
 * @param {Record<string, Record<string, string>>} [params.userMCPAuthMap]
 * @returns { Promise<typeof tool | { _call: (toolInput: Object | string) => unknown}> } An object with `_call` method to execute the tool input.
 */
async function createMCPTool({
  res,
  user,
  index,
  signal,
  toolKey,
  provider,
  userMCPAuthMap,
  availableTools,
}) {
  const [toolName, serverName] = toolKey.split(Constants.mcp_delimiter);

  /** @type {LCTool | undefined} */
  let toolDefinition = availableTools?.[toolKey]?.function;
  if (!toolDefinition) {
    logger.warn(
      `[MCP][${serverName}][${toolName}] Requested tool not found in available tools, re-initializing MCP server.`,
    );
    const result = await reconnectServer({
      res,
      user,
      index,
      signal,
      serverName,
      userMCPAuthMap,
    });
    toolDefinition = result?.availableTools?.[toolKey]?.function;
  }

  if (!toolDefinition) {
    logger.warn(`[MCP][${serverName}][${toolName}] Tool definition not found, cannot create tool.`);
    return;
  }

  return createToolInstance({
    res,
    provider,
    toolName,
    serverName,
    toolDefinition,
  });
}

function createToolInstance({ res, toolName, serverName, toolDefinition, provider: _provider }) {
  /** @type {LCTool} */
  const { description, parameters } = toolDefinition;
  const isGoogle = _provider === Providers.VERTEXAI || _provider === Providers.GOOGLE;
  let schema = convertWithResolvedRefs(parameters, {
    allowEmptyObject: !isGoogle,
    transformOneOfAnyOf: true,
  });

  if (!schema) {
    schema = z.object({ input: z.string().optional() });
  }

  const normalizedToolKey = `${toolName}${Constants.mcp_delimiter}${normalizeServerName(serverName)}`;

  /** @type {(toolArguments: Object | string, config?: GraphRunnableConfig) => Promise<unknown>} */
  const _call = async (toolArguments, config) => {
    const userId = config?.configurable?.user?.id || config?.configurable?.user_id;
    /** @type {ReturnType<typeof createAbortHandler>} */
    let abortHandler = null;
    /** @type {AbortSignal} */
    let derivedSignal = null;

    try {
      const flowsCache = getLogStores(CacheKeys.FLOWS);
      const flowManager = getFlowStateManager(flowsCache);
      derivedSignal = config?.signal ? AbortSignal.any([config.signal]) : undefined;
      const mcpManager = getMCPManager(userId);
      const provider = (config?.metadata?.provider || _provider)?.toLowerCase();

      const { args: _args, stepId, ...toolCall } = config.toolCall ?? {};
      const flowId = `${serverName}:oauth_login:${config.metadata.thread_id}:${config.metadata.run_id}`;
      const runStepDeltaEmitter = createRunStepDeltaEmitter({
        res,
        stepId,
        toolCall,
      });
      const oauthStart = createOAuthStart({
        flowId,
        flowManager,
        callback: runStepDeltaEmitter,
      });
      const oauthEnd = createOAuthEnd({
        res,
        stepId,
        toolCall,
      });

      if (derivedSignal) {
        abortHandler = createAbortHandler({ userId, serverName, toolName, flowManager });
        derivedSignal.addEventListener('abort', abortHandler, { once: true });
      }

      const customUserVars =
        config?.configurable?.userMCPAuthMap?.[`${Constants.mcp_prefix}${serverName}`];

      // 解析 toolArguments：如果是字符串，尝试解析为 JSON 对象
      // 这样可以避免工具参数被逐字发送的问题
      let parsedToolArguments = toolArguments;
      if (typeof toolArguments === 'string') {
        try {
          parsedToolArguments = JSON.parse(toolArguments);
        } catch (e) {
          // 如果解析失败，检查是否是单个描述字符串
          // 对于某些工具（如 text-to-image），可能需要将字符串包装为对象
          if (toolName.includes('text_to_image') || toolName.includes('text-to-image')) {
            // 对于图像生成工具，将字符串作为 description 参数
            parsedToolArguments = { description: toolArguments };
          } else {
            // 对于其他工具，使用默认的 input 字段
            parsedToolArguments = { input: toolArguments };
          }
        }
      }

      const result = await mcpManager.callTool({
        serverName,
        toolName,
        provider,
        toolArguments: parsedToolArguments,
        options: {
          signal: derivedSignal,
        },
        user: config?.configurable?.user,
        requestBody: config?.configurable?.requestBody,
        customUserVars,
        flowManager,
        tokenMethods: {
          findToken,
          createToken,
          updateToken,
        },
        oauthStart,
        oauthEnd,
      });

      // formatToolContent 总是返回 [formattedContent, artifacts] 两元素元组
      // 对于 CONTENT_AND_ARTIFACT 格式，LangChain 期望的是两元素元组 [content, artifact]
      // 而不是 { content, artifact } 对象
      if (Array.isArray(result) && result.length === 2) {
        // 直接返回两元素元组，这是 LangChain 期望的格式
        return result;
      }
      
      // 如果 result 不是预期的格式，确保返回有效的两元素元组
      // formatToolContent 应该总是返回两元素数组，但如果出现意外情况，提供默认值
      if (!Array.isArray(result)) {
        logger.warn(
          `[MCP][${serverName}][${toolName}] Unexpected result format, expected array, got:`,
          typeof result,
        );
        // 返回默认的两元素元组格式
        return [String(result ?? '(No response)'), undefined];
      }
      
      // 如果数组长度不是2，调整为两元素元组
      if (result.length !== 2) {
        logger.warn(
          `[MCP][${serverName}][${toolName}] Unexpected result array length ${result.length}, expected 2`,
        );
        // 取第一个元素作为content，第二个元素（或undefined）作为artifact
        return [result[0] ?? '(No response)', result[1]];
      }
      
      // 兼容旧格式 - 对于特定的端点，可能需要不同的处理
      if (isAssistantsEndpoint(provider) && Array.isArray(result)) {
        // 对于 Assistants 端点，仍然返回两元素元组格式
        return result;
      }
      if (isGoogle && Array.isArray(result[0]) && result[0][0]?.type === ContentTypes.TEXT) {
        return [result[0][0].text, result[1]];
      }
      
      // 默认情况：确保返回两元素元组
      return Array.isArray(result) && result.length === 2 ? result : [result, undefined];
    } catch (error) {
      logger.error(
        `[MCP][${serverName}][${toolName}][User: ${userId}] Error calling MCP tool:`,
        error,
      );

      /** OAuth error, provide a helpful message */
      const isOAuthError =
        error.message?.includes('401') ||
        error.message?.includes('OAuth') ||
        error.message?.includes('authentication') ||
        error.message?.includes('Non-200 status code (401)');

      if (isOAuthError) {
        throw new Error(
          `[MCP][${serverName}][${toolName}] OAuth authentication required. Please check the server logs for the authentication URL.`,
        );
      }

      throw new Error(
        `[MCP][${serverName}][${toolName}] tool call failed${error?.message ? `: ${error?.message}` : '.'}`,
      );
    } finally {
      // Clean up abort handler to prevent memory leaks
      if (abortHandler && derivedSignal) {
        derivedSignal.removeEventListener('abort', abortHandler);
      }
    }
  };

  const toolInstance = tool(_call, {
    schema,
    name: normalizedToolKey,
    description: description || '',
    responseFormat: AgentConstants.CONTENT_AND_ARTIFACT,
  });
  toolInstance.mcp = true;
  toolInstance.mcpRawServerName = serverName;
  return toolInstance;
}

/**
 * Get MCP setup data including config, connections, and OAuth servers
 * @param {string} userId - The user ID
 * @returns {Object} Object containing mcpConfig, appConnections, userConnections, and oauthServers
 */
async function getMCPSetupData(userId) {
  const config = await getAppConfig();
  const mcpConfig = config?.mcpConfig;

  if (!mcpConfig) {
    throw new Error('MCP config not found');
  }

  const mcpManager = getMCPManager(userId);
  /** @type {Map<string, import('@aipyq/api').MCPConnection>} */
  let appConnections = new Map();
  try {
    appConnections = (await mcpManager.appConnections?.getAll()) || new Map();
  } catch (error) {
    logger.error(`[MCP][User: ${userId}] Error getting app connections:`, error);
  }
  const userConnections = mcpManager.getUserConnections(userId) || new Map();
  const oauthServers = await mcpServersRegistry.getOAuthServers();

  return {
    mcpConfig,
    oauthServers,
    appConnections,
    userConnections,
  };
}

/**
 * Check OAuth flow status for a user and server
 * @param {string} userId - The user ID
 * @param {string} serverName - The server name
 * @returns {Object} Object containing hasActiveFlow and hasFailedFlow flags
 */
async function checkOAuthFlowStatus(userId, serverName) {
  const flowsCache = getLogStores(CacheKeys.FLOWS);
  const flowManager = getFlowStateManager(flowsCache);
  const flowId = MCPOAuthHandler.generateFlowId(userId, serverName);

  try {
    const flowState = await flowManager.getFlowState(flowId, 'mcp_oauth');
    if (!flowState) {
      return { hasActiveFlow: false, hasFailedFlow: false };
    }

    const flowAge = Date.now() - flowState.createdAt;
    const flowTTL = flowState.ttl || 180000; // Default 3 minutes

    if (flowState.status === 'FAILED' || flowAge > flowTTL) {
      const wasCancelled = flowState.error && flowState.error.includes('cancelled');

      if (wasCancelled) {
        logger.debug(`[MCP Connection Status] Found cancelled OAuth flow for ${serverName}`, {
          flowId,
          status: flowState.status,
          error: flowState.error,
        });
        return { hasActiveFlow: false, hasFailedFlow: false };
      } else {
        logger.debug(`[MCP Connection Status] Found failed OAuth flow for ${serverName}`, {
          flowId,
          status: flowState.status,
          flowAge,
          flowTTL,
          timedOut: flowAge > flowTTL,
          error: flowState.error,
        });
        return { hasActiveFlow: false, hasFailedFlow: true };
      }
    }

    if (flowState.status === 'PENDING') {
      logger.debug(`[MCP Connection Status] Found active OAuth flow for ${serverName}`, {
        flowId,
        flowAge,
        flowTTL,
      });
      return { hasActiveFlow: true, hasFailedFlow: false };
    }

    return { hasActiveFlow: false, hasFailedFlow: false };
  } catch (error) {
    logger.error(`[MCP Connection Status] Error checking OAuth flows for ${serverName}:`, error);
    return { hasActiveFlow: false, hasFailedFlow: false };
  }
}

/**
 * Get connection status for a specific MCP server
 * @param {string} userId - The user ID
 * @param {string} serverName - The server name
 * @param {Map} appConnections - App-level connections
 * @param {Map} userConnections - User-level connections
 * @param {Set} oauthServers - Set of OAuth servers
 * @returns {Object} Object containing requiresOAuth and connectionState
 */
async function getServerConnectionStatus(
  userId,
  serverName,
  appConnections,
  userConnections,
  oauthServers,
) {
  const getConnectionState = () =>
    appConnections.get(serverName)?.connectionState ??
    userConnections.get(serverName)?.connectionState ??
    'disconnected';

  const baseConnectionState = getConnectionState();
  let finalConnectionState = baseConnectionState;

  // connection state overrides specific to OAuth servers
  if (baseConnectionState === 'disconnected' && oauthServers.has(serverName)) {
    // check if server is actively being reconnected
    const oauthReconnectionManager = getOAuthReconnectionManager();
    if (oauthReconnectionManager.isReconnecting(userId, serverName)) {
      finalConnectionState = 'connecting';
    } else {
      const { hasActiveFlow, hasFailedFlow } = await checkOAuthFlowStatus(userId, serverName);

      if (hasFailedFlow) {
        finalConnectionState = 'error';
      } else if (hasActiveFlow) {
        finalConnectionState = 'connecting';
      }
    }
  }

  return {
    requiresOAuth: oauthServers.has(serverName),
    connectionState: finalConnectionState,
  };
}

module.exports = {
  createMCPTool,
  createMCPTools,
  getMCPSetupData,
  checkOAuthFlowStatus,
  getServerConnectionStatus,
};
