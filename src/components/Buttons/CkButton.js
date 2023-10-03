import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CkButton = ({onPress, text, backgroundColor, disabled}) => {
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress} style={{marginBottom: 0,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, justifyContent: 'center', borderRadius: 4, alignItems:'center', }}>
 
      <Text style={{  color: 'white',
    fontWeight: '700', }}>{text}</Text>
    </TouchableOpacity>
  )
}

export default CkButton

const styles = StyleSheet.create({
  
})