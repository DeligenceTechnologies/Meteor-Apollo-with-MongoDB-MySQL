'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * A very simple class for logging errors
 */

var Logger = function () {
  function Logger(name, callback) {
    _classCallCheck(this, Logger);

    this.name = name;
    this.errors = [];
    this.callback = callback;
    // TODO: should assert that callback is a function
  }

  _createClass(Logger, [{
    key: 'log',
    value: function log(err) {
      this.errors.push(err);
      if (typeof this.callback === 'function') {
        this.callback(err);
      }
    }
  }, {
    key: 'printOneError',
    value: function printOneError(e) {
      return e.stack;
    }
  }, {
    key: 'printAllErrors',
    value: function printAllErrors() {
      var _this = this;

      return this.errors.reduce(function (agg, e) {
        return agg + '\n' + _this.printOneError(e);
      }, '');
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;