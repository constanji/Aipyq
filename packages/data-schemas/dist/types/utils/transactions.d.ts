/**
 * Checks if the connected MongoDB deployment supports transactions
 * This requires a MongoDB replica set configuration
 *
 * @returns True if transactions are supported, false otherwise
 */
export declare const supportsTransactions: (mongoose: typeof import('mongoose')) => Promise<boolean>;
/**
 * Gets whether the current MongoDB deployment supports transactions
 * Caches the result for performance
 *
 * @returns True if transactions are supported, false otherwise
 */
export declare const getTransactionSupport: (mongoose: typeof import('mongoose'), transactionSupportCache: boolean | null) => Promise<boolean>;
