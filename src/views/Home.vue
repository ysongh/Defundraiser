<template>
  <v-container>
    <h1>Defundraiser</h1>
    <router-link :to="{ path: '/add-project'}">
      Add Project
    </router-link>
     
  </v-container>
</template>

<script>

  export default {
    name: 'Home',

    components: {
      
    },
  }
</script>
