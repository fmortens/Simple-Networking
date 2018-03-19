import React from 'react';
import {
  observer,
  inject,
  Provider
} from 'mobx-react';
import {
  SafeAreaView,
  Text,
} from 'react-native';
import { LoginScreen } from './';
import { BusyIndicator } from '../../components';

@inject('Authentication')
@observer
export default class InitScreen extends React.Component {
  render() {
    const {
      Authentication
    } = this.props;

    let component;
    if (Authentication.isLoggedIn) {
      component = <MainScreen />
    } else {
      if (Authentication.status === 'busy') {
        component = <BusyIndicator message={Authentication.status} />;
      } else {
        component = <LoginScreen />
      }
    }

    return (
      <Provider {...this.stores}>
        {component}
      </Provider>
    );
  }
}
