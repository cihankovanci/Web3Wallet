import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import CopyButton from '../Buttons/CopyButton'
import CkButton from './CkButton'
const CkTextInputButton = ({text, setText, backgroundColor, title, onSign}) => {
  return (
    <View style={{backgroundColor:backgroundColor, marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, borderRadius: 4, alignItems:'center',  }}>
        <View  style={{flex:4, flexDirection:'column', }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>{title}</Text>
        <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 3}}>  
    
        <TextInput style={{color: 'black'}}  value={text} onChangeText={setText} />
        </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 10}}>
        <CkButton backgroundColor={backgroundColor} onPress={onSign} text={'Sign'} />
        
        </View>
    </View>
  )
}

export default CkTextInputButton

const styles = StyleSheet.create({})