
require("dotenv").config();

const SOLANA = require('@solana/web3.js');
const { Connection, PublicKey, LAMPORTS_PER_SOL, clusterApiUrl } = SOLANA;

const QUICKNODE_RPC = process.env.QUICKNODE_SOL_HTTP;
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC);
const SENDER_ADDRESS = process.env.SOLANA_SENDER_ADDRESS;
// const RECEIVER_ADDRESS = process.env.SOLANA_RECEIVER_ADDRESS;

const balance = async () => {
    let senderBalance = await SOLANA_CONNECTION.getBalance(new PublicKey(SENDER_ADDRESS));
    let ReceiverBalance = await SOLANA_CONNECTION.getBalance(new PublicKey(RECEIVER_ADDRESS));
    console.log(`${SENDER_ADDRESS} Wallet Balance: ${senderBalance / LAMPORTS_PER_SOL} SOL`)
    // console.log(`${RECEIVER_ADDRESS} Wallet Balance: ${ReceiverBalance / LAMPORTS_PER_SOL} SOL`)
}

balance()