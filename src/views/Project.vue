<template>
  <v-container>
    <h1>Project</h1>

    <v-row>
      <v-col>
        <v-card class="mb-2">
          <v-card-text class="font-weight-bold">
            <h2>{{ project.title }}</h2>
            <p>{{ project.description }}</p>
          </v-card-text>
          <v-card-actions class="d-flex justify-space-between align-center">
            <div>
              <v-btn
                color="orange"
                @click="goToFormPage()"
              >
                Donate
              </v-btn>
            </div>
            <div>
              <p class="mt-3 mb-0">{{ project.donationAmount / 10 ** 18}} MATIC Donated</p>
              <p>{{ project.fundAmount / 10 ** 18}} MATIC Left</p>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>
        <v-col
      >
        <img :src="'https://ipfs.io/ipfs/' + project.projectImage" alt="Project Image" class="project-image">
      </v-col>
    </v-row>
    
    <v-card>
      <v-tabs
        v-model="tab"
         fixed-tabs
        background-color="primary"
        dark
      >
        <v-tab
          v-for="item in items"
          :key="item.tab"
        >
          {{ item.tab }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item key="Donations">
          <Donations></Donations>
        </v-tab-item>

        <v-tab-item key="Announcements">
          <Announcements></Announcements>
        </v-tab-item>

        <v-tab-item key="Comments">
          <Comments></Comments>
        </v-tab-item>

         <v-tab-item key="Mint">
          <Mint></Mint>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

<script>
  import { mapGetters } from 'vuex'
  
  export default {
    name: 'Project',
    components: {
      Comment,
    },
    data: () => ({
      project: {},
      tab: null,
      items: [
        { tab: 'Donations'},
        { tab: 'Announcements'},
        { tab: 'Comments'},
        { tab: 'Mint' }
      ]
    }),
    computed: mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
    methods: {
      goToFormPage() {
        this.$router.push(`/project/${this.$route.params.id}/donate`);
      },
      formatDate(dateTimeStamp) {
        const date = new Date(dateTimeStamp * 1000); // x1000 to convert from seconds to milliseconds 
        let stringDate = date.toUTCString();
        stringDate = stringDate.substring(0, stringDate.indexOf("GMT")) + "UTC";
        return stringDate;
      },
    },
    async created() {
      const project = await this.socialFundraiserBlockchain.methods.projects(this.$route.params.id).call()
      this.project = project
    }
  }
</script>
<style lang="scss" scoped>
.btn-add {
  margin-top: -1.5rem !important;
  margin-bottom: 2rem;
}
.project-image {
  width: 100%;
  height: 300px;
}
</style>