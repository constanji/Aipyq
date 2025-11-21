import type { TCustomConfig } from 'librechat-data-provider';
import type { AppConfig } from '@librechat/data-schemas';
export declare const deprecatedAzureVariables: {
    key: string;
    description: string;
}[];
export declare const conflictingAzureVariables: {
    key: string;
}[];
/**
 * Checks environment variables for default secrets and deprecated variables.
 * Logs warnings for any default secret values being used and for usage of deprecated variables.
 * Advises on replacing default secrets and updating deprecated variables.
 * @param {Object} options
 * @param {Function} options.isEnabled - Function to check if a feature is enabled
 * @param {Function} options.checkEmailConfig - Function to check email configuration
 */
export declare function checkVariables(): void;
/**
 * Checks the health of auxiliary API's by attempting a fetch request to their respective `/health` endpoints.
 * Logs information or warning based on the API's availability and response.
 */
export declare function checkHealth(): Promise<void>;
export declare function checkInterfaceConfig(appConfig: AppConfig): void;
/**
 * Performs startup checks including environment variable validation and health checks.
 * This should be called during application startup before initializing services.
 * @param [appConfig] - The application configuration object.
 */
export declare function performStartupChecks(appConfig?: AppConfig): Promise<void>;
/**
 * Performs basic checks on the loaded config object.
 * @param config - The loaded custom configuration.
 */
export declare function checkConfig(config: Partial<TCustomConfig>): void;
/**
 * Checks web search configuration values to ensure they are environment variable references.
 * Warns if actual API keys or URLs are used instead of environment variable references.
 * Logs debug information for properly configured environment variable references.
 * @param webSearchConfig - The loaded web search configuration object.
 */
export declare function checkWebSearchConfig(webSearchConfig?: Partial<TCustomConfig['webSearch']> | null): void;
//# sourceMappingURL=checks.d.ts.map