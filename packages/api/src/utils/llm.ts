import { aipyq } from 'aipyq-data-provider';
import type { DynamicSettingProps } from 'aipyq-data-provider';

type AipyqKeys = keyof typeof aipyq;

type AipyqParams = {
  modelOptions: Omit<NonNullable<DynamicSettingProps['conversation']>, AipyqKeys>;
  resendFiles: boolean;
  promptPrefix?: string | null;
  maxContextTokens?: number;
  fileTokenLimit?: number;
  modelLabel?: string | null;
};

/**
 * Separates Aipyq-specific parameters from model options
 * @param options - The combined options object
 */
export function extractAipyqParams(
  options?: DynamicSettingProps['conversation'],
): AipyqParams {
  if (!options) {
    return {
      modelOptions: {} as Omit<NonNullable<DynamicSettingProps['conversation']>, AipyqKeys>,
      resendFiles: aipyq.resendFiles.default as boolean,
    };
  }

  const modelOptions = { ...options };

  const resendFiles =
    (delete modelOptions.resendFiles, options.resendFiles) ??
    (aipyq.resendFiles.default as boolean);
  const promptPrefix = (delete modelOptions.promptPrefix, options.promptPrefix);
  const maxContextTokens = (delete modelOptions.maxContextTokens, options.maxContextTokens);
  const fileTokenLimit = (delete modelOptions.fileTokenLimit, options.fileTokenLimit);
  const modelLabel = (delete modelOptions.modelLabel, options.modelLabel);

  return {
    modelOptions: modelOptions as Omit<
      NonNullable<DynamicSettingProps['conversation']>,
      AipyqKeys
    >,
    maxContextTokens,
    fileTokenLimit,
    promptPrefix,
    resendFiles,
    modelLabel,
  };
}
