import { QueryManager, QueryListener } from './QueryManager';
import { ObservableQuery } from './ObservableQuery';
import { WatchQueryOptions } from './watchQueryOptions';
export declare class QueryScheduler {
    inFlightQueries: {
        [queryId: string]: WatchQueryOptions;
    };
    registeredQueries: {
        [queryId: string]: WatchQueryOptions;
    };
    intervalQueries: {
        [interval: number]: string[];
    };
    queryManager: QueryManager;
    private pollingTimers;
    constructor({queryManager}: {
        queryManager: QueryManager;
    });
    checkInFlight(queryId: string): boolean;
    fetchQuery(queryId: string, options: WatchQueryOptions): Promise<{}>;
    startPollingQuery(options: WatchQueryOptions, queryId?: string, firstFetch?: boolean, listener?: QueryListener): string;
    stopPollingQuery(queryId: string): void;
    fetchQueriesOnInterval(interval: number): void;
    addQueryOnInterval(queryId: string, queryOptions: WatchQueryOptions): void;
    registerPollingQuery(queryOptions: WatchQueryOptions): ObservableQuery;
    private addInFlight(queryId, options);
    private removeInFlight(queryId);
}
