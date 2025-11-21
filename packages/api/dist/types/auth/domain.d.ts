/**
 * @param email
 * @param allowedDomains
 */
export declare function isEmailDomainAllowed(email: string, allowedDomains?: string[] | null): boolean;
/**
 * Checks if the given domain is allowed. If no restrictions are set, allows all domains.
 * @param domain
 * @param allowedDomains
 */
export declare function isActionDomainAllowed(domain?: string | null, allowedDomains?: string[] | null): Promise<boolean>;
//# sourceMappingURL=domain.d.ts.map