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
export type Store = {
    $$type: 'Store';
    queryId: bigint;
    key: bigint;
    data: Data;
}

export function storeStore(src: Store) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeInt(src.key, 257);
        b_0.store(storeData(src.data));
    };
}

export function loadStore(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _key = sc_0.loadIntBig(257);
    let _data = loadData(sc_0);
    return { $$type: 'Store' as const, queryId: _queryId, key: _key, data: _data };
}

function loadTupleStore(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _key = source.readBigNumber();
    const _data = loadTupleData(source.readTuple());
    return { $$type: 'Store' as const, queryId: _queryId, key: _key, data: _data };
}

function storeTupleStore(source: Store) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.key);
    builder.writeTuple(storeTupleData(source.data));
    return builder.build();
}

function dictValueParserStore(): DictionaryValue<Store> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStore(src)).endCell());
        },
        parse: (src) => {
            return loadStore(src.loadRef().beginParse());
        }
    }
}
export type Data = {
    $$type: 'Data';
    validUntil: bigint;
    payload: Cell;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.validUntil, 64);
        b_0.storeBuilder(src.payload.asBuilder());
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _validUntil = sc_0.loadUintBig(64);
    let _payload = sc_0.asCell();
    return { $$type: 'Data' as const, validUntil: _validUntil, payload: _payload };
}

function loadTupleData(source: TupleReader) {
    let _validUntil = source.readBigNumber();
    let _payload = source.readCell();
    return { $$type: 'Data' as const, validUntil: _validUntil, payload: _payload };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.validUntil);
    builder.writeSlice(source.payload);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}
export type DataRaw = {
    $$type: 'DataRaw';
    key: bigint;
    cs: Cell;
    f: bigint;
}

export function storeDataRaw(src: DataRaw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.key, 257);
        b_0.storeRef(src.cs);
        b_0.storeInt(src.f, 257);
    };
}

export function loadDataRaw(slice: Slice) {
    let sc_0 = slice;
    let _key = sc_0.loadIntBig(257);
    let _cs = sc_0.loadRef();
    let _f = sc_0.loadIntBig(257);
    return { $$type: 'DataRaw' as const, key: _key, cs: _cs, f: _f };
}

function loadTupleDataRaw(source: TupleReader) {
    let _key = source.readBigNumber();
    let _cs = source.readCell();
    let _f = source.readBigNumber();
    return { $$type: 'DataRaw' as const, key: _key, cs: _cs, f: _f };
}

function storeTupleDataRaw(source: DataRaw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.key);
    builder.writeSlice(source.cs);
    builder.writeNumber(source.f);
    return builder.build();
}

function dictValueParserDataRaw(): DictionaryValue<DataRaw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDataRaw(src)).endCell());
        },
        parse: (src) => {
            return loadDataRaw(src.loadRef().beginParse());
        }
    }
}
export type Delete = {
    $$type: 'Delete';
    queryId: bigint;
}

export function storeDelete(src: Delete) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDelete(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Delete' as const, queryId: _queryId };
}

function loadTupleDelete(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Delete' as const, queryId: _queryId };
}

function storeTupleDelete(source: Delete) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDelete(): DictionaryValue<Delete> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDelete(src)).endCell());
        },
        parse: (src) => {
            return loadDelete(src.loadRef().beginParse());
        }
    }
}
async function HasMapContract_init(owner: Address) {
    const __init = 'te6ccgEBBwEANAABFP8A9KQT9LzyyAsBAgFiAgMCAs0EBQAJoUrd4AkAAdQBEdNoFkZgFtnmTAYAClnPFvQA';
    const __code = 'te6ccgECMQEAAygAART/APSkE/S88sgLAQIBYgIDAgLKCAkCASAEBQENviju2eeA7BYCASAGBwBxu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwQM51aecV+dJQsB1hbiZHsoARO5Nr2zxY8BzwF4FgIBIAoLAgHSLS4CASAMDQIBIBobAgHUDg8AEdrPoGt9DuGDbASDHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIMABj48w2zwC2zw0EEVVAvAe2zzgIMACgFhAXEQALCBu8tCAgASrTHwHAAfLggdM/gQEB1wDbPBAkECMqBCyPjDDbPALbPDES8B/bPOCCEJRqmLa6FhIXEwAW0x8BwALy4IHTPwEEHI+L2zwC2zwxEvAh2zzgFhQXFQAg0x8BghCUapi2uvLggdM/AQIO2zxY8CDbPBYXARbtRNDUAfhi2zxsEhgBFsj4QgHMWds8ye1UGQAO+kABAfQEWQAKWc8W9AAAAfwCASAcHQIBWB4fAgEgIiMC9zIcQHKAVAHAcoAcAHKAlAFzxZQA/oCcAHKaCNusyVus7GORn8BygDIcAHKAHABygAkbrOafwHKAATwAVAEzJY0A3ABygDiJG6zmn8BygAE8AFQBMyWNANwAcoA4nABygACfwHKAALJWMyXMzMBcAHKAOIhbrPjD8kB+wCAgIQAlPhBbyQQI18DfwJwgEJYbW3wGoAASfwHKAAHwAQHMAAoxcAHKAAIBICQlAgEgJicBMRsEoEBAQHwCNs8IG6T8sBi3iBu8tCAbyKAoAAMMIAEpIEBATTbPCBulTBZ9FowlEEz9BXigKwKRDB/j0IhgQEB9HhvpTIhwP+PMCKBAQEi8AjbPCBu8tCAbyIw+CO5jpmBAQFt2zwiEDUBIG6VMFn0WjCUQTP0FeIC3t4Bw//mMICgpARogbpIwbeDQ2zxsEm8CKgEeIG6SMG3gIG7y0IBvIts8KwAG0z9mAQrIWds8ySwADALLPwHPFgAJDDyw+mABCTbPPAbgLwEKyAHbPMkwABaCEK/5D1dYyx/LPw==';
    const __system = 'te6cckECMwEAAzIAAQHAAQEFoXl7AgEU/wD0pBP0vPLICwMCAWIJBAIBIAgFAgEgBwYBE7k2vbPFjwHPAXgxAHG7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnBAznVp5xX50lCwHWFuJkeygBDb4o7tnngOwxAgLKDwoCAdIOCwEJNs88BuAMAQrIAds8yQ0AFoIQr/kPV1jLH8s/AAkMPLD6YAIBICMQAgEgIhECASAdEgIBIBkTAgEgFhQCkQwf49CIYEBAfR4b6UyIcD/jzAigQEBIvAI2zwgbvLQgG8iMPgjuY6ZgQEBbds8IhA1ASBulTBZ9FowlEEz9BXiAt7eAcP/5jCAcFQEeIG6SMG3gIG7y0IBvIts8FwEpIEBATTbPCBulTBZ9FowlEEz9BXigFwEKyFnbPMkYAAwCyz8BzxYCASAbGgADDCABMRsEoEBAQHwCNs8IG6T8sBi3iBu8tCAbyKAcARogbpIwbeDQ2zxsEm8CMAIBWB8eACU+EFvJBAjXwN/AnCAQlhtbfAagAvcyHEBygFQBwHKAHABygJQBc8WUAP6AnABymgjbrMlbrOxjkZ/AcoAyHABygBwAcoAJG6zmn8BygAE8AFQBMyWNANwAcoA4iRus5p/AcoABPABUATMljQDcAHKAOJwAcoAAn8BygACyVjMlzMzAXABygDiIW6z4w/JAfsAgISAACjFwAcoAABJ/AcoAAfABAcwAAfwCASAlJAAR2s+ga30O4YNsAgHUJyYACwgbvLQgIASDHAh10nCH5UwINcLH94C0NMDAXGwwAGRf5Fw4gH6QCJQZm8E+GECkVvgIMABj48w2zwC2zw0EEVVAvAe2zzgIMACgMS8tKAQsj4ww2zwC2zwxEvAf2zzgghCUapi2ujEsLSkEHI+L2zwC2zwxEvAh2zzgMSstKgIO2zxY8CDbPDEtACDTHwGCEJRqmLa68uCB0z8BABbTHwHAAvLggdM/AQEWyPhCAcxZ2zzJ7VQuAApZzxb0AAEq0x8BwAHy4IHTP4EBAdcA2zwQJBAjMAAG0z9mARbtRNDUAfhi2zxsEjIADvpAAQH0BFncPzpq';
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
        if (HasMapContract_errors[res.exitCode]) {
            throw new ComputeError(HasMapContract_errors[res.exitCode].message, res.exitCode, { logs: res.vmLogs });
        } else {
            throw new ComputeError('Exit code: ' + res.exitCode, res.exitCode, { logs: res.vmLogs });
        }
    }
    
    let data = res.stack.readCell();
    return { code: codeCell, data };
}

const HasMapContract_errors: { [key: number]: { message: string } } = {
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

export class HasMapContract implements Contract {
    
    static async init(owner: Address) {
        return await HasMapContract_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await HasMapContract_init(owner);
        const address = contractAddress(0, init);
        return new HasMapContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new HasMapContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        errors: HasMapContract_errors
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: Store | Delete | Slice | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Store') {
            body = beginCell().store(storeStore(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Delete') {
            body = beginCell().store(storeDelete(message)).endCell();
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
    
    async getGetKey(provider: ContractProvider, key: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(key);
        let source = (await provider.get('getKey', builder.build())).stack;
        const result = loadTupleData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}