import "@stdlib/deploy";
import "@stdlib/ownable";


message(0x1) StoreAddress {
    queryId:  Int as uint64;
    address: Address;
}

message(0x2) CallBack {
    queryId:  Int as uint64;
}

struct CallBackResponce {
    op: Int as uint32;
    queryId:  Int as uint64;
    owner: Address;
    memorizedAddress: Address?;
}


contract MemorizerContract with Deployable, Ownable { 
     owner: Address;
     memorizedAddress: Address?;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: StoreAddress) {
        // Check if the sender is the owner
        self.requireOwner();
        self.memorizedAddress = msg.address;
    }

    receive(msg: CallBack) {
        let ctx: Context = context();

        let res: Cell = CallBackResponce{
            op: 3, 
            queryId: msg.queryId,  
            owner: self.owner, 
            memorizedAddress: self.memorizedAddress 
        }.toCell();
        
        send(SendParameters{
            to: ctx.sender,
            value: 0, 
            mode: SendRemainingValue + SendIgnoreErrors, 
            bounce: true, 
            body: res
        });
    }

    receive(msg: Slice) {
        throw(3);
    }
}