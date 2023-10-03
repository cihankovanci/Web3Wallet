import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import CkButton from '../Buttons/CkButton'

const TransactionCard = ({title,backgroundColor, mainText, setMainText, onPaste, buttonText}) => {
  return (
    <View style={{backgroundColor:backgroundColor, borderRadius: 10,  marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row',  padding:10, borderRadius: 4, alignItems:'center'  }}>

        
        <View style={{ flex: 2}}>
            <Text>{title}</Text>
            <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 3, width: '100%'}}>  
            <TextInput style={{color: 'black'}}  value={mainText} onChangeText={setMainText} />
            </View>
        </View>

        <View style={{ flex: 1}}>
            <CkButton backgroundColor={backgroundColor} onPress={onPaste} text={buttonText} />
        </View>





    </View>
  )
}

export default TransactionCard

const styles = StyleSheet.create({})