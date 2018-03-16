import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Modal } from 'react-native';
import { observer, inject, toJS } from 'mobx-react';
import { MessageList } from '../components';

@inject('Messages', 'Authentication')
@observer
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    //Messages.addMessage('wuhu')

    this.setState({
      modalVisible: true
    });
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    const {
      Messages,
      Authentication
    } = this.props;

    const actions = Authentication.user ? (
        <View style={styles.actions}>
          <Button title="Add message" onPress={this.openModal} />
          <Button title="Log out" onPress={() => Authentication.logout()} />
        </View>
      ) : (
        <View style={styles.actions}>
          <Button title="Log in" onPress={() => Authentication.login({email: 'fmortens@me.com', password: 'test-user'})} />
        </View>
      );

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible} >
          <SafeAreaView>
            <Button title="Close" onPress={this.closeModal} />
            <Text>wuhu</Text>
          </SafeAreaView>
        </Modal>
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
