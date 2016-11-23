"use strict";
var writeToStore_1 = require('./writeToStore');
var getFromAST_1 = require('../queries/getFromAST');
var assign = require('lodash.assign');
function replaceQueryResults(state, _a, config) {
    var queryVariables = _a.queryVariables, querySelectionSet = _a.querySelectionSet, queryFragments = _a.queryFragments, newResult = _a.newResult;
    var clonedState = assign({}, state);
    return writeToStore_1.writeSelectionSetToStore({
        result: newResult,
        dataId: 'ROOT_QUERY',
        selectionSet: querySelectionSet,
        variables: queryVariables,
        store: clonedState,
        dataIdFromObject: config.dataIdFromObject,
        fragmentMap: getFromAST_1.createFragmentMap(queryFragments),
    });
}
exports.replaceQueryResults = replaceQueryResults;
//# sourceMappingURL=replaceQueryResults.js.map