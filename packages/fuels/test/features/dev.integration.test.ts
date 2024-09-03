import { execSync, spawn } from 'child_process';
import { mkdirSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';

import { randomUUID, sleep } from '../../src';
import { findChildProcessPid } from '../utils/findChildProcessPid';
import { isProcessRunning } from '../utils/isProcessRunning';

function runInit() {
  const fuelsPath = path.join(process.cwd(), 'packages/fuels');

  const init = path.join(tmpdir(), '.fuels', 'tests', 'dev', randomUUID());
  mkdirSync(init, { recursive: true });

  execSync(`pnpm init && pnpm link ${fuelsPath}`, { cwd: init });
  const contractDir = path.join(init, 'contract');
  const outputDir = path.join(init, 'output');
  mkdirSync(contractDir);
  mkdirSync(outputDir);
  execSync(`${process.env.FORC_PATH} init`, { cwd: contractDir });
  try {
    execSync(`pnpm fuels init -o ${outputDir} -c ${contractDir} --path ${init} --fuel-core-port 0`);
  } catch (e) {
    type BufferData = { type: 'Buffer'; data: Uint8Array };
    const error = e as Error & {
      status: number;
      signal: null;
      output: [null, BufferData, BufferData];
      pid: number;
      stdout: BufferData;
      stderr: BufferData;
    };

    [error.output[1], error.stdout].forEach((val) => {
      // @ts-expect-error asd
      console.log((val as Buffer)?.toString());
      console.log(String.fromCharCode(...(val.data ?? [])));
    });

    throw e;
  }

  return {
    init,
    [Symbol.dispose]: () => {
      rmSync(init, { recursive: true });
    },
  };
}

/**
 * @group node
 */
describe('dev2', () => {
  it(
    'cleans up resources on graceful shutdown',
    async () => {
      using paths = runInit();
      const devProcess = spawn(`pnpm fuels dev --path ${paths.init}`, {
        // stdio: 'pipe',
        shell: 'bash',
        detached: true,
      });

      let devCompletedResolver: (value?: never) => void;
      const devCompleted = new Promise((resolve) => {
        devCompletedResolver = resolve;
      });

      devProcess.stdout.on('data', (chunk: string | Buffer) => {
        const text = chunk.toString();
        if (text.indexOf('Dev completed successfully!') !== -1) {
          devCompletedResolver();
        }
      });

      await devCompleted;

      let devExitedResolver: (value?: never) => void;
      const devExited = new Promise((resolve) => {
        devExitedResolver = resolve;
      });
      devProcess.on('exit', () => {
        devExitedResolver();
      });

      const devPid = devProcess.pid as number;

      const fuelCorePid = findChildProcessPid(devPid, 'fuel-core') as number;

      process.kill(-devPid, 'SIGINT');

      await devExited;

      await sleep(1000);
      expect(isProcessRunning(fuelCorePid)).toBe(false);
    },
    { timeout: 25000 }
  );
});
