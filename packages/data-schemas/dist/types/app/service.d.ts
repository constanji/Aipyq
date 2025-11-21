import type { TCustomConfig, DeepPartial } from 'librechat-data-provider';
import type { AppConfig, FunctionTool } from '~/types/app';
export type Paths = {
    root: string;
    uploads: string;
    clientPath: string;
    dist: string;
    publicPath: string;
    fonts: string;
    assets: string;
    imageOutput: string;
    structuredTools: string;
    pluginManifest: string;
};
/**
 * Loads custom config and initializes app-wide variables.
 * @function AppService
 */
export declare const AppService: (params?: {
    config: DeepPartial<TCustomConfig>;
    paths?: Paths;
    systemTools?: Record<string, FunctionTool>;
}) => Promise<AppConfig>;
