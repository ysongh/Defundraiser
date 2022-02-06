<template>
  <v-card
    class="mb-2"
  >
    <v-card-text class="font-weight-bold">
      <h2>{{ project.title}}</h2>
      <p>{{ project.description}}</p>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between align-center">
      <v-btn
        color="orange"
        text
        @click="goToProjectpage()"
      >
        View
      </v-btn>  
      <p class="mt-3">{{ project.donationAmount}} MATIC Donated</p>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProjectCard",
  props: {
    project: Object
  },
  methods: {
    goToProjectpage() {
      this.$router.push('/project');
    }
  }
}
</script>

<style>
</style>