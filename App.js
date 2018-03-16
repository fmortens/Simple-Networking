import React from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native';
import {
  Messages,
  Authentication
} from './app/stores';
import { Provider } from 'mobx-react';
import { MainScreen } from './app/components';
import {
  observer,
  inject,
  toJS
} from 'mobx-react';

@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.stores = {
      Authentication: new Authentication(),
    };

    this.state = {
      email: null,
      password: null
    }

    this.authenticate = this.authenticate.bind(this);
  }

  authenticate() {
    const {
      email,
      password
    } = this.state;

    if (email && password) {
      this.stores.Authentication.login({
        email,
        password
      });
    }
  }

  render() {
    console.info('RENDER', this.stores.Authentication.status);

    if (this.stores.Authentication.loggedIn) {
      this.stores.Messages = new Messages();
      return (
        <Provider {...this.stores}>
          <MainScreen />
        </Provider>
      );
    } else {
      if (this.stores.Authentication.status === 'login') {
        return <View>
          <Text>{this.stores.Authentication.status}</Text>
          <Text>[Wait anim]</Text>
        </View>
      } else {
        return (
          <SafeAreaView style={styles.loginView}>
            <TextInput
              style={styles.inputField}
              value={this.state.email}
              onChangeText={
                (text) => this.setState({email: text.toLocaleLowerCase()})
              } />
            <TextInput
              style={styles.inputField}
              value={this.state.password}
              onChangeText={
                (text) => this.setState({password: text.toLocaleLowerCase()})
              } />
            <Button title="Log in" onPress={this.authenticate} />
          </SafeAreaView>
        );
      }
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
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10
  }
});
