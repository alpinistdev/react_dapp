const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Token Test", function () {
  it("Should mint the token", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("Willey Brown Token", "WBT");
    await token.deployed();
    expect(await token.totalSupply()).to.equal(100000 * 10 ** 18);
  });

  it("Should send the token", async function () {
    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy("Willey Brown Token", "WBT");
    await token.deployed();
    await token.transfer("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", 50000);
    expect(
      await token.balanceOf("0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    ).to.equal(50000);
  });
});
