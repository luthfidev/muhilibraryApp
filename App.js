import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/redux/store';

import Navigation from './src/components/navigations/Stack';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false,
    };
  }

  render() {
    return (
      <>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Navigation />
          </PersistGate>
        </Provider>
      </>
    );
  }
}
