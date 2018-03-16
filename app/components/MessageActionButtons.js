import React from 'react';
import {
  View,
  Button,
} from 'react-native';

export default ({openModal, logout}) => {
  return (
    <View>
      <Button title="Add message" onPress={openModal} />
      <Button title="Log out" onPress={logout} />
    </View>
  );
}
