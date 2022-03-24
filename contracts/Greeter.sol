//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Greeter {

    address owner;
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting:", _greeting);
        greeting = _greeting;
        owner = msg.sender;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        require(msg.sender == owner, "You don't own the contract");
        require(keccak256(bytes(_greeting)) != keccak256(bytes(greeting)), "You must change the greeting");
        console.log("Changing greeting from '%s' to '%s' in block '%s'", greeting, _greeting, block.number);
        greeting = _greeting;
    }
}
