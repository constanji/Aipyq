import type { PluginAuthMethods } from '@librechat/data-schemas';
import type { GenericTool } from '@librechat/agents';
export declare function getUserMCPAuthMap({ userId, tools, servers, toolInstances, findPluginAuthsByKeys, }: {
    userId: string;
    tools?: (string | undefined)[];
    servers?: (string | undefined)[];
    toolInstances?: (GenericTool | null)[];
    findPluginAuthsByKeys: PluginAuthMethods['findPluginAuthsByKeys'];
}): Promise<Record<string, Record<string, string>>>;
//# sourceMappingURL=auth.d.ts.map