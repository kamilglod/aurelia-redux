import connect from 'aurelia-redux-immutable';

import { username, isAuthorizedState } from 'store/user/selectors';
import { loggedIn, logout } from 'store/user/actions';


const mapState = (state) => {
  return {
    isAuthorized: isAuthorizedState(state),
    username: username(state),
  };
};


export class App {

  constructor() {
    connect(this, mapState);
  }

  login(username) {
    this.dispatch(loggedIn(username));
  }

  logout() {
    this.dispatch(logout());
  }

  detached() {
    console.log('original detached');
  }
}
