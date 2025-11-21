import { EModelEndpoint } from 'librechat-data-provider';
import type { TCustomConfig, TAssistantEndpoint } from 'librechat-data-provider';
/**
 * Sets up the minimum, default Assistants configuration if Azure OpenAI Assistants option is enabled.
 * @returns The Assistants endpoint configuration.
 */
export declare function azureAssistantsDefaults(): {
    capabilities: TAssistantEndpoint['capabilities'];
    version: TAssistantEndpoint['version'];
};
/**
 * Sets up the Assistants configuration from the config (`librechat.yaml`) file.
 * @param config - The loaded custom configuration.
 * @param assistantsEndpoint - The Assistants endpoint name.
 * - The previously loaded assistants configuration from Azure OpenAI Assistants option.
 * @param [prevConfig]
 * @returns The Assistants endpoint configuration.
 */
export declare function assistantsConfigSetup(config: Partial<TCustomConfig>, assistantsEndpoint: EModelEndpoint.assistants | EModelEndpoint.azureAssistants, prevConfig?: Partial<TAssistantEndpoint>): Partial<TAssistantEndpoint>;
