"use strict";
var isArray = require('lodash.isarray');
var isNull = require('lodash.isnull');
var isUndefined = require('lodash.isundefined');
var isObject = require('lodash.isobject');
var assign = require('lodash.assign');
var getFromAST_1 = require('../queries/getFromAST');
var storeUtils_1 = require('./storeUtils');
var store_1 = require('./store');
var diffAgainstStore_1 = require('./diffAgainstStore');
var directives_1 = require('../queries/directives');
var errors_1 = require('../errors');
function writeFragmentToStore(_a) {
    var result = _a.result, fragment = _a.fragment, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, _c = _a.dataIdFromObject, dataIdFromObject = _c === void 0 ? null : _c;
    if (!fragment) {
        throw new Error('Must pass fragment.');
    }
    var parsedFragment = getFromAST_1.getFragmentDefinition(fragment);
    var selectionSet = parsedFragment.selectionSet;
    if (!result['id']) {
        throw new Error('Result must have id when writing fragment to store.');
    }
    return writeSelectionSetToStore({
        dataId: result['id'],
        result: result,
        selectionSet: selectionSet,
        store: store,
        variables: variables,
        dataIdFromObject: dataIdFromObject,
    });
}
exports.writeFragmentToStore = writeFragmentToStore;
function writeQueryToStore(_a) {
    var result = _a.result, query = _a.query, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, _c = _a.dataIdFromObject, dataIdFromObject = _c === void 0 ? null : _c, fragmentMap = _a.fragmentMap;
    var queryDefinition = getFromAST_1.getQueryDefinition(query);
    return writeSelectionSetToStore({
        dataId: 'ROOT_QUERY',
        result: result,
        selectionSet: queryDefinition.selectionSet,
        store: store,
        variables: variables,
        dataIdFromObject: dataIdFromObject,
        fragmentMap: fragmentMap,
    });
}
exports.writeQueryToStore = writeQueryToStore;
function writeSelectionSetToStore(_a) {
    var result = _a.result, dataId = _a.dataId, selectionSet = _a.selectionSet, _b = _a.store, store = _b === void 0 ? {} : _b, variables = _a.variables, dataIdFromObject = _a.dataIdFromObject, fragmentMap = _a.fragmentMap;
    if (!fragmentMap) {
        fragmentMap = {};
    }
    var fragmentErrors = {};
    selectionSet.selections.forEach(function (selection) {
        var included = directives_1.shouldInclude(selection, variables);
        if (storeUtils_1.isField(selection)) {
            var resultFieldKey = storeUtils_1.resultKeyNameFromField(selection);
            var value = result[resultFieldKey];
            if (isUndefined(value) && included) {
                throw new errors_1.ApolloError({
                    errorMessage: "Can't find field " + resultFieldKey + " on result object " + dataId + ".",
                    extraInfo: {
                        isFieldError: true,
                    },
                });
            }
            if (!isUndefined(value) && !included) {
                throw new errors_1.ApolloError({
                    errorMessage: "Found extra field " + resultFieldKey + " on result object " + dataId + ".",
                    extraInfo: {
                        isFieldError: true,
                    },
                });
            }
            if (!isUndefined(value)) {
                writeFieldToStore({
                    dataId: dataId,
                    value: value,
                    variables: variables,
                    store: store,
                    field: selection,
                    dataIdFromObject: dataIdFromObject,
                    fragmentMap: fragmentMap,
                });
            }
        }
        else if (storeUtils_1.isInlineFragment(selection)) {
            var typename = selection.typeCondition.name.value;
            if (included) {
                try {
                    writeSelectionSetToStore({
                        result: result,
                        selectionSet: selection.selectionSet,
                        store: store,
                        variables: variables,
                        dataId: dataId,
                        dataIdFromObject: dataIdFromObject,
                        fragmentMap: fragmentMap,
                    });
                    if (!fragmentErrors[typename]) {
                        fragmentErrors[typename] = null;
                    }
                }
                catch (e) {
                    if (e.extraInfo && e.extraInfo.isFieldError) {
                        fragmentErrors[typename] = e;
                    }
                    else {
                        throw e;
                    }
                }
            }
        }
        else {
            var fragment = fragmentMap[selection.name.value];
            if (!fragment) {
                throw new Error("No fragment named " + selection.name.value + ".");
            }
            var typename = fragment.typeCondition.name.value;
            if (included) {
                try {
                    writeSelectionSetToStore({
                        result: result,
                        selectionSet: fragment.selectionSet,
                        store: store,
                        variables: variables,
                        dataId: dataId,
                        dataIdFromObject: dataIdFromObject,
                        fragmentMap: fragmentMap,
                    });
                    if (!fragmentErrors[typename]) {
                        fragmentErrors[typename] = null;
                    }
                }
                catch (e) {
                    if (e.extraInfo && e.extraInfo.isFieldError) {
                        fragmentErrors[typename] = e;
                    }
                    else {
                        throw e;
                    }
                }
            }
        }
    });
    diffAgainstStore_1.handleFragmentErrors(fragmentErrors);
    return store;
}
exports.writeSelectionSetToStore = writeSelectionSetToStore;
function isGeneratedId(id) {
    return (id[0] === '$');
}
function mergeWithGenerated(generatedKey, realKey, cache) {
    var generated = cache[generatedKey];
    var real = cache[realKey];
    Object.keys(generated).forEach(function (key) {
        var value = generated[key];
        var realValue = real[key];
        if (store_1.isIdValue(value)
            && isGeneratedId(value.id)
            && store_1.isIdValue(realValue)) {
            mergeWithGenerated(value.id, realValue.id, cache);
        }
        delete cache[generatedKey];
        cache[realKey] = assign({}, generated, real);
    });
}
function writeFieldToStore(_a) {
    var field = _a.field, value = _a.value, variables = _a.variables, store = _a.store, dataId = _a.dataId, dataIdFromObject = _a.dataIdFromObject, fragmentMap = _a.fragmentMap;
    var storeValue;
    var storeFieldName = storeUtils_1.storeKeyNameFromField(field, variables);
    var shouldMerge = false;
    var generatedKey;
    if ((!field.selectionSet || isNull(value)) && !isObject(value)) {
        storeValue = value;
    }
    else if ((!field.selectionSet || isNull(value)) && isObject(value)) {
        storeValue = {
            type: 'json',
            json: value,
        };
    }
    else if (isArray(value)) {
        var thisIdList_1 = [];
        value.forEach(function (item, index) {
            if (isNull(item)) {
                thisIdList_1.push(null);
            }
            else {
                var itemDataId = dataId + "." + storeFieldName + "." + index;
                if (dataIdFromObject) {
                    var semanticId = dataIdFromObject(item);
                    if (semanticId) {
                        itemDataId = semanticId;
                    }
                }
                thisIdList_1.push(itemDataId);
                writeSelectionSetToStore({
                    dataId: itemDataId,
                    result: item,
                    store: store,
                    selectionSet: field.selectionSet,
                    variables: variables,
                    dataIdFromObject: dataIdFromObject,
                    fragmentMap: fragmentMap,
                });
            }
        });
        storeValue = thisIdList_1;
    }
    else {
        var valueDataId = dataId + "." + storeFieldName;
        var generated = true;
        if (!isGeneratedId(valueDataId)) {
            valueDataId = '$' + valueDataId;
        }
        if (dataIdFromObject) {
            var semanticId = dataIdFromObject(value);
            if (semanticId && isGeneratedId(semanticId)) {
                throw new Error('IDs returned by dataIdFromObject cannot begin with the "$" character.');
            }
            if (semanticId) {
                valueDataId = semanticId;
                generated = false;
            }
        }
        writeSelectionSetToStore({
            dataId: valueDataId,
            result: value,
            store: store,
            selectionSet: field.selectionSet,
            variables: variables,
            dataIdFromObject: dataIdFromObject,
            fragmentMap: fragmentMap,
        });
        storeValue = {
            type: 'id',
            id: valueDataId,
            generated: generated,
        };
        if (store[dataId] && store[dataId][storeFieldName] !== storeValue) {
            var escapedId = store[dataId][storeFieldName];
            if (store_1.isIdValue(storeValue) && storeValue.generated
                && store_1.isIdValue(escapedId) && !escapedId.generated) {
                throw new errors_1.ApolloError({
                    errorMessage: "Store error: the application attempted to write an object with no provided id" +
                        (" but the store already contains an id of " + escapedId.id + " for this object."),
                });
            }
            if (store_1.isIdValue(escapedId) && escapedId.generated) {
                generatedKey = escapedId.id;
                shouldMerge = true;
            }
        }
    }
    var newStoreObj = assign({}, store[dataId], (_b = {},
        _b[storeFieldName] = storeValue,
        _b
    ));
    if (shouldMerge) {
        mergeWithGenerated(generatedKey, storeValue.id, store);
    }
    if (!store[dataId] || storeValue !== store[dataId][storeFieldName]) {
        store[dataId] = newStoreObj;
    }
    var _b;
}
//# sourceMappingURL=writeToStore.js.map