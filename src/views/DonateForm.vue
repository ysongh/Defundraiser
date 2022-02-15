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

          <v-text-field
            v-model="date"
            label="Date"
            outlined
            dense
            clearable
          ></v-text-field>

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
    date: "",
  }),
  computed: mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
  methods: {
    async donateFund() {
      await this.socialFundraiserBlockchain.methods
        .donateToProject(this.$route.params.id, this.date)
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