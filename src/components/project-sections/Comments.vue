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

      <v-btn class="btn-add" @click="addComment()">
        Add Comment
      </v-btn>

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
      const fileData = JSON.stringify({text: this.comment});
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