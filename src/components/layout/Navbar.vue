<template>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container class="d-flex justify-space-between align-center">
        <router-link :to="{ path: '/'}">
          <img
            class="logo"
            alt="Logo"
            src="../../assets/logo.png"
          >
        </router-link>
        
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <p class="mt-4 mr-4" v-if="walletAddress">
            {{balance}} MATIC
          </p>
          <v-btn class="btn-add" @click="connect()">
            {{ formatWalletAddress(walletAddress) }}
          </v-btn>
        </div>
      </v-container>
    </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Navbar',
  methods: {
    ...mapActions(['connectToBlockchain', 'getWalletBalance']),
    async connect() {
      await this.connectToBlockchain();
      await this.getWalletBalance(this.walletAddress);
    },
    formatWalletAddress(address) {
      if(address) return address.substring(0,8) + "..." + address.substring(34,42);
      else return "Connect Wallet"
    }
  },
  computed: mapGetters(['walletAddress', 'balance']),
}

</script>

<style>
  .logo {
    width: 100px;
  }
</style>