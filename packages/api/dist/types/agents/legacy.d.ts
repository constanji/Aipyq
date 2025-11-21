import type { AgentToolResources } from 'librechat-data-provider';
/**
 * Converts OCR tool resource to context tool resource in place.
 * This modifies the input object directly (used for updateData in the handler).
 *
 * @param data - Object containing tool_resources and/or tools to convert
 * @returns void - modifies the input object directly
 */
export declare function convertOcrToContextInPlace(data: {
    tool_resources?: AgentToolResources;
    tools?: string[];
}): void;
/**
 * Merges tool resources from existing agent with incoming update data,
 * converting OCR to context and handling deduplication.
 * Used when existing agent has OCR that needs to be converted and merged with updateData.
 *
 * @param existingAgent - The existing agent data
 * @param updateData - The incoming update data
 * @returns Object with merged tool_resources and tools
 */
export declare function mergeAgentOcrConversion(existingAgent: {
    tool_resources?: AgentToolResources;
    tools?: string[];
}, updateData: {
    tool_resources?: AgentToolResources;
    tools?: string[];
}): {
    tool_resources?: AgentToolResources;
    tools?: string[];
};
//# sourceMappingURL=legacy.d.ts.map