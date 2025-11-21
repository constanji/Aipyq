import type { TPlugin } from 'librechat-data-provider';
/**
 * Filters out duplicate plugins from the list of plugins.
 *
 * @param plugins The list of plugins to filter.
 * @returns The list of plugins with duplicates removed.
 */
export declare const filterUniquePlugins: (plugins?: TPlugin[]) => TPlugin[];
/**
 * Determines if a plugin is authenticated by checking if all required authentication fields have non-empty values.
 * Supports alternate authentication fields, allowing validation against multiple possible environment variables.
 *
 * @param plugin The plugin object containing the authentication configuration.
 * @returns True if the plugin is authenticated for all required fields, false otherwise.
 */
export declare const checkPluginAuth: (plugin?: TPlugin) => boolean;
/**
 * @param toolkits
 * @param toolName
 * @returns toolKey
 */
export declare function getToolkitKey({ toolkits, toolName, }: {
    toolkits: TPlugin[];
    toolName?: string;
}): string | undefined;
//# sourceMappingURL=format.d.ts.map