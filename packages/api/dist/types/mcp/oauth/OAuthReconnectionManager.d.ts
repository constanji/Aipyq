import type { TokenMethods } from '@librechat/data-schemas';
import type { MCPOAuthTokens } from './types';
import { OAuthReconnectionTracker } from './OAuthReconnectionTracker';
import { FlowStateManager } from '~/flow/manager';
export declare class OAuthReconnectionManager {
    private static instance;
    protected readonly flowManager: FlowStateManager<MCPOAuthTokens | null>;
    protected readonly tokenMethods: TokenMethods;
    private readonly mcpManager;
    private readonly reconnectionsTracker;
    static getInstance(): OAuthReconnectionManager;
    static createInstance(flowManager: FlowStateManager<MCPOAuthTokens | null>, tokenMethods: TokenMethods, reconnections?: OAuthReconnectionTracker): Promise<OAuthReconnectionManager>;
    constructor(flowManager: FlowStateManager<MCPOAuthTokens | null>, tokenMethods: TokenMethods, reconnections?: OAuthReconnectionTracker);
    isReconnecting(userId: string, serverName: string): boolean;
    reconnectServers(userId: string): Promise<void>;
    clearReconnection(userId: string, serverName: string): void;
    private tryReconnect;
    private canReconnect;
}
//# sourceMappingURL=OAuthReconnectionManager.d.ts.map