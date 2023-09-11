//SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import "hardhat/console.sol";
// import "./ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    mapping(address => uint) balances;

    constructor(string memory name, string memory symbol) ERC20(name, symbol) {
        _mint(msg.sender, 100000 * (10 ** 18));
    }
}
