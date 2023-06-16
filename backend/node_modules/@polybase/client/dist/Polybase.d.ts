import { Collection } from './Collection';
import { Sender, Signer } from './types';
export interface PolybaseConfig {
    baseURL: string;
    clientId: string;
    defaultNamespace?: string;
    sender: Sender;
    signer?: Signer;
}
export declare class Polybase {
    private config;
    private client;
    private collections;
    constructor(config?: Partial<PolybaseConfig>);
    collection<T = any>(path: string): Collection<T>;
    private getResolvedPath;
    private setCollectionCode;
    applySchema: (schema: string, namespace?: string) => Promise<Collection<any>[]>;
    signer: (fn: Signer) => void;
}
//# sourceMappingURL=Polybase.d.ts.map