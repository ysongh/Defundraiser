# Social Fundraiser
A crowdfunding dapp for projects with funds being put in a time lock contract

## Technologies
- Vue 2
- Vuex 3
- Vuetify
- Truffle
- Web3.js
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
- Create a file called 'config.js' on the src folder and add the following code
```
export const NFTPORT_APIKEY = "< Get API Key from NFT Port >";
```
- Run `npm start` to start the dapp