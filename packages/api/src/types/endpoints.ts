import type { TConfig } from 'aipyq-data-provider';

export type TCustomEndpointsConfig = Partial<{ [key: string]: Omit<TConfig, 'order'> }>;
