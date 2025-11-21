import { librechat } from 'librechat-data-provider';
import type { DynamicSettingProps } from 'librechat-data-provider';
type LibreChatKeys = keyof typeof librechat;
type LibreChatParams = {
    modelOptions: Omit<NonNullable<DynamicSettingProps['conversation']>, LibreChatKeys>;
    resendFiles: boolean;
    promptPrefix?: string | null;
    maxContextTokens?: number;
    fileTokenLimit?: number;
    modelLabel?: string | null;
};
/**
 * Separates LibreChat-specific parameters from model options
 * @param options - The combined options object
 */
export declare function extractLibreChatParams(options?: DynamicSettingProps['conversation']): LibreChatParams;
export {};
//# sourceMappingURL=llm.d.ts.map