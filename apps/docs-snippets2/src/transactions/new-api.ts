/*
// #region full
import type { TxParams } from 'fuels';
import { LOCAL_NETWORK_URL, fuels, bn } from 'fuels';

import { WALLET_PVT_KEY } from '../env';
import { Sum, Counter, counterBytecode } from '../typegend';

const client = await fuels(LOCAL_NETWORK_URL);
const wallet = client.wallet(WALLET_PVT_KEY);

const deployment = await Counter.deploy(wallet);
const { contract } = await deploy.waitForResult();

const txParams: TxParams = {
  gasLimit: bn(69242),
  maxFee: bn(69242),
  tip: bn(100),
  maturity: 1,
  witnessLimit: bn(5000),
};

const { waitForResult } = await contract.functions
  .increment_count(15) //
  .txParams(txParams)
  .call();

const {
  value,
  transactionResult: { isStatusSuccess },
} = await waitForResult();

const transactionRequest = new fuels.ScriptTransactionRequest({
  script: Sum.bin,
  gasLimit: 100,
});

console.log({ value, isStatusSuccess, transactionRequest });
// #endregion full
*/