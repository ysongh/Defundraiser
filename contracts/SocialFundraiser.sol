// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract SocialFundraiser is ERC721  {
  uint public projectCount = 0;
  mapping(uint => Project) public projects;
  mapping(uint => DonationNFT) public donationNFTs;

  constructor() public  ERC721("Social Fundraiser Receipt", "SFR") {
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

  function donateToProject(uint _projectId, uint _duration) payable public  {
    uint _tokenId = totalSupply().add(1);
    _safeMint(msg.sender, _tokenId);

    uint _claimDate = block.timestamp + _duration;

    donationNFTs[_tokenId] = DonationNFT(_tokenId, _projectId, _claimDate, msg.value, msg.sender);

    Project storage _project = projects[_projectId];
    _project.donationAmount +=  msg.value;
    _project.listLenght += 1;
    _project.donationIds.push(_tokenId);

    emit Donation(_tokenId, _claimDate, msg.value, msg.sender);
  }

  function claimFundFromFunder(uint _projectId, uint _nftId) public {
    Project storage _project = projects[_projectId];
    DonationNFT storage _donationNFT = donationNFTs[_nftId];
    require(block.timestamp > _donationNFT.claimDate, "You need to wait to claim fund");

    msg.sender.transfer(_donationNFT.amount);
    _project.donationAmount -= _donationNFT.amount;
    _donationNFT.amount = 0;
  }

  function revokeFundFromProject(uint _projectId, uint _nftId) public {
    require(ownerOf(_nftId) == msg.sender, "You do not own this NFT");

    Project storage _project = projects[_projectId];
    DonationNFT storage _donationNFT = donationNFTs[_nftId];

    msg.sender.transfer(_donationNFT.amount);
    _project.donationAmount -= _donationNFT.amount;
    _donationNFT.amount = 0;
  }
}
