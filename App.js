import React from 'react';
import { Authentication } from './app/stores';
import { Provider } from 'mobx-react';
import { InitScreen } from './app/components/screens';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.stores = {
      Authentication
    };
  }

  render() {
    return (
      <Provider {...this.stores}>
        <InitScreen />
      </Provider>
    );
  }
}
