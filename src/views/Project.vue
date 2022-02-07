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
        <v-btn
          color="orange"
          @click="donateFund()"
        >
          Donate
        </v-btn>  
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
          <h1>Donations</h1>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Address
                  </th>
                  <th class="text-left">
                    Amount
                  </th>
                  <th class="text-left">
                    Claim Date
                  </th>
                  <th class="text-left">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="nft in donations"
                  :key="nft.id"
                >
                  <td>{{ nft.donator }}</td>
                  <td>{{ nft.amount / 10 ** 18 }} MATIC</td>
                  <td>{{ formatDate(nft.claimDate) }}</td>
                  <td>
                    <v-btn
                      v-if="project.owner === walletAddress"
                      color="orange"
                      small
                      text
                      @click="claimFund(nft.id)"
                    >
                      Claim
                    </v-btn>
                    <v-btn
                      v-if="nft.donator === walletAddress"
                      color="red"
                      small
                      text
                       @click="revokeFund(nft.id)"
                    >
                      Revoke
                    </v-btn>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-tab-item>

        <v-tab-item key="Announcements">
          <h1>Announcements</h1>
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
          <h1>Mint</h1>
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
      Comment
    },
    data: () => ({
      project: {},
      donations: [],
      comments: [],
      comment: "",
      tab: null,
      items: [
        { tab: 'Donations'},
        { tab: 'Announcements'},
        { tab: 'Comments'},
        { tab: 'Mint' }
      ],
    }),
    components: {
      Comment
    },
    computed: mapGetters(['walletAddress', 'socialFundraiserBlockchain']),
    methods: {
      async donateFund() {
        await this.socialFundraiserBlockchain.methods
          .donateToProject(this.$route.params.id, 1)
          .send({ from: this.walletAddress, value: (1 * 10 ** 18).toString() });
      },
      async claimFund(nftId) {
        await this.socialFundraiserBlockchain.methods
          .claimFundFromFunder(this.$route.params.id, nftId)
          .send({ from: this.walletAddress });
      },
      async revokeFund(nftId) {
        await this.socialFundraiserBlockchain.methods
          .revokeFundFromProject(this.$route.params.id, nftId)
          .send({ from: this.walletAddress });
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
      },
      formatDate(dateTimeStamp) {
        const date = new Date(dateTimeStamp * 1000); // x1000 to convert from seconds to milliseconds 
        let stringDate = date.toUTCString();
        stringDate = stringDate.substring(0, stringDate.indexOf("GMT")) + "UTC";
        return stringDate;
      }
    },
    async created() {
      const project = await this.socialFundraiserBlockchain.methods.projects(this.$route.params.id).call()
      this.project = project

      let donations = await this.socialFundraiserBlockchain.methods.getDonationNFTsByProject(this.$route.params.id).call()
      let arr = []
      for(let id of donations){
        const res = await this.socialFundraiserBlockchain.methods.donationNFTs(id).call()
        arr.push(res);
      }

      this.donations = arr

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