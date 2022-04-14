<template>
  <v-card
    class="mb-1"
  >
    <v-card-text class="font-weight-bold">
      {{ comment.text}}
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt="User"
            src="comment.text"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ comment.name }} - {{ comment.timestamp }}</v-list-item-title>
        </v-list-item-content>

        <v-row
          align="center"
          justify="end"
        >
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios"

export default {
  props: {
    commentCid: String
  },
  data: () => ({
    comment: {}
  }),
  async created() {
    console.log(this.commentCid)

    const res = await axios.get("https://gateway.pinata.cloud/ipfs/" + this.commentCid);
    console.log(res);
    this.comment = res.data;
     console.log(this.comment);
  }
}
</script>

<style sc>
  .mb-1{
    margin-bottom: 2rem;
  }
</style>