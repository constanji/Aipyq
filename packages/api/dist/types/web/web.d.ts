import { AuthType } from 'librechat-data-provider';
import type { TCustomConfig, TWebSearchConfig } from 'librechat-data-provider';
import type { TWebSearchKeys, TWebSearchCategories } from '@librechat/data-schemas';
export declare function extractWebSearchEnvVars({ keys, config, }: {
    keys: TWebSearchKeys[];
    config: TCustomConfig['webSearch'] | undefined;
}): string[];
/**
 * Type for web search authentication result
 */
export interface WebSearchAuthResult {
    /** Whether all required categories have at least one authenticated service */
    authenticated: boolean;
    /** Authentication type (user_provided or system_defined) by category */
    authTypes: [TWebSearchCategories, AuthType][];
    /** Original authentication values mapped to their respective keys */
    authResult: Partial<TWebSearchConfig>;
}
/**
 * Loads and verifies web search authentication values
 * @param params - Authentication parameters
 * @returns Authentication result
 */
export declare function loadWebSearchAuth({ userId, webSearchConfig, loadAuthValues, throwError, }: {
    userId: string;
    webSearchConfig: TCustomConfig['webSearch'];
    loadAuthValues: (params: {
        userId: string;
        authFields: string[];
        optional?: Set<string>;
        throwError?: boolean;
    }) => Promise<Record<string, string>>;
    throwError?: boolean;
}): Promise<WebSearchAuthResult>;
//# sourceMappingURL=web.d.ts.map