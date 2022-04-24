<template>
  <v-container>
    <h1>My Donation NFT</h1>

    <div v-bind:key="nft.id" v-for="nft of nfts">
      <h2>{{nft.id}}</h2>
      <p>{{nft.claimDate}}</p>
      <p>{{nft.projectId}}</p>
      <p>{{nft.amount}}</p>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MyDonationNFT',
  data: () => ({
    loading: false,
    nfts: [],
  }),
  computed: mapGetters(['socialFundraiserBlockchain', 'walletAddress', 'projectCount']),
  async created() {
    let _nfts = []
    const totalSupply = await this.socialFundraiserBlockchain.methods.totalSupply().call()

    for(let i = 1; i <= totalSupply; i++){
      const data = await this.socialFundraiserBlockchain.methods.donationNFTs(i).call()

      if(data.donator === this.walletAddress){
        _nfts.push(data)
      }
    }

    this.nfts = _nfts
    console.log(_nfts)
  }
}
</script>

<style>

</style>