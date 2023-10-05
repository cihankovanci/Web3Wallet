import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const List = ({data, backgroundColor}) => {

    
  return (
    <View style={{backgroundColor:backgroundColor, borderRadius: 10, height: 50 , marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row',  padding:10, borderRadius: 4, alignItems:'center',  }}>
    
     <FlatList
    data={data}
    style={{flex:1}}
    horizontal={true}
    ref={ref => this.flatList = ref}
    onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
    onLayout={() => this.flatList.scrollToEnd({animated: true})}
    keyExtractor={(item) => item.toString()}
    renderItem={({ item }) => (
      <View style={{width: 150, height: 30,  marginVertical:1}}>
        <Text selectable={true} style={styles.label}>{item.toString()}</Text>
      </View>
    )}
  />
    </View>
  )
}

export default List

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        
        color:'white'
      },
})