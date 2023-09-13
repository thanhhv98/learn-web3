// 1. Add the Web3 provider logic here:

require("dotenv").config();
const { Web3 } = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_HTTP));

// 2. Create address variables
const receiverAddress = process.env.RECEIVER_ADDRESS;
const senderAddress = process.env.SENDER_ADDRESS;

// 3. Create balances function
const balances = async () => {
    // 4. Fetch balance info
    const receiverBalance = web3.utils.fromWei(await web3.eth.getBalance(receiverAddress), 'ether');
    const senderBalance = web3.utils.fromWei(await web3.eth.getBalance(senderAddress), 'ether');

    console.log(`The balance of ${receiverAddress} is: ${receiverBalance} ETH`);
    console.log(`The balance of ${senderAddress} is: ${senderBalance} ETH`);
};

// 5. Call balances function
balances();
