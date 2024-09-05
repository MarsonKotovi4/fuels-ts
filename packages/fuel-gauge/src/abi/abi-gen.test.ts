import { AbiGen } from '@fuel-ts/abi';
import { log } from 'console';
import { readFileSync } from 'fs';
import { join } from 'path';

import { AbiProjectsEnum, getAbiForcProject } from './utils';

/**
 * @group node
 */
describe('AbiGen', () => {
  test('contract', () => {
    const { buildDir } = getAbiForcProject(AbiProjectsEnum.ABI_CONTRACT);
    const gen = new AbiGen({ buildDirs: [buildDir] });
    const expectedContractContent = join(
      process.cwd(),
      'packages/fuel-gauge/src/abi/fixtures/contract.txt'
    );
    const contractFactoryContents = readFileSync(expectedContractContent).toString();

    expect(gen.results.find((r) => r.filename === 'AbiContractFactory.ts')?.content).toEqual(
      contractFactoryContents
    );
  });

  test('script', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);
    log(abiContents);
  });

  test('predicate', () => {
    const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
    log(abiContents);
  });
});
