import * as graphql from 'graphql';
interface ApolloOptions {
    schema: graphql.GraphQLSchema;
    formatError?: Function;
    rootValue?: any;
    context?: any;
    logFunction?: Function;
    formatParams?: Function;
    validationRules?: Array<graphql.ValidationRule>;
    formatResponse?: Function;
}
export default ApolloOptions;
