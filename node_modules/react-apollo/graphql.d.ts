/// <reference types="chai" />
/// <reference types="typed-graphql" />
import { MutationBehavior, MutationQueryReducersMap } from 'apollo-client';
import { Document, FragmentDefinition } from 'graphql';
export interface MutationOptions {
    variables?: Object;
    resultBehaviors?: MutationBehavior[];
    fragments?: FragmentDefinition[] | FragmentDefinition[][];
    optimisticResponse?: Object;
    updateQueries?: MutationQueryReducersMap;
    forceFetch?: boolean;
}
export interface QueryOptions {
    ssr?: boolean;
    variables?: {
        [key: string]: any;
    };
    forceFetch?: boolean;
    returnPartialData?: boolean;
    noFetch?: boolean;
    pollInterval?: number;
    fragments?: FragmentDefinition[] | FragmentDefinition[][];
    skip?: boolean;
}
export declare function withApollo(WrappedComponent: any): any;
export interface OperationOption {
    options?: Object | ((props: any) => QueryOptions | MutationOptions);
    props?: (props: any) => any;
    skip?: boolean | ((props: any) => boolean);
    name?: string;
    withRef?: boolean;
}
export default function graphql(document: Document, operationOptions?: OperationOption): (WrappedComponent: any) => any;
