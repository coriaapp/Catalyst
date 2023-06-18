// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Catalyst {
    
    mapping(address => string[]) public walletToImage;

    event ImageAdded(string image, address wallet, uint256 timestamp, uint256 block);

    function addImage(string memory _image) public {
        walletToImage[msg.sender].push(_image);
        emit ImageAdded(_image, msg.sender, block.timestamp, block.number);
    }

    function getImages() public view returns (string[] memory) {
        return walletToImage[msg.sender];
    }

}
