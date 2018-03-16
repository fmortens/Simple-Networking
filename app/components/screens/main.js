import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Modal,
  TextInput
} from 'react-native';
import {
  observer,
  inject,
  toJS
} from 'mobx-react';
import { MessageList } from '../../components';

@inject('Messages', 'Authentication')
@observer
export default class MainScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      message: undefined
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addMessage = this.addMessage.bind(this);
  }

  addMessage() {
    const {
      Messages
    } = this.props;

    const {
      message
    } = this.state;

    if (message) {
      Messages.addMessage(message);
    }

    this.closeModal();
  }

  openModal() {
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

    let actions;
    if (Authentication.user && Messages.messages) {
      actions = (
        <View style={styles.actions}>
          <Button title="Add message" onPress={this.openModal} />
          <Button title="Log out" onPress={() => Authentication.logout()} />
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible} >
          <SafeAreaView style={styles.modalView}>
            <TextInput
              style={styles.modalMessageInput}
              value={this.state.message}
              onChangeText={
                (text) => {
                  this.setState({message: text});
                }
              }
            />
            <View style={styles.modalActionView}>
              <Button title="Close" onPress={this.closeModal} />
              <Button title="Add message" onPress={this.addMessage} />
            </View>
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
  modalView: {
    flexDirection: 'column',
    borderWidth: 1
  },
  modalMessageInput: {
    flex: 1
  },
  modalActionView: {
    flex: 1
  }
});
