import React from 'react';

import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default ({message}) => (
  <View style={styles.messageView}>
    <View style={styles.messageCreatedView}>
      <Text style={styles.messageCreatedText}>{new Date(message.created).toLocaleString()}</Text>
    </View>
    <View style={styles.messageBodyView}>
      <Text style={styles.messageBodyText}>{message.body}</Text>
    </View>
  </View>
);

const colors = {
  lightGray: '#ddd'
};

const styles = StyleSheet.create({
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
  }
});
