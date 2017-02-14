'use strict';

System.register(['immutable'], function (_export, _context) {
  "use strict";

  var fromJS, _typeof, store, configure, connect;

  return {
    setters: [function (_immutable) {
      fromJS = _immutable.fromJS;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      store = void 0;

      _export('configure', configure = function configure(aurelia, storeInstance) {
        if (!storeInstance || (typeof storeInstance === 'undefined' ? 'undefined' : _typeof(storeInstance)) !== 'object') {
          console.error('You need to pass a store to aurelia-redux-immutable configurator function.');
          return;
        }

        store = aurelia.container.get(storeInstance);
      });

      connect = function connect(viewModel, stateMapper) {
        stateMapper = stateMapper || function (state) {
          return state;
        };
        var state = store.getState();
        var dispatch = store.dispatch;
        var stateToShallowCompare = void 0;

        var inject = function inject(mappedState) {
          viewModel.state = mappedState;
          viewModel.dispatch = dispatch;

          stateToShallowCompare = fromJS(viewModel.state);
        };
        var subscribe = function subscribe() {
          var newMappedState = stateMapper(store.getState());
          if (!stateToShallowCompare.equals(fromJS(newMappedState))) {
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

      _export('default', connect);

      _export('configure', configure);
    }
  };
});