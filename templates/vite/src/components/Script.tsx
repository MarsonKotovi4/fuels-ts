import { useWallet } from "@fuels/react";
import { BigNumberish, BN, Script as FuelScript } from "fuels";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

import { TestScript } from "../sway-api";
import Button from "./Button";
import LocalFaucet from "./LocalFaucet";
import { isLocal } from "../lib";

export default function Script() {
  const [script, setScript] = useState<FuelScript<[input: BigNumberish], BN>>();
  const [input, setInput] = useState<number>();
  const [result, setResult] = useState<number>();
  const [isLoading, setIsLoading] = useState(false);

  const { wallet, refetch } = useWallet();

  useEffect(() => {
    if (wallet) {
      const testScript = new TestScript(wallet);
      setScript(testScript);
    }
  }, [wallet]);

  const submit = async () => {
    if (!script || !input) return;
    setIsLoading(true);
    try {
      const tx = await script.functions.main(input).call();
      toast.info(`Transaction submitted: ${tx.transactionId}`);
      const result = await tx.waitForResult();
      toast.success(`Transaction successful: ${result.transactionId}`);
      setResult(result.value.toNumber());
    } catch (error) {
      console.error(error);
      toast.error(
        "Error running script. Please make sure your wallet has enough funds. You can top it up using the faucet.",
      );
    }
    setIsLoading(false);
  };

  return (
    <>
      <div>
        <p>
          Scripts are another core program type. They act as runnable bytecode
          on chain. You can read more about them{" "}
          <a
            href="https://docs.fuel.network/docs/fuels-ts/scripts/"
            className="text-green-500/80 transition-colors hover:text-green-500"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
        <p className="pt-2">
          In the below example we can pass a number input and it returns the
          same value in the transaction output.
        </p>
        <p className="pt-2">
          You can alter the logic in the script at{" "}
          <code>sway-programs/scripts/src/main.sw</code>.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
            Script Input
          </h3>
          <div className="flex items-center justify-between text-base dark:text-zinc-50">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(Number(e.target.value))}
              className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
              placeholder="Hint: 123"
            />
          </div>
        </div>
        <div>
          <h3 className="mb-1 text-sm font-medium dark:text-zinc-300/70">
            Script Output
          </h3>
          <div className="flex items-center justify-between text-base dark:text-zinc-50">
            <input
              type="number"
              value={result}
              className="w-full bg-gray-800 rounded-md px-2 py-1 mr-3 truncate font-mono"
              disabled
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <Button className="w-full" onClick={submit} disabled={isLoading}>
          Submit
        </Button>
      </div>
      {isLocal && <LocalFaucet refetch={refetch} />}
    </>
  );
}