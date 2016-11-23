/// <reference types="react" />
import * as React from 'react';
import { Component } from 'react';
import { Store } from 'redux';
import ApolloClient from 'apollo-client';
export interface ProviderProps {
    store?: Store<any>;
    immutable?: boolean;
    client: ApolloClient;
}
export default class ApolloProvider extends Component<ProviderProps, any> {
    static propTypes: {
        store: React.Requireable<any>;
        client: React.Validator<any>;
        immutable: React.Requireable<any>;
        children: React.Validator<any>;
    };
    static childContextTypes: {
        store: React.Validator<any>;
        client: React.Validator<any>;
    };
    store: Store<any>;
    client: ApolloClient;
    constructor(props: any, context: any);
    getChildContext(): {
        store: Store<any>;
        client: ApolloClient;
    };
    render(): React.ReactElement<any>;
}
