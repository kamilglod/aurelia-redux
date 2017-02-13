
import { LOGGED_IN, LOGGED_OUT } from './constants';


function loggedIn(username) {
  return {
    type: LOGGED_IN,
    username,
  };
}

function logout() {
  return {
    type: LOGGED_OUT,
  };
}


export {
  loggedIn,
  logout,
};
