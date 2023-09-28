import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import useInitialization from './src/hooks/useInitialization';
import {
  useWalletConnectModal,
  WalletConnectModal,
} from '@walletconnect/modal-react-native';
import ConfigUtils from './src/utils/ConfigUtils';
import ContractUtils from './src/utils/ContractUtils';
import {createPublicClient, createWalletClient, custom, formatEther, parseEther} from 'viem';
import {goerli, bscTestnet} from 'viem/chains';
import { http } from 'viem';
import { RequestModal } from './src/components/RequestModal';
const projectId = 'a51c11453355128de6ffdff24866af5e';

import { ethers } from 'ethers';
import {web3Provider} from '@ethersproject/providers';
import {numberToHex, sanitizeHex} from '@walletconnect/encoding';
import { addChain } from 'viem/_types/actions/wallet/addChain';
import SwitchButton from './src/components/Buttons/SwitchButton';
import CkButton from './src/components/Buttons/CkButton';
import CopyButton from './src/components/Buttons/CopyButton';
import CkCard from './src/components/Views/CkCard';

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


  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    if (isConnected && provider) {
      
      const _client = createWalletClient({
        chain: bscTestnet,
        transport: custom(provider),
      });
  
      const _publicClient = createPublicClient({
        chain: bscTestnet,
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
       to: '0xBA02934d2DD50445Fd08E975eDE02CA6C609d4db', // cihan eth chain vitalik.eth
       value: parseEther('0.0000001'),
     });
     setTransferHash(hash);
     return {
       method: 'send transaction',
       response: hash,
     };
   };
   console.log('Transfer hash:',transferHash)

  const onSignMessage = async () => {
    const [address] = await client.getAddresses();

    const signature = await client.signMessage({
      account: address,
      message: 'Hello World!',
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

// console.log(client)
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
    const calculatedBalance = bal*10**-18;
    console.log('wei balance',bal);


    return {
      method: 'balance of contract',
      response: bal,
    };
  }


  const onGetBlock = async () => {
    const block = await publicClient.getBlock({
      blockNumber: 2,
    });
    console.log(block)
    return {
      method: 'get block',
      response: block,
    };
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
    console.log(account)
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
      hash: '0x1e1431ca2def8c0367110e57da85c913968527fcbc5ded14909f369098575e63' // get transaction info about given hash
    });
    console.log('transaction',transaction)
    return {
      method: 'get transaction',
      response: transaction,
    };
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text>App</Text>



      <View style={{width:'50%'}}>
      <SwitchButton isEnabled={isConnected} toggleSwitch={onConnect} backgroundColor={isConnected ? '#3396FF' : '#999'} />
      </View>

      <View style={{width: '50%'}}>
      <CkButton text={"Test"} onPress={()=>{}} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>

      <View style={{width: '100%'}}>
        <CkCard title={'Wallet address'} text={address} backgroundColor={isConnected ? '#3396FF' : '#999'}/>
      </View>




      <Text></Text>
      <View>
        <Text>{client?.chain.name}</Text>
        <Text>{client?.chain.nativeCurrency.name} {client?.chain.nativeCurrency.symbol}</Text>
        <Text>{client?.chain.network}</Text>

      </View>


      <Text style={{color:'red'}}>wallet address: {walletAddress}</Text>
      {/* <Text>0x5c83F38FECcCB5745DEd87F4A17281C7640b47Fb</Text> */}
      <Text>Wallet signature: {walletSignature}</Text>
      <TouchableOpacity style={styles.button} onPress={onConnect}>
          <Text style={styles.buttonText}>
            {isConnected ? 'Disconnect' : 'Connect'}
          </Text>
        </TouchableOpacity>
       {/* <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSendTransaction)}>
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity> */}
         <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={getWalletAddress}>
          <Text style={styles.buttonText}>Get walletAddress</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSignMessage)}>
          <Text style={styles.buttonText}>Sign Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onReadContract)}>
          <Text style={styles.buttonText}>Read Contract</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !isConnected && styles.buttonDisabled]}
          disabled={!isConnected}
          onPress={onAction(onSendTransaction)}>
          <Text style={styles.buttonText}>Send Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
    
    </View>
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