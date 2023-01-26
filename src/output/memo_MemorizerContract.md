# TACT Compilation Report
Contract: MemorizerContract
BOC Size: 691 bytes

# Types
Total Types: 9

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

## StoreAddress
TLB: `store_address#00000001 queryId:uint64 address:address = StoreAddress`
Signature: `StoreAddress{queryId:uint64,address:address}`

## CallBack
TLB: `call_back#00000002 queryId:uint64 = CallBack`
Signature: `CallBack{queryId:uint64}`

## CallBackResponce
TLB: `_ op:uint32 queryId:uint64 owner:address memorizedAddress:Maybe address = CallBackResponce`
Signature: `CallBackResponce{op:uint32,queryId:uint64,owner:address,memorizedAddress:Maybe address}`

# Get Methods
Total Get Methods: 1

## owner
