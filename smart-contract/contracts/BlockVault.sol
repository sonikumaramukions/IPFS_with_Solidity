// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockVault {
    struct Document {
        string ipfsHash;
        string fileName;
        uint256 timestamp;
    }

    event DocumentStored(address indexed user, string ipfsHash, string fileName, uint256 timestamp);

    mapping(address => Document[]) public userDocuments;

    function storeDocument(string memory _ipfsHash, string memory _fileName) public payable {
        require(msg.value >= 0.01 ether, "Minimum 0.01 ETH required to store document."); // Minimum payment

        Document memory newDocument = Document(_ipfsHash, _fileName, block.timestamp);
        userDocuments[msg.sender].push(newDocument);

        // ✅ Emit with correct number of arguments
        emit DocumentStored(msg.sender, _ipfsHash, _fileName, block.timestamp);
    }

    function getDocuments(address user) public view returns (Document[] memory) {
        return userDocuments[user];
    }
}
