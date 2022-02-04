<template>
  <v-container>
    <h1>Project</h1>
  </v-container>
</template>

<script>
  import fb from '../config/firebase';

  export default {
    name: 'Project',
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
