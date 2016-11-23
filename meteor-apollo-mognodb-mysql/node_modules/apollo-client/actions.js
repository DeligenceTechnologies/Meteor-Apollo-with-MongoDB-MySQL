"use strict";
function isQueryResultAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT';
}
exports.isQueryResultAction = isQueryResultAction;
function isQueryErrorAction(action) {
    return action.type === 'APOLLO_QUERY_ERROR';
}
exports.isQueryErrorAction = isQueryErrorAction;
function isQueryInitAction(action) {
    return action.type === 'APOLLO_QUERY_INIT';
}
exports.isQueryInitAction = isQueryInitAction;
function isQueryResultClientAction(action) {
    return action.type === 'APOLLO_QUERY_RESULT_CLIENT';
}
exports.isQueryResultClientAction = isQueryResultClientAction;
function isQueryStopAction(action) {
    return action.type === 'APOLLO_QUERY_STOP';
}
exports.isQueryStopAction = isQueryStopAction;
function isMutationInitAction(action) {
    return action.type === 'APOLLO_MUTATION_INIT';
}
exports.isMutationInitAction = isMutationInitAction;
function isMutationResultAction(action) {
    return action.type === 'APOLLO_MUTATION_RESULT';
}
exports.isMutationResultAction = isMutationResultAction;
;
function isMutationErrorAction(action) {
    return action.type === 'APOLLO_MUTATION_ERROR';
}
exports.isMutationErrorAction = isMutationErrorAction;
function isUpdateQueryResultAction(action) {
    return action.type === 'APOLLO_UPDATE_QUERY_RESULT';
}
exports.isUpdateQueryResultAction = isUpdateQueryResultAction;
function isStoreResetAction(action) {
    return action.type === 'APOLLO_STORE_RESET';
}
exports.isStoreResetAction = isStoreResetAction;
//# sourceMappingURL=actions.js.map