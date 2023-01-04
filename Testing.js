/* Test */
// console.log(SHA256("SAMPLE-TEXT"));

/* FIRST BLOCKCHAIN
    // Check if string is a number
    function isNumeric(str) {
        if (typeof str != "string") return false // we only process strings!  
        return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
            !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
    }

    // Check if address is valid
    function checkValidAddress(str) {
        return true; // as we don't use a server, we can't actually go and check if the address actually exists
        // so we set this as true for now
    }

    let MyBlockchain = "";
    try{
        MyBlockchain = require("./MyBlockchain");
    } catch(exception)
    {
        console.log("An exception occured when getting my blockchain class:\n" + exception);
    }

    // Create blockchain (and genesis block)
    let MyBlockchainName = new MyBlockchain();

    // Add some transactions
    let prompt = "";
    try {
        prompt = require("prompt-sync")({ sigint: true });
    } catch(exception) {
        console.log("Error while loading prompt:\n" + exception);
    }

    // Receive transactions from "server" - command line in our case
    while (true)
    {
        userInput = prompt("Want to make a new transaction? ");
        if(userInput.toLowerCase() == "yes") {

            // Make transaction
            amount = prompt("Amount: ");
            if(isNumeric(amount) == false) {
                console.log("Error: Currency amount not correctly inserted! Aborting...");
                continue;
            }

            sender = prompt("Sender: ");
            if(checkValidAddress(sender) == false) {
                console.log("Error: Sender doesn't exist! Aborting...");
                continue;
            }

            receiver = prompt("Receiver: ");
            if(checkValidAddress(receiver) == false) {
                console.log("Error: Receiver doesn't exist! Aborting...");
                continue;
            }

            MyBlockchainName.createTransaction(amount, sender, receiver); // sending from the 'sender' address to the 'receiver' address 
            MyBlockchainName.addBlockToBlockchain();
        } else {
            break;
        }
    }

    // Create a transaction that will never be added to any block for testing purposes
    MyBlockchainName.createTransaction(100, "address_of_sender", "address_of_receiver");

    // Print the blockchain's chain
    // console.log(MyBlockchainName.getChain());

    // Print the blockchain's data
    // Pending transactions will always be null (if we didn't create one ourselves above),
    // since we're the only user sending transactions that are processed way to fast by our PCs
    // If there would be a real server sending the transactions,
    // they would have to wait for the blockchain to create the blocks, and, due to load of many blocks that need to be created
    // there would be pending transactions as well
    console.log(MyBlockchainName);
 */

/* SECOND BLOCKCHAIN */
// Get blockchain
try{
    var classes = require("./MyBlockchain");
} catch(exception)
{
    console.log("An exception occured when getting my blockchain class:\n" + exception);
}

// Create blockchain (and genesis block)
let MyBlockchainName = new classes.MyBlockchain(3); // 5 is the number of '0' needed to be found by the hash
// to mine the block, it's a difficulty tier

/* TEST one single transaction per block
    console.log("Mining first block...");
    MyBlockchainName.addBlockToBlockchain(new classes.Block(1, Date.now(), {amount : 5}));
    console.log("Mining second block...");
    MyBlockchainName.addBlockToBlockchain(new classes.Block(2, Date.now(), {amount : 10}));

    console.log(JSON.stringify(MyBlockchainName, null, 4));
    console.log("Blockchain validity: " + MyBlockchainName.isChainValid());

    // Try to tamper with the blockchain to see if it knows it has been hacked
    console.log("\nTrying to hack blockchain...");
    MyBlockchainName.chain[1].data = {amount: 10000};
    console.log("Blockchain validity: " + MyBlockchainName.isChainValid());

    console.log("Force recalculate hash...");
    MyBlockchainName.chain[1].currentHash = MyBlockchainName.chain[1].calculateHash();
    console.log("Blockchain validity: " + MyBlockchainName.isChainValid());
*/

// Test multiple transactions per block and getting miner rewards
let i = 0;
let sum1 = 0;
while (i < 10)
{
    ++i;
    MyBlockchainName.createTransaction(new classes.Transaction("fromAddress1", "toAddress1", i));
    sum1+= i;
}

i = 5;
let sum2 = 0;
while (i > 0)
{
    MyBlockchainName.createTransaction(new classes.Transaction("toAddress1", "fromAddress1", i));
    sum2 += i;
    i--;
}

/* TEST blockchain */
console.log("Initial blockchain:")
console.log(MyBlockchainName);

console.log("\n\nStarting the miner. Mining...");
MyBlockchainName.minePendingTransaction("minerAddress");
console.log("Blockchain after miner mined a block:")
console.log(MyBlockchainName);

// The miner will receive his reward ONLY after a new block is mined
console.log("\n\nAmount of currecy received by miner:" + MyBlockchainName.getBalanceOfAddress("minerAddress"));
MyBlockchainName.minePendingTransaction("minerAddress");
console.log("Amount of currecy received by miner:" + MyBlockchainName.getBalanceOfAddress("minerAddress"));

// Check the balance of the two senders
console.log("\n\nSender 1 sent " + sum1 + " and received " + sum2 + " so he has: " + MyBlockchainName.getBalanceOfAddress("fromAddress1"));
console.log("Receiver 1 sent " + sum2 + " and received " + sum1 + " so he has: " + MyBlockchainName.getBalanceOfAddress("toAddress1"));


