import { NormalizedCache } from '../data/store';
export declare type OptimisticStore = {
    mutationId: string;
    data: NormalizedCache;
}[];
export declare function optimistic(previousState: any[], action: any, store: any, config: any): OptimisticStore;
