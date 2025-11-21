import { AnthropicClientOptions } from '@librechat/agents';
/**
 * @param {string} modelName
 * @returns {boolean}
 */
declare function checkPromptCacheSupport(modelName: string): boolean;
/**
 * Gets the appropriate headers for Claude models with cache control
 * @param {string} model The model name
 * @param {boolean} supportsCacheControl Whether the model supports cache control
 * @returns {AnthropicClientOptions['extendedOptions']['defaultHeaders']|undefined} The headers object or undefined if not applicable
 */
declare function getClaudeHeaders(model: string, supportsCacheControl: boolean): Record<string, string> | undefined;
/**
 * Configures reasoning-related options for Claude models
 * @param {AnthropicClientOptions & { max_tokens?: number }} anthropicInput The request options object
 * @param {Object} extendedOptions Additional client configuration options
 * @param {boolean} extendedOptions.thinking Whether thinking is enabled in client config
 * @param {number|null} extendedOptions.thinkingBudget The token budget for thinking
 * @returns {Object} Updated request options
 */
declare function configureReasoning(anthropicInput: AnthropicClientOptions & {
    max_tokens?: number;
}, extendedOptions?: {
    thinking?: boolean;
    thinkingBudget?: number | null;
}): AnthropicClientOptions & {
    max_tokens?: number;
};
export { checkPromptCacheSupport, getClaudeHeaders, configureReasoning };
//# sourceMappingURL=helpers.d.ts.map