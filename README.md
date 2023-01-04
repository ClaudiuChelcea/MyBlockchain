# MyBlockchain

Repo in which I create my own blockchain, token and smart contracts for learning purposes.

If you want to run, you need to:
* have 'npm' installed 
* npm install prompt-sync
* npm install sha256
* run "node Testing.js"

Blockchain:
* Language used - JavaScript
* Proof-of-work concept used
* Genesis block uses Date.now() as timestamp for learning purposes
* The transactions are simulated (I create them myself from the code & UI)
* Each block contains a single transaction (this is just for the fact that, because I do the transactions myself,
if I wanted to have 2000 transactions per block like Bitcoin, I would need to type 2000 transactions myself in the command line,
which would take very much time)
* The rule of our blockchain's hash to be correct after adding the nonce is having the first N characters '0', where N is the difficulty set from the code (take for comparison Bitcoin's genesis block hash:
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f)

/* THE ONLY THING THAT MIGHT DIFFER
FROM A NORMAL BLOCKCHAIN ARE HOW THE TRANSACTIONS ARE RECEIVED,
SINCE THE TRANSACTIONS WOULD BE RECEIVED FROM THE SERVER.

IN OUR CODE, AS I DON'T HAVE A SERVER, I'LL MAKE
THE TRANSACTIONS MYSELF */

Smart Contract:
* Language used - Solidity
* Solidy version required - 0.8.7 or higher
* Contract tested with Remix Ethereum

Token:
* Listed on BNB blockchain (for having little gas fees)
RPC URL: https://bsc-dataseed.binance.org/
ChainID: 56 (0x38 in hexa for BNB)
Symbol: BNB
Block Explorer URL: https://bscscan.com
Contract: 0xa220aF4153b6a8Ff687607A2d3B226b7bfa0b46F
Name: LionheadRabbitToken - named after the race of my pet, a lion-head rabbit :)
Symbol: LRT

<hr>
Updates:
<br>
*-* Blockchain<br>
* Reward with crypto block miners<br>
* Allow multiple transactions per block for scalability<br>
* Implement UI<br>
* Sign transactions with public and private key to allow people to spend only their money<br>
<br>
* Token:<br>
* Made the contract non-pausable<br>
* Submitted request to BSCScan to upload a logo to my coin<br>
