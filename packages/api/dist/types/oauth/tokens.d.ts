import { TokenExchangeMethodEnum } from 'librechat-data-provider';
import type { TokenMethods } from '@librechat/data-schemas';
export declare function createHandleOAuthToken({ findToken, updateToken, createToken, }: {
    findToken: TokenMethods['findToken'];
    updateToken: TokenMethods['updateToken'];
    createToken: TokenMethods['createToken'];
}): ({ token, userId, identifier, expiresIn, metadata, type, }: {
    token: string;
    userId: string;
    identifier: string;
    expiresIn?: string | number | null | undefined;
    metadata?: Record<string, unknown> | undefined;
    type?: string | undefined;
}) => Promise<any>;
/**
 * Refreshes the access token using the refresh token.
 * @param fields
 * @param fields.userId - The ID of the user.
 * @param fields.client_url - The URL of the OAuth provider.
 * @param fields.identifier - The identifier for the token.
 * @param fields.refresh_token - The refresh token to use.
 * @param fields.token_exchange_method - The token exchange method ('default_post' or 'basic_auth_header').
 * @param fields.encrypted_oauth_client_id - The client ID for the OAuth provider.
 * @param fields.encrypted_oauth_client_secret - The client secret for the OAuth provider.
 */
export declare function refreshAccessToken({ userId, client_url, identifier, refresh_token, token_exchange_method, encrypted_oauth_client_id, encrypted_oauth_client_secret, }: {
    userId: string;
    client_url: string;
    identifier: string;
    refresh_token: string;
    token_exchange_method: TokenExchangeMethodEnum;
    encrypted_oauth_client_id: string;
    encrypted_oauth_client_secret: string;
}, { findToken, updateToken, createToken, }: {
    findToken: TokenMethods['findToken'];
    updateToken: TokenMethods['updateToken'];
    createToken: TokenMethods['createToken'];
}): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    refresh_token_expires_in?: number;
}>;
/**
 * Handles the OAuth callback and exchanges the authorization code for tokens.
 * @param {object} fields
 * @param {string} fields.code - The authorization code returned by the provider.
 * @param {string} fields.userId - The ID of the user.
 * @param {string} fields.identifier - The identifier for the token.
 * @param {string} fields.client_url - The URL of the OAuth provider.
 * @param {string} fields.redirect_uri - The redirect URI for the OAuth provider.
 * @param {string} fields.token_exchange_method - The token exchange method ('default_post' or 'basic_auth_header').
 * @param {string} fields.encrypted_oauth_client_id - The client ID for the OAuth provider.
 * @param {string} fields.encrypted_oauth_client_secret - The client secret for the OAuth provider.
 */
export declare function getAccessToken({ code, userId, identifier, client_url, redirect_uri, token_exchange_method, encrypted_oauth_client_id, encrypted_oauth_client_secret, }: {
    code: string;
    userId: string;
    identifier: string;
    client_url: string;
    redirect_uri: string;
    token_exchange_method: TokenExchangeMethodEnum;
    encrypted_oauth_client_id: string;
    encrypted_oauth_client_secret: string;
}, { findToken, updateToken, createToken, }: {
    findToken: TokenMethods['findToken'];
    updateToken: TokenMethods['updateToken'];
    createToken: TokenMethods['createToken'];
}): Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    refresh_token_expires_in?: number;
}>;
//# sourceMappingURL=tokens.d.ts.map