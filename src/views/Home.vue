<template>
  <v-container>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1>Supoort Projects</h1>
      <router-link :to="{ path: '/add-project'}">
          Add Project
      </router-link>
    </div>
    
     
    <div v-bind:key="project.id" v-for="project of projects">
      <ProjectCard :project="project"/>
    </div>
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
    computed: mapGetters(['socialFundraiserBlockchain', 'projectCount']),
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
