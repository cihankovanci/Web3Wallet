import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'

const BlockInfo = ({backgroundColor, blockData}) => {

    // const TransactionList = ({ transactions }) => {
    //     // FlatList için renderItem işlevi
    //     const renderItem = ({ item }) => (
    //       <View style={styles.transactionItem}>
    //         <Text selectable={true} style={styles.value}>{item}</Text>
    //       </View>
    //     );
      
    //     return (
    //       <FlatList
    //         data={transactions}
    //         renderItem={renderItem}
    //         keyExtractor={(item) => item}
    //       />
    //     );
    //   };

    const TransactionList = ({ transactions }) => {

        const renderTransactions = transactions?.map((item, index) => (
          <View key={index} style={styles.transactionItem}>
            <Text selectable={true} style={styles.value}>{item}</Text>
          </View>
        ));
      
        return (
          <View>
            {renderTransactions}
          </View>
        );
      };


  
  return (
    <View style={{backgroundColor:backgroundColor, borderRadius: 10,  marginBottom: 10,width:'100%', paddingVertical: 10, flexDirection:'row',  padding:10, borderRadius: 4, alignItems:'center',  }}>
    <View style={{flexDirection:'column'}}>
    <Text style={styles.label}>Block Number:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.number.toString()}</Text>
        <View style={styles.line}/>

    <Text style={styles.label}>Block Hash:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.hash}</Text>
        <View style={styles.line}/>
      <Text style={styles.label}>Timestamp:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.timestamp.toString()}</Text>
      <View style={styles.line}/>
      <Text style={styles.label}>Difficulty:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.difficulty.toString()}</Text>
      <View style={styles.line}/>
      <Text style={styles.label}>Gas Limit:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.gasLimit.toString()}</Text>
      <View style={styles.line}/>
      {/* Diğer veri alanları */}
      <Text style={styles.label}>Gas Used:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.gasUsed.toString()}</Text>
      <View style={styles.line}/>
      <Text style={styles.label}>Miner:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.miner}</Text>
      <View style={styles.line}/>
      <Text style={styles.label}>Size:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.size.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>Hash:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.hash.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>extraData:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.extraData.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>Parent Hash:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.parentHash.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>receips Root:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.receiptsRoot.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>sha3Uncles:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.sha3Uncles.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>Size:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.size.toString()} bytes</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>sha3Uncles:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.sha3Uncles.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>stateRoot:</Text>
      <Text selectable={true} style={styles.value}>{blockData?.stateRoot.toString()}</Text>

      <View style={styles.line}/>
      <Text style={styles.label}>Transactions: </Text>
      <TransactionList transactions={blockData?.transactions} />
        </View>
    </View>
  )
}

export default BlockInfo

const styles = StyleSheet.create({
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
      },
      line: {
        width: '100%', // Çizgi genişliği
        height: 2,      // Çizgi yüksekliği
        backgroundColor: 'pink', // Çizgi rengi
      },
      value: {
        fontSize: 16,
        marginBottom: 12,
     
      },
      transactionItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
      },
})