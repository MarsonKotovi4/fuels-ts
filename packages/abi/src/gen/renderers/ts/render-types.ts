import { compile } from 'handlebars';

import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';

import template from './templates/types.hbs';
import { typerMatcher } from './typers/typers';

export interface RenderTypesOutput extends AbiGenResult {
  importNames: string[];
}
export function renderTypes({ name, abi }: ProgramDetails): RenderTypesOutput {
  const types = abi.metadataTypes.filter((t) => t.components).map((t) => typerMatcher(t)!(t));

  const fuelsTypeImports = [
    ...new Set(
      types
        .map((t) => t.requiredFuelsImports)
        .filter((x) => x !== undefined)
        .flat()
    ),
  ].join(', ');

  const functions = abi.functions.map((fn) => ({
    name: fn.name,
    inputs: `[${fn.inputs
      .map(({ name: argumentName, type }) => {
        const typer = typerMatcher(type)!(type);
        const res = `${argumentName}: ${typer.input}`;
        return res;
      })
      .join(', ')}]`,
    output: typerMatcher(fn.output)!(fn.output).output,
  }));

  // console.log(result);
  // will handle abi + typers here to get content
  const renderTemplate = compile(template, { strict: true, noEscape: true });

  const content = renderTemplate({
    name,
    types,
    fuelsTypeImports,
    functions,
  });
  return {
    filename: `${name}Types.ts`,
    content,
    importNames: ['StructWithGenericLevelOne', 'VectorOfU8'],
  };
}
