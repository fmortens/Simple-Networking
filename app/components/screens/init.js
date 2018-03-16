import React from 'react';
import {
  observer,
  inject,
  Provider
} from 'mobx-react';
import {
  SafeAreaView,
  Text,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { Login } from './';

@inject('Authentication')
@observer
export default class InitScreen extends React.Component {
  render() {
    const {
      Authentication
    } = this.props;

    let component = <Login />
    if (Authentication.isLoggedIn) {
      component = <MainScreen />
    } else {
      if (Authentication.status === 'busy') {
        return (
          <SafeAreaView style={styles.busyView}>
            <ActivityIndicator
              size="large"
              color="#000"
              animating={true}
            />
          </SafeAreaView>
        );
      } else {
        return (
          <Provider {...this.stores}>
            {component}
          </Provider>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  busyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});