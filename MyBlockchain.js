const SHA256 = require("sha256");

/* DEMO 
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
*/

class MyBlockchain
{
    // Constructor
    constructor()
    {
        this.chain = [
            {
                Block_number: 1,
                timestamp: Date.now(),
                pendingTransactions: [],
                nonce: 0,
                hashOfThisBlock: "Starting Hash",
                hashOfPreviousBlock: "NULL"
            }
        ]; // array of blocks
        this.pendingTransactions = []; // array of pending transactions
    }

    /* Methods */

    // Create Genesis block
    createGensisBlock()
    {
        return {
            Block_number: 1,
            timestamp: Date.now(),
            pendingTransactions: [],
            nonce: 0,
            hashOfThisBlock: "Starting Hash",
            hashOfPreviousBlock: "NULL"
        };
    }

    // Create block with params
    createBlock(_index, _timestamp, _transactions, _nonce, _hashOfPreviousBlock, _hashOfThisBlock)
    {
        return {
            Block_number: _index,
            timestamp: _timestamp,
            pendingTransactions: _transactions,
            nonce: _nonce,
            hashOfThisBlock: _hashOfThisBlock,
            hashOfPreviousBlock: _hashOfPreviousBlock
        };
    }

    // Get the last block
    getLastBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    // Generate hash
    generateHash(hashOfPreviousBlock, timestamp, pendingTransactions)
    {
        let hash = "";
        let nonce = 0;

        while(hash.substring(0,3) != "000") 
        {
            nonce++;
            hash = SHA256(
                hashOfPreviousBlock + 
                timestamp + 
                JSON.stringify(pendingTransactions) + 
                nonce
                ).toString();
        }

        // If we are here, the block has been calculated correctly
        return { hash, nonce };
    }

    // Create transaction
    createTransaction(amount, sender, reciever)
    {
        this.pendingTransactions.push(
            {
                amount,
                sender,
                reciever
            }
        );
    }

    // Create block
    addBlockToBlockchain()
    {
        const _timestamp = Date.now();
        const _pendingTransactions = this.pendingTransactions;
        const PrevBlock = this.getLastBlock();
        const generateHash = this.generateHash(PrevBlock.hashOfThisBlock, _timestamp, _pendingTransactions);

        // Create the new block and add it to the blockchain
        const newBlock = 
        {
            Block_number: this.chain.length + 1,
            timestamp: _timestamp,
            pendingTransactions: _pendingTransactions,
            nonce: generateHash.nonce,
            hashOfThisBlock: generateHash.hash,
            hashOfPreviousBlock: PrevBlock.hashOfThisBlock
        };
        this.chain.push(newBlock);

        // Remove the transaction now that it is complete, clear them
        this.pendingTransactions = [];

        return newBlock;
    }

    /* Getters and setters */

    // Get the chain
    getChain()
    {
        return this.chain;
    }
}

module.exports = MyBlockchain;