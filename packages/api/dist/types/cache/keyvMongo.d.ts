/// <reference types="node" />
import { EventEmitter } from 'events';
import type { ReadPreference } from 'mongodb';
interface KeyvMongoOptions {
    url?: string;
    collection?: string;
    useGridFS?: boolean;
    readPreference?: ReadPreference;
}
declare class KeyvMongoCustom extends EventEmitter {
    private opts;
    ttlSupport: boolean;
    namespace?: string;
    constructor(options?: KeyvMongoOptions);
    private _getClient;
    get(key: string): Promise<unknown>;
    getMany(keys: string[]): Promise<unknown[]>;
    set(key: string, value: string, ttl?: number): Promise<unknown>;
    delete(key: string): Promise<boolean>;
    deleteMany(keys: string[]): Promise<boolean>;
    clear(): Promise<void>;
    has(key: string): Promise<boolean>;
    disconnect(): Promise<boolean>;
    private isGridFSClient;
}
declare const keyvMongo: KeyvMongoCustom;
export default keyvMongo;
//# sourceMappingURL=keyvMongo.d.ts.map