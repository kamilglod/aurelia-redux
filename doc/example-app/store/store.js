import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducers from './reducers';


function configureStore() {
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    reducers,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware,
      ),
    )
  );
}

const store = configureStore();


export default store;
