import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const InfoCard = ({backgroundColor, textData}) => {
    console.log(textData)
  return (
    <View style={{backgroundColor:backgroundColor, borderRadius: 10,  marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, borderRadius: 4, alignItems:'center',  }}>
<View style={{flexDirection:'column'}}>
        <Text>Chain Name: {textData?.chain.name}</Text>
        <Text>Native Currency: {textData?.chain.nativeCurrency.name}</Text>
        <Text>Native Currency symbol: {textData?.chain.nativeCurrency.symbol}</Text>
        <Text>Chain Network: {textData?.chain.network}</Text>
        </View>
    </View>
  )
}

export default InfoCard

const styles = StyleSheet.create({})