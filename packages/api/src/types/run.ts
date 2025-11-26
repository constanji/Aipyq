import type { Providers, ClientOptions } from '@aipyq/agents';
import type { AgentModelParameters } from 'aipyq-data-provider';
import type { OpenAIConfiguration } from './openai';

export type RunLLMConfig = {
  provider: Providers;
  streaming: boolean;
  streamUsage: boolean;
  usage?: boolean;
  configuration?: OpenAIConfiguration;
} & AgentModelParameters &
  ClientOptions;
