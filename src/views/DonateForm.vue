<template>
  <v-container>
    <v-card
      class="mx-auto my-8 pt-3"
      elevation="2"
      max-width="450"
    >
      <v-card-text>
        <h1>Donate to this project</h1>
        <form class="mt-4">
          <v-text-field
            v-model="amount"
            label="Amount (MATIC)"
            outlined
            dense
            clearable
          ></v-text-field>

          <p>Select the date for project to claim the fund</p>
          <v-date-picker v-model="picker" full-width elevation="1"></v-date-picker>
          <br>
          <v-btn
            v-if="!loading"
            class="mb-4"
            block
            color="primary"
            @click="donateFund()"
            :disabled=isDisabled
          >
            Send
          </v-btn>
          <div class="text-center" v-else>
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>
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
    loading: false,
    amount: "",
    picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)
  }),
  computed: {
    ...mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
    isDisabled() {
      return !this.amount || +this.amount === 0
    },
  },
  methods: {
    async donateFund() {
      try{
        this.loading = true
        const claimDate = new Date(this.picker)
        const claimDateSeconds = claimDate.getTime() / 1000
        const currentDate = new Date(Date.now())
        const currentDateSeconds = currentDate.getTime() / 1000
        const newDateSeconds = Math.floor(+claimDateSeconds - +currentDateSeconds);
        
        await this.socialFundraiserBlockchain.methods
          .donateToProject(this.$route.params.id, newDateSeconds.toString())
          .send({ from: this.walletAddress, value: (+this.amount * 10 ** 18).toString() })

        this.loading = false
        this.$router.push(`/project/${this.$route.params.id}`)
      } catch(error) {
        console.log(error);
        this.loading = false
      }
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