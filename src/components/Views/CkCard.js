import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CopyButton from '../Buttons/CopyButton'

const CkCard = ({text, backgroundColor, title}) => {
  return (
    <View style={{backgroundColor:backgroundColor, marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, borderRadius: 4, alignItems:'center',  }}>
        <View  style={{flex:4, flexDirection:'column', }}>
        <Text style={{fontSize: 16, fontWeight: '600'}}>{title}</Text>
        <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 3}}>  
        <Text style={{color: 'black'}}>{text}</Text>
        </View>
        </View>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center',  marginLeft: 10}}>
        <CopyButton textToCopy={text}/>
        </View>
    </View>
  )
}

export default CkCard

const styles = StyleSheet.create({})