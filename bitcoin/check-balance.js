require("dotenv").config();

const axios = require('axios');

const addressToCheck = process.env.BITCOIN_SENDER_ADDRESS;

const apiUrl = `https://blockstream.info/testnet/api/address/${addressToCheck}/utxo`;

axios.get(apiUrl)
    .then(response => {
        const utxos = response.data;
        // console.log(response.data)
        let balance = 0;
        for (const utxo of utxos) {
            balance += utxo.value;
        }
        console.log(`the balance of ${addressToCheck} is ${balance * 0.00000001} BTC`);
    })
    .catch(error => {
        console.error('Error', error);
    });
