import "@stdlib/deploy";
import "@stdlib/ownable";


message(0x1) Store {
    queryId:  Int as uint64;
    key: Int;
    data: Data;
}

struct Data {
    validUntil: Int as uint64;
    payload: Slice;
}

struct DataRaw {
    key: Int;
    cs: Slice;
    f: Int;
}

message(0x2) Delete {
    queryId:  Int as uint64;
}


@name(idict_get_next?)
native mapGetNext(map: map[Int]Data, keyLen: Int, pivot: Int): DataRaw;



contract HasMapContract with Deployable, Ownable { 
     owner: Address;
     data: map[Int]Data;

    init(owner: Address) {
        self.owner = owner;
    }

    receive(msg: Store) {
        self.data.set(msg.key, msg.data);

        
    }

    receive(msg: Delete) {
        let key: Int = -1;
        let flag: Int = 0;

        do {
            let nextKey: DataRaw = mapGetNext(self.data, 257, key);
            key = nextKey.key;
            flag = nextKey.f;

            if(flag == -1) {
                let d: Data = self.data.get(key)!!;

                if(d.validUntil < now()) {
                    self.data.set(key, null);
                }
            }

        } until(flag != -1);
    }

    receive(msg: Slice){
        throw (1001);
    }

    get fun  getKey(key: Int): Data {
        let data: Data? = self.data.get(key);

        if(data == null) {
            throw(98);
        }

        return data!!;
    }
}