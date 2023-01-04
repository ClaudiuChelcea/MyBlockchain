const SHA256 = require("sha256");

const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // the basic bitcoin wallet

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

    while(hash.substring(0, 3) !== "000") {
        // Increment the nonce as long as long as the wanted hash is not found
        ++nonce;
        hash = SHA256(data + nonce.toString());
    }

    // The hash was found
    console.log(nonce);
    console.log(hash);
*/
class Transaction
{
    // Constructor
    constructor(sender = "NULL", receiver = "NULL", amount = 0)
    {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
    }

    /* Methods */

    // Calculate hash
    calculateHash()
    {
        return SHA256(this.sender + this.receiver + this.amount).toString();
    }

    // Check if you own the currency
    signTransaction(signingKey)
    {
        // Check if the public key is from the correct address
        if(signingKey.getPublic('hex') !== this.sender && this.sender != "NULL") // NULL sender = me, admin
        {
            throw new Error("You don't own this wallet!");
        }


        const hashKey = this.calculateHash();
        const sig = signingKey.sign(hashKey, 'base64');
        this.signature = sig.toDER('hex');
    }

    // Check if the transaction is valid
    isValid()
    {
        if(this.sender === "NULL")
            return true; // we are rewarding them for mining
        
        if(!this.signature || this.signature.length <= 0)
        {
            throw new Error("No signature!");
        }

        const publicKey = ec.keyFromPublic(this.sender, 'hex');
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}

class Block
{
    // Constructor
    constructor(
        // _Block_number = 0,
        _timestamp = Date.now(),
        _transactions = "NULL",
        _hashOfPreviousBlock = "NULL",
        _nonce = 0)
        {
            // this.Block_number = _Block_number;
            this.timestamp = _timestamp;
            this.transactions = _transactions;
            this.previousHash = _hashOfPreviousBlock;
            this.currentHash = this.calculateHash();
            this.nonce = _nonce;
        }

    /* Methods */

    // Calculate hash
    calculateHash()
    {
        return SHA256
        (
            // this.Block_number + 
            this.previousHash + 
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce
        ).toString();
    }

    // Mine block
    mineBlock(difficulty)
    {
        while(this.currentHash.substring(0, difficulty) !== Array(difficulty + 1).join("0"))
        {
            ++this.nonce;
            this.currentHash = this.calculateHash();
        }
    }

    // Check if all transactions are valid in the block
    iAmValid()
    {
        for(const blockTransaction of this.transactions)
        {
            if(blockTransaction.isValid() == false)
                return false;
        }

        return true;
    }
}

class MyBlockchain
{
    // Constructor
    constructor(_difficulty)
    {
        this.chain = [this.createGensisBlock()]; // array of blocks
        this.difficulty = _difficulty;
        this.pendingTransactions = []; // array of pending transactions
        this.miningRewards = 10; // 10 coins given to miners for each block
    }

    /* Methods */

    // Create Genesis block
    createGensisBlock()
    {
        // return new Block(0, Date.now(), "Genesis block", "NULL");
        return new Block(Date.now(), "Genesis block", "NULL");
    }

    // Get the last block
    getLastBlock()
    {
        return this.chain[this.chain.length - 1];
    }

    // Create a transaction and add it to the transactions
    createTransaction(transaction)
    {
        // Check content
        if(transaction.sender == "NULL") {
            this.pendingTransactions.push(transaction);
        } else {
            if(!transaction.sender || !transaction.receiver || !transaction.amount || transaction.amount <= 0)
            {
                throw new Error("Transaction invalid!");
            }

            if(transaction.isValid() == false)
            {
                throw new Error("Transaction was not signed!");
            }

            if(this.getBalanceOfAddress(transaction.sender) < transaction.amount) {
                throw new Error("You don't have enough currency to send!");
            }

            this.pendingTransactions.push(transaction);
        }

    }
       
    // Mine pending transaction - reward miner
    minePendingTransaction(minerAddress)
    {
        // In reality, miners can pick what transactions they want
        // So we couldn't give them all of them, plus the fact that no
        // block can be bigge than 1MB
        // In my case, being the only miner, I will take all transactions
        // and not split them here
        let blockToMine = new Block(Date.now(), this.pendingTransactions, this.getLastBlock().currentHash);
        blockToMine.mineBlock(this.difficulty);

        this.chain.push(blockToMine);

        // Reward the miner
        console.log("Block successfully mined!");
        this.pendingTransactions = [];
        this.pendingTransactions.push(new Transaction("NULL", minerAddress, this.miningRewards));
    }

    // Find balance of address
    getBalanceOfAddress(address)
    {
        let balanceOfUser = 0;
        
        // We can't just retrieve it, that's not how blockchains work
        // We have to calculate all the transactions of an address to calculate the value in their account each time
        for(let myBlock of this.chain)
        {
            for(let action of myBlock.transactions) {
                if(action.receiver == address) { // sends
                    balanceOfUser = balanceOfUser + action.amount;
                } else if (action.sender == address) {
                    balanceOfUser = balanceOfUser - action.amount;
                }
            }
        }

        return balanceOfUser;
    }

    /* 
    // Generate hash
    generateHash(hashOfPreviousBlock, timestamp, pendingTransactions)
    {
        let hash = "";
        let nonce = 0;

        while(hash.substring(0,3) !== "000") 
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
    */

    // Create block
    addBlockToBlockchain(newBlock)
    {
       // const _timestamp = Date.now();
       // const _pendingTransactions = this.pendingTransactions;
       // const PrevBlock = this.getLastBlock();
       // const generateHash = this.generateHash(PrevBlock.hashOfThisBlock, _timestamp, _pendingTransactions);

        // Create the new block and add it to the blockchain
       newBlock.previousHash = this.getLastBlock().currentHash
       newBlock.mineBlock(this.difficulty);
       // newBlock.currentHash = newBlock.calculateHash(); <- prone to hacking, changed to proof of work
       this.chain.push(newBlock);

        // Remove the transaction now that it is complete, clear them
        // this.pendingTransactions = [];

        // return newBlock;
    }

    // Check if the blockchain is valid
    isChainValid()
    {
        for(let i = 1; i < this.chain.length; ++i)
        { // We ignore genesis block so we start from 1
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];
            
            // Check block hashes
            if(currentBlock.currentHash !== currentBlock.calculateHash() || currentBlock.previousHash !== previousBlock.currentHash)
            {
                return false;
            }

            // Check block transactions are signed with public key correctly
            if(currentBlock.iAmValid() == false)
            {
                return false;
            }
        }

        return true;
    }

    /* Getters and setters */

    // Get the chain
    getChain()
    {
        return this.chain;
    }

    getChainSize()
    {
        return this.chain.length;
    }
}

module.exports =
{
    MyBlockchain : MyBlockchain,
    Block : Block,
    Transaction: Transaction
}