const { BIP32Factory } = require('bip32')
const ecc = require('tiny-secp256k1')
const bip32 = BIP32Factory(ecc)
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

const network = bitcoin.networks.bitcoin

const path = `m/44'/0'/0'/0` // BIP32

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
let root = bip32.fromSeed(seed, network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: bitcoin.networks.testnet
}).address

console.log(`

Wallet generated: 

- Address : ${btcAddress},
- Key : ${node.toWIF()},
- Mnemonic : ${mnemonic}

`)