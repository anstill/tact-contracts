import "@stdlib/deploy";
import "@stdlib/ownable";

struct Responce {
    sender: Address;
    msg: Slice;
}


contract ProxyContract with Deployable, Ownable {

    owner: Address;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: Slice) {
        let ctx: Context = context();

        if(ctx.sender != self.owner ) {
            let to: Address = self.owner;

            // let res: Cell = beginCell().storeAddress(ctx.sender).storeRef(msg.asCell()).endCell();
            let res: Cell = Responce{ sender: ctx.sender, msg: msg }.toCell();
            
            send(SendParameters{
                to: to,
                value: 0, 
                mode: SendRemainingValue + SendIgnoreErrors, 
                bounce: true, 
                body: res
            });
        }
    }
}