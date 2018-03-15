import React from 'react';

import {
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

import {
  observer,
  inject,
  toJS
} from 'mobx-react';
import { Observer } from 'mobx-react/native';

@inject('FirebaseStore')
@observer
export default class MessageList extends React.Component {
  _renderItem({item: message}) {
    return (
      <Observer>{
        () => (<View style={styles.messageView}>
        {/* <View style={styles.messageCreatedView}>
          <Text style={styles.messageCreatedDateText}>{new Date(message.created).toLocaleDateString("nb-NO", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Text>
          <Text style={styles.messageCreatedTimeText}>{new Date(message.created).toLocaleTimeString('nb-NO')}</Text>
          <Text style={styles.messageCreatedDateTimeText}>{new Date(message.created).toLocaleString()}</Text>
        </View> */}
        <Text style={styles.messageBodyText}>{JSON.stringify(message)}</Text>
      </View>)
      }</Observer>
    );
  }

  _renderListSeparator() {
    return <View style={styles.messageListSeparator}></View>;
  }

  render() {
    const {
      FirebaseStore
    } = this.props;

    return (
      <FlatList
        ref="listRef"
        data={FirebaseStore.messages}
        renderItem={this._renderItem}
        keyExtractor={(item, index) => {
          return item.id;
        }}
        style={styles.messagesList}
        ItemSeparatorComponent={this._renderListSeparator}
      />
    );
  }
}

const colors = {
  gray: '#aaa'
};

const styles = StyleSheet.create({
  messagesList: {
    flex: 1,
    width: '100%',
    borderWidth: 1
  },
  messageListSeparator: {
    height: 1,
    backgroundColor: colors.gray
  },
  messageView: {
    flexDirection: 'row'
  },
  messageCreatedView: {
    flexDirection: 'column',
  },
  messageCreatedDateText: {
    fontSize: 10
  },
  messageCreatedTimeText: {
    fontSize: 10
  },
  messageCreatedDateTimeText: {
    fontSize: 10
  },
  messageBodyText: {
    fontWeight: '400'
  }
});
