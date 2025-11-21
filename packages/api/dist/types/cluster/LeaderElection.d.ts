/**
 * Distributed leader election implementation using Redis for coordination across multiple server instances.
 *
 * Leadership election:
 * - During bootup, every server attempts to become the leader by calling isLeader()
 * - Uses atomic Redis SET NX (set if not exists) to ensure only ONE server can claim leadership
 * - The first server to successfully set the key becomes the leader; others become followers
 * - Works with any number of servers (1 to infinite) - single server always becomes leader
 *
 * Leadership maintenance:
 * - Leader holds a key in Redis with a 25-second lease duration
 * - Leader renews this lease every 10 seconds to maintain leadership
 * - If leader crashes, the lease eventually expires, and the key disappears
 * - On shutdown, leader deletes its key to allow immediate re-election
 * - Followers check for leadership and attempt to claim it when the key is empty
 */
export declare class LeaderElection {
    static readonly LEADER_KEY: string;
    private static _instance;
    readonly UUID: string;
    private refreshTimer;
    constructor();
    /**
     * Checks if this instance is the current leader.
     * If no leader exists, waits upto 2 seconds (randomized to avoid thundering herd) then attempts self-election.
     * Always returns true in non-Redis mode (single-instance deployment).
     */
    isLeader(): Promise<boolean>;
    /**
     * Steps down from leadership by stopping the refresh timer and releasing the leader key.
     * Atomically deletes the leader key (only if we still own it) so another server can become leader immediately.
     */
    resign(): Promise<void>;
    /**
     * Gets the UUID of the current leader from Redis.
     * Returns null if no leader exists or in non-Redis mode.
     * Useful for testing and observability.
     */
    static getLeaderUUID(): Promise<string | null>;
    /**
     * Clears the refresh timer to stop leadership maintenance.
     * Called when resigning or failing to refresh leadership.
     * Calling this directly to simulate a crash in testing.
     */
    clearRefreshTimer(): void;
    /**
     * Attempts to claim leadership using atomic Redis SET NX (set if not exists).
     * If successful, starts a refresh timer to maintain leadership by extending the lease duration.
     * The NX flag ensures only one server can become leader even if multiple attempt simultaneously.
     */
    private electSelf;
    /**
     * Renews leadership by extending the lease duration on the leader key.
     * Uses Lua script to atomically verify we still own the key before renewing (prevents race conditions).
     * If we've lost leadership (key was taken by another server), stops the refresh timer.
     * This is called every 10 seconds by the refresh timer.
     */
    private renewLeadership;
}
export declare const isLeader: () => Promise<boolean>;
//# sourceMappingURL=LeaderElection.d.ts.map