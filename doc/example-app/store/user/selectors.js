import { createSelector } from 'reselect';


const userState = (state) => state.user;
const isAuthorizedState = createSelector(
  userState,
  (user) => user.get('isAuthorized')
);
const username = createSelector(
  userState,
  (user) => user.get('username')
)


export {
  userState,
  isAuthorizedState,
  username,
};
