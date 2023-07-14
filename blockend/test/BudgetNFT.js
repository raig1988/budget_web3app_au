const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("NFT => Fixture deployment", () => {
    async function deployNFTFixture() {
        const [ owner, otherAccount ] = await ethers.getSigners();
        const BudgetNFT = await ethers.getContractFactory("BudgetNFT");
        const ProxyNFT = await upgrades.deployProxy(BudgetNFT);
        await ProxyNFT.waitForDeployment();
        const proxyNFT = BudgetNFT.attach(ProxyNFT.target);
        return { proxyNFT, owner, otherAccount }
    }
    describe("NFT", () => {
        it("Mint the NFT by owner", async () => {
            const { proxyNFT, owner } = await loadFixture(deployNFTFixture);
            const mintValueInWei = "5342708004979404";
            const ownerMint = await proxyNFT.connect(owner).safeMint(owner.address, { value: mintValueInWei });
            ownerMint.wait(1);
            // check balance
            const ownerBalance = await proxyNFT.balanceOf(owner.address);
            expect(ownerBalance).to.equal(1);
        });
        it("Mint the NFT by otherAccount", async () => {
            const { proxyNFT, otherAccount } = await loadFixture(deployNFTFixture);
            const mintValueInWei = "5342708004979404";
            const otherAccountMint = await proxyNFT.connect(otherAccount).safeMint(otherAccount.address, { value: mintValueInWei });
            otherAccountMint.wait(1);
            // check balance
            const otherAccountBalance = await proxyNFT.balanceOf(otherAccount.address);
            expect(otherAccountBalance).to.equal(1);
        });
        it("Contract balance should equal wei deposit", async () => {
            const { proxyNFT, otherAccount } = await loadFixture(deployNFTFixture);
            const mintValueInWei = "5342708004979404";
            const otherAccountMint = await proxyNFT.connect(otherAccount).safeMint(otherAccount.address, { value: mintValueInWei });
            otherAccountMint.wait(1);
            const balance = await proxyNFT.getBalance();
            expect(balance).to.equal(mintValueInWei);
        });
        it("Owner should increase balance by withdraw", async () => {
            const { proxyNFT, owner, otherAccount } = await loadFixture(deployNFTFixture);
            const ownerEthFirstBalance = await ethers.provider.getBalance(owner.address);
            // other account mints 10 NFT and deposits
            const mintValueInWei = "5342708004979404";
            for (let i = 0; i < 10; i++) {
                await proxyNFT.connect(otherAccount).safeMint(otherAccount.address, { value: mintValueInWei });
            }
            const withdrawEther = await proxyNFT.connect(owner).withdrawEther();
            withdrawEther.wait(1);
            const ownerEthLastBalance = await ethers.provider.getBalance(owner.address);
            expect(ownerEthLastBalance).to.be.greaterThan(ownerEthFirstBalance);
        });
        it("Other account should not be able to withdraw", async () => {
            const { proxyNFT, otherAccount } = await loadFixture(deployNFTFixture);
            // other account mints 10 NFT and deposits
            const mintValueInWei = "5342708004979404";
            for (let i = 0; i < 10; i++) {
                await proxyNFT.connect(otherAccount).safeMint(otherAccount.address, { value: mintValueInWei });
            }
            await expect(proxyNFT.connect(otherAccount).withdrawEther()).to.be.reverted;
        });
    })
})
