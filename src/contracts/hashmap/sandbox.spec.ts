import { Blockchain } from "@ton-community/sandbox";
import { toNano, beginCell } from "ton";
import { HasMapContract } from "../../output/map_HasMapContract";
import "@ton-community/test-utils";

describe("HasMapContract", () => {
    it("Should store value", async () => {
        const blkch = await Blockchain.create();
        let owner = await blkch.treasury("owner");
        let nonOwner = await blkch.treasury("non-owner");
        let memorized = await blkch.treasury("memorized");

        const contract = blkch.openContract(await HasMapContract.fromInit(owner.address));

        let key = 44n;
        let validUntil = 1674842778n;
        let payload = beginCell().storeAddress(nonOwner.address).endCell();

        let StoreValueRes = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            {
                $$type: "Store",
                queryId: 12n,
                key,
                data: {
                    $$type: "Data",
                    validUntil,
                    payload,
                },
            }
        );

        expect(StoreValueRes.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        let result = await contract.getGetKey(key);

        expect(result.validUntil).toEqual(validUntil);
        expect(result.payload.toString()).toEqual(payload.toString());

        let DeleteValueRes = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            {
                $$type: "Delete",
                queryId: 15n,
            }
        );

        expect(DeleteValueRes.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });
    });
});
