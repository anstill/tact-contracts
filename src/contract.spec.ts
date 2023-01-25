import { toNano, beginCell } from "ton";
import { ContractSystem } from "ton-emulator";
import { SampleTactContract } from "./output/sample_SampleTactContract";

describe("contract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await SampleTactContract.fromInit(owner.address));
        let track = system.track(contract.address);
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: 0n });
        await system.run();
        expect(track.events()).toMatchInlineSnapshot(`
            [
              {
                "type": "deploy",
              },
              {
                "message": {
                  "body": {
                    "cell": "x{946A98B60000000000000000}",
                    "type": "cell",
                  },
                  "bounce": true,
                  "from": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                  "to": "kQAhwCRP7V2L5ohSZMet-MD4nQ6jNVZmDhE4PgW0dBdgnqnt",
                  "type": "internal",
                  "value": 1000000000n,
                },
                "type": "received",
              },
              {
                "gasUsed": 7926n,
                "type": "processed",
              },
              {
                "messages": [
                  {
                    "body": {
                      "cell": "x{AFF90F570000000000000000}",
                      "type": "cell",
                    },
                    "bounce": true,
                    "from": "kQAhwCRP7V2L5ohSZMet-MD4nQ6jNVZmDhE4PgW0dBdgnqnt",
                    "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                    "type": "internal",
                    "value": 990878000n,
                  },
                ],
                "type": "sent",
              },
            ]
        `);

        // Check counter
        expect((await contract.getOwner()).toString()).toEqual(owner.address.toString());

        let msg = beginCell().storeUint(235, 32).endCell();

        let resultMsg = beginCell().storeAddress(nonOwner.address).storeRef(msg).endCell();

        // Non-owner
        await contract.send(nonOwner, { value: toNano(1) }, msg.asSlice());
        await system.run();

        expect(track.events()).toMatchInlineSnapshot(`
            [
              {
                "message": {
                  "body": {
                    "cell": "x{000000EB}",
                    "type": "cell",
                  },
                  "bounce": true,
                  "from": "kQCVnZ1On-Ja4xfAfMbsq--jatb5sNnOUN421AHaXbebcCWH",
                  "to": "kQAhwCRP7V2L5ohSZMet-MD4nQ6jNVZmDhE4PgW0dBdgnqnt",
                  "type": "internal",
                  "value": 1000000000n,
                },
                "type": "received",
              },
              {
                "gasUsed": 8047n,
                "type": "processed",
              },
              {
                "messages": [
                  {
                    "body": {
                      "cell": "x{8012B3B3A9D3FC4B5C62F80F98DD957DF46D5ADF361B39CA1BC6DA803B4BB6F36E1_}
             x{000000EB}",
                      "type": "cell",
                    },
                    "bounce": true,
                    "from": "kQAhwCRP7V2L5ohSZMet-MD4nQ6jNVZmDhE4PgW0dBdgnqnt",
                    "to": "kQAI-3FJVc_ywSuY4vq0bYrzR7S4Och4y7bTU_i5yLOB3A6P",
                    "type": "internal",
                    "value": 990454000n,
                  },
                ],
                "type": "sent",
              },
            ]
        `);
    });
});
