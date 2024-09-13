/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  createMatcher,
  GENERIC_REGEX,
  STRUCT_REGEX,
} from '../../../../matchers/sway-type-matchers';
import type { AbiType, AbiTypeMetadata } from '../../../../parser';

// MyStruct<T extends "input" | "output"> = { a: OurNumber<T>, b: boolean }
// MyStruct<"input">
// MyStruct<"output">

export interface TyperReturn {
  input: string;
  output: string;
  fuelsTypeImports?: string[];
}

export type Typer = (
  abiType: AbiType | AbiTypeMetadata,
  metadataTypeResults?: TyperReturn[]
) => TyperReturn;

const numberTyperReturn: ReturnType<Typer> = {
  input: 'BigNumberish',
  output: 'number',
  fuelsTypeImports: ['BigNumberish'],
};

const u8Typer: Typer = () => numberTyperReturn;

const u16Typer = u8Typer;
const u32Typer = u8Typer;
const u64TyperReturn: TyperReturn = {
  input: 'BigNumberish',
  output: 'BigNumberish',
};
const u64Typer: Typer = () => u64TyperReturn;

const boolTyperReturn = {
  input: 'boolean',
  output: 'boolean',
};
const boolTyper: Typer = () => boolTyperReturn;

const genericTyper: Typer = (type) => {
  const typeName = GENERIC_REGEX.exec(type.swayType)![1];
  return {
    input: typeName,
    output: typeName,
  };
};

export const structTyper: Typer = (abiType, metadataTypeResults) => {
  const typeName = STRUCT_REGEX.exec(abiType.swayType)![1];
  const requiredFuelsImports: string[] = [];

  if ('concreteTypeId' in abiType) {
    const { metadata } = abiType;

    let input = `${typeName}Input`;
    let output = `${typeName}Output`;
    if (metadata?.typeArguments) {
      input += '<';
      output += '<';
      metadata?.typeArguments.forEach((ta, idx, arr) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const typer = typerMatcher(ta)!;
        const result = typer(ta, metadataTypeResults);
        const commaOrNot = idx + 1 === arr.length ? '' : ',';
        input += result.input + commaOrNot;
        output += result.output + commaOrNot;

        if (result.fuelsTypeImports) {
          requiredFuelsImports.push(...result.fuelsTypeImports);
        }
      });
      input += '>';
      output += '>';
    }

    return { input, output, fuelsTypeImports: requiredFuelsImports };
  }

  const { components, typeParameters } = abiType;

  let input = `${typeName}Input`;
  let output = `${typeName}Output`;

  if (typeParameters) {
    input += '<';
    output += '<';
    typeParameters.forEach((ta, idx, arr) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const typer = typerMatcher({ swayType: ta.swayType })!;
      const result = typer(ta, metadataTypeResults);
      const commaOrNot = idx + 1 === arr.length ? '' : ',';
      input += result.input + commaOrNot;
      output += result.output + commaOrNot;
    });
    input += '>';
    output += '>';
  }

  input += ' = {';
  output += ' = {';

  components?.forEach((c, idx, arr) => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const typer = typerMatcher({
      swayType: 'swayType' in c.type ? c.type.swayType : c.type,
    })!;
    const result = typer(c.type, metadataTypeResults);

    const commaOrNot = idx + 1 === arr.length ? '' : ',';

    input += ` ${c.name}: ${result.input}${commaOrNot}`;
    output += ` ${c.name}: ${result.output}${commaOrNot}`;

    if (result.fuelsTypeImports) {
      requiredFuelsImports.push(...result.fuelsTypeImports);
    }
  });

  input += ' }';
  output += ' }';

  return { input, output, fuelsTypeImports: requiredFuelsImports };
};

export const tupleTyper: Typer = (abiType) => {
  const asdf = abiType.components?.map(({ type }) => typerMatcher(type)!(type));

  const input = `[${asdf?.map((v) => v.input).join(', ')}]`;
  const output = `[${asdf?.map((v) => v.output).join(', ')}]`;
  const fuelsTypeImports = asdf
    ?.flatMap((v) => v.fuelsTypeImports)
    .filter((v) => v !== undefined) as string[] | undefined;
  return {
    input,
    output,
    fuelsTypeImports,
  };
};

export const typerMatcher = createMatcher<Typer | undefined>({
  bool: boolTyper,
  u8: u8Typer,
  u16: u16Typer,
  u32: u32Typer,
  u64: u64Typer,
  struct: structTyper,
  generic: genericTyper,
  tuple: tupleTyper,
  string: undefined,
  void: undefined,
  u256: undefined,
  b256: undefined,
  stdString: undefined,
  option: undefined,
  result: undefined,
  enum: undefined,
  b512: undefined,
  bytes: undefined,
  vector: undefined,
  array: undefined,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
  rawUntypedSlice: undefined,
});
