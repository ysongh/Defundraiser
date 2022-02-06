<template>
  <v-card
    class="mb-2"
  >
    <v-card-text class="font-weight-bold">
      <h2>{{ project.title }}</h2>
      <p>{{ project.description }}</p>
    </v-card-text>
    <v-card-actions class="d-flex justify-space-between align-center">
      <v-btn
        color="orange"
        text
        @click="goToProjectpage(project.id)"
      >
        View
      </v-btn>  
      <p class="mt-3">{{ project.donationAmount / 10 ** 18}} MATIC Donated</p>
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
    goToProjectpage(id) {
      this.$router.push('/project/' + id);
    }
  }
}
</script>

<style>
</style>