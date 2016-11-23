"use strict";
var getFromAST_1 = require('./getFromAST');
var cloneDeep = require('lodash.clonedeep');
function addFieldToSelectionSet(fieldName, selectionSet) {
    var fieldAst = {
        kind: 'Field',
        alias: null,
        name: {
            kind: 'Name',
            value: fieldName,
        },
    };
    if (selectionSet && selectionSet.selections) {
        var alreadyHasThisField_1 = false;
        selectionSet.selections.forEach(function (selection) {
            if (selection.kind === 'Field' && selection.name.value === fieldName) {
                alreadyHasThisField_1 = true;
            }
        });
        if (!alreadyHasThisField_1) {
            selectionSet.selections.push(fieldAst);
        }
    }
}
exports.addFieldToSelectionSet = addFieldToSelectionSet;
function addTypenameToSelectionSet(selectionSet) {
    return addFieldToSelectionSet('__typename', selectionSet);
}
exports.addTypenameToSelectionSet = addTypenameToSelectionSet;
function traverseSelectionSet(selectionSet, queryTransformers, isRoot) {
    if (isRoot === void 0) { isRoot = false; }
    if (selectionSet && selectionSet.selections) {
        queryTransformers.forEach(function (transformer) {
            if (!isRoot) {
                transformer(selectionSet);
            }
            selectionSet.selections.forEach(function (selection) {
                if (selection.kind === 'Field' || selection.kind === 'InlineFragment') {
                    traverseSelectionSet(selection.selectionSet, queryTransformers);
                }
            });
        });
    }
}
function applyTransformers(doc, queryTransformers) {
    getFromAST_1.checkDocument(doc);
    var docClone = cloneDeep(doc);
    docClone.definitions.forEach(function (definition) {
        if (definition.kind === 'OperationDefinition') {
            traverseSelectionSet(definition.selectionSet, queryTransformers, true);
        }
        else {
            traverseSelectionSet(definition.selectionSet, queryTransformers);
        }
    });
    return docClone;
}
exports.applyTransformers = applyTransformers;
//# sourceMappingURL=queryTransform.js.map