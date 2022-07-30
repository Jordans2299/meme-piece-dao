import sdk from "./1-initialize-sdk.js";

const token = sdk.getToken("0x589270B4357820D97e1B8527aAcA0169567Fb112");
console.log("im working");
(async () => {
    try{
        const amount = 1_000_000;
        await token.mintToSelf(amount);
        const totalSupply = await token.totalSupply();

        console.log("Total $Nakama tokens in circulation: ", totalSupply.displayValue);
    }catch(error){
        console.log("Failed to print $Nakama tokens", error);
    }
})();