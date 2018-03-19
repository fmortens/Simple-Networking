import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback
} from 'react-native';

import {
  observer,
  inject,
  toJS
} from 'mobx-react';

import { Ionicons } from '@expo/vector-icons';

@inject('Messages')
@observer
export default class MessageListItem extends React.Component {
  constructor(props) {
    super(props);

    this.handlePress = this.handlePress.bind(this);
  }

  handlePress() {
    const {
      Messages,
      message: {
        id
      }
    } = this.props;

    Messages.deleteMessage(id);
  }

  render() {
    const {
      message
    } = this.props;

    return (
      <View style={styles.messageView}>
        <View style={styles.messageHeaderView}>
          <Text style={styles.messageCreatedText}>{new Date(message.created).toLocaleString()}</Text>
          <TouchableWithoutFeedback onPress={this.handlePress}>
            <Ionicons color={colors.black} name={'ios-close'} size={32} />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.messageBodyView}>
          <Text style={styles.messageBodyText}>{message.body}</Text>
        </View>
      </View>
    );
  }
};

const colors = {
  lightGray: '#ddd',
  black: '#000'
};

const styles = StyleSheet.create({
  messageView: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    margin: 10
  },
  messageHeaderView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  messageCreatedText: {
    fontSize: 10
  },
  messageBodyView: {
    justifyContent: 'center'
  },
  messageBodyText: {
    fontWeight: '400',
    fontSize: 20
  }
});
