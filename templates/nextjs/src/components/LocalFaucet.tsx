import { bn, WalletUnlocked } from "fuels";
import { useWallet } from "@fuels/react";
import { useState } from "react";

import Button from "./Button";
import { useNotification } from "../hooks/useNotification";

type Props = {
  refetch: () => void;
};

export default function LocalFaucet({ refetch }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const { infoNotification, successNotification, errorNotification } =
    useNotification();

  const { wallet } = useWallet();

  async function localTransfer() {
    if (!wallet) return;
    setIsLoading(true);
    try {
      const genesis = new WalletUnlocked(
        process.env.NEXT_PUBLIC_GENESIS_WALLET_PRIVATE_KEY as string,
        wallet.provider,
      );
      const tx = await genesis.transfer(wallet.address, bn(5_000_000_000));
      infoNotification(`Transaction submitted: ${tx.id}`);
      await tx.waitForResult();
      successNotification(`Transfer successful: ${tx.id}`);
    } catch (error) {
      console.error(error);
      errorNotification("Error transferring funds.");
    }
    setIsLoading(false);
    refetch();
  }

  return (
    <>
      <hr className="border-zinc-700" />
      <div>
        <div className="flex items-center justify-between text-base dark:text-zinc-50">
          <p className="w-2/3 px-2 py-1 mr-3 font-mono text-xs">
            As the dApp is running locally, you can transfer 5 ETH to your
            address via the genesis wallet.
          </p>
          <Button
            onClick={localTransfer}
            className="w-1/3"
            disabled={isLoading}
          >
            Transfer 5 ETH
          </Button>
        </div>
      </div>
    </>
  );
}