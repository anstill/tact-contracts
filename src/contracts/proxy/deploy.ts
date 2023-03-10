import { beginCell, contractAddress, toNano } from "ton";
import { testAddress } from "ton-emulator";
import { ProxyContract } from "../../output/proxy_ProxyContract";
import { deploy } from "../../utils/deploy";
import { printAddress, printDeploy, printHeader } from "../../utils/print";

(async () => {
    // Parameters
    let owner = testAddress("some-owner"); // Replace owner with your address
    let packed = "Deploy"; // Replace if you want another message used
    let init = await ProxyContract.init(owner);
    let address = contractAddress(0, init);
    let deployAmount = toNano(10);
    let testnet = true;

    // Print basics
    printHeader("ProxyContract");
    printAddress(address);
    // printDeploy(init, deployAmount, packed, testnet);

    // Do deploy
    await deploy(init, deployAmount, packed, testnet);
})();
