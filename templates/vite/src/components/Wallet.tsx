import { bn, WalletUnlocked } from "fuels";
import Button from "./Button";
import { useDisconnect, useWallet, useBalance } from "@fuels/react";
import { useEffect } from "react";
import { useProvider } from "../hooks/useProvider";
import { useEnvironment } from "../hooks/useEnvironment";

export default function Wallet() {
  const { disconnect } = useDisconnect();
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });
  const { provider } = useProvider();
  const { isLocal, testnetFaucetUrl } = useEnvironment();

  const faucetUrl = `${testnetFaucetUrl}/?address=${address}&autoClose&redirectUrl=${window.location.href}`;

  useEffect(() => {
    const interval = setInterval(() => refetch(), 1000);
    return () => clearInterval(interval);
  }, [refetch]);

  async function localTransfer() {
    if (!wallet) return;

    const genesis = new WalletUnlocked(
      process.env.VITE_GENESIS_WALLET_PRIVATE_KEY as string,
      provider,
    );
    const tx = await genesis.transfer(wallet.address, bn(5_000_000_000));
    await tx.waitForResult();
  }

  //

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button onClick={() => disconnect()} className="w-1/3">
            Disconnect
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-medium md:mb-0 dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
          <input
            type="text"
            value={balance ? `${balance?.format()} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button
            onClick={() => window.open(faucetUrl, "_blank")}
            className="w-1/3"
          >
            Faucet
          </Button>
        </div>
      </div>
      <div>
        <p>
          Fuel supports a range of wallets. This dApp utilizes wallet connectors
          to provide simple wallet integration. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/wallet/dev/connectors/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </div>
      {isLocal && (
        <>
          <hr className="border-zinc-700" />
          <div>
            <div className="flex items-center justify-between text-base md:text-[17px] dark:text-zinc-50">
              <p className="w-2/3 px-2 py-1 mr-3 font-mono text-xs">
                As the dApp is running locally, you can transfer 5 ETH to your
                address via the genesis wallet.
              </p>
              <Button onClick={localTransfer} className="w-1/3">
                Transfer 5 ETH
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}