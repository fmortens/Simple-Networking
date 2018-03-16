import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button
} from 'react-native';
import { observer, inject, toJS } from 'mobx-react';
import { Messages } from '../../stores';
import { Provider } from 'mobx-react';
import { MainScreen } from '../screens';
import { StackNavigator } from "react-navigation";

@inject('Authentication')
@observer
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null
    }

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    const {
      Authentication
    } = this.props;

    const {
      email,
      password
    } = this.state;

    if (email && password) {
      Authentication.login({
        email,
        password
      });
    }
  }

  render() {
    const {
      Authentication
    } = this.props;

    if (Authentication.loggedIn) {
      const stores = {
        Authentication,
        Messages: new Messages()
      }

      return (
        <Provider {...stores}>
          <MainScreen />
        </Provider>
      );
    } else {
      return (
        <SafeAreaView style={styles.loginView}>
          <TextInput
            style={styles.inputField}
            value={this.state.email}
            autoCorrect={false}
            onChangeText={
              (text) => this.setState({email: text.toLocaleLowerCase()})
            } />
          <TextInput
            style={styles.inputField}
            value={this.state.password}
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={
              (text) => this.setState({password: text.toLocaleLowerCase()})
            } />
          <Button title="Log in" onPress={this.authenticate} />
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fafafa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    height: 50,
    width: 300,
    margin: 10,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#fff',
    borderRadius: 10
  }
});
