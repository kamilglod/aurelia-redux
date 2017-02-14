'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configure = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _immutable = require('immutable');

var store = void 0;

var configure = function configure(aurelia, storeInstance) {
  if (!storeInstance || (typeof storeInstance === 'undefined' ? 'undefined' : _typeof(storeInstance)) !== 'object') {
    console.error('You need to pass a store to aurelia-redux-immutable configurator function.');
    return;
  }

  store = aurelia.container.get(storeInstance);
};

var connect = function connect(viewModel, stateMapper) {
  stateMapper = stateMapper || function (state) {
    return state;
  };
  var state = store.getState();
  var dispatch = store.dispatch;
  var stateToShallowCompare = void 0;

  var inject = function inject(mappedState) {
    viewModel.state = mappedState;
    viewModel.dispatch = dispatch;

    stateToShallowCompare = (0, _immutable.fromJS)(viewModel.state);
  };
  var subscribe = function subscribe() {
    var newMappedState = stateMapper(store.getState());
    if (!stateToShallowCompare.equals((0, _immutable.fromJS)(newMappedState))) {
      inject(newMappedState);
    }
  };
  var unsubscribe = store.subscribe(subscribe);
  var originalDetached = viewModel.detached || function () {};
  viewModel.detached = function () {
    originalDetached();
    unsubscribe();
  };

  inject(stateMapper(state));
};

exports.default = connect;
exports.configure = configure;