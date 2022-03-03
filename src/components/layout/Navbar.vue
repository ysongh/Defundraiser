<template>
    <v-app-bar
      class="navbar" 
      dark
      app
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

  .navbar {
    background: radial-gradient(100% 225% at 0% 0%, #DE3E3E 0%, #17115C 100%), radial-gradient(100% 225% at 100% 0%, #FF9040 0%, #FF0000 100%), linear-gradient(180deg, #CE63B7 0%, #ED6283 100%), radial-gradient(100% 120% at 75% 0%, #A74600 0%, #000000 100%), linear-gradient(310deg, #0063D8 0%, #16009A 50%);
    background-blend-mode: overlay, color-dodge, color-burn, color-dodge, normal;
  }
</style>