import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';

import {
  observer,
  inject,
  toJS
} from 'mobx-react';
import { Observer } from 'mobx-react/native';
import {
  MessageListItem,
  BusyIndicator
} from '../components';

@inject('Messages')
@observer
export default class MessageList extends React.Component {
  _renderItem({item: message}) {
    return (
      <Observer>
        { () => <MessageListItem message={message} /> }
      </Observer>
    );
  }

  _renderListSeparator() {
    return <View style={styles.messageListSeparator}></View>;
  }

  render() {
    const {
      Messages
    } = this.props;

    if (Messages.messages) {
      return (
        <FlatList
          ref="listRef"
          data={Messages.messages}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          style={styles.messagesList}
          ItemSeparatorComponent={this._renderListSeparator}
        />
      );
    } else {
      return <BusyIndicator message={Messages.status} />
    }
  }
}

const colors = {
  gray: '#aaa',
  lightGray: '#ddd'
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
    width: '100%'
  },
  messageListSeparator: {
    height: 0,
    backgroundColor: colors.gray
  }
});
