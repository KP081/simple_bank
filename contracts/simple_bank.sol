// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleBank {
    address public owner;
    mapping (address => uint256) balances;

    constructor() {
        owner = msg.sender;
    }

    function deposit() public payable {
        require(msg.value > 0 , "Deposit value must be greater than 0");
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) public {
        require(balances[msg.sender] >= amount , "Insufficient fund");
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }

    function getBlance() public view returns(uint256) {
        return balances[msg.sender];
    }

    function getAllDeposits(address user) public view returns(uint256) {
        require(msg.sender == owner , "only owner can see it");
        return balances[user];
    }
}