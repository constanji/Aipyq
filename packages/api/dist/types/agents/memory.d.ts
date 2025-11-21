/** Memories */
import { z } from 'zod';
import { Tools } from 'librechat-data-provider';
import type { StreamEventData, ToolEndCallback, EventHandler, LLMConfig } from '@librechat/agents';
import type { TAttachment, MemoryArtifact } from 'librechat-data-provider';
import type { ObjectId, MemoryMethods } from '@librechat/data-schemas';
import type { BaseMessage } from '@langchain/core/messages';
import type { Response as ServerResponse } from 'express';
type RequiredMemoryMethods = Pick<MemoryMethods, 'setMemory' | 'deleteMemory' | 'getFormattedMemories'>;
export interface MemoryConfig {
    validKeys?: string[];
    instructions?: string;
    llmConfig?: Partial<LLMConfig>;
    tokenLimit?: number;
}
export declare const memoryInstructions = "The system automatically stores important user information and can update or delete memories based on user requests, enabling dynamic memory management.";
/**
 * Creates a memory tool instance with user context
 */
export declare const createMemoryTool: ({ userId, setMemory, validKeys, tokenLimit, totalTokens, }: {
    userId: string | ObjectId;
    setMemory: MemoryMethods['setMemory'];
    validKeys?: string[] | undefined;
    tokenLimit?: number | undefined;
    totalTokens?: number | undefined;
}) => import("@langchain/core/tools").DynamicStructuredTool<z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    key: string;
}, {
    value: string;
    key: string;
}>, {
    value: string;
    key: string;
}, {
    value: string;
    key: string;
}, (string | undefined)[] | (string | Record<Tools.memory, MemoryArtifact>)[]>;
export declare class BasicToolEndHandler implements EventHandler {
    private callback?;
    constructor(callback?: ToolEndCallback);
    handle(event: string, data: StreamEventData | undefined, metadata?: Record<string, unknown>): void;
}
export declare function processMemory({ res, userId, setMemory, deleteMemory, messages, memory, messageId, conversationId, validKeys, instructions, llmConfig, tokenLimit, totalTokens, }: {
    res: ServerResponse;
    setMemory: MemoryMethods['setMemory'];
    deleteMemory: MemoryMethods['deleteMemory'];
    userId: string | ObjectId;
    memory: string;
    messageId: string;
    conversationId: string;
    messages: BaseMessage[];
    validKeys?: string[];
    instructions: string;
    tokenLimit?: number;
    totalTokens?: number;
    llmConfig?: Partial<LLMConfig>;
}): Promise<(TAttachment | null)[] | undefined>;
export declare function createMemoryProcessor({ res, userId, messageId, memoryMethods, conversationId, config, }: {
    res: ServerResponse;
    messageId: string;
    conversationId: string;
    userId: string | ObjectId;
    memoryMethods: RequiredMemoryMethods;
    config?: MemoryConfig;
}): Promise<[string, (messages: BaseMessage[]) => Promise<(TAttachment | null)[] | undefined>]>;
/**
 * Creates a memory callback for handling memory artifacts
 * @param params - The parameters object
 * @param params.res - The server response object
 * @param params.artifactPromises - Array to collect artifact promises
 * @returns The memory callback function
 */
export declare function createMemoryCallback({ res, artifactPromises, }: {
    res: ServerResponse;
    artifactPromises: Promise<Partial<TAttachment> | null>[];
}): ToolEndCallback;
export {};
//# sourceMappingURL=memory.d.ts.map