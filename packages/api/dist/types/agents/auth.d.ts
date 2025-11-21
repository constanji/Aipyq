import type { PluginAuthMethods } from '@librechat/data-schemas';
export interface GetPluginAuthMapParams {
    userId: string;
    pluginKeys: string[];
    throwError?: boolean;
    findPluginAuthsByKeys: PluginAuthMethods['findPluginAuthsByKeys'];
}
export type PluginAuthMap = Record<string, Record<string, string>>;
/**
 * Retrieves and decrypts authentication values for multiple plugins
 * @returns A map where keys are pluginKeys and values are objects of authField:decryptedValue pairs
 */
export declare function getPluginAuthMap({ userId, pluginKeys, throwError, findPluginAuthsByKeys, }: GetPluginAuthMapParams): Promise<PluginAuthMap>;
//# sourceMappingURL=auth.d.ts.map