//SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract SimpleStorage {
    uint256 private favNumber;

    function addNumber(uint256 _favNumber) public {
        favNumber = _favNumber;
    }

    function getNumber() public view returns (uint256) {
        return favNumber;
    }

    struct peoples {
        string name;
        uint256 favNumber;
    }

    peoples[] people;
    mapping(string => uint256) public nameToFavNumber;

    function addPerson(string memory _name, uint256 _favNumber) public {
        peoples memory person = peoples(_name, _favNumber);
        people.push(person);
        nameToFavNumber[_name] = _favNumber;
    }
}
