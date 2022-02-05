<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>
      
      <v-btn class="btn-add" @click="connectToBlockchain()">
        {{ formatWalletAddress(walletAddress) }}
      </v-btn>
      
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['connectToBlockchain']),
    	formatWalletAddress(address) {
        if(address) return address.substring(0,8) + "..." + address.substring(34,42);
        else return "Open Wallet"
      }
  },
  computed: mapGetters(['walletAddress']),
}

</script>

<style>

</style>