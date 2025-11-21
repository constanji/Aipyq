import { Run, Providers } from '@librechat/agents';
import type { GenericTool, RunConfig, IState } from '@librechat/agents';
import type { Agent } from 'librechat-data-provider';
import type * as t from '~/types';
export declare function getReasoningKey(provider: Providers, llmConfig: t.RunLLMConfig, agentEndpoint?: string | null): 'reasoning_content' | 'reasoning';
type RunAgent = Omit<Agent, 'tools'> & {
    tools?: GenericTool[];
    maxContextTokens?: number;
    useLegacyContent?: boolean;
    toolContextMap?: Record<string, string>;
};
/**
 * Creates a new Run instance with custom handlers and configuration.
 *
 * @param options - The options for creating the Run instance.
 * @param options.agents - The agents for this run.
 * @param options.signal - The signal for this run.
 * @param options.runId - Optional run ID; otherwise, a new run ID will be generated.
 * @param options.customHandlers - Custom event handlers.
 * @param options.streaming - Whether to use streaming.
 * @param options.streamUsage - Whether to stream usage information.
 * @returns {Promise<Run<IState>>} A promise that resolves to a new Run instance.
 */
export declare function createRun({ runId, signal, agents, requestBody, tokenCounter, customHandlers, indexTokenCountMap, streaming, streamUsage, }: {
    agents: RunAgent[];
    signal: AbortSignal;
    runId?: string;
    streaming?: boolean;
    streamUsage?: boolean;
    requestBody?: t.RequestBody;
} & Pick<RunConfig, 'tokenCounter' | 'customHandlers' | 'indexTokenCountMap'>): Promise<Run<IState>>;
export {};
//# sourceMappingURL=run.d.ts.map