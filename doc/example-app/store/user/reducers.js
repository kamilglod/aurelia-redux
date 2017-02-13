import { Map } from 'immutable';

import { LOGGED_IN, LOGGED_OUT } from './constants';


const initialState = new Map({
  username: '',
  isAuthorized: false,
});

export default function(state = initialState, action) {

  switch (action.type) {
    case LOGGED_IN:
      return state.set('username', action.username).set('isAuthorized', true);
    case LOGGED_OUT:
      return initialState;
    default:
      return state;
  }

  return state;
};
