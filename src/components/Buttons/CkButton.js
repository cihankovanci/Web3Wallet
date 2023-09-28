import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CkButton = ({onPress, text, backgroundColor}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, justifyContent: 'center', borderRadius: 4, alignItems:'center', }}>
 
      <Text>{text}</Text>
    </TouchableOpacity>
  )
}

export default CkButton

const styles = StyleSheet.create({})