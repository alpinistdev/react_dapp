const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter Test", function () {
  it("Should get the greeting", async function () {
    const Greeting = await ethers.getContractFactory("Greeter");
    const greeting = await Greeting.deploy("Hello world!");
    await greeting.deployed();
    expect(await greeting.greet()).to.equal("Hello world!");
  });

  it("Should set the greeting", async function () {
    const Greeting = await ethers.getContractFactory("Greeter");
    const greeting = await Greeting.deploy("Hello world!");
    await greeting.deployed();
    await greeting.setGreeting("Hello, Tom!");
    expect(await greeting.greet()).to.equal("Hello, Tom!");
  });
});
