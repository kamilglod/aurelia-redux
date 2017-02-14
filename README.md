# Aurelia-Redux-Immutable

Aurelia plugin for redux is auto inject state and dispatcher to view models. Additionally it keeps synced redux state in view models so it will be auto updated when change occurred.


### Name of the plugin
Originally this package was named `aurelia-redux` but because this name is already reserved I used `aurelia-redux-immutable`.
However to make imports shorter we can define package `name` in `aurelia.json` so we can still use `aurelia-redux` in projects.


### Installation

* using Aurelia CLI:
  * run `npm install aurelia-redux-immutable`
  * add
  ```
  {
    "name": "aurelia-redux",
    "path": "../node_modules/aurelia-redux-immutable/dist/amd",
    "main": "index"
  },
  ```
  to `aurelia.json`

### Configuration

Use this plugin as standard aurelia plugin, just pass your store instance.
```
  aurelia.use
    .standardConfiguration()
    .plugin('aurelia-redux', storeInstance);
```

### Simple usage


```
import connect from 'aurelia-redux';


class SomeViewModel {
  constructor() {
    connect(this);

    console.log(this.dispatch, this.state);
  }
}
```

### Usage with reselect

```
import connect from 'aurelia-redux';

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

    console.log(this.dispatch, this.state);
  }
}
```

To see full example please check [example-app](./doc/example-app/)
