<template>
  <div>
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
  </div>
</template>

<script>
import firebase from 'firebase'

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
  methods: {
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

<style>

</style>