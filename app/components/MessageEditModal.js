import React from 'react';
import {
  Modal,
  SafeAreaView,
  TextInput,
  View,
  Button,
  Text,
  StyleSheet
} from 'react-native';

export default ({
  modalVisible,
  message,
  onChangeText,
  closeModal,
  addMessage
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible} >
      <SafeAreaView style={styles.modalView}>
        <TextInput
          multiline={true}
          style={styles.modalMessageInput}
          value={message}
          onChangeText={onChangeText}
        />
        <View style={styles.modalActionView}>
          <Button title="Close" onPress={closeModal} />
          <Button title="Add message" onPress={addMessage} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  }
});
