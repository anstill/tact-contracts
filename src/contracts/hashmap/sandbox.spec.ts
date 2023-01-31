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
        let keyToDelete = 45n;
        let validUntilFuture = BigInt(Math.trunc(Date.now() / 1000) + 86400); // +1 day from now
        let validUntilPast = BigInt(Math.trunc(Date.now() / 1000) - 86400); // -1 day from now

        let payload = beginCell().storeAddress(nonOwner.address).endCell();

        let StoreKey = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            {
                $$type: "Store",
                queryId: 12n,
                key,
                data: {
                    $$type: "Data",
                    validUntil: validUntilFuture,
                    payload,
                },
            }
        );

        let StoreKeyToDelete = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            {
                $$type: "Store",
                queryId: 12n,
                key: keyToDelete,
                data: {
                    $$type: "Data",
                    validUntil: validUntilPast,
                    payload,
                },
            }
        );

        expect(StoreKey.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        expect(StoreKeyToDelete.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        let result = await contract.getGetKey(key);

        expect(result.validUntil).toEqual(validUntilFuture);
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

        await expect(contract.getGetKey(keyToDelete)).rejects.toThrow();
    });
});
