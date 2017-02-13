import { Container } from 'aurelia-dependency-injection';
import { fromJS } from 'immutable';

const AURELIA_DI_STORE_KEY = 'AURELIA_DI_STORE_KEY';

const configure = (aurelia, store) => {
  if (!store || typeof store !== 'object') {
    console.error('You need to pass a store creator function.');
    return;
  }

  aurelia.container.registerInstance(AURELIA_DI_STORE_KEY, store);
};

const connect = (viewModel, stateMapper) => {
  stateMapper = stateMapper || (state => state);
  const store = Container.instance.get(AURELIA_DI_STORE_KEY);
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