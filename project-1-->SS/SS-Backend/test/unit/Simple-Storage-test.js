const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");

describe("SimpleStorage", () => {
  let simpleStorage, deployer;
  beforeEach(async () => {
    //   const accounts = await ethers.getSigners();
    //   const account = accounts[0];
    deployer = (await getNamedAccounts()).deployer;
    await deployments.fixture(["all"]);
    simpleStorage = await ethers.getContract("SimpleStorage", deployer);
  });

  it("It Stores the Favorite Number in Blockchain!", async () => {
    const favNumber = 16;
    await simpleStorage.addNumber(favNumber);
    const _favNumber = await simpleStorage.getNumber();
    assert.equal(favNumber, _favNumber);
  });

  it("It should Store the value of Person and his/her corresponding favNumber!", async () => {
    const name = "Nilesh";
    const favNumber = 16;
    await simpleStorage.addPerson(name, favNumber);
    const storedFavNumber = await simpleStorage.nameToFavNumber(name);
    assert.equal(favNumber, storedFavNumber);
  });
});
