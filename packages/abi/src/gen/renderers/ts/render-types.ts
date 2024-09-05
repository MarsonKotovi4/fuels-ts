import { compile } from 'handlebars';

import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';

import template from './templates/abi.hbs';

export interface RenderTypesOutput extends AbiGenResult {
  importNames: string[];
}
export function renderTypes({ name, abi }: ProgramDetails): RenderTypesOutput {
  // will handle abi + typers here to get content
  const renderTemplate = compile(template, { strict: true, noEscape: true });

  const content = renderTemplate({});
  return {
    filename: `${name}.ts`,
    content,
    importNames: ['StructWithGenericLevelOne', 'VectorOfU8'],
  };
}
