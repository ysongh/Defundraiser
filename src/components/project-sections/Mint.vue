<template>
  <v-card
    class="mx-auto my-12 pt-3"
    elevation="2"
    max-width="600"
  >
    <v-card-text>
      <h1>Mint NFT for Funder</h1>
      <form class="mt-4">
        <v-text-field
          v-model="title"
          label="Title"
          outlined
          dense
          clearable
        ></v-text-field>

        <v-text-field
          v-model="address"
          label="Address"
          outlined
          dense
          clearable
        ></v-text-field>

        <v-textarea
          solo
          class="mb-0"
          rows="4"
          label="Description"
          v-model="description"
        ></v-textarea>

          <v-file-input
          label="Image input"
          outlined
          dense
          v-model="file"
        ></v-file-input>

        <v-btn
          class="mb-4"
          @click="mintNFT()"
        >
          Mint
        </v-btn>
        <p v-if="txURI">
          Success, see transaction 
          <a :href="txURI" target="_blank" rel="noopener noreferrer">
              {{txURI}}
          </a>
        </p>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import {NFTPORT_APIKEY}  from '../../config/apikeys'

export default {
  name: 'Mint',
  data: () => ({
    title: "",
    description: "",
    address: "",
    file: null,
    txURI: ""
  }),
  methods: {
    async mintNFT() {
      console.log(this.title, this.description, this.address, this.file)
      
      const form = new FormData();
      form.append('file', this.file);

      const options = {
        method: 'POST',
        body: form,
        headers: {
          "Authorization": NFTPORT_APIKEY,
        },
      };

      const response = await fetch("https://api.nftport.xyz/easy_mint?" + new URLSearchParams({
        chain: 'polygon',
        name: this.name,
        description: this.description,
        mint_to_address: this.address,
      }), options);

      const json = await response.json();
      console.log(json);
      this.txURI = json.transaction_external_url;
    },
  }
}
</script>

<style>

</style>