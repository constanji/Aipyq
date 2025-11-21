import type { Tiktoken, TiktokenModel, TiktokenEncoding } from 'tiktoken';
declare class Tokenizer {
    tokenizersCache: Record<string, Tiktoken>;
    tokenizerCallsCount: number;
    private options?;
    constructor();
    getTokenizer(encoding: TiktokenModel | TiktokenEncoding, isModelName?: boolean, extendSpecialTokens?: Record<string, number>): Tiktoken;
    freeAndResetAllEncoders(): void;
    resetTokenizersIfNecessary(): void;
    getTokenCount(text: string, encoding?: TiktokenModel | TiktokenEncoding): number;
}
declare const TokenizerSingleton: Tokenizer;
export default TokenizerSingleton;
//# sourceMappingURL=tokenizer.d.ts.map