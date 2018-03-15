import React from 'react';
import * as stores from './app/stores';
import { Provider } from 'mobx-react';
import { MainScreen } from './app/components';

export default class App extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <MainScreen />
      </Provider>
    );
  }
}
