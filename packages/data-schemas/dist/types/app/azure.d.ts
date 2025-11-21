import type { TCustomConfig, TAzureConfig } from 'librechat-data-provider';
/**
 * Sets up the Azure OpenAI configuration from the config (`librechat.yaml`) file.
 * @param config - The loaded custom configuration.
 * @returns The Azure OpenAI configuration.
 */
export declare function azureConfigSetup(config: Partial<TCustomConfig>): TAzureConfig;
