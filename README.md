# MyBlockchain

Repo in which I create my own blockchain, cryptocurrency and smart contracts for learning purposes.

If you want to run, you need to:
* have 'npm' installed 
* npm install prompt-sync
* npm install sha256
* run "node Testing.js"

Blockchain:
* Language used - JavaScript
* Proof-of-work concept used
* Genesis block uses Date.now() as timestamp for learning purposes
* The transactions are simulated (I create them myself from the code)
* Each block contains a single transaction (this is just for the fact that, because I type the transactions myself,
if I wanted to have 2000 transactions per block like Bitcoin, I would need to type 2000 transactions myself in the command line,
which would take very much time)
* The rule of our blockchain's hash to be correct after adding the nonce is having the first three characters '000'

/* THE ONLY THING THAT MIGHT DIFFER
FROM A NORMAL BLOCKCHAIN ARE HOW THE TRANSACTIONS ARE RECEIVED,
SINCE THE TRANSACTIONS WOULD BE RECEIVED FROM THE SERVER.

IN OUR CODE, AS I DON'T HAVE A SERVER, I'LL MAKE
THE TRANSACTIONS FROM COMMAND LINE */

Smart Contract:
* Language used - Solidity
* Solidy version required - 0.8.7 or higher