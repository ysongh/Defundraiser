// SPDX-License-Identifier: MIT
pragma solidity ^0.6.12;

contract SocialFundraiser {
  uint public projectCount = 0;
  mapping(uint => Project) public projects;

  constructor() public {
  }

  struct Project {
    uint id;
    string title;
    string description;
    address payable owner;
  }

  event ProjectCreated (
    uint id,
    string title,
    string description,
    address payable owner
  );

  function createStory(string memory _title, string memory _description) public {
    projectCount++;

    projects[projectCount] = Project(projectCount, _title, _description, msg.sender);
    emit ProjectCreated(projectCount, _title, _description, msg.sender);
  }
}
