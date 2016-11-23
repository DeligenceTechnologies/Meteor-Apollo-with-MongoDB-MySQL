"use strict";
var apollo_client_1 = require('apollo-client');
var invariant = require('invariant');
(function (DocumentType) {
    DocumentType[DocumentType["Query"] = 0] = "Query";
    DocumentType[DocumentType["Mutation"] = 1] = "Mutation";
    DocumentType[DocumentType["Subscription"] = 2] = "Subscription";
})(exports.DocumentType || (exports.DocumentType = {}));
var DocumentType = exports.DocumentType;
function parser(document) {
    var fragments, queries, mutations, subscriptions, variables, definitions, type, name;
    invariant((!!document || !!document.kind), "Argument of " + document + " passed to parser was not a valid GraphQL Document. You may need to use 'graphql-tag' or another method to convert your operation into a document");
    fragments = document.definitions.filter(function (x) { return x.kind === 'FragmentDefinition'; });
    fragments = apollo_client_1.createFragment({
        kind: 'Document',
        definitions: fragments.slice(),
    });
    queries = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'query'; });
    mutations = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'mutation'; });
    subscriptions = document.definitions.filter(function (x) { return x.kind === 'OperationDefinition' && x.operation === 'subscription'; });
    if (fragments.length && (!queries.length || !mutations.length || !subscriptions.length)) {
        invariant(true, "Passing only a fragment to 'graphql' is not yet supported. You must include a query, subscription or mutation as well");
    }
    if (queries.length && mutations.length && mutations.length) {
        invariant(((queries.length + mutations.length + mutations.length) > 1), "react-apollo only supports a query, subscription, or a mutation per HOC. " + document + " had " + queries.length + " queries, " + subscriptions.length + " subscriptions and " + mutations.length + " muations. You can use 'compose' to join multiple operation types to a component");
    }
    type = queries.length ? DocumentType.Query : DocumentType.Mutation;
    if (!queries.length && !mutations.length)
        type = DocumentType.Subscription;
    definitions = queries.length ? queries : mutations;
    if (!queries.length && !mutations.length)
        definitions = subscriptions;
    if (definitions.length !== 1) {
        invariant((definitions.length !== 1), "react-apollo only supports one defintion per HOC. " + document + " had " + definitions.length + " definitions. You can use 'compose' to join multiple operation types to a component");
    }
    variables = definitions[0].variableDefinitions || [];
    var hasName = definitions[0].name && definitions[0].name.kind === 'Name';
    name = hasName ? definitions[0].name.value : 'data';
    fragments = fragments.length ? fragments : [];
    return { name: name, type: type, variables: variables, fragments: fragments };
}
exports.parser = parser;
//# sourceMappingURL=parser.js.map