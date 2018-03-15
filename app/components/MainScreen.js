import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import { observer, inject, toJS } from 'mobx-react';
import { MessageList } from '../components';

@inject('FirebaseStore')
@observer
export default class MainScreen extends React.Component {
  render() {
    const {
      FirebaseStore
    } = this.props;

    const actions = FirebaseStore.user ? (
        <View style={styles.actions}>
          <Button title="Add message" onPress={() => FirebaseStore.addMessage('wuhu')} />
          <Button title="Log out" onPress={() => FirebaseStore.logOut()} />
        </View>
      ) : (
        <View style={styles.actions}>
          <Button title="Log in" onPress={() => FirebaseStore.authenticate({email: 'fmortens@me.com', password: 'test-user'})} />
        </View>
      );

    return (
      <SafeAreaView style={styles.container}>
        <MessageList />
        {actions}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
