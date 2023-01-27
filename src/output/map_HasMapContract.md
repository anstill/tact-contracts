# TACT Compilation Report
Contract: HasMapContract
BOC Size: 807 bytes

# Types
Total Types: 10

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## ChangeOwner
TLB: `change_owner#0f474d03 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{newOwner:address}`

## Store
TLB: `store#00000001 queryId:uint64 key:uint256 data:Data{validUntil:uint64,payload:^slice} = Store`
Signature: `Store{queryId:uint64,key:uint256,data:Data{validUntil:uint64,payload:^slice}}`

## Data
TLB: `_ validUntil:uint64 payload:^slice = Data`
Signature: `Data{validUntil:uint64,payload:^slice}`

## DataRaw
TLB: `_ key:int257 cs:^slice f:int257 = DataRaw`
Signature: `DataRaw{key:int257,cs:^slice,f:int257}`

## Delete
TLB: `delete#00000002 queryId:uint64 = Delete`
Signature: `Delete{queryId:uint64}`

# Get Methods
Total Get Methods: 2

## getKey
Argument: key

## owner
