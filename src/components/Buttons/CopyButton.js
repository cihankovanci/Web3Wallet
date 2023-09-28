import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import Clipboard from '@react-native-clipboard/clipboard';

const CopyButton = ({textToCopy}) => {

    const handleCopy = () => {
        Clipboard.setString(textToCopy);
        Alert.alert('Kopyalandı', `Kopyalanan metin: ${textToCopy}`);
      };

  return (
    <TouchableOpacity onPress={handleCopy}>
      <Text>Copy</Text>
    </TouchableOpacity>
  )
}

export default CopyButton

const styles = StyleSheet.create({})