import { Blockchain } from "@ton-community/sandbox";
import { toNano, beginCell } from "ton";
import { SampleTactContract } from "./output/sample_SampleTactContract";

import "@ton-community/test-utils";

describe("Contract", () => {
    it("should work", async () => {
        const blkch = await Blockchain.create();

        let owner = await blkch.treasury("owner");
        let nonOwner = await blkch.treasury("non-owner");

        const contract = blkch.openContract(await SampleTactContract.fromInit(owner.address));

        let result = await contract.send(owner.getSender(), { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });

        expect(result.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            success: true,
        });

        // Check owner
        expect((await contract.getOwner()).toString()).toEqual(owner.address.toString());

        let msg = beginCell().storeUint(235, 32).endCell();

        let resultMsg = beginCell().storeAddress(nonOwner.address).storeRef(msg).endCell();

        // Non-owner
        let res = await contract.send(nonOwner.getSender(), { value: toNano(1) }, msg.asSlice());

        expect(res.transactions).toHaveTransaction({
            body: msg,
            from: nonOwner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        expect(res.transactions).toHaveTransaction({
            body: resultMsg,
            from: contract.address,
            to: owner.address,
            success: true,
        });
    });
});
