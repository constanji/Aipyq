import type { TFile } from './types/files';
import type { TMessage } from './types';
export type ParentMessage = TMessage & {
    children: TMessage[];
    depth: number;
};
export declare function buildTree({ messages, fileMap, }: {
    messages: (TMessage | undefined)[] | null;
    fileMap?: Record<string, TFile>;
}): TMessage[] | null;
