# Social Fundraiser
A crowdfunding dapp for projects with funds being put in a time lock contract

- Fleek was used to store project image on IPFS
- Pinata was used to store comment data as txt file on IPFS

## Technologies
- Vue 2
- Vuex 3
- Vuetify
- Truffle
- Web3.js
- Fleek
- Pinata
- NFTPort API

## Running the dapp on local host
- Clone or download this repository
- Run `npm i` to install the dependencies
- Install and open up Ganache and click "Quickstart"
- Create a file called '.env' on the root folder and add the following code
```
MNEMONIC=< Your mnemonic >
ALCHEMYAPI_KEY = < Your Alchemy API key >
```
- Run `truffle migrate` to deploy the contract
- Create a file called 'apikeys.js' on the src/config folder and add the following code
```
export const NFTPORT_APIKEY = "< Get API Key from NFT Port >";
export const FLEEK_APIKEY = "< Get API Key from Fleek >";
export const FLEEK_APISECRET = "< Get API Secret from Fleek >";
export const PINATA_APIKEY = "< Get API Key from Pinata >";
export const PINATA_SECRET_APIKEY ="< Get API Secret from Pinata >";
```
- Run `npm start` to start the dapp