import type { TUser, MCPOptions } from 'librechat-data-provider';
import type { IUser } from '@librechat/data-schemas';
import type { RequestBody } from '~/types';
/**
 * List of allowed user fields that can be used in MCP environment variables.
 * These are non-sensitive string/boolean fields from the IUser interface.
 */
declare const ALLOWED_USER_FIELDS: readonly ["id", "name", "username", "email", "provider", "role", "googleId", "facebookId", "openidId", "samlId", "ldapId", "githubId", "discordId", "appleId", "emailVerified", "twoFactorEnabled", "termsAccepted"];
type AllowedUserField = (typeof ALLOWED_USER_FIELDS)[number];
type SafeUser = Pick<IUser, AllowedUserField>;
/**
 * Creates a safe user object containing only allowed fields.
 * Optimized for performance while maintaining type safety.
 *
 * @param user - The user object to extract safe fields from
 * @returns A new object containing only allowed fields
 */
export declare function createSafeUser(user: IUser | null | undefined): Partial<SafeUser>;
/**
 * Recursively processes an object to replace environment variables in string values
 * @param params - Processing parameters
 * @param params.options - The MCP options to process
 * @param params.user - The user object containing all user fields
 * @param params.customUserVars - vars that user set in settings
 * @param params.body - the body of the request that is being processed
 * @returns - The processed object with environment variables replaced
 */
export declare function processMCPEnv(params: {
    options: Readonly<MCPOptions>;
    user?: TUser;
    customUserVars?: Record<string, string>;
    body?: RequestBody;
}): MCPOptions;
/**
 * Resolves header values by replacing user placeholders, body variables, custom variables, and environment variables.
 *
 * @param options - Optional configuration object.
 * @param options.headers - The headers object to process.
 * @param options.user - Optional user object for replacing user field placeholders (can be partial with just id).
 * @param options.body - Optional request body object for replacing body field placeholders.
 * @param options.customUserVars - Optional custom user variables to replace placeholders.
 * @returns The processed headers with all placeholders replaced.
 */
export declare function resolveHeaders(options?: {
    headers: Record<string, string> | undefined;
    user?: Partial<TUser> | {
        id: string;
    };
    body?: RequestBody;
    customUserVars?: Record<string, string>;
}): Record<string, string>;
export {};
//# sourceMappingURL=env.d.ts.map