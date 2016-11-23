"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ApolloError = (function (_super) {
    __extends(ApolloError, _super);
    function ApolloError(_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        _super.call(this, errorMessage);
        this.graphQLErrors = graphQLErrors;
        this.networkError = networkError;
        this.stack = new Error().stack;
        if (!errorMessage) {
            this.generateErrorMessage();
        }
        else {
            this.message = errorMessage;
        }
        this.extraInfo = extraInfo;
    }
    ApolloError.prototype.generateErrorMessage = function () {
        if (typeof this.message !== 'undefined' &&
            this.message !== '') {
            return;
        }
        var message = '';
        if (Array.isArray(this.graphQLErrors) && this.graphQLErrors.length !== 0) {
            this.graphQLErrors.forEach(function (graphQLError) {
                message += 'GraphQL error: ' + graphQLError.message + '\n';
            });
        }
        if (this.networkError) {
            message += 'Network error: ' + this.networkError.message + '\n';
        }
        message = message.replace(/\n$/, '');
        this.message = message;
    };
    return ApolloError;
}(Error));
exports.ApolloError = ApolloError;
//# sourceMappingURL=errors.js.map