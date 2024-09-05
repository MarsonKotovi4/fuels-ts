import { compile } from 'handlebars';

import type { AbiGenResult } from '../../abi-gen';
import type { ProgramDetails } from '../../utils/get-program-details';

import contractFactoryTemplate from './templates/contract-factory.hbs';
import contractTemplate from './templates/contract.hbs';
import headerTemplate from './templates/header.hbs';
import predicateTemplate from './templates/predicate.hbs';
import scriptTemplate from './templates/script.hbs';

export function renderProgram(
  programDetails: ProgramDetails & { imports: string[] }
): AbiGenResult {
  const { abi, binCompressed, name } = programDetails;
  const templateMap = new Map<string, string>();
  let template: string = '';
  let filename: string = '';

  switch (abi.programType) {
    case 'contract':
      templateMap.set(`${name}Factory.ts`, contractFactoryTemplate);
      templateMap.set(`${name}Contract.ts`, contractTemplate);
      template = contractFactoryTemplate;
      filename = `${name}Factory.ts`;
      break;
    case 'predicate':
      template = predicateTemplate;
      filename = `${name}Predicate.ts`;
      break;
    case 'script':
      template = scriptTemplate;
      filename = `${name}Script.ts`;
      break;
    default:
      break;
  }

  const options = {
    strict: true,
    noEscape: true,
  };

  const renderHeaderTemplate = compile(headerTemplate, options);

  const renderProgramTemplate = compile(template, options);

  const text = renderProgramTemplate({
    header: renderHeaderTemplate({}),
    name,
    binCompressed,
    imports: programDetails.imports,
  });

  const content = text.replace(/[\n]{3,}/gm, '\n\n');

  return {
    filename,
    content,
  };
}
