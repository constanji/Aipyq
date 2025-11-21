import type { TPreset, TPlugin } from 'librechat-data-provider';
import { EModelEndpoint } from 'librechat-data-provider';

type TEndpoints = Array<string | EModelEndpoint>;

export const getPresetTitle = (preset: TPreset, mention?: boolean) => {
  const {
    endpoint,
    title: presetTitle,
    model,
    tools,
    promptPrefix,
    chatGptLabel,
    modelLabel,
  } = preset;
  const modelInfo = model ?? '';
  let title = '';
  let label = '';

  if (modelLabel) {
    label = modelLabel;
  }

  if (
    label &&
    presetTitle != null &&
    presetTitle &&
    label.toLowerCase().includes(presetTitle.toLowerCase())
  ) {
    title = label + ': ';
    label = '';
  } else if (presetTitle != null && presetTitle && presetTitle.trim() !== 'New Chat') {
    title = presetTitle + ': ';
  }

  if (mention === true) {
    return `${modelInfo}${label ? ` | ${label}` : ''}${
      promptPrefix != null && promptPrefix ? ` | ${promptPrefix}` : ''
    }${
      tools
        ? ` | ${tools
            .map((tool: TPlugin | string) => {
              if (typeof tool === 'string') {
                return tool;
              }
              return tool.pluginKey;
            })
            .join(', ')}`
        : ''
    }`;
  }

  return `${title}${modelInfo}${label ? ` (${label})` : ''}`.trim();
};

