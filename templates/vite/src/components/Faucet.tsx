import { useBalance, useWallet } from "@fuels/react";
import { toast } from "react-toastify";
import { useEffect } from "react";

import LocalFaucet from "./LocalFaucet";
import Button from "./Button";
import { isLocal, testnetFaucetUrl } from "../lib";

export default function Faucet() {
  const { wallet } = useWallet();
  const address = wallet?.address.toB256() || "";
  const { balance, refetch } = useBalance({ address });

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    const interval = setInterval(() => refetch(), 5000);
    return () => clearInterval(interval);
  }, [refetch]);

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  return (
    <>
      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Address
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={address}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button className="w-1/3" onClick={copyAddress}>
            Copy
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
          Balance
        </h3>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <input
            type="text"
            value={balance ? `${balance?.format()} ETH` : ""}
            className="w-2/3 bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
            disabled
          />
          <Button className="w-1/3" onClick={() => refetch()}>
            Refresh
          </Button>
        </div>
      </div>

      <div>
        {!isLocal && (
          <>
            <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
              Testnet Faucet
            </h3>
            <iframe
              src={`${testnetFaucetUrl}?address=${address}`}
              title="Faucet"
              className="w-full max-h-screen min-h-[500px] border-0 rounded-md mt-1"
            />
          </>
        )}
      </div>
      {isLocal && (
        <>
          <LocalFaucet refetch={refetch} />
          <p className="w-full px-2 py-1 mr-3 font-mono text-xs">
            If you would like to visit the testnet faucet, you can do so{" "}
            <a
              href={`${testnetFaucetUrl}?address=${address}&autoClose&redirectUrl=${window.location.href}`}
              target="_blank"
              className="text-green-500/80 transition-colors hover:text-green-500"
            >
              here
            </a>
            .
          </p>
        </>
      )}
    </>
  );
}