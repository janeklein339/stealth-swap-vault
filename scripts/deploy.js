const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying StealthSwapVault contract...");

  // Get the contract factory
  const StealthSwapVault = await ethers.getContractFactory("StealthSwapVault");

  // Set deployment parameters
  const feeCollector = "0x0000000000000000000000000000000000000000"; // Replace with actual fee collector address
  const protocolFee = 30; // 0.3% in basis points

  // Deploy the contract
  const stealthSwapVault = await StealthSwapVault.deploy(feeCollector, protocolFee);

  // Wait for deployment to complete
  await stealthSwapVault.waitForDeployment();

  const contractAddress = await stealthSwapVault.getAddress();
  console.log("StealthSwapVault deployed to:", contractAddress);

  // Verify deployment
  console.log("Verifying deployment...");
  const owner = await stealthSwapVault.owner();
  const feeCollectorAddress = await stealthSwapVault.feeCollector();
  const fee = await stealthSwapVault.protocolFee();

  console.log("Contract owner:", owner);
  console.log("Fee collector:", feeCollectorAddress);
  console.log("Protocol fee:", fee.toString(), "basis points");

  // Save deployment info
  const deploymentInfo = {
    contractAddress: contractAddress,
    owner: owner,
    feeCollector: feeCollectorAddress,
    protocolFee: fee.toString(),
    deploymentTime: new Date().toISOString(),
    network: "sepolia"
  };

  const fs = require('fs');
  fs.writeFileSync('deployment-info.json', JSON.stringify(deploymentInfo, null, 2));
  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
