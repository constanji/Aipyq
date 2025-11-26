import type { AuthType } from 'aipyq-data-provider';

export type ApiKeyFormData = {
  apiKey: string;
  authType?: string | AuthType;
};
