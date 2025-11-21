/**
 * Sanitizes LLM-generated chat titles by removing <think>...</think> reasoning blocks.
 *
 * This function strips out all reasoning blocks (with optional attributes and newlines)
 * and returns a clean title. If the result is empty, a fallback is returned.
 *
 * @param rawTitle - The raw LLM-generated title string, potentially containing <think> blocks.
 * @returns A sanitized title string, never empty (fallback used if needed).
 */
export declare function sanitizeTitle(rawTitle: string): string;
//# sourceMappingURL=sanitizeTitle.d.ts.map