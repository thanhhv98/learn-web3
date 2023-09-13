require("dotenv").config();

const web3 = require("@solana/web3.js");
// Connect to cluster
const connection = new web3.Connection(
    process.env.QUICKNODE_SOL_HTTP,
    'confirmed',
);

let secret = process.env.SOLANA_SENDER_SECRET_KEY;
secret = secret.split(",")

const from = web3.Keypair.fromSecretKey(new Uint8Array(secret));

const transaction = async () => {
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: from.publicKey,
            toPubkey: web3.Keypair.generate().publicKey, // create a random receiver
            lamports: web3.LAMPORTS_PER_SOL / 10, // 0.1
        }),
    );

    // Sign transaction, broadcast, and confirm
    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [from],
    );
    console.log('SIGNATURE', signature);
}

transaction()