import { NormalizedCache } from './data/store';
import { QueryStore } from './queries/store';
import { MutationStore } from './mutations/store';
import { OptimisticStore } from './optimistic-data/store';
import { ApolloAction } from './actions';
import { IdGetter } from './data/extensions';
import { MutationBehaviorReducerMap } from './data/mutationResults';
export interface Store {
    data: NormalizedCache;
    queries: QueryStore;
    mutations: MutationStore;
    optimistic: OptimisticStore;
}
export interface ApolloStore {
    dispatch: (action: ApolloAction) => void;
    getState: () => any;
}
export declare function createApolloReducer(config: ApolloReducerConfig): Function;
export declare function createApolloStore({reduxRootKey, initialState, config, reportCrashes}?: {
    reduxRootKey?: string;
    initialState?: any;
    config?: ApolloReducerConfig;
    reportCrashes?: boolean;
}): ApolloStore;
export interface ApolloReducerConfig {
    dataIdFromObject?: IdGetter;
    mutationBehaviorReducers?: MutationBehaviorReducerMap;
}
export declare function getDataWithOptimisticResults(store: Store): NormalizedCache;
