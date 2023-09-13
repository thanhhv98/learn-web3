// 1. Add the Web3 provider logic here:
require("dotenv").config();
const { Web3 } = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_HTTP));

const accountFrom = {
    privateKey: process.env.SENDER_PRIVATE_KEY,
    address: process.env.SENDER_ADDRESS,
};
const addressTo = process.env.RECEIVER_ADDRESS;

const send = async () => {
    try {
        // Check sender's balance
        const balance = await web3.eth.getBalance(accountFrom.address);
        const balanceInEther = web3.utils.fromWei(balance, 'ether');

        console.log(`Sender's balance: ${balanceInEther} ETH`);

        const amountToSend = 0.01; // Amount in ETH
        if (parseFloat(balanceInEther) < amountToSend) {
            throw new Error('Balance not enough');
        }

        console.log(`Attempting to send ${amountToSend} ETH from ${accountFrom.address} to ${addressTo}`);

        const gasPrice = await web3.eth.getGasPrice();

        const transactionObject = {
            from: accountFrom.address,
            to: addressTo,
            value: web3.utils.toWei(amountToSend.toString(), 'ether'),
            gas: 21000, // Adjust the gas limit as needed
            gasPrice: gasPrice,
        };

        // sign transaction
        const createTransaction = await web3.eth.accounts.signTransaction(
            transactionObject,
            accountFrom.privateKey
        );

        // send signed transaction
        const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
        console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
};

send();
