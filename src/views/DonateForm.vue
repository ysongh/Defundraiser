<template>
  <v-container>
    <v-card
      class="mx-auto my-12 pt-3"
      elevation="2"
      max-width="600"
    >
      <v-card-text>
        <h1>Donate to this project</h1>
        <form class="mt-4">
          <v-text-field
            v-model="amount"
            label="Amount"
            outlined
            dense
            clearable
          ></v-text-field>

          <p>Select the date for project to claim the fund</p>
          <v-date-picker v-model="picker" full-width></v-date-picker>
          <br>
          <v-btn
            class="mb-4"
            @click="donateFund()"
          >
            Send
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: "DonateForm",
  data: () => ({
    amount: "",
    picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  }),
  computed: mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
  methods: {
    async donateFund() {
      const claimDate = new Date(this.picker)
      const claimDateSeconds = claimDate.getTime() / 1000
      const currentDate = new Date(Date.now())
      const currentDateSeconds = currentDate.getTime() / 1000
      const newDateSeconds = Math.floor(+claimDateSeconds - +currentDateSeconds);
      
      await this.socialFundraiserBlockchain.methods
        .donateToProject(this.$route.params.id, newDateSeconds.toString())
        .send({ from: this.walletAddress, value: (+this.amount * 10 ** 18).toString() })

      this.$router.push(`/project/${this.$route.params.id}`)
    }
  }
}
</script>

<style>
  .flexRow {
    display: flex !important;
  }

  .v-input--selection-controls {
    margin-top: 5px;
    margin-left: 7px;
  }
</style>