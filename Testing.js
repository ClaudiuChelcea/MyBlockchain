/* Test */
// console.log(SHA256("SAMPLE-TEXT"));

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

