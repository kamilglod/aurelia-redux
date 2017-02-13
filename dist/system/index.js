'use strict';

System.register(['aurelia-dependency-injection', 'immutable'], function (_export, _context) {
  "use strict";

  var Container, fromJS, _typeof, AURELIA_DI_STORE_KEY, configure, connect;

  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_immutable) {
      fromJS = _immutable.fromJS;
    }],
    execute: function () {
      _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
      AURELIA_DI_STORE_KEY = 'AURELIA_DI_STORE_KEY';

      _export('configure', configure = function configure(aurelia, store) {
        if (!store || (typeof store === 'undefined' ? 'undefined' : _typeof(store)) !== 'object') {
          console.error('You need to pass a store creator function.');
          return;
        }

        aurelia.container.registerInstance(AURELIA_DI_STORE_KEY, store);
      });

      connect = function connect(viewModel, stateMapper) {
        stateMapper = stateMapper || function (state) {
          return state;
        };
        var store = Container.instance.get(AURELIA_DI_STORE_KEY);
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