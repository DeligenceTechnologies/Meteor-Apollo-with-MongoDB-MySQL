"use strict";
var actions_1 = require('../actions');
var assign = require('lodash.assign');
function mutations(previousState, action) {
    if (previousState === void 0) { previousState = {}; }
    if (actions_1.isMutationInitAction(action)) {
        var newState = assign({}, previousState);
        newState[action.mutationId] = {
            mutationString: action.mutationString,
            mutation: action.mutation,
            variables: action.variables,
            loading: true,
            error: null,
            fragmentMap: action.fragmentMap,
        };
        return newState;
    }
    else if (actions_1.isMutationResultAction(action)) {
        var newState = assign({}, previousState);
        newState[action.mutationId] = assign({}, previousState[action.mutationId], {
            loading: false,
            error: null,
        });
        return newState;
    }
    else if (actions_1.isMutationErrorAction(action)) {
        var newState = assign({}, previousState);
        newState[action.mutationId] = assign({}, previousState[action.mutationId], {
            loading: false,
            error: action.error,
        });
    }
    else if (actions_1.isStoreResetAction(action)) {
        return {};
    }
    return previousState;
}
exports.mutations = mutations;
//# sourceMappingURL=store.js.map