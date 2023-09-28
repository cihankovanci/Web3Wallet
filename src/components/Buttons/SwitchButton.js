import { StyleSheet, Text, View, Switch } from 'react-native'
import React, {useState} from 'react'

const SwitchButton = ({toggleSwitch, isEnabled, backgroundColor}) => {
 
  return (
    <View style={{marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row', backgroundColor: backgroundColor, padding:10, justifyContent: 'space-between', borderRadius: 4, alignItems:'center', }}>
      <Text>Connection Switch</Text>
        <Switch 
         trackColor={{false: '#767577', true: '#81b0ff'}}
         thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
         ios_backgroundColor="#3e3e3e"
         onValueChange={toggleSwitch}
         value={isEnabled}/>
    </View>
  )
}

export default SwitchButton

const styles = StyleSheet.create({})