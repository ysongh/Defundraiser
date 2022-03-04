<template>
  <v-container>
    <v-card
      class="mx-auto my-12 pt-3"
      elevation="2"
      max-width="450"
    >
      <v-card-text>
        <h1>Create Project</h1>
        <form class="mt-4">
          <v-text-field
            v-model="title"
            label="Title"
            outlined
            dense
            clearable
          ></v-text-field>

          <v-textarea
            solo
            class="mb-0"
            rows="4"
            label="Description"
            v-model="description"
          ></v-textarea>

          <v-file-input
            label="Upload Image"
            outlined
            dense
            prepend-icon="mdi-camera"
            v-model="file"
          ></v-file-input>

          <v-btn
            class="mb-4"
            @click="createQuestion()"
            block
            color="primary"
            :disabled=isDisabled
          >
            Create
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "AddProject",
  data: () => ({
    title: "",
    description: "",
    file: null,
  }),
  computed: {
    ...mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
    isDisabled() {
      return !this.title || !this.description;
    },
  },
  methods: {
    ...mapActions(['connectToBlockchain']),
    async createQuestion() {
      console.log(this.title, this.description)

      await this.socialFundraiserBlockchain.methods
        .createProject(this.title, this.description)
        .send({ from: this.walletAddress })

      this.connectToBlockchain();
      this.$router.push('/')
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