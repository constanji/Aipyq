import type { TCustomConfig, TConfigDefaults } from 'librechat-data-provider';
import type { AppConfig } from '~/types/app';
/**
 * Loads the default interface object.
 * @param params - The loaded custom configuration.
 * @param params.config - The loaded custom configuration.
 * @param params.configDefaults - The custom configuration default values.
 * @returns default interface object.
 */
export declare function loadDefaultInterface({ config, configDefaults, }: {
    config?: Partial<TCustomConfig>;
    configDefaults: TConfigDefaults;
}): Promise<AppConfig['interfaceConfig']>;
