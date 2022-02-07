import Vue from 'vue'
import Vuex from 'vuex'
import Web3 from 'web3'

import SocialFundraiser from '../abis/SocialFundraiser.json'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    walletAddress: '',
    socialFundraiserBlockchain: null,
    projectCount: 0,
    balance: 0
  },
  getters: {
    walletAddress: state => state.walletAddress,
    socialFundraiserBlockchain: state => state.socialFundraiserBlockchain,
    projectCount: state => state.projectCount,
    balance: state => state.balance,
  },
  mutations: {
    setWalletAddress: (state, walletAddress) => (state.walletAddress = walletAddress),
    setSocialFundraiserBlockchain: (state, socialFundraiserBlockchain) => (state.socialFundraiserBlockchain = socialFundraiserBlockchain),
    setProjectCount: (state, projectCount) => (state.projectCount = projectCount),
    setBalance: (state, balance) => (state.balance = balance)
  },
  actions: {
    async connectToBlockchain({ commit }) {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
      }
      else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      }
      else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }

      const web3 = window.web3;

      const address = await web3.eth.getAccounts();
      commit('setWalletAddress', address[0]);

      const networkId = await web3.eth.net.getId();
      const networkData = SocialFundraiser.networks[networkId];

      if (networkData) {
        const abi = SocialFundraiser.abi;
        const address = SocialFundraiser.networks[networkId].address;

        const blockchain = new web3.eth.Contract(abi, address);
        commit('setSocialFundraiserBlockchain', blockchain);

        const projectCount = await blockchain.methods.projectCount().call();
        commit('setProjectCount', projectCount);
      } else {
        window.alert('Contract is not deployed to detected network.')
      }
    },
    async getWalletBalance({ commit }, walletAddress) {
      const balance = await window.web3.eth.getBalance(walletAddress);
      console.log(balance, "bla")
      commit('setBalance', balance / 10 ** 18);
    }
  },
  modules: {
  }
})
