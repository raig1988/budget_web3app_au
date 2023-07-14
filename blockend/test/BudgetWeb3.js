const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ERC20 => Fixture deployment", () => {
    async function deployNFTFixture() {
        const [ owner, otherAccount, otherAccount2 ] = await ethers.getSigners();
        const BudgetWeb3 = await ethers.getContractFactory("BudgetWeb3");
        const ProxyNFT = await upgrades.deployProxy(BudgetWeb3);
        await ProxyNFT.waitForDeployment();
        const proxyNFT = BudgetWeb3.attach(ProxyNFT.target);
        return { proxyNFT, owner, otherAccount, otherAccount2 }
    }
    describe("ERC20", () => {
        it("Owner has totalSupply", async () => {
            const { proxyNFT, owner } = await loadFixture(deployNFTFixture);
            // check owner balance equal to 1 billion
            const oneBillionTokens = "1000000000000000000000000000";
            const ownerBalance = await proxyNFT.balanceOf(owner.address)
            expect(ownerBalance).to.be.equal(oneBillionTokens);
        });
        it("Owner can transfer to otherAccount", async () => {
            const { proxyNFT, owner, otherAccount } = await loadFixture(deployNFTFixture);
            // transfer 10 tokens from owner to other account
            const tokenAmount = (10 * 10 ** 18).toString();
            const otherAccountFirstBalance = await proxyNFT.balanceOf(otherAccount.address);
            const tokenTransfer = await proxyNFT.connect(owner).transfer(otherAccount.address, tokenAmount);
            tokenTransfer.wait(1);
            const otherAccountLastBalance = await proxyNFT.balanceOf(otherAccount.address);
            expect(otherAccountFirstBalance).to.be.equal(0);
            expect(otherAccountLastBalance).to.be.equal(tokenAmount);
        });
        it("Users can transfer between them coins", async () => {
            const { proxyNFT, owner, otherAccount, otherAccount2 } = await loadFixture(deployNFTFixture);
            const tokenAmountTen = (10 * 10 ** 18).toString();
            const tokenAmountFive = (5 * 10 ** 18).toString();
            // first owner transfer users 10 tokens
            await proxyNFT.connect(owner).transfer(otherAccount.address, tokenAmountTen);
            await proxyNFT.connect(otherAccount).transfer(otherAccount2.address, tokenAmountFive);
            const otherAccountBalance = await proxyNFT.balanceOf(otherAccount.address);
            const otherAccountTwoBalance = await proxyNFT.balanceOf(otherAccount2.address);
            expect(otherAccountBalance).to.be.equal(tokenAmountFive);
            expect(otherAccountTwoBalance).to.be.equal(tokenAmountFive);
        });
        it("User cant transfer tokens it doesnt own", async () => {
            const { proxyNFT, otherAccount, otherAccount2 } = await loadFixture(deployNFTFixture);
            const tokenAmountTen = (10 * 10 ** 18).toString();
            // first owner transfer users 10 tokens
            await expect(proxyNFT.connect(otherAccount).transfer(otherAccount2.address, tokenAmountTen)).to.be.reverted;
        });
    })
})
