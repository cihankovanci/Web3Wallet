import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity, ScrollView,Platform, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import React, {useEffect, useState} from 'react'
import useInitialization from './src/hooks/useInitialization';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import ConfigUtils from './src/utils/ConfigUtils';
import ContractUtils from './src/utils/ContractUtils';
import {createPublicClient, createWalletClient, custom, formatEther, parseEther} from 'viem';
import {goerli, bscTestnet, mainnet, bsc, avalanche} from 'viem/chains';
import { http } from 'viem';
import { RequestModal } from './src/components/RequestModal';
const projectId = 'a51c11453355128de6ffdff24866af5e';
import Clipboard from '@react-native-clipboard/clipboard';
import { ethers } from 'ethers';
import {web3Provider} from '@ethersproject/providers';
import {numberToHex, sanitizeHex} from '@walletconnect/encoding';
import { addChain } from 'viem/_types/actions/wallet/addChain';
import SwitchButton from './src/components/Buttons/SwitchButton';
import CkButton from './src/components/Buttons/CkButton';
import CopyButton from './src/components/Buttons/CopyButton';
import CkCard from './src/components/Views/CkCard';
import InfoCard from './src/components/Views/InfoCard';
import CkTextInputButton from './src/components/Buttons/CkTextInputButton';
import { signMessage } from 'viem/_types/actions/wallet/signMessage';
import TransactionCard from './src/components/Views/TransactionCard';
import BlockInfo from './src/components/Views/BlockInfo';
import List from './src/components/Views/List';
import { ComplexAnimationBuilder } from 'react-native-reanimated';


const App = () => {
  const {isConnected, provider, open, address} = useWalletConnectModal();
  const [client, setClient] = useState();
  const initialized = useInitialization();
  const [publicClient, setPublicClient] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [rpcResponse, setRpcResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [walletAddress, setWalletAddress] = useState();
  const [walletSignature, setWalletSignature] = useState();
  const [hashh, setHashh] = useState();
  const [transferHash, setTransferHash] = useState();
  const [myAddress, setMyAddress] = useState();
  const [signedMessage, setSignedMessage] = useState('');
  const [mainTransaction, setMainTransaction] = useState('');
  const [receiverTransaction, setReceiverTransaction] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [blockResponse, setBlockResponse] = useState();
  const [blockText, setBlockText] = useState('');
  const [blockNumbers, setBlockNumbers] = useState([]);
  const [blockNumber, setBlockNumber] = useState(0);
  const [transferinfo, setTransferinfo] = useState('');
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if (isConnected && provider) {
      
      const _client = createWalletClient({
        // chain: bscTestnet,
        chain: bsc,
        transport: custom(provider),
      });
  
      const _publicClient = createPublicClient({
        // chain: bscTestnet,
        chain: bsc,
        transport: custom(provider),
      });
  
      setClient(_client);
      setPublicClient(_publicClient);
    }
  }, [isConnected, provider]);


  // useEffect(() => {
  //   if (isConnected && provider) {
  //     const _client = new ethers.providers.Web3Provider(provider);

  //     setClient(_client);
  //   }
  // }, [isConnected, provider]);


  const onConnect = () => {
    if (isConnected) {
      return provider?.disconnect();
    }
    return open();
  };

  const onCopy = (value) => {
    console.log('walue',value);
  };

  useEffect(() => {
    console.log('Web3WalletSDK initialized:', initialized);
  }, [initialized]);

  const onResponse = (response) => {
    setRpcResponse(response);
    setLoading(false);
  };

  const onModalClose = () => {
    setModalVisible(false);
    setLoading(false);
    setRpcResponse(undefined);
  };

  const onAction = (callback) => async () => {
    try {
      setLoading(true);
      setModalVisible(true);
      const response = await callback();
      onResponse(response);
    } catch (error) {
      onResponse({
        error: error?.message || 'error',
      });
    }
  };


   const onSendTransaction = async () => {
     const [address] = await client.getAddresses();
     setMyAddress(address)
     const hash = await client.sendTransaction({
       account: address,
       to: receiverTransaction, //'0xBA02934d2DD50445Fd08E975eDE02CA6C609d4db', // cihan eth chain vitalik.eth
       value: parseEther(transactionAmount),
     });
     setTransferHash(hash);
     setTransferinfo(hash);
     return {
       method: 'send transaction',
       response: hash,
     };
   };

   console.log('Transfer hash:',transferHash)

  const onSignMessage = async (text) => {
    const [address] = await client.getAddresses();

    const signature = await client.signMessage({
      account: address,
      message: text,
    });

    console.log('signature',signature);
    setWalletSignature(signature);
    return {
      method: 'sign message',
      signature: signature,
    };
  };

  const getWalletAddress = async () => {
    const [address] = await client.getAddresses();
    console.log('address',address);
    setWalletAddress(address);
  }





  const onReadContract = async () => {
    const [account] = await client.getAddresses();

    const data = await publicClient.readContract({
      account,   
      address: ContractUtils.contractAddress,
      abi: ContractUtils.goerliABI,
      functionName: 'totalSupply',
    });

    return {
      method: 'read contract',
      data,
    };
  };


// console.log('pubbb',publicClient)
  // const getBalance = async () => {
  //   const [account] = await client.getAddresses();
  //   const data await publicClient.readContract({
  // }


  // const onBalanceOf = async () => {
  //   const [account] = await client.getAddresses();

  //   // const {request} = await publicClient.simulateContract({
  //   //   account,
  //   //   address: ContractUtils.contractAddress,
  //   //   abi: ContractUtils.goerliABI,
  //   //   functionName: 'balanceOf',
  //   //   args: [account],
  //   // });
  //   // const hash = await client.writeContract(request);
  //   const {request} = await publicClient.readContract({

  //     account,
  //     address: ContractUtils.contractAddress,
  //     abi: ContractUtils.goerliABI,
  //     functionName: 'balanceOf',
  //     args: [account],
  //   });

  //   const hashh = await client.readContract(request);
  //   console.log('hash',hashh.toString())
  //   setHashh(hashh)
  //   return {
  //     method: 'balance of contract',
  //     response: hashh,
  //   };
  // };

  // console.log('hasshhh:',hashh)
  const onWriteContract = async () => {
    const [account] = await client.getAddresses();

    const {request} = await publicClient.simulateContract({
      account,
      address: ContractUtils.contractAddress,
      abi: ContractUtils.goerliABI,
      functionName: 'mint',
    });
    const hash = await client.writeContract(request);

    return {
      method: 'write contract',
      response: hash,
    };
  };



  const walletBalance = async () => {
    const [account] = await client.getAddresses();

    const balanceWei = await publicClient.getBalance({
      address: account,
    });
    const balanceEther = formatEther(balanceWei);
    return {
      method: 'wallet balance',
      response: balanceEther,
    };

  };

  const onTransactionCount = async () => {
    const [account] = await client.getAddresses();

    const getTransactionCount = await publicClient.getTransactionCount({
      address: account,
    });
  
    return {
      method: 'wallet balance',
      response: getTransactionCount,
    };

  };

  const onBalanceOf = async () => {
    const [account] = await client.getAddresses();

    // const balance = await publicClient.readContract({
    //   account,
    //   address: ContractUtils.contractAddress,
    //   abi: ContractUtils.goerliABI,
    //   functionName: 'balanceOf',
    //   args: ['0x980A75eCd1309eA12fa2ED87A8744fBfc9b863D5']
    // });

    const bal = await publicClient.getBalance({
      address: account,
    });


    const calculatedBalance = formatEther(bal);
    console.log('wei balance',calculatedBalance);


    return {
      method: 'balance of contract',
      response: bal,
    };
  }


  const onGetBlock = async () => {
    const block = await publicClient.getBlock({
      blockNumber: blockText,
    });
    // console.log('Block baba',block)
    setBlockResponse(block)
    return {
      method: 'get block',
      response: block,
    };
  }

  const onGetBlockNumber = async () => {
    const block = await publicClient.getBlockNumber();

    console.log('Block baba',block)
    setBlockNumber(block.toString())
    return {
      method: 'get block Number',
      response: block,
    };
  }

  const addBlockNumber = (blockNumber) => {
    setBlockNumbers((prevBlockNumbers) => [...prevBlockNumbers, blockNumber]);
  };

  const onWatchBlockNumber = async () => {
    const unwatch = publicClient.watchBlockNumber( 
     { onBlockNumber: (blockNumber) => addBlockNumber(blockNumber) }
    );

  
    console.log('unWatch',unwatch)
  }

  const onGetChainId = async () => {
    const chainId = await publicClient.getChainId() 
    console.log('chainId',chainId)
    return {
      method: 'get chain id',
      response: chainId,
    };
  }

  const onEstimateFeesPerGas = async () => {
    const {
      maxFeePerGas,
      maxPriorityFeePerGas
    } = await publicClient.estimateFeesPerGas();
  
    const formatedMaxFeePerGas = formatEther(maxFeePerGas)
    const formatedMaxPriorityFeePerGas = formatEther(maxPriorityFeePerGas)
    console.log('maxFeePerGas',formatedMaxFeePerGas)
    console.log('maxPriorityFeePerGas',formatedMaxPriorityFeePerGas)
    return {
      method: 'estimate fees per gas',
      response: 'max fee per gas: '+formatedMaxFeePerGas +' ' +'Max PriorityFeePerGas'+ formatedMaxPriorityFeePerGas,
    };
  }

  const onEstimateGas = async () => {
    const [account] = await client.getAddresses();
    const estimateGas = await publicClient.estimateGas({
      account,
      to: '0xBA02934d2DD50445Fd08E975eDE02CA6C609d4db',
      value: parseEther('0.0000001'),
    });
    console.log('estimate gas',formatEther(estimateGas))
    const formatedEstimateGas = formatEther(estimateGas)
    return {
      method: 'estimate gas',
      response: formatedEstimateGas,
    };
  }

  const onValidSignature = async () => {
    const [account] = await client.getAddresses();
    console.log('ACCOUNT: ',account)
    const validSignature = await publicClient.verifyMessage({
      address: account,
      message: 'Hello World!',
      signature: walletSignature,
    });
    console.log('valid signature',validSignature)
    return {
      method: 'valid signature',
      response: validSignature,
    };
  } 

  const onGetTransaction = async () => { 
    const [account] = await client.getAddresses();
    const transaction = await publicClient.getTransaction({
      hash: transferinfo//'0x1e1431ca2def8c0367110e57da85c913968527fcbc5ded14909f369098575e63' // get transaction info about given hash
    });
    console.log('transaction',transaction)
    return {
      method: 'get transaction',
      response: transaction,
    };
  }

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setReceiverTransaction(text);
  };

  useEffect(() => {
    if(receiverTransaction && mainTransaction && transactionAmount){
      setDisabled(false)
    } else {
      setDisabled(true)
    }


  }, [receiverTransaction,mainTransaction,transactionAmount])

  const onWatchAsset = async () => {
    const success = await client.watchAsset({ 
      type: 'BEP20',
      options: {
        address: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
        decimals: 18,
        symbol: 'ADA',
      },
    })

    console.log('success',success)
    return {
      method: 'Watch Assets for ADA',
      response: success,
    };
  }

  const addChain = async () => {
    const newChain = await client.addChain({chain: avalanche})
 
    console.log('newChain',newChain)
     return {
       method: 'Switch Chain',
       response: newChain,
     };
   }

   
  const switchChain = async () => {
   const newChain = await client.switchChain({id: avalanche.id})

   console.log('newChain',newChain)
    return {
      method: 'Switch Chain',
      response: newChain,
    };
  }

  return (
    <SafeAreaView>
<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View style={styles.container}>
      <ScrollView style={{width:'100%',  }}>
      <Text>App</Text>



      {/* <View style={{width:'50%'}}>
      <SwitchButton isEnabled={isConnected} toggleSwitch={onConnect} backgroundColor={isConnected ? '#3396FF' : '#999'} />
      </View> */}
       {/* <TouchableOpacity style={styles.button} onPress={onConnect}>
          <Text style={styles.buttonText}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity> */}
        

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={isConnected ? 'Disconnect' : 'Connect'} onPress={onConnect} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Watch asset'} onPress={onAction(onWatchAsset)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Add Chain '} onPress={onAction(addChain)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Switch Chain '} onPress={onAction(switchChain)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', paddingHorizontal: 30, alignItems: 'center'}}>
       
       <InfoCard textData={client} backgroundColor={isConnected ? '#3396FF' : '#999'} />
      </View>

      <View style={{width: '100%', paddingHorizontal: 30}}>
        <CkCard title={'Wallet address'} text={address} buttonType={'Copy'} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', paddingHorizontal: 30, }}>
        <CkTextInputButton buttonText={'Sign'}  onSign={() => onAction(onSignMessage(signedMessage))} title={'Sign Message'} text={signedMessage} buttonType={'Copy'} backgroundColor={isConnected ? '#3396FF' : '#999'} setText={setSignedMessage}/>
      </View>

      <View style={{width: '100%', paddingHorizontal: 30}}>
        <CkCard title={'Wallet Signature'} text={walletSignature}  backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>
      
      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Read Contract'} onPress={onAction(onReadContract)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

            <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30,   }}>
              <View style={{flexDirection:'column', backgroundColor:'powderblue', padding: 10, borderRadius: 10}}>
            <TransactionCard title={'Sender Address'} buttonText={'Get Address'} mainText={mainTransaction} setMainText={setMainTransaction} onPaste={() => setMainTransaction(address)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
            <TransactionCard title={'Receiver Address'} buttonText={'Paste'} mainText={receiverTransaction} setMainText={setReceiverTransaction} onPaste={fetchCopiedText} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
            <View style={{ backgroundColor: 'white', padding: 5, borderRadius: 3}}>  
          
          <TextInput style={{color: 'black'}} keyboardType='numeric' value={transactionAmount} onChangeText={setTransactionAmount} />

          </View>
            
            <View style={{justifyContent:'center', alignItems:'center'}}>
            <CkButton disabled={disabled} text={'Send Transaction'} onPress={onAction(onSendTransaction)} backgroundColor={isConnected && !disabled ? '#3396FF' : '#999'}/>
            </View>
          </View>
            </View>
{transferHash &&
            <View style={{width: '100%', paddingHorizontal: 30}}>
        <CkCard title={'Transfer Hash'} text={transferHash}  backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>}

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30,  }}>
        <CkTextInputButton title={'Search Block Number for info'} text={transferHash} setText={setTransferinfo} buttonText={'Get Transaction info'}  onSign={onAction(onGetTransaction)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      {/* <CkButton text={'Get Block'} onPress={onAction(onGetBlock)} backgroundColor={isConnected ? '#3396FF' : '#999'}/> */}
      </View>
          

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Get Wallet Balance'} onPress={onAction(walletBalance)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Get BalanceOf'} onPress={onAction(onBalanceOf)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Transaction Count'} onPress={onAction(onTransactionCount)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Get Chain Id'} onPress={onAction(onGetChainId)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

   

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
      <CkButton text={'Watch Block Numbers'} onPress={onWatchBlockNumber} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30  }}>
        <List data={blockNumbers} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30,  }}>
        <CkTextInputButton title={'Latest Block Number'} text={blockNumber} setText={setBlockNumber} buttonText={'Get   Block number'}  onSign={onAction(onGetBlockNumber)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      {/* <CkButton text={'Get Block'} onPress={onAction(onGetBlock)} backgroundColor={isConnected ? '#3396FF' : '#999'}/> */}
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30,  }}>
        <CkTextInputButton title={'Search Block Number for info'} text={blockText} setText={setBlockText} buttonText={'Get Block info'}  onSign={onAction(onGetBlock)} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      {/* <CkButton text={'Get Block'} onPress={onAction(onGetBlock)} backgroundColor={isConnected ? '#3396FF' : '#999'}/> */}
      </View>

      <View style={{width: '100%', marginBottom: 10,alignItems:'center',  paddingHorizontal: 30,  }}>
      <BlockInfo backgroundColor={isConnected ? '#3396FF' : '#999'} blockData={blockResponse}/>
      </View>

    


   

      {/* <Text>Wallet signature: {walletSignature}</Text> */}
      {/* <TouchableOpacity style={styles.button} onPress={onConnect}>
          <Text style={styles.buttonText}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity> */}
       {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSendTransaction)}>
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity> */}

         {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={getWalletAddress}>
          <Text style={styles.buttonText}>Get walletAddress</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSignMessage)}>
          <Text style={styles.buttonText}>Sign Message</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onReadContract)}>
          <Text style={styles.buttonText}>Read Contract</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSendTransaction)}>
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onWriteContract)}>
          <Text style={styles.buttonText}>Write Contract</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onBalanceOf)}>
          <Text style={styles.buttonText}> On Balance of</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(walletBalance)}>
          <Text style={styles.buttonText}> Wallet Balance</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onEstimateGas)}>
          <Text style={styles.buttonText}>on Transaction Count</Text>
        </TouchableOpacity> */}
    </ScrollView>
    </View>
    </KeyboardAvoidingView>
      <WalletConnectModal
      projectId={ConfigUtils.PROJECT_ID}
      providerMetadata={ConfigUtils.providerMetadata}
      sessionParams={ConfigUtils.sessionParams}
      onCopyClipboard={onCopy}
      relayUrl='wss://relay.walletconnect.org'
     />
     <RequestModal
     isVisible={modalVisible}
     onClose={onModalClose}
     isLoading={loading}
     rpcResponse={rpcResponse}
   />
   </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3396FF',
    borderRadius: 20,
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginTop: 4,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
  },
});