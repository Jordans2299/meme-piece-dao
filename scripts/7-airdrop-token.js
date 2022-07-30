import sdk from "./1-initialize-sdk.js";

const editionDrop = sdk.getEditionDrop("0xaD381EF874C42dCfCD1944c6c3111dE103325c76");

const token = sdk.getToken("0x589270B4357820D97e1B8527aAcA0169567Fb112");

(async () => {
    try{
        const walletAddresses = await editionDrop.history.getAllClaimerAddresses(2);

        if (walletAddresses.length===0){
            console.log("No NFTs have been claimed yet");
            process.exit(0);
        }

        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random()*(10000-1000+1)+1000);
            console.log("Going to airdrop", randomAmount, "tokens to this address: ", address);

            const airdropTarget = {
                toAddress: address,
                amount: randomAmount,
            };
            return airdropTarget;
        });
        console.log("Starting airdrop...");
        await token.transferBatch(airdropTargets);
        console.log("Successfully airdropped tokens to all the holders of the NFT!");
    }catch(e){
        console.error("Failed to drop the tokens", e);
    }
})();