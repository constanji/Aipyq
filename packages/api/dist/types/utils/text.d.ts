/**
 * Processes text content by counting tokens and truncating if it exceeds the specified limit.
 * @param text - The text content to process
 * @param tokenLimit - The maximum number of tokens allowed
 * @param tokenCountFn - Function to count tokens
 * @returns Promise resolving to object with processed text, token count, and truncation status
 */
export declare function processTextWithTokenLimit({ text, tokenLimit, tokenCountFn, }: {
    text: string;
    tokenLimit: number;
    tokenCountFn: (text: string) => number;
}): Promise<{
    text: string;
    tokenCount: number;
    wasTruncated: boolean;
}>;
//# sourceMappingURL=text.d.ts.map