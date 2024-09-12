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

export type Typer = (abiType: AbiType | AbiTypeMetadata) => {
  input: string;
  output: string;
  requiredFuelsImports?: string[];
};

const numberTyperReturn: ReturnType<Typer> = {
  input: 'BigNumberish',
  output: 'number',
  requiredFuelsImports: ['BigNumberish'],
};

const u8Typer: Typer = () => numberTyperReturn;

const u16Typer = u8Typer;
const u32Typer = u8Typer;

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

export const structTyper: Typer = (abiType: AbiType | AbiTypeMetadata) => {
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
        const result = typer(ta);
        const commaOrNot = idx + 1 === arr.length ? '' : ',';
        input += result.input + commaOrNot;
        output += result.output + commaOrNot;

        if (result.requiredFuelsImports) {
          requiredFuelsImports.push(...result.requiredFuelsImports);
        }
      });
      input += '>';
      output += '>';
    }

    // input += '= {';
    // output += '= {';

    // components?.forEach((c) => {
    //   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    //   const typer = typerMatcher({
    //     swayType: 'swayType' in c.type ? c.type.swayType : c.type,
    //   })!;
    //   const result = typer(c.type);

    //   input += `${c.name}: ${result.input},\n`;
    //   output += `${c.name}: ${result.output},\n`;

    //   if (result.requiredFuelsImports) {
    //     requiredFuelsImports.push(...result.requiredFuelsImports);
    //   }
    // });

    // input += '}';
    // output += '}';

    return { input, output, requiredFuelsImports };
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
      const result = typer(ta);
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
    const result = typer(c.type);

    const commaOrNot = idx + 1 === arr.length ? '' : ',';

    input += ` ${c.name}: ${result.input}${commaOrNot}`;
    output += ` ${c.name}: ${result.output}${commaOrNot}`;

    if (result.requiredFuelsImports) {
      requiredFuelsImports.push(...result.requiredFuelsImports);
    }
  });

  input += ' }';
  output += ' }';

  return { input, output, requiredFuelsImports };
};

export const typerMatcher = createMatcher<Typer | undefined>({
  bool: boolTyper,
  u8: u8Typer,
  u16: u16Typer,
  u32: u32Typer,
  struct: structTyper,
  generic: genericTyper,
  string: undefined,
  void: undefined,
  u64: undefined,
  u256: undefined,
  b256: undefined,
  stdString: undefined,
  option: undefined,
  result: undefined,
  enum: undefined,
  b512: undefined,
  bytes: undefined,
  vector: undefined,
  tuple: undefined,
  array: undefined,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
  rawUntypedSlice: undefined,
});
