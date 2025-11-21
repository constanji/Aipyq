import type { GraphEdge } from '@librechat/agents';
/**
 * Helper function to create sequential chain edges with buffer string prompts
 *
 * @deprecated Agent Chain helper
 * @param agentIds - Array of agent IDs in order of execution
 * @param promptTemplate - Optional prompt template string; defaults to a predefined template if not provided
 * @returns Array of edges configured for sequential chain with buffer prompts
 */
export declare function createSequentialChainEdges(agentIds: string[], promptTemplate?: string): Promise<GraphEdge[]>;
//# sourceMappingURL=chain.d.ts.map