
import connect from 'aurelia-redux';
import { username, isAuthorizedState } from 'store/user/selectors';
import { loggedIn, logout } from 'store/user/actions';


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


const mapState = (state) => {
  return {
    isAuthorized: isAuthorizedState(state),
    username: username(state),
  };
};
