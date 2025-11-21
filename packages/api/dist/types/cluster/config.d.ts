declare const clusterConfig: {
    /** Duration in seconds that the leader lease is valid before it expires */
    LEADER_LEASE_DURATION: number;
    /** Interval in seconds at which the leader renews its lease */
    LEADER_RENEW_INTERVAL: number;
    /** Maximum number of retry attempts when renewing the lease fails */
    LEADER_RENEW_ATTEMPTS: number;
    /** Delay in seconds between retry attempts when renewing the lease */
    LEADER_RENEW_RETRY_DELAY: number;
};
export { clusterConfig };
//# sourceMappingURL=config.d.ts.map