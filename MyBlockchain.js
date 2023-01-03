const SHA256 = require("sha256");

// Hash of the block
let hash = "";

// Data
let data = "SAMPLE-TEXT";

// Number added to the hash of a block and when rehashed
// If it's the target hash, the miner earns the block
// "The nonce is the number that blockchain miners are solving to receive the block reward."
// Number used only ONCE
let nonce = 0;

while(hash.substring(0, 3) != "000") {
    // Increment the nonce as long as long as the wanted hash is not found
    ++nonce;
    hash = SHA256(data + nonce.toString());
}

// The hash was found
console.log(nonce);
console.log(hash);