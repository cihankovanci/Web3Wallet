import { Core } from '@walletconnect/core'
// import { ICore } from '@walletconnect/types' <- Add if using TS
import { Web3Wallet, IWeb3Wallet } from '@walletconnect/web3wallet'

// export let web3wallet: IWeb3Wallet <- Add if using TS
// export let core: ICore <- Add if using TS

const core = new Core({
  projectId: 'a51c11453355128de6ffdff24866af5e'
})

export async function createWeb3Wallet() {
  const web3wallet = await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
      name: 'Demo React Native Wallet',
      description: 'Demo RN Wallet to interface with Dapps',
      url: 'www.walletconnect.com',
      icons: []
    }
  })
}

export async function pair(params) {
    return await core.pairing.pair({ uri: params.uri })
}
