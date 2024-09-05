import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';
import type { Renderer } from '../types';

import { renderProgram } from './render-program';
import { renderTypes } from './render-types';

export const renderTs: Renderer = (details: ProgramDetails[]): AbiGenResult[] => {
  const results = details
    .map((d) => {
      const types = renderTypes(d);
      const program = renderProgram({ ...d, imports: types.importNames });
      return [types, program];
    })
    .flat();

  return results;
};
