# Class: Provider

[@fuel-ts/account](/api/Account/index.md).Provider

A provider for connecting to a node

## Properties

### cache

• `Optional` **cache**: `MemoryCache`

#### Defined in

[packages/account/src/providers/provider.ts:340](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L340)

___

### operations

• **operations**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: `Exact`&lt;{ `encodedTransactions`: `string` \| `string`[] ; `utxoValidation?`: `InputMaybe`&lt;`boolean`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlDryRunMutation`\> |
| `estimateGasPrice` | (`variables`: `Exact`&lt;{ `blockHorizon`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimateGasPriceQuery`\> |
| `estimatePredicates` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimatePredicatesQuery`\> |
| `getBalance` | (`variables`: `Exact`&lt;{ `assetId`: `string` ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalanceQuery`\> |
| `getBalances` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlBalanceFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalancesQuery`\> |
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockId?`: `InputMaybe`&lt;`string`\> ; `height?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `InputMaybe`&lt;`string`\> ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getLatestGasPrice` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetLatestGasPriceQuery`\> |
| `getMessageByNonce` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageByNonceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `InputMaybe`&lt;`string`\> ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `nonce`: `string` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getRelayedTransactionStatus` | (`variables`: `Exact`&lt;{ `relayedTransactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetRelayedTransactionStatusQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `string` ; `startTimestamp?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/account/src/providers/provider.ts:339](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L339)

___

### options

• **options**: [`ProviderOptions`](/api/Account/index.md#provideroptions)

#### Defined in

[packages/account/src/providers/provider.ts:350](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L350)

___

### url

• **url**: `string`

GraphQL endpoint of the Fuel node

#### Defined in

[packages/account/src/providers/provider.ts:385](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L385)

___

### chainInfoCache

▪ `Private` `Static` **chainInfoCache**: `ChainInfoCache` = `{}`

#### Defined in

[packages/account/src/providers/provider.ts:347](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L347)

___

### nodeInfoCache

▪ `Private` `Static` **nodeInfoCache**: `NodeInfoCache` = `{}`

#### Defined in

[packages/account/src/providers/provider.ts:348](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L348)

## Methods

### call

▸ **call**(`transactionRequestLike`, `utxoValidation?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a transaction without actually submitting it to the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `utxoValidation` | [`ProviderCallParams`](/api/Account/index.md#providercallparams) | Additional provider call parameters. |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:701](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L701)

___

### connect

▸ **connect**(`url`, `options?`): `Promise`&lt;`void`\>

Updates the URL for the provider and fetches the consensus parameters for the new URL, if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options?` | [`ProviderOptions`](/api/Account/index.md#provideroptions) |

#### Returns

`Promise`&lt;`void`\>

#### Defined in

[packages/account/src/providers/provider.ts:456](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L456)

___

### createOperations

▸ **createOperations**(): `Object`

Create GraphQL client and set operations.

#### Returns

`Object`

The operation SDK object

| Name | Type |
| :------ | :------ |
| `dryRun` | (`variables`: `Exact`&lt;{ `encodedTransactions`: `string` \| `string`[] ; `utxoValidation?`: `InputMaybe`&lt;`boolean`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlDryRunMutation`\> |
| `estimateGasPrice` | (`variables`: `Exact`&lt;{ `blockHorizon`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimateGasPriceQuery`\> |
| `estimatePredicates` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlEstimatePredicatesQuery`\> |
| `getBalance` | (`variables`: `Exact`&lt;{ `assetId`: `string` ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalanceQuery`\> |
| `getBalances` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlBalanceFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBalancesQuery`\> |
| `getBlock` | (`variables?`: `Exact`&lt;{ `blockId?`: `InputMaybe`&lt;`string`\> ; `height?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockQuery`\> |
| `getBlockWithTransactions` | (`variables?`: `Exact`&lt;{ `blockHeight?`: `InputMaybe`&lt;`string`\> ; `blockId?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlockWithTransactionsQuery`\> |
| `getBlocks` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetBlocksQuery`\> |
| `getChain` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetChainQuery`\> |
| `getCoin` | (`variables`: `Exact`&lt;{ `coinId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinQuery`\> |
| `getCoins` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `filter`: `GqlCoinFilterInput` ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsQuery`\> |
| `getCoinsToSpend` | (`variables`: `Exact`&lt;{ `excludedIds?`: `InputMaybe`&lt;`GqlExcludeInput`\> ; `owner`: `string` ; `queryPerAsset`: `GqlSpendQueryElementInput` \| `GqlSpendQueryElementInput`[]  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetCoinsToSpendQuery`\> |
| `getContract` | (`variables`: `Exact`&lt;{ `contractId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractQuery`\> |
| `getContractBalance` | (`variables`: `Exact`&lt;{ `asset`: `string` ; `contract`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetContractBalanceQuery`\> |
| `getLatestGasPrice` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetLatestGasPriceQuery`\> |
| `getMessageByNonce` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageByNonceQuery`\> |
| `getMessageProof` | (`variables`: `Exact`&lt;{ `commitBlockHeight?`: `InputMaybe`&lt;`string`\> ; `commitBlockId?`: `InputMaybe`&lt;`string`\> ; `nonce`: `string` ; `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageProofQuery`\> |
| `getMessageStatus` | (`variables`: `Exact`&lt;{ `nonce`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessageStatusQuery`\> |
| `getMessages` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetMessagesQuery`\> |
| `getNodeInfo` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetNodeInfoQuery`\> |
| `getRelayedTransactionStatus` | (`variables`: `Exact`&lt;{ `relayedTransactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetRelayedTransactionStatusQuery`\> |
| `getTransaction` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionQuery`\> |
| `getTransactionWithReceipts` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionWithReceiptsQuery`\> |
| `getTransactions` | (`variables?`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsQuery`\> |
| `getTransactionsByOwner` | (`variables`: `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\> ; `owner`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetTransactionsByOwnerQuery`\> |
| `getVersion` | (`variables?`: `Exact`&lt;{ `[key: string]`: `never`;  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlGetVersionQuery`\> |
| `produceBlocks` | (`variables`: `Exact`&lt;{ `blocksToProduce`: `string` ; `startTimestamp?`: `InputMaybe`&lt;`string`\>  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlProduceBlocksMutation`\> |
| `statusChange` | (`variables`: `Exact`&lt;{ `transactionId`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlStatusChangeSubscription`\> |
| `submit` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `Promise`&lt;`GqlSubmitMutation`\> |
| `submitAndAwait` | (`variables`: `Exact`&lt;{ `encodedTransaction`: `string`  }\>, `options?`: `unknown`) => `AsyncIterable`&lt;`GqlSubmitAndAwaitSubscription`\> |

#### Defined in

[packages/account/src/providers/provider.ts:500](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L500)

___

### dryRunMultipleTransactions

▸ **dryRunMultipleTransactions**(`transactionRequests`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)[]\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionRequests` | [`TransactionRequest`](/api/Account/index.md#transactionrequest)[] |
| `«destructured»` | [`ProviderCallParams`](/api/Account/index.md#providercallparams) |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)[]\>

#### Defined in

[packages/account/src/providers/provider.ts:914](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L914)

___

### estimateGasPrice

▸ **estimateGasPrice**(`blockHorizon`): `Promise`&lt;`BN`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `blockHorizon` | `number` |

#### Returns

`Promise`&lt;`BN`\>

#### Defined in

[packages/account/src/providers/provider.ts:1638](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1638)

___

### estimateMultipleTxDependencies

▸ **estimateMultipleTxDependencies**(`transactionRequests`): `Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)[]\>

Dry runs multiple transactions and checks for missing dependencies in batches.

Transactions are dry run in batches. After each dry run, transactions requiring
further modifications are identified. The method iteratively updates these transactions
and performs subsequent dry runs until all dependencies for each transaction are satisfied.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequests` | [`TransactionRequest`](/api/Account/index.md#transactionrequest)[] | Array of transaction request objects. |

#### Returns

`Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)[]\>

A promise that resolves to an array of results for each transaction.

#### Defined in

[packages/account/src/providers/provider.ts:841](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L841)

___

### estimatePredicates

▸ **estimatePredicates**(`transactionRequest`): `Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

Verifies whether enough gas is available to complete transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;[`TransactionRequest`](/api/Account/index.md#transactionrequest)\>

A promise that resolves to the estimated transaction request object.

#### Defined in

[packages/account/src/providers/provider.ts:726](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L726)

___

### estimateTxDependencies

▸ **estimateTxDependencies**(`transactionRequest`): `Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)\>

Will dryRun a transaction and check for missing dependencies.

If there are missing variable outputs,
`addVariableOutputs` is called on the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) | The transaction request object. |

#### Returns

`Promise`&lt;[`EstimateTxDependenciesReturns`](/api/Account/index.md#estimatetxdependenciesreturns)\>

A promise.

#### Defined in

[packages/account/src/providers/provider.ts:771](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L771)

___

### estimateTxGasAndFee

▸ **estimateTxGasAndFee**(`params`): `Promise`&lt;{ `gasLimit`: `BN` ; `gasPrice`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN`  }\>

Estimates the transaction gas and fee based on the provided transaction request.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.gasPrice?` | `BN` |
| `params.transactionRequest` | [`TransactionRequest`](/api/Account/index.md#transactionrequest) |

#### Returns

`Promise`&lt;{ `gasLimit`: `BN` ; `gasPrice`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN`  }\>

An object containing the estimated minimum gas, minimum fee, maximum gas, and maximum fee.

#### Defined in

[packages/account/src/providers/provider.ts:940](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L940)

___

### fetchChain

▸ **fetchChain**(): `Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

Fetches the `chainInfo` for the given node URL.

#### Returns

`Promise`&lt;[`ChainInfo`](/api/Account/index.md#chaininfo)\>

ChainInfo object

#### Defined in

[packages/account/src/providers/provider.ts:586](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L586)

___

### fetchChainAndNodeInfo

▸ **fetchChainAndNodeInfo**(): `Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

Fetches both the chain and node information, saves it to the cache, and return it.

#### Returns

`Promise`&lt;{ `chain`: [`ChainInfo`](/api/Account/index.md#chaininfo) ; `nodeInfo`: [`NodeInfo`](/api/Account/index.md#nodeinfo)  }\>

NodeInfo and Chain

#### Defined in

[packages/account/src/providers/provider.ts:468](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L468)

___

### fetchNode

▸ **fetchNode**(): `Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

Returns the chain information.

#### Returns

`Promise`&lt;[`NodeInfo`](/api/Account/index.md#nodeinfo)\>

NodeInfo object

#### Defined in

[packages/account/src/providers/provider.ts:565](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L565)

___

### getBalance

▸ **getBalance**(`owner`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given owner for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1440](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1440)

___

### getBalances

▸ **getBalances**(`owner`, `paginationArgs?`): `Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

Returns balances for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`CoinQuantity`](/api/Account/index.md#coinquantity)[]\>

A promise that resolves to the balances.

#### Defined in

[packages/account/src/providers/provider.ts:1460](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1460)

___

### getBaseAssetId

▸ **getBaseAssetId**(): `string`

Returns the base asset ID for the current provider network

#### Returns

`string`

the base asset ID

#### Defined in

[packages/account/src/providers/provider.ts:612](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L612)

___

### getBlock

▸ **getBlock**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block)\>

Returns block matching the given ID or height.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block)\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1296](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1296)

___

### getBlockNumber

▸ **getBlockNumber**(): `Promise`&lt;`BN`\>

Returns the block number.

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number

#### Defined in

[packages/account/src/providers/provider.ts:555](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L555)

___

### getBlockWithTransactions

▸ **getBlockWithTransactions**(`idOrHeight`): `Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

Returns block matching the given ID or type, including transaction data.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `idOrHeight` | `string` \| `number` | ID or height of the block. |

#### Returns

`Promise`&lt;``null`` \| [`Block`](/api/Account/index.md#block) & { `transactions`: `Partial`&lt;`Omit`&lt;`TransactionScript`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionCreate`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionMint`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpgrade`, ``"type"``\>\> & `Partial`&lt;`Omit`&lt;`TransactionUpload`, ``"type"``\>\> & { `type`: [`TransactionType`](/api/Account/TransactionType.md)  }[]  }\>

A promise that resolves to the block.

#### Defined in

[packages/account/src/providers/provider.ts:1350](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1350)

___

### getBlocks

▸ **getBlocks**(`params`): `Promise`&lt;[`Block`](/api/Account/index.md#block)[]\>

Returns all the blocks matching the given parameters.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Exact`&lt;{ `after?`: `InputMaybe`&lt;`string`\> ; `before?`: `InputMaybe`&lt;`string`\> ; `first?`: `InputMaybe`&lt;`number`\> ; `last?`: `InputMaybe`&lt;`number`\>  }\> | The parameters to query blocks. |

#### Returns

`Promise`&lt;[`Block`](/api/Account/index.md#block)[]\>

A promise that resolves to the blocks.

#### Defined in

[packages/account/src/providers/provider.ts:1331](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1331)

___

### getChain

▸ **getChain**(): [`ChainInfo`](/api/Account/index.md#chaininfo)

Returns the cached chainInfo for the current URL.

#### Returns

[`ChainInfo`](/api/Account/index.md#chaininfo)

#### Defined in

[packages/account/src/providers/provider.ts:409](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L409)

___

### getChainId

▸ **getChainId**(): `number`

Returns the chain ID

#### Returns

`number`

A promise that resolves to the chain ID number

#### Defined in

[packages/account/src/providers/provider.ts:600](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L600)

___

### getCoins

▸ **getCoins**(`owner`, `assetId?`, `paginationArgs?`): `Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

Returns coins for the given owner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get coins for |
| `assetId?` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments |

#### Returns

`Promise`&lt;[`Coin`](/api/Account/index.md#coin)[]\>

#### Defined in

[packages/account/src/providers/provider.ts:1190](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1190)

___

### getContract

▸ **getContract**(`contractId`): `Promise`&lt;``null`` \| [`ContractResult`](/api/Account/index.md#contractresult)\>

Get deployed contract with the given ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` | ID of the contract. |

#### Returns

`Promise`&lt;``null`` \| [`ContractResult`](/api/Account/index.md#contractresult)\>

A promise that resolves to the contract.

#### Defined in

[packages/account/src/providers/provider.ts:1405](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1405)

___

### getContractBalance

▸ **getContractBalance**(`contractId`, `assetId`): `Promise`&lt;`BN`\>

Returns the balance for the given contract for the given asset ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `contractId` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The contract ID to get the balance for. |
| `assetId` | [`BytesLike`](/api/Interfaces/index.md#byteslike) | The asset ID of coins to get. |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the balance.

#### Defined in

[packages/account/src/providers/provider.ts:1420](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1420)

___

### getGasConfig

▸ **getGasConfig**(): `Object`

Returns some helpful parameters related to gas fees.

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `gasCosts` | [`GasCosts`](/api/Account/index.md#gascosts) |
| `gasPerByte` | `BN` |
| `gasPriceFactor` | `BN` |
| `maxGasPerPredicate` | `BN` |
| `maxGasPerTx` | `BN` |

#### Defined in

[packages/account/src/providers/provider.ts:437](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L437)

___

### getLatestGasPrice

▸ **getLatestGasPrice**(): `Promise`&lt;`BN`\>

#### Returns

`Promise`&lt;`BN`\>

#### Defined in

[packages/account/src/providers/provider.ts:1633](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1633)

___

### getMessageByNonce

▸ **getMessageByNonce**(`nonce`): `Promise`&lt;``null`` \| `GqlMessage`\>

Returns Message for given nonce.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nonce` | `string` | The nonce of the message to retrieve. |

#### Returns

`Promise`&lt;``null`` \| `GqlMessage`\>

A promise that resolves to the Message object.

#### Defined in

[packages/account/src/providers/provider.ts:1685](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1685)

___

### getMessageProof

▸ **getMessageProof**(`transactionId`, `nonce`, `commitBlockId?`, `commitBlockHeight?`): `Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | The transaction to get message from. |
| `nonce` | `string` | - |
| `commitBlockId?` | `string` | The commit block id. |
| `commitBlockHeight?` | `BN` | The commit block height. |

#### Returns

`Promise`&lt;``null`` \| [`MessageProof`](/api/Account/index.md#messageproof)\>

A promise that resolves to the message proof.

#### Defined in

[packages/account/src/providers/provider.ts:1527](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1527)

___

### getMessageStatus

▸ **getMessageStatus**(`nonce`): `Promise`&lt;[`MessageStatus`](/api/Account/index.md#messagestatus)\>

Returns Message Proof for given transaction id and the message id from MessageOut receipt.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `nonce` | `string` | The nonce of the message to get status from. |

#### Returns

`Promise`&lt;[`MessageStatus`](/api/Account/index.md#messagestatus)\>

A promise that resolves to the message status

#### Defined in

[packages/account/src/providers/provider.ts:1651](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1651)

___

### getMessages

▸ **getMessages**(`address`, `paginationArgs?`): `Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

Returns message for the given address.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `address` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get message from. |
| `paginationArgs?` | `CursorPaginationArgs` | Pagination arguments. |

#### Returns

`Promise`&lt;[`Message`](/api/Account/index.md#message)[]\>

A promise that resolves to the messages.

#### Defined in

[packages/account/src/providers/provider.ts:1487](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1487)

___

### getNode

▸ **getNode**(): [`NodeInfo`](/api/Account/index.md#nodeinfo)

Returns the cached nodeInfo for the current URL.

#### Returns

[`NodeInfo`](/api/Account/index.md#nodeinfo)

#### Defined in

[packages/account/src/providers/provider.ts:423](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L423)

___

### getRelayedTransactionStatus

▸ **getRelayedTransactionStatus**(`relayedTransactionId`): `Promise`&lt;``null`` \| `GqlRelayedTransactionFailed`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `relayedTransactionId` | `string` |

#### Returns

`Promise`&lt;``null`` \| `GqlRelayedTransactionFailed`\>

#### Defined in

[packages/account/src/providers/provider.ts:1695](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1695)

___

### getResourcesForTransaction

▸ **getResourcesForTransaction**(`owner`, `transactionRequestLike`, `quantitiesToContract?`): `Promise`&lt;{ `addedSignatures`: `number` ; `dryRunStatus?`: [`DryRunStatus`](/api/Account/index.md#dryrunstatus) ; `estimatedPredicates`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[] ; `updateMaxFee?`: `boolean`  }\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | `undefined` |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | `undefined` |
| `quantitiesToContract` | [`CoinQuantity`](/api/Account/index.md#coinquantity)[] | `[]` |

#### Returns

`Promise`&lt;{ `addedSignatures`: `number` ; `dryRunStatus?`: [`DryRunStatus`](/api/Account/index.md#dryrunstatus) ; `estimatedPredicates`: [`TransactionRequestInput`](/api/Account/index.md#transactionrequestinput)[] ; `gasPrice`: `BN` ; `gasUsed`: `BN` ; `maxFee`: `BN` ; `maxGas`: `BN` ; `minFee`: `BN` ; `minGas`: `BN` ; `missingContractIds`: `string`[] ; `outputVariables`: `number` ; `receipts`: `TransactionResultReceipt`[] ; `requiredQuantities`: [`CoinQuantity`](/api/Account/index.md#coinquantity)[] ; `resources`: [`Resource`](/api/Account/index.md#resource)[] ; `updateMaxFee?`: `boolean`  }\>

#### Defined in

[packages/account/src/providers/provider.ts:1154](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1154)

___

### getResourcesToSpend

▸ **getResourcesToSpend**(`owner`, `quantities`, `excludedIds?`): `Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

Returns resources for the given owner satisfying the spend query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `owner` | `string` \| [`AbstractAddress`](/api/Interfaces/AbstractAddress.md) | The address to get resources for. |
| `quantities` | [`CoinQuantityLike`](/api/Account/index.md#coinquantitylike)[] | The quantities to get. |
| `excludedIds?` | `ExcludeResourcesOption` | IDs of excluded resources from the selection. |

#### Returns

`Promise`&lt;[`Resource`](/api/Account/index.md#resource)[]\>

A promise that resolves to the resources.

#### Defined in

[packages/account/src/providers/provider.ts:1225](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1225)

___

### getTransaction

▸ **getTransaction**&lt;`TTransactionType`\>(`transactionId`): `Promise`&lt;``null`` \| `Transaction`&lt;`TTransactionType`\>\>

Get transaction with the given ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TTransactionType` | `void` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionId` | `string` | ID of the transaction. |

#### Returns

`Promise`&lt;``null`` \| `Transaction`&lt;`TTransactionType`\>\>

A promise that resolves to the transaction.

#### Defined in

[packages/account/src/providers/provider.ts:1386](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1386)

___

### getTransactionCost

▸ **getTransactionCost**(`transactionRequestLike`, `tolerance?`): `Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

Returns a transaction cost to enable user
to set gasLimit and also reserve balance amounts
on the the transaction.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `tolerance` | [`TransactionCostParams`](/api/Account/index.md#transactioncostparams) | The tolerance to add on top of the gasUsed. |

#### Returns

`Promise`&lt;[`TransactionCost`](/api/Account/index.md#transactioncost)\>

A promise that resolves to the transaction cost object.

#### Defined in

[packages/account/src/providers/provider.ts:1056](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1056)

___

### getTransactionResponse

▸ **getTransactionResponse**(`transactionId`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `transactionId` | `string` |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

#### Defined in

[packages/account/src/providers/provider.ts:1675](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1675)

___

### getVersion

▸ **getVersion**(): `Promise`&lt;`string`\>

Returns the version of the connected node.

#### Returns

`Promise`&lt;`string`\>

A promise that resolves to the version string.

#### Defined in

[packages/account/src/providers/provider.ts:543](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L543)

___

### produceBlocks

▸ **produceBlocks**(`amount`, `startTime?`): `Promise`&lt;`BN`\>

Lets you produce blocks with custom timestamps and the block number of the last block produced.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | The amount of blocks to produce |
| `startTime?` | `number` | The UNIX timestamp (milliseconds) to set for the first produced block |

#### Returns

`Promise`&lt;`BN`\>

A promise that resolves to the block number of the last produced block.

#### Defined in

[packages/account/src/providers/provider.ts:1666](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1666)

___

### sendTransaction

▸ **sendTransaction**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

Submits a transaction to the chain to be executed.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `«destructured»` | [`ProviderSendTxParams`](/api/Account/index.md#providersendtxparams) | - |

#### Returns

`Promise`&lt;[`TransactionResponse`](/api/Account/TransactionResponse.md)\>

A promise that resolves to the transaction response object.

#### Defined in

[packages/account/src/providers/provider.ts:644](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L644)

___

### simulate

▸ **simulate**(`transactionRequestLike`, `«destructured»?`): `Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

Executes a signed transaction without applying the states changes
on the chain.

If the transaction is missing any dependencies,
the transaction will be mutated and those dependencies will be added

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `transactionRequestLike` | [`TransactionRequestLike`](/api/Account/index.md#transactionrequestlike) | The transaction request object. |
| `«destructured»` | [`EstimateTransactionParams`](/api/Account/index.md#estimatetransactionparams) | - |

#### Returns

`Promise`&lt;[`CallResult`](/api/Account/index.md#callresult)\>

A promise that resolves to the call result object.

#### Defined in

[packages/account/src/providers/provider.ts:1015](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L1015)

___

### clearChainAndNodeCaches

▸ **clearChainAndNodeCaches**(): `void`

#### Returns

`void`

#### Defined in

[packages/account/src/providers/provider.ts:342](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L342)

___

### create

▸ **create**(`url`, `options?`): `Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

Creates a new instance of the Provider class. This is the recommended way to initialize a Provider.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `url` | `string` | GraphQL endpoint of the Fuel node |
| `options` | [`ProviderOptions`](/api/Account/index.md#provideroptions) | Additional options for the provider |

#### Returns

`Promise`&lt;[`Provider`](/api/Account/Provider.md)\>

#### Defined in

[packages/account/src/providers/provider.ts:400](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L400)

___

### ensureClientVersionIsSupported

▸ **ensureClientVersionIsSupported**(`nodeInfo`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodeInfo` | [`NodeInfo`](/api/Account/index.md#nodeinfo) |

#### Returns

`void`

#### Defined in

[packages/account/src/providers/provider.ts:480](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L480)

___

### getFetchFn

▸ **getFetchFn**(`options`): (`url`: `string`, `requestInit?`: `RequestInit`, `providerOptions?`: `Omit`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions), ``"fetch"``\>) => `Promise`&lt;`Response`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [`ProviderOptions`](/api/Account/index.md#provideroptions) |

#### Returns

`fn`

▸ (`url`, `requestInit?`, `providerOptions?`): `Promise`&lt;`Response`\>

Custom fetch function to use for making requests.

##### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `requestInit?` | `RequestInit` |
| `providerOptions?` | `Omit`&lt;[`ProviderOptions`](/api/Account/index.md#provideroptions), ``"fetch"``\> |

##### Returns

`Promise`&lt;`Response`\>

#### Defined in

[packages/account/src/providers/provider.ts:357](https://github.com/FuelLabs/fuels-ts/blob/7c77a797/packages/account/src/providers/provider.ts#L357)