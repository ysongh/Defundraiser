<template>
  <v-container>
    <h1>My Donation NFT</h1>
    <v-row>
      <v-col
        v-bind:key="nft.id"
        v-for="nft of nfts"
        sm="4"
      >
        <v-card class="mb-2">
          <v-card-text class="font-weight-bold">
            <h2>{{ nft.id }}</h2>
            <p class="mt-3">{{ nft.amount / 10 ** 18}} MATIC Donated</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="orange"
              text
              @click="goToProjectpage(nft.projectId)"
            >
              View Project
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
  computed: mapGetters(['socialFundraiserBlockchain', 'walletAddress']),
  methods: {
    goToProjectpage(id) {
      this.$router.push('/project/' + id);
    }
  },
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