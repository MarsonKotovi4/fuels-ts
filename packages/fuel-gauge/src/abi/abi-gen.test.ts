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
    const factoryFile = join(
      process.cwd(),
      'packages/fuel-gauge/src/abi/fixtures/contract-factory.txt'
    );
    const factoryContent = readFileSync(factoryFile).toString();

    expect(gen.results.find((r) => r.filename === 'AbiContractFactory.ts')?.content).toEqual(
      factoryContent
    );

    const typesFile = join(
      process.cwd(),
      'packages/fuel-gauge/src/abi/fixtures/contract-types.txt'
    );

    const typesContent = readFileSync(typesFile).toString();

    expect(gen.results.find((r) => r.filename === 'AbiContractTypes.ts')?.content).toEqual(
      typesContent
    );
  });

  // test('script', () => {
  //   const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_SCRIPT);
  //   log(abiContents);
  // });

  // test('predicate', () => {
  //   const { abiContents } = getAbiForcProject(AbiProjectsEnum.ABI_PREDICATE);
  //   log(abiContents);
  // });
});
