# Aurelia-Redux-Immutable

Aurelia plugin for redux is auto inject state and dispatcher to view models. Additionally it keeps synced redux state in view models so it will be auto updated when change occurred.


### Installation

* using Aurelia CLI:
  * run `npm install immutable redux aurelia-redux-immutable`
  * add
  ```
  "immutable",
  {
    "name": "redux",
    "path": "../node_modules/redux/dist",
    "main": "redux"
  }
  "aurelia-redux-immutable",
  ```
  to `aurelia.json`

### Configuration

Use this plugin as standard aurelia plugin, just pass your store instance.
```
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-redux-immutable', storeInstance);
```

### Simple usage


```
import connect from 'aurelia-redux-immutable';


class SomeViewModel {
  constructor() {
    connect(this);

    // each time state change occured this.state will be updated to the newest version
    console.log(this.dispatch, this.state);
  }
}
```

### Usage with reselect

```
import connect from 'aurelia-redux-immutable';

import { username, isAuthorizedState } from 'store/user/selectors';


const mapState = (state) => {
  return {
    isAuthorized: isAuthorizedState(state),
    username: username(state),
  };
};

class SomeViewModel {
  constructor() {
    connect(this, mapState);

    // each time state change occured this.state will be updated to the newest version
    // if substate returned by mapState will differ
    console.log(this.dispatch, this.state);
  }
}
```

To see full example please check [example-app](./doc/example-app/)
