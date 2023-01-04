const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // the basic bitcoin wallet

const keyPair = ec.genKeyPair(); // generate key-pair

// GET KEYS
const publicKey = keyPair.getPublic('hex');
const privateKey = keyPair.getPrivate('hex');

// Test
console.log(publicKey);
console.log(privateKey);