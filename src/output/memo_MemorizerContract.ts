import { Cell, Slice, Address, Builder, beginCell, ComputeError, TupleItem, TupleReader, Dictionary, contractAddress, ContractProvider, Sender, Contract, ContractABI, TupleBuilder, DictionaryValue } from 'ton-core';
import { ContractSystem, ContractExecutor } from 'ton-emulator';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}
export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}
export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}
export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}
export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}
export type ChangeOwner = {
    $$type: 'ChangeOwner';
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(256331011, 32);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 256331011) { throw Error('Invalid prefix'); }
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}
export type StoreAddress = {
    $$type: 'StoreAddress';
    queryId: bigint;
    address: Address;
}

export function storeStoreAddress(src: StoreAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.address);
    };
}

export function loadStoreAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _address = sc_0.loadAddress();
    return { $$type: 'StoreAddress' as const, queryId: _queryId, address: _address };
}

function loadTupleStoreAddress(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'StoreAddress' as const, queryId: _queryId, address: _address };
}

function storeTupleStoreAddress(source: StoreAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserStoreAddress(): DictionaryValue<StoreAddress> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStoreAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStoreAddress(src.loadRef().beginParse());
        }
    }
}
export type CallBack = {
    $$type: 'CallBack';
    queryId: bigint;
}

export function storeCallBack(src: CallBack) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadCallBack(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'CallBack' as const, queryId: _queryId };
}

function loadTupleCallBack(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'CallBack' as const, queryId: _queryId };
}

function storeTupleCallBack(source: CallBack) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserCallBack(): DictionaryValue<CallBack> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCallBack(src)).endCell());
        },
        parse: (src) => {
            return loadCallBack(src.loadRef().beginParse());
        }
    }
}
export type CallBackResponce = {
    $$type: 'CallBackResponce';
    op: bigint;
    queryId: bigint;
    owner: Address;
    memorizedAddress: Address | null;
}

export function storeCallBackResponce(src: CallBackResponce) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.op, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.memorizedAddress);
    };
}

export function loadCallBackResponce(slice: Slice) {
    let sc_0 = slice;
    let _op = sc_0.loadUintBig(32);
    let _queryId = sc_0.loadUintBig(64);
    let _owner = sc_0.loadAddress();
    let _memorizedAddress = sc_0.loadMaybeAddress();
    return { $$type: 'CallBackResponce' as const, op: _op, queryId: _queryId, owner: _owner, memorizedAddress: _memorizedAddress };
}

function loadTupleCallBackResponce(source: TupleReader) {
    let _op = source.readBigNumber();
    let _queryId = source.readBigNumber();
    let _owner = source.readAddress();
    let _memorizedAddress = source.readAddressOpt();
    return { $$type: 'CallBackResponce' as const, op: _op, queryId: _queryId, owner: _owner, memorizedAddress: _memorizedAddress };
}

function storeTupleCallBackResponce(source: CallBackResponce) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.op);
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.memorizedAddress);
    return builder.build();
}

function dictValueParserCallBackResponce(): DictionaryValue<CallBackResponce> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeCallBackResponce(src)).endCell());
        },
        parse: (src) => {
            return loadCallBackResponce(src.loadRef().beginParse());
        }
    }
}
async function MemorizerContract_init(owner: Address) {
    const __init = 'te6ccgEBBwEAPwABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4AsAAdQBEWW0CyMwC2zzJgYAIFnPFgEgbpUwcAHLAZLPFuI=';
    const __code = 'te6ccgECKAEAAqcAART/APSkE/S88sgLAQIBYgIDAgLLBAUCASAkJQIBzgYHAgEgEBEEfxwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CDAAY+NMNs8Ats8MkMA8BrbPOAgwAKAmCA4JAAsIG7y0ICAAHNMfAcAB8uCB0z/6QAESBCyPjDDbPALbPDES8BvbPOCCEJRqmLa6JgoOCwAW0x8BwALy4IHTPwEEHI+L2zwC2zwxEvAd2zzgJgwODQAg0x8BghCUapi2uvLggdM/AQIO2zxY8BzbPCYOARbI+EIBzFnbPMntVA8AIFnPFgEgbpUwcAHLAZLPFuICAfQSEwIBIBYXAvcyHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkZ/AcoAyHABygBwAcoAJG6zmn8BygAE8AFQBMyWNANwAcoA4iRus5p/AcoABPABUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6z4w/JAfsAgFBUAJT4QW8kECNfA38CcIBCWG1t8BaAAEn8BygAB8AEBzAAKMXABygACASAYGQIBSCAhAgEgGhsCASAcHQAdPhBbyQQI18DIscF8uCEgAAMMIAANDFZ8BgwAYAEtPhBbyRbczJUMkPbPH9ZcIBCWG1t8BaAeAQzIVTDbPMkfACxQNMsfyz8BzxYBIG6VMHABywGSzxbiAAcMPIDgAQk2zzwF4CIBCsgB2zzJIwAWghCv+Q9XWMsfyz8BDb4o7tnngMwmAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQBFu1E0NQB+GLbPGwSJwAm+kABAfpAIdcLAcMAkQGSMW3iEg==';
    const __system = 'te6cckECKgEAArEAAQHAAQEFoej7AgEU/wD0pBP0vPLICwMCAWIHBAIBIAYFAHG93owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTggZzq084r86ShYDrC3EyPZQBDb4o7tnngMwoAgLLHQgCASAYCQIBIA8KAgFIDgsBCTbPPAXgDAEKyAHbPMkNABaCEK/5D1dYyx/LPwAHDDyA4AIBIBUQAgEgFBEBLT4QW8kW3MyVDJD2zx/WXCAQlhtbfAWgEgEMyFUw2zzJEwAsUDTLH8s/Ac8WASBulTBwAcsBks8W4gANDFZ8BgwAYAIBIBcWAAMMIAAdPhBbyQQI18DIscF8uCEgAgH0GhkAJT4QW8kECNfA38CcIBCWG1t8BaAC9zIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GORn8BygDIcAHKAHABygAkbrOafwHKAATwAVAEzJY0A3ABygDiJG6zmn8BygAE8AFQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrPjD8kB+wCAcGwAKMXABygAAEn8BygAB8AEBzAIBzh8eAAsIG7y0ICAEfxwIddJwh+VMCDXCx/eAtDTAwFxsMABkX+RcOIB+kAiUGZvBPhhApFb4CDAAY+NMNs8Ats8MkMA8BrbPOAgwAKAoJyUgBCyPjDDbPALbPDES8BvbPOCCEJRqmLa6KCQlIQQcj4vbPALbPDES8B3bPOAoIyUiAg7bPFjwHNs8KCUAINMfAYIQlGqYtrry4IHTPwEAFtMfAcAC8uCB0z8BARbI+EIBzFnbPMntVCYAIFnPFgEgbpUwcAHLAZLPFuIAHNMfAcAB8uCB0z/6QAESARbtRNDUAfhi2zxsEikAJvpAAQH6QCHXCwHDAJEBkjFt4hJfg7Mo';
    let systemCell = Cell.fromBase64(__system);
    let builder = new TupleBuilder();
    builder.writeCell(systemCell);
    builder.writeAddress(owner);
    let __stack = builder.build();
    let codeCell = Cell.fromBoc(Buffer.from(__code, 'base64'))[0];
    let initCell = Cell.fromBoc(Buffer.from(__init, 'base64'))[0];
    let system = await ContractSystem.create();
    let executor = await ContractExecutor.create({ code: initCell, data: new Cell() }, system);
    let res = await executor.get('init', __stack);
    if (!res.success) { throw Error(res.error); }
    if (res.exitCode !== 0 && res.exitCode !== 1) {
        if (MemorizerContract_errors[res.exitCode]) {
            throw new ComputeError(MemorizerContract_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const MemorizerContract_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
}

export class MemorizerContract implements Contract {
    
    static async init(owner: Address) {
        return await MemorizerContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await MemorizerContract_init(owner);
        const address = contractAddress(0, init);
        return new MemorizerContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new MemorizerContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: MemorizerContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: StoreAddress | CallBack | Slice | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StoreAddress') {
            body = beginCell().store(storeStoreAddress(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CallBack') {
            body = beginCell().store(storeCallBack(message)).endCell();
        }
        if (message && typeof message === 'object' && message instanceof Slice) {
            body = message.asCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}