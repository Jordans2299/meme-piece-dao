import sdk from "./1-initialize-sdk.js";
import {ethers} from "ethers";

const vote = sdk.getVote("0x622a87AEDDb1CE300F32234ba089AEEb6416EDd0");

const token = sdk.getToken("0x589270B4357820D97e1B8527aAcA0169567Fb112");

(async () =>{
    try{
        const amount = 420_000;
        const description = "Should we Meme Piece DAO Mint an additional "+amount +" tokens";
        const executions = [
            {
                toAddress: token.getAddress(),
                nativeTokenValue: 0,
                transactionData: token.encoder.encode(
                    "mintTo", [
                        vote.getAddress(),
                        ethers.utils.parseUnits(amount.toString(),18)
                    ]
                ),
            }
        ];
        await vote.propose(description, executions);
        console.log("Successfully created proposal to mint additional tokens");
    } catch(error){
        console.error("failed to create proposal", error);
        process.exit(1);
    }

    try{
        const amount = 6_900;
        const description = "Should the DAO transfer " + amount+ " tokens to "+process.env.WALLET_ADDRESS+"?";
        const executions = [
            {
            nativeTokenValue: 0,
            transactionData: token.encoder.encode(
                "transfer", [
                    process.env.WALLET_ADDRESS,
                    ethers.utils.parseUnits(amount.toString(), 18),
                ]
            ),
            toAddress: token.getAddress(),
            }
        ];
        await vote.propose(description, executions);

        console.log("Successfully created proposal to send "+amount+ " tokens to"+process.env.WALLET_ADDRESS+"!");

    } catch(error){
        console.error("Could not create proposal to send "+amount+ " tokens to "+process.env.WALLET_ADDRESS, error);
    }
})();