import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  TextInput
} from 'react-native';
import {
  observer,
  inject,
  toJS
} from 'mobx-react';
import {
  MessageList,
  MessageActionButtons,
  MessageEditModal
} from '../../components';

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
    this.changeText = this.changeText.bind(this);
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

  changeText(text) {
    this.setState({message: text});
  }

  render() {
    const {
      Messages,
      Authentication
    } = this.props;

    let actions;
    if (Authentication.user && Messages.messages) {
      actions = (
        <MessageActionButtons
          style={styles.messageActionButtons}
          openModal={this.openModal}
          logout={Authentication.logout}
        />
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <MessageEditModal
          modalVisible={this.state.modalVisible}
          onChangeText={this.changeText}
          closeModal={this.closeModal}
          addMessage={this.addMessage}
          message={this.state.message}
        />
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
    borderRadius: 10
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
  },
  modalMessageInput: {
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  messageActionButtons: {
    flex: 1,
  }
});
