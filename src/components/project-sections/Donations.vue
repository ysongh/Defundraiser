<template>
  <div>
    <h1>Donations</h1>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Address
            </th>
            <th class="text-left">
              Amount
            </th>
            <th class="text-left">
              Claim Date
            </th>
            <th class="text-left">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="nft in donations"
            :key="nft.id"
          >
            <td>{{ nft.donator }}</td>
            <td>{{ nft.amount / 10 ** 18 }} MATIC</td>
            <td>{{ formatDate(nft.claimDate) }}</td>
            <td>
              <v-btn
                v-if="project.owner === walletAddress"
                color="orange"
                small
                text
                @click="claimFund(nft.id)"
              >
                Claim
              </v-btn>
              <v-btn
                v-if="nft.donator === walletAddress"
                color="red"
                small
                text
                  @click="revokeFund(nft.id)"
              >
                Revoke
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "Donations",
  data: () => ({
    donations: [],
  }),
  computed: mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
  methods: {
    async claimFund(nftId) {
      await this.socialFundraiserBlockchain.methods
        .claimFundFromFunder(this.$route.params.id, nftId)
        .send({ from: this.walletAddress });
    },
    async revokeFund(nftId) {
      await this.socialFundraiserBlockchain.methods
        .revokeFundFromProject(this.$route.params.id, nftId)
        .send({ from: this.walletAddress });
    },
    formatDate(dateTimeStamp) {
      const date = new Date(dateTimeStamp * 1000); // x1000 to convert from seconds to milliseconds 
      let stringDate = date.toUTCString();
      stringDate = stringDate.substring(0, stringDate.indexOf("GMT")) + "UTC";
      return stringDate;
    }
  },
  async created() {
    const project = await this.socialFundraiserBlockchain.methods.projects(this.$route.params.id).call()
    this.project = project

    let donations = await this.socialFundraiserBlockchain.methods.getDonationNFTsByProject(this.$route.params.id).call()
    let arr = []
    for(let id of donations){
      const res = await this.socialFundraiserBlockchain.methods.donationNFTs(id).call()
      arr.push(res);
    }

    this.donations = arr
  }
}
</script>

<style>

</style>