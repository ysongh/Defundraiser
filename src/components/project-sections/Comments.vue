<template>
  <v-container>
    <h1>Comments</h1>
      <v-textarea
        solo
        class="mb-0"
        rows="4"
        label="Add comment"
        v-model="comment"
      ></v-textarea>

      <v-btn  v-if="!loading" class="btn-add mb-6" color="orange" @click="addComment()">
        Add Comment
      </v-btn>

      <div class="text-center mb-3" v-else>
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-bind:key="comment" v-for="comment of comments">
        <Comment :commentCid="comment"/>
      </div>
  </v-container>
</template>

<script>
import firebase from 'firebase'
import axios from "axios"
import { mapGetters } from 'vuex'

import { PINATA_APIKEY, PINATA_SECRET_APIKEY } from '../../config/apikeys'
import fb from '../../config/firebase'
import Comment from '../Comment.vue'

export default {
  name: 'Comments',
  data: () => ({
    loading: false,
    comments: [],
    comment: "",
  }),
  components: {
    Comment
  },
  computed: {
    ...mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
    isDisabled() {
      return !this.title || !this.description;
    },
  },
  methods: {
    async addComment() {
      // fb.firestore()
      //   .collection(this.$route.params.id)
      //   .add({
      //     text: this.comment,
      //     name: "Guest",
      //     image: null,
      //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      //   });

      // this.comment = "";

      // Create Json file


      try {
        this.loading = true

        const fileData = JSON.stringify({
          text: this.comment,
          name: "Guest",
          timestamp: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`
        });
        const blob = new Blob([fileData], {type: "text/plain"});

        let data = new FormData();
        data.append('file', blob);

        const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", data, {
          maxContentLength: "Infinity",
          headers: {
            pinata_api_key: PINATA_APIKEY, 
            pinata_secret_api_key: PINATA_SECRET_APIKEY,
          },
        })

        console.log(res);

        await this.socialFundraiserBlockchain.methods
          .addCommentForProject(this.$route.params.id, res.data.IpfsHash)
          .send({ from: this.walletAddress })

        const newComments = await this.socialFundraiserBlockchain.methods.getCommentsByProject(this.$route.params.id).call()
        this.comments = newComments;

        this.loading = false
      } catch(error) {
        console.log(error);
        this.loading = false
      }
    }
  },
  async created() {
    // fb.firestore()
    //   .collection(this.$route.params.id)
    //   .orderBy('timestamp', 'desc')
    //   .onSnapshot(snap => {
    //     const commentData = snap.docs.map(doc => ({
    //       id: doc.id,
    //       name: doc.data().name,
    //       text: doc.data().text,
    //       data: doc.data()
    //     }));
    //     console.log(commentData);
    //     this.comments = commentData;
    //   });
    const newComments = await this.socialFundraiserBlockchain.methods.getCommentsByProject(this.$route.params.id).call()
    this.comments = newComments;
  }
}
</script>

<style>
</style>