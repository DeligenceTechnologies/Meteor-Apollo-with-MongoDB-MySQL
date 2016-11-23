"use strict";
var actions_1 = require('../actions');
var writeToStore_1 = require('./writeToStore');
var assign = require('lodash.assign');
var isObject = require('lodash.isobject');
var storeUtils_1 = require('./storeUtils');
var mutationResults_1 = require('./mutationResults');
var replaceQueryResults_1 = require('./replaceQueryResults');
function isIdValue(idObject) {
    return (isObject(idObject) && idObject.type === 'id');
}
exports.isIdValue = isIdValue;
function isJsonValue(jsonObject) {
    return (isObject(jsonObject) && jsonObject.type === 'json');
}
exports.isJsonValue = isJsonValue;
function data(previousState, action, queries, mutations, config) {
    if (previousState === void 0) { previousState = {}; }
    var constAction = action;
    if (actions_1.isQueryResultAction(action)) {
        if (!queries[action.queryId]) {
            return previousState;
        }
        if (action.requestId < queries[action.queryId].lastRequestId) {
            return previousState;
        }
        if (!storeUtils_1.graphQLResultHasError(action.result)) {
            var queryStoreValue = queries[action.queryId];
            var clonedState = assign({}, previousState);
            var newState = writeToStore_1.writeSelectionSetToStore({
                result: action.result.data,
                dataId: queryStoreValue.minimizedQuery.id,
                selectionSet: queryStoreValue.minimizedQuery.selectionSet,
                variables: queryStoreValue.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMap: queryStoreValue.fragmentMap,
            });
            return newState;
        }
    }
    else if (actions_1.isMutationResultAction(constAction)) {
        if (!constAction.result.errors) {
            var queryStoreValue_1 = mutations[constAction.mutationId];
            var clonedState = assign({}, previousState);
            var newState_1 = writeToStore_1.writeSelectionSetToStore({
                result: constAction.result.data,
                dataId: queryStoreValue_1.mutation.id,
                selectionSet: queryStoreValue_1.mutation.selectionSet,
                variables: queryStoreValue_1.variables,
                store: clonedState,
                dataIdFromObject: config.dataIdFromObject,
                fragmentMap: queryStoreValue_1.fragmentMap,
            });
            if (constAction.resultBehaviors) {
                constAction.resultBehaviors.forEach(function (behavior) {
                    var args = {
                        behavior: behavior,
                        result: constAction.result,
                        variables: queryStoreValue_1.variables,
                        fragmentMap: queryStoreValue_1.fragmentMap,
                        selectionSet: queryStoreValue_1.mutation.selectionSet,
                        config: config,
                    };
                    if (mutationResults_1.defaultMutationBehaviorReducers[behavior.type]) {
                        newState_1 = mutationResults_1.defaultMutationBehaviorReducers[behavior.type](newState_1, args);
                    }
                    else if (config.mutationBehaviorReducers[behavior.type]) {
                        newState_1 = config.mutationBehaviorReducers[behavior.type](newState_1, args);
                    }
                    else {
                        throw new Error("No mutation result reducer defined for type " + behavior.type);
                    }
                });
            }
            return newState_1;
        }
    }
    else if (actions_1.isUpdateQueryResultAction(constAction)) {
        return replaceQueryResults_1.replaceQueryResults(previousState, constAction, config);
    }
    else if (actions_1.isStoreResetAction(action)) {
        return {};
    }
    return previousState;
}
exports.data = data;
//# sourceMappingURL=store.js.map