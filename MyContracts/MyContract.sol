// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.7;

/**
 * @title MyContract
 */
contract MyContract
{
    // My block
    struct MyBlock
    {
        uint256 index;
        uint256 timestamp;
        uint256 amount;
        address sender;
        address recipient;
    }

    // My chain of blocks
    struct chainOfBlocks
    {
        MyBlock[] chain; // create the chain of blocks
        uint256 chainSize;
    }
    chainOfBlocks myChain;

    // The same as on the blockchain
    event AddBlockToChain(
        uint amount,
        address sender,
        address recipient
    );

    // Constructor
    constructor()
    {
        myChain.chainSize = 0;
    }

    /* Methods */

    // Add block to chain
    function f_addBlockToChain
    (
        uint256 arg_amount,
        address payable arg_recipient
    ) public
    {
        // Add new block
        ++myChain.chainSize;
        myChain.chain.push(
            MyBlock(
                myChain.chainSize,
                block.timestamp,
                arg_amount,
                msg.sender,
                arg_recipient
            )
        );

        // Launch the event
        emit AddBlockToChain(arg_amount, msg.sender, arg_recipient);
    }

    /* Getters */

    // Get the chain
    function getChain() public view returns(chainOfBlocks memory)
    {
        return myChain;
    }

    // Get chain's list of blocks
    function getChainBlocks() public view returns(MyBlock[] memory)
    {
        return myChain.chain;
    }

    // Get chain size
    function getChainSize() public view returns(uint256)
    {
        return myChain.chainSize;
    }
}