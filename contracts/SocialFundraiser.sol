// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract SocialFundraiser {
  uint public projectCount = 0;
  mapping(uint => Project) public projects;
  mapping(uint => DonationNFT) public donationNFTs;

  constructor() public {
  }

  struct Project {
    uint id;
    string title;
    string description;
    uint listLenght;
    uint donationAmount;
    uint[] donationIds;
    address payable owner;
  }
  
  struct DonationNFT {
    uint id;
    uint projectId;
    uint claimDate;
    uint amount;
    address payable donator;
  }

  event ProjectCreated (
    uint id,
    string title,
    string description,
    uint listLenght,
    uint donationAmount,
    uint[] donationIds,
    address payable owner
  );

  event Donation (
    uint id,
    uint claimDate,
    uint amount,
    address payable donator
  );

  function createProject(string memory _title, string memory _description) public {
    projectCount++;

    projects[projectCount] = Project(projectCount, _title, _description, 0, 0, new uint[](0), msg.sender);
    emit ProjectCreated(projectCount, _title, _description, 0, 0, new uint[](0), msg.sender);
  }
}
