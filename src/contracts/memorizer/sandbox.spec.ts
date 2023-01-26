import { Blockchain } from "@ton-community/sandbox";
import { toNano, beginCell, Builder } from "ton";
import { MemorizerContract, CallBackResponce } from "../../output/memo_MemorizerContract";
import "@ton-community/test-utils";

function storeCallBackResponce(src: CallBackResponce) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.owner);

        if (src.memorizedAddress !== null && src.memorizedAddress !== undefined) {
            b_0.storeAddress(src.memorizedAddress);
        } else {
            b_0.storeUint(0, 2);
        }
    };
}

describe("MemorizerContract", () => {
    it("Should memorize address", async () => {
        const blkch = await Blockchain.create();
        let owner = await blkch.treasury("owner");
        let nonOwner = await blkch.treasury("non-owner");
        let memorized = await blkch.treasury("memorized");

        const contract = blkch.openContract(await MemorizerContract.fromInit(owner.address));

        let StoreAddressRes = await contract.send(
            owner.getSender(),
            { value: toNano(1) },
            {
                $$type: "StoreAddress",
                queryId: 12n,
                address: memorized.address,
            }
        );

        expect(StoreAddressRes.transactions).toHaveTransaction({
            from: owner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        let CallBackRes = await contract.send(
            nonOwner.getSender(),
            { value: toNano(1) },
            {
                $$type: "CallBack",
                queryId: 25n,
            }
        );

        expect(CallBackRes.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        let expectedBody = beginCell()
            .store(
                storeCallBackResponce({
                    $$type: "CallBackResponce",
                    op: 3n,
                    queryId: 25n,
                    owner: owner.address,
                    memorizedAddress: memorized.address,
                })
            )
            .endCell();

        expect(CallBackRes.transactions).toHaveTransaction({
            from: contract.address,
            to: nonOwner.address,
            body: expectedBody,
            success: true,
        });
    });

    it("Should reject non Owner address", async () => {
        const blkch = await Blockchain.create();
        let owner = await blkch.treasury("owner");
        let nonOwner = await blkch.treasury("non-owner");
        let memorized = await blkch.treasury("memorized");

        const contract = blkch.openContract(await MemorizerContract.fromInit(owner.address));

        let StoreAddressRes = await contract.send(
            nonOwner.getSender(),
            { value: toNano(1) },
            {
                $$type: "StoreAddress",
                queryId: 12n,
                address: memorized.address,
            }
        );

        expect(StoreAddressRes.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            value: toNano(1),
            success: false,
        });

        let CallBackRes = await contract.send(
            nonOwner.getSender(),
            { value: toNano(1) },
            {
                $$type: "CallBack",
                queryId: 25n,
            }
        );

        expect(CallBackRes.transactions).toHaveTransaction({
            from: nonOwner.address,
            to: contract.address,
            value: toNano(1),
            success: true,
        });

        let expectedBody = beginCell()
            .store(
                storeCallBackResponce({
                    $$type: "CallBackResponce",
                    op: 3n,
                    queryId: 25n,
                    owner: owner.address,
                    memorizedAddress: null,
                })
            )
            .endCell();

        expect(CallBackRes.transactions).toHaveTransaction({
            from: contract.address,
            to: nonOwner.address,
            body: expectedBody,
            success: true,
        });
    });
});
