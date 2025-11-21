import type { TCustomConfig } from 'librechat-data-provider';
/**
 * Sets up Model Specs from the config (`librechat.yaml`) file.
 * @param [endpoints] - The loaded custom configuration for endpoints.
 * @param [modelSpecs] - The loaded custom configuration for model specs.
 * @param [interfaceConfig] - The loaded interface configuration.
 * @returns The processed model specs, if any.
 */
export declare function processModelSpecs(endpoints?: TCustomConfig['endpoints'], _modelSpecs?: TCustomConfig['modelSpecs'], interfaceConfig?: TCustomConfig['interface']): TCustomConfig['modelSpecs'] | undefined;
