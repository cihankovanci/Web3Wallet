import {IProviderMetadata} from '@walletconnect/modal-react-native';

const PROJECT_ID = 'a51c11453355128de6ffdff24866af5e';

const providerMetadata: IProviderMetadata = {
  name: 'Modal with Viem',
  description: 'RN example using Viem by WalletConnect',
  url: 'https://walletconnect.com/',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'ckwallet://',
  },
};

const sessionParams = {
  namespaces: {
    eip155: {
      methods: ['eth_sendTransaction', 'personal_sign'],
      chains: ['eip155:97'],
      events: ['chainChanged', 'accountsChanged'],
      rpcMap: {},
    },
  },
};

export default {
  PROJECT_ID,
  providerMetadata,
  sessionParams,
};
