<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Support Projects</h1>
      <v-btn
        color="orange"
        elevation="2"
        @click="goToFormPage()"
      >
        <v-icon left>
          mdi-pencil-plus
        </v-icon>Add Project
      </v-btn>
    </div>
     
    <div v-bind:key="project.id" v-for="project of projects">
      <ProjectCard :project="project"/>
    </div>

    <h2 class="text-center mt-10 text-red" v-if="!walletAddress">
      Connect to your Wallet on Polygon Testnet
    </h2>
  </v-container>
</template>

<script>
  import ProjectCard from '../components/ProjectCard.vue'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    data: () => ({
      projects: [],
    }),
    components: {
      ProjectCard
    },
    computed: mapGetters(['socialFundraiserBlockchain', 'walletAddress', 'projectCount']),
    methods: {
      goToFormPage() {
        this.$router.push('/add-project');
      }
    },
    watch: {
      projectCount: async function () {
        let _projects = []

        for(let i = 0; i < this.projectCount; i++){
            const project = await this.socialFundraiserBlockchain.methods.projects(i + 1).call()
            _projects.push(project)
        }

        this.projects = _projects
        console.log(this.projects)
      }
    },
    async created() {
      let _projects = []

      for(let i = 0; i < this.projectCount; i++){
          const project = await this.socialFundraiserBlockchain.methods.projects(i + 1).call()
          _projects.push(project)
      }

      this.projects = _projects
    }
  }
</script>

<style>
  .text-red {
    color: red;
  }
</style>