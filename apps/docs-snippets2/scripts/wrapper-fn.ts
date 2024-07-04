/* eslint-disable @typescript-eslint/no-explicit-any */

// eslint-disable-next-line @typescript-eslint/require-await
export const main = async (): Promise<any | any[]> => {
  const logs: any[] = [];
  const bkpConsole = console;
  // eslint-disable-next-line no-global-assign
  console = {
    ...console,
    log: (...args: any[]) => {
      logs.push(args);
    },
  };
  // ———>>>
  // %SNIPPET%
  // <<<———
  // eslint-disable-next-line no-global-assign
  console = bkpConsole;
  const singleCall = logs.length === 1 && logs[0].length === 1;
  return singleCall ? logs[0][0] : logs;
};