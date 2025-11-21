import { Keyv } from 'keyv';
import type { StoredDataNoRaw } from 'keyv';
import type { FlowState, FlowMetadata, FlowManagerOptions } from './types';
export declare class FlowStateManager<T = unknown> {
    private keyv;
    private ttl;
    private intervals;
    constructor(store: Keyv, options?: FlowManagerOptions);
    private setupCleanupHandlers;
    private getFlowKey;
    /**
     * Creates a new flow and waits for its completion
     */
    createFlow(flowId: string, type: string, metadata?: FlowMetadata, signal?: AbortSignal): Promise<T>;
    private monitorFlow;
    /**
     * Completes a flow successfully
     */
    completeFlow(flowId: string, type: string, result: T): Promise<boolean>;
    /**
     * Marks a flow as failed
     */
    failFlow(flowId: string, type: string, error: Error | string): Promise<boolean>;
    /**
     * Gets current flow state
     */
    getFlowState(flowId: string, type: string): Promise<StoredDataNoRaw<FlowState<T>> | null>;
    /**
     * Creates a new flow and waits for its completion, only executing the handler if no existing flow is found
     * @param flowId - The ID of the flow
     * @param type - The type of flow
     * @param handler - Async function to execute if no existing flow is found
     * @param signal - Optional AbortSignal to cancel the flow
     */
    createFlowWithHandler(flowId: string, type: string, handler: () => Promise<T>, signal?: AbortSignal): Promise<T>;
    /**
     * Deletes a flow state
     */
    deleteFlow(flowId: string, type: string): Promise<boolean>;
}
//# sourceMappingURL=manager.d.ts.map