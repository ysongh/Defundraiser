const SocialFundraiser = artifacts.require("SocialFundraiser");

module.exports = async function(deployer){
	deployer.deploy(SocialFundraiser);
};