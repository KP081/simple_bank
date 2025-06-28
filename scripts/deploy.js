const { ethers } = require("hardhat");

async function main() {
  const SimpleBank = await ethers.getContractFactory("SimpleBank");
  const bank = await SimpleBank.deploy();

  console.log("SimpleBank deployed to:", await bank.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
