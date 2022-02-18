<template>
  <v-container>
    <h1>Project</h1>

    <v-card
      class="mb-2"
    >
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
        
        <p class="mt-3">{{ project.donationAmount / 10 ** 18}} MATIC Donated</p>
      </v-card-actions>
      
    </v-card>

    <v-card>
      <v-tabs
        v-model="tab"
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
          <h1>Comments</h1>
          <v-textarea
            solo
            class="mb-0"
            rows="4"
            label="Add comment"
            v-model="comment"
          ></v-textarea>
          <v-btn class="btn-add" @click="addComment()">
            Add Comment
          </v-btn>

          <div v-bind:key="comment.id" v-for="comment of comments">
            <Comment :comment="comment"/>
          </div>
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
  import firebase from 'firebase'

  import fb from '../config/firebase'
  import Comment from '../components/Comment.vue'

  export default {
    name: 'Project',
    components: {
      Comment,
    },
    data: () => ({
      project: {},
      comments: [],
      comment: "",
      tab: null,
      items: [
        { tab: 'Donations'},
        { tab: 'Announcements'},
        { tab: 'Comments'},
        { tab: 'Mint' }
      ]
    }),
    components: {
      Comment
    },
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
      addComment() {
        fb.firestore()
          .collection(this.$route.params.id)
          .add({
            text: this.comment,
            name: "Guest",
            image: null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });

        this.comment = "";
      }
    },
    async created() {
      const project = await this.socialFundraiserBlockchain.methods.projects(this.$route.params.id).call()
      this.project = project

      fb.firestore()
        .collection(this.$route.params.id)
        .orderBy('timestamp', 'desc')
        .onSnapshot(snap => {
          const commentData = snap.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            text: doc.data().text,
            data: doc.data()
          }));
          console.log(commentData);
          this.comments = commentData;
        });
    }
  }
</script>
<style lang="scss" scoped>
.btn-add {
  margin-top: -1.5rem !important;
  margin-bottom: 2rem;
}
</style>