/**
 * ESM-native object traversal utility
 * Simplified implementation focused on the forEach use case
 */
export interface TraverseContext {
    node: unknown;
    path: (string | number)[];
    parent: TraverseContext | undefined;
    key: string | number | undefined;
    isLeaf: boolean;
    notLeaf: boolean;
    isRoot: boolean;
    notRoot: boolean;
    level: number;
    circular: TraverseContext | null;
    update: (value: unknown, stopHere?: boolean) => void;
    remove: () => void;
}
type ForEachCallback = (this: TraverseContext, value: unknown) => void;
export default function traverse(obj: unknown): {
    forEach(callback: ForEachCallback): void;
};
export {};
