/**
 * Generate a short-lived JWT token
 * @param {String} userId - The ID of the user
 * @param {String} [expireIn='5m'] - The expiration time for the token (default is 5 minutes)
 * @returns {String} - The generated JWT token
 */
export declare const generateShortLivedToken: (userId: string, expireIn?: string) => string;
//# sourceMappingURL=jwt.d.ts.map