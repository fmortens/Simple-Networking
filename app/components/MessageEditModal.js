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
        <View style={styles.modalHeaderView}>
          <Button
            title="Close"
            onPress={closeModal}
          />
        </View>
        <View style={styles.modalBodyView}>
          <TextInput
            multiline={true}
            style={styles.modalMessageInput}
            value={message}
            onChangeText={onChangeText}
          />
        </View>
        <View style={styles.modalFooterView}>
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
  modalHeaderView: {
    flex: 1,
    maxHeight: 40
  },
  modalBodyView: {
    flex: 1,
    margin: 10,
  },
  modalMessageInput: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  modalFooterView: {
    flex: 1,
    maxHeight: 40,
    marginBottom: 20
  }
});
