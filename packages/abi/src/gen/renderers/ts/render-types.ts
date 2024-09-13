import { compile } from 'handlebars';

import { ENUM_REGEX, STRUCT_REGEX } from '../../../matchers/sway-type-matchers';
import type { AbiTypeMetadata } from '../../../parser';
import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';

import template from './templates/types.hbs';
import type { TyperReturn } from './typers/typers';
import { typerMatcher } from './typers/typers';

export interface RenderTypesOutput extends AbiGenResult {
  importNames: string[];
}

function typeFilter(t: AbiTypeMetadata) {
  return (
    (STRUCT_REGEX.test(t.swayType) && t.swayType !== 'struct std::vec::Vec') ||
    ENUM_REGEX.test(t.swayType)
  );
}

export function renderTypes({ name, abi }: ProgramDetails): RenderTypesOutput {
  const mTypes = abi.metadataTypes.filter(typeFilter).map((t) => typerMatcher(t)!(t));

  const cTypes = abi.types.reduce<Record<string, TyperReturn>>((res, val) => {
    res[val.concreteTypeId] = typerMatcher(val)!(val);
    return res;
  }, {});

  const fuelsTypeImports = [
    ...new Set(
      mTypes
        .flatMap((t) => t.fuelsTypeImports)
        .concat(Object.values(cTypes).flatMap((ct) => ct.fuelsTypeImports))
        .filter((x) => x !== undefined)
    ),
  ].join(', ');

  const commonTypeImports = [
    ...new Set(
      mTypes
        .flatMap((t) => t.commonTypeImports)
        .concat(Object.values(cTypes).flatMap((ct) => ct.commonTypeImports))
        .filter((x) => x !== undefined)
    ),
  ].join(', ');

  const functions = abi.functions.map((fn) => ({
    name: fn.name,
    inputs: `[${fn.inputs.map((i) => `${i.name}: ${cTypes[i.type.concreteTypeId].input}`).join(', ')}]`,
    output: cTypes[fn.output.concreteTypeId].output,
  }));

  const renderTemplate = compile(template, { strict: true, noEscape: true });

  const content = renderTemplate({
    fuelsTypeImports,
    commonTypeImports,
    name,
    types: mTypes,
    functions,
  });
  return {
    filename: `${name}Types.ts`,
    content,
    importNames: ['StructWithGenericLevelOne', 'VectorOfU8'],
  };
}
