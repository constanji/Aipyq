import type { RequestOptions } from '@modelcontextprotocol/sdk/shared/protocol.js';
import type { TokenMethods } from '@librechat/data-schemas';
import type { FlowStateManager } from '~/flow/manager';
import type { TUser } from 'librechat-data-provider';
import type { MCPOAuthTokens } from './oauth';
import type { RequestBody } from '~/types';
import type * as t from './types';
import { UserConnectionManager } from './UserConnectionManager';
import { MCPConnection } from './connection';
/**
 * Centralized manager for MCP server connections and tool execution.
 * Extends UserConnectionManager to handle both app-level and user-specific connections.
 */
export declare class MCPManager extends UserConnectionManager {
    private static instance;
    /** Creates and initializes the singleton MCPManager instance */
    static createInstance(configs: t.MCPServers): Promise<MCPManager>;
    /** Returns the singleton MCPManager instance */
    static getInstance(): MCPManager;
    /** Initializes the MCPManager by setting up server registry and app connections */
    initialize(configs: t.MCPServers): Promise<void>;
    /** Retrieves an app-level or user-specific connection based on provided arguments */
    getConnection(args: {
        serverName: string;
        user?: TUser;
        forceNew?: boolean;
        flowManager?: FlowStateManager<MCPOAuthTokens | null>;
    } & Omit<t.OAuthConnectionOptions, 'useOAuth' | 'user' | 'flowManager'>): Promise<MCPConnection>;
    /** Returns all available tool functions from app-level connections */
    getAppToolFunctions(): Promise<t.LCAvailableTools>;
    /** Returns all available tool functions from all connections available to user */
    getServerToolFunctions(userId: string, serverName: string): Promise<t.LCAvailableTools | null>;
    /**
     * Get instructions for MCP servers
     * @param serverNames Optional array of server names. If not provided or empty, returns all servers.
     * @returns Object mapping server names to their instructions
     */
    private getInstructions;
    /**
     * Format MCP server instructions for injection into context
     * @param serverNames Optional array of server names to include. If not provided, includes all servers.
     * @returns Formatted instructions string ready for context injection
     */
    formatInstructionsForContext(serverNames?: string[]): Promise<string>;
    /**
     * Calls a tool on an MCP server, using either a user-specific connection
     * (if userId is provided) or an app-level connection. Updates the last activity timestamp
     * for user-specific connections upon successful call initiation.
     */
    callTool({ user, serverName, toolName, provider, toolArguments, options, tokenMethods, requestBody, flowManager, oauthStart, oauthEnd, customUserVars, }: {
        user?: TUser;
        serverName: string;
        toolName: string;
        provider: t.Provider;
        toolArguments?: Record<string, unknown>;
        options?: RequestOptions;
        requestBody?: RequestBody;
        tokenMethods?: TokenMethods;
        customUserVars?: Record<string, string>;
        flowManager: FlowStateManager<MCPOAuthTokens | null>;
        oauthStart?: (authURL: string) => Promise<void>;
        oauthEnd?: () => Promise<void>;
    }): Promise<t.FormattedToolResponse>;
}
//# sourceMappingURL=MCPManager.d.ts.map