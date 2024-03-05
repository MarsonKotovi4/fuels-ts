import { Address } from '@fuel-ts/address';
import { BaseAssetId, ZeroBytes32 } from '@fuel-ts/address/configs';
import { randomBytes } from '@fuel-ts/crypto';
import { bn, toNumber } from '@fuel-ts/math';
import { TransactionType } from '@fuel-ts/transactions';
import { concat, hexlify } from '@fuel-ts/utils';
import { ASSET_A, ASSET_B } from '@fuel-ts/utils/test-utils';

import type { Coin } from '../coin';
import type { CoinQuantity } from '../coin-quantity';

import type { CoinTransactionRequestInput } from './input';
import { ScriptTransactionRequest } from './script-transaction-request';
import type { TransactionRequestLike } from './types';
import { transactionRequestify } from './utils';

/**
 * @group node
 */
describe('TransactionRequest', () => {
  it('should correctly map all the coin outputs to CoinQuantity', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const address1 = Address.fromRandom();
    const address2 = Address.fromRandom();

    const amount1 = 100;
    const amount2 = 300;

    transactionRequest.addCoinOutput(address1, amount1, ASSET_B);
    transactionRequest.addCoinOutput(address2, amount2, ASSET_A);

    const result = transactionRequest.getCoinOutputsQuantities();

    expect(result).toEqual([
      {
        amount: bn(amount1),
        assetId: ASSET_B,
      },
      {
        amount: bn(amount2),
        assetId: ASSET_A,
      },
    ]);
  });

  it('should return an empty array if there are no coin outputs', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const result = transactionRequest.getCoinOutputsQuantities();

    expect(result).toEqual([]);
  });

  it('should fund with the expected quantities', () => {
    const transactionRequest = new ScriptTransactionRequest();

    const amountBase = bn(500);
    const amountA = bn(700);
    const amountB = bn(300);

    const quantities: CoinQuantity[] = [
      { assetId: BaseAssetId, amount: amountBase },
      { assetId: ASSET_A, amount: amountA },
      { assetId: ASSET_B, amount: amountB },
    ];

    transactionRequest.fundWithFakeUtxos(quantities);

    const inputs = transactionRequest.inputs as CoinTransactionRequestInput[];

    const inputA = inputs.find((i) => i.assetId === ASSET_A);
    const inputB = inputs.find((i) => i.assetId === ASSET_B);
    const inputBase = inputs.find((i) => i.assetId === BaseAssetId);

    expect(inputA?.amount).toEqual(bn(700));
    expect(inputB?.amount).toEqual(bn(300));
    expect(inputBase?.amount).toEqual(bn(500));
  });

  it('updates witnesses', () => {
    const transactionRequest = new ScriptTransactionRequest();
    const coinOwner = Address.fromRandom();
    const coin: Coin = {
      id: hexlify(randomBytes(32)),
      owner: coinOwner,
      amount: bn(100),
      assetId: ASSET_A,
      maturity: 0,
      blockCreated: bn(0),
      txCreatedIdx: bn(0),
    };
    const mockSignedTx = hexlify(randomBytes(32));

    expect(transactionRequest.witnesses.length).toEqual(0);
    expect(transactionRequest.witnesses).toStrictEqual([]);

    transactionRequest.addCoinInput(coin);

    expect(transactionRequest.witnesses.length).toEqual(1);
    expect(transactionRequest.witnesses).toStrictEqual([concat([ZeroBytes32, ZeroBytes32])]);

    transactionRequest.witnesses.push(mockSignedTx);

    expect(transactionRequest.witnesses.length).toEqual(2);
    expect(transactionRequest.witnesses).toStrictEqual([
      concat([ZeroBytes32, ZeroBytes32]),
      mockSignedTx,
    ]);

    transactionRequest.updateWitness(0, mockSignedTx);

    expect(transactionRequest.witnesses.length).toEqual(2);
    expect(transactionRequest.witnesses).toStrictEqual([mockSignedTx, mockSignedTx]);
  });
});

describe('transactionRequestify', () => {
  it('should keep data from input in transaction request created', () => {
    const script = Uint8Array.from([1, 2, 3, 4]);
    const scriptData = Uint8Array.from([5, 6]);
    const txRequestLike: TransactionRequestLike = {
      type: TransactionType.Script,
      script,
      scriptData,
      gasPrice: 1,
      gasLimit: 10000,
      maturity: 1,
      inputs: [],
      outputs: [],
      witnesses: [],
    };
    const txRequest = transactionRequestify(txRequestLike);

    if (txRequest.type === TransactionType.Script) {
      expect(txRequest.script).toEqual(txRequestLike.script);
      expect(txRequest.scriptData).toEqual(txRequestLike.scriptData);
    }

    expect(txRequest.type).toEqual(txRequestLike.type);
    expect(toNumber(txRequest.gasPrice)).toEqual(txRequestLike.gasPrice);
    expect(toNumber((<ScriptTransactionRequest>txRequest).gasLimit)).toEqual(
      txRequestLike.gasLimit
    );
    expect(txRequest.maturity).toEqual(txRequestLike.maturity);
    expect(txRequest.inputs).toEqual(txRequestLike.inputs);
    expect(txRequest.outputs).toEqual(txRequestLike.outputs);
    expect(txRequest.witnesses).toEqual(txRequestLike.witnesses);
  });

  it('should throw error if invalid transaction type', () => {
    const txRequestLike = {
      type: 5,
      gasPrice: 1,
    };

    expect(() => transactionRequestify(txRequestLike)).toThrow('Invalid transaction type: 5');
  });
});