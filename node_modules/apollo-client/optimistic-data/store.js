"use strict";
var actions_1 = require('../actions');
var store_1 = require('../data/store');
var store_2 = require('../store');
var assign = require('lodash.assign');
var pick = require('lodash.pick');
var optimisticDefaultState = [];
function optimistic(previousState, action, store, config) {
    if (previousState === void 0) { previousState = optimisticDefaultState; }
    if (actions_1.isMutationInitAction(action) && action.optimisticResponse) {
        var fakeMutationResultAction = {
            type: 'APOLLO_MUTATION_RESULT',
            result: { data: action.optimisticResponse },
            mutationId: action.mutationId,
            resultBehaviors: action.resultBehaviors,
        };
        var fakeStore = assign({}, store, { optimistic: previousState });
        var optimisticData_1 = store_2.getDataWithOptimisticResults(fakeStore);
        var fakeDataResultState_1 = store_1.data(optimisticData_1, fakeMutationResultAction, store.queries, store.mutations, config);
        var changedKeys = Object.keys(fakeDataResultState_1).filter(function (key) { return optimisticData_1[key] !== fakeDataResultState_1[key]; });
        var patch = pick(fakeDataResultState_1, changedKeys);
        var optimisticState = {
            data: patch,
            mutationId: action.mutationId,
        };
        var newState = previousState.concat([optimisticState]);
        return newState;
    }
    else if ((actions_1.isMutationErrorAction(action) || actions_1.isMutationResultAction(action))
        && previousState.some(function (change) { return change.mutationId === action.mutationId; })) {
        var newState = previousState.filter(function (change) { return change.mutationId !== action.mutationId; });
        return newState;
    }
    return previousState;
}
exports.optimistic = optimistic;
//# sourceMappingURL=store.js.map