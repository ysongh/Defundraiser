<template>
  <v-container>
    <h1>Project</h1>
    <v-btn
      class="mb-4"
      @click="addComment()"
    >
      Add Comment
    </v-btn>
  </v-container>
</template>

<script>
  import firebase from 'firebase';

  import fb from '../config/firebase';

  export default {
    name: 'Project',
    methods: {
      addComment() {
        fb.firestore()
          .collection("1")
          .add({
            text: "Test",
            name: "Guest",
            image: null,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      }
    },
    async created() {
      console.log("c");
      fb.firestore()
        .collection("1")
        .orderBy('timestamp', 'desc')
        .onSnapshot(snap => {
          const commentData = snap.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            text: doc.data().text,
            data: doc.data()
          }));
          console.log(commentData);
        });
    }
  }
</script>
