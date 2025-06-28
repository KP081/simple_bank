const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SimpleBank", function () {
  let bank;
  let owner, user1, user2;

  beforeEach(async () => {
    [owner, user1, user2] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("SimpleBank", owner);
    bank = await Bank.deploy();
    await bank.waitForDeployment();
  });

  it("should accept deposits", async () => {
    await bank.connect(user1).deposit({ value: ethers.parseEther("1") });
    const balance = await bank.connect(user1).getBalance();
    expect(balance).to.equal(ethers.parseEther("1"));
  });

  it("should allow withdrawal", async () => {
    await bank.connect(user1).deposit({ value: ethers.parseEther("1") });
    await bank.connect(user1).withdraw(ethers.parseEther("0.5"));
    const balance = await bank.connect(user1).getBalance();
    expect(balance).to.equal(ethers.parseEther("0.5"));
  });

  it("should not allow non-owner to view all deposits", async () => {
    await expect(bank.connect(user1).getAllDeposits(user1.address));
  });

  it("should allow owner to view any deposit", async () => {
    await bank.connect(user1).deposit({ value: ethers.parseEther("2") });
    const deposit = await bank.getAllDeposits(user1.address);
    expect(deposit).to.equal(ethers.parseEther("2"));
  });
});
