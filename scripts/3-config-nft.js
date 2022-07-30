import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const editionDrop = sdk.getEditionDrop("0xaD381EF874C42dCfCD1944c6c3111dE103325c76");

(async () => {
  try {
    await editionDrop.createBatch([
      {
        name: "Straw Hat Luffy",
        description: "This NFT will give you access to MemePieceDAO!",
        image: readFileSync("scripts/assets/luffy_cool.png"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();