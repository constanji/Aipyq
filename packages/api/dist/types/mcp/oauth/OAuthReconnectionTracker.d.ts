export declare class OAuthReconnectionTracker {
    /** Map of userId -> Set of serverNames that have failed reconnection */
    private failed;
    /** Map of userId -> Set of serverNames that are actively reconnecting */
    private active;
    /** Map of userId:serverName -> timestamp when reconnection started */
    private activeTimestamps;
    /** Maximum time (ms) a server can be in reconnecting state before auto-cleanup */
    private readonly RECONNECTION_TIMEOUT_MS;
    isFailed(userId: string, serverName: string): boolean;
    /** Check if server is in the active set (original simple check) */
    isActive(userId: string, serverName: string): boolean;
    /** Check if server is still reconnecting (considers timeout) */
    isStillReconnecting(userId: string, serverName: string): boolean;
    /** Clean up server if it has timed out - returns true if cleanup was performed */
    cleanupIfTimedOut(userId: string, serverName: string): boolean;
    setFailed(userId: string, serverName: string): void;
    setActive(userId: string, serverName: string): void;
    removeFailed(userId: string, serverName: string): void;
    removeActive(userId: string, serverName: string): void;
}
//# sourceMappingURL=OAuthReconnectionTracker.d.ts.map