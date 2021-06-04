pragma solidity ^0.5.0;

contract Patents {

  struct Patent {
    uint id;
    string description;
    address owner;
  }

  uint public numPatents = 0;
  mapping(uint => Patent) public patents;

  function newPatent(string memory _description) public {
    patents[numPatents] = Patent(
      numPatents,
      _description,
      msg.sender
    );
    numPatents++;
  } 
}