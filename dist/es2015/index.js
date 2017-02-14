import { fromJS } from 'immutable';

let store;

const configure = (aurelia, storeInstance) => {
  if (!storeInstance || typeof storeInstance !== 'object') {
    console.error('You need to pass a store to aurelia-redux-immutable configurator function.');
    return;
  }

  store = aurelia.container.get(storeInstance);
};

const connect = (viewModel, stateMapper) => {
  stateMapper = stateMapper || (state => state);
  const state = store.getState();
  const dispatch = store.dispatch;
  let stateToShallowCompare;

  const inject = mappedState => {
    viewModel.state = mappedState;
    viewModel.dispatch = dispatch;

    stateToShallowCompare = fromJS(viewModel.state);
  };
  const subscribe = () => {
    const newMappedState = stateMapper(store.getState());
    if (!stateToShallowCompare.equals(fromJS(newMappedState))) {
      inject(newMappedState);
    }
  };
  const unsubscribe = store.subscribe(subscribe);
  const originalDetached = viewModel.detached || (() => {});
  viewModel.detached = () => {
    originalDetached();
    unsubscribe();
  };

  inject(stateMapper(state));
};

export default connect;
export { configure };