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

@inject('Messages')
@observer
export default class MessageList extends React.Component {
  _renderItem({item: message}) {
    return (
      <Observer>
        { () => (
          <View style={styles.messageView}>
            <View style={styles.messageCreatedView}>
              <Text style={styles.messageCreatedText}>{new Date(message.created).toLocaleString()}</Text>
            </View>
            <View style={styles.messageBodyView}>
              <Text style={styles.messageBodyText}>{message.body}</Text>
            </View>
          </View>
        )}
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
      return (
        <View style={styles.busyView}>
          <ActivityIndicator
            size="large"
            color="#000"
            animating={true}
          />
          <Text>{Messages.status}</Text>
        </View>
      );
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
  },
  messageView: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    margin: 10
  },
  messageCreatedView: {
    justifyContent: 'center'
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
  },
  busyView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
