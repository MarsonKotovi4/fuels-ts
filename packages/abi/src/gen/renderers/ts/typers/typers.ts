/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  createMatcher,
  GENERIC_REGEX,
  STRUCT_REGEX,
} from '../../../../matchers/sway-type-matchers';
import type { AbiType, AbiTypeComponent, AbiTypeMetadata } from '../../../../parser';

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

function componentMapper(
  c: AbiTypeComponent | { name: string; type: AbiType | AbiTypeMetadata },
  includeName: boolean
): TyperReturn {
  const mapped = typerMatcher(c.type)!(c.type);

  if (!includeName) {
    return mapped;
  }

  return {
    input: `${c.name}: ${mapped.input}`,
    output: `${c.name}: ${mapped.output}`,
    fuelsTypeImports: mapped.fuelsTypeImports,
  };
}

function appendMappedComponents(
  obj: TyperReturn,
  components: AbiType['components'] | AbiTypeMetadata['components'],
  opts: {
    includeName: boolean;
    wrap: '{}' | '[]' | '<>';
    padWrap: boolean;
  }
): TyperReturn {
  const { wrap, padWrap, includeName } = opts;
  const mappedComponents = components!.map((c) => componentMapper(c, includeName));

  const [leftWrap, rightWrap] = wrap.split('');
  const wrapPadding = padWrap ? ' ' : '';

  const input = `${leftWrap}${wrapPadding}${mappedComponents.map((c) => c.input).join(', ')}${wrapPadding}${rightWrap}`;
  const output = `${leftWrap}${wrapPadding}${mappedComponents.map((c) => c.output).join(', ')}${wrapPadding}${rightWrap}`;
  const fuelsTypeImports = mappedComponents
    .flatMap((v) => v.fuelsTypeImports)
    .filter((v) => v !== undefined) as string[];

  // eslint-disable-next-line no-param-reassign
  obj.input += input;
  // eslint-disable-next-line no-param-reassign
  obj.output += output;
  obj.fuelsTypeImports?.push(...fuelsTypeImports);

  return { input, output, fuelsTypeImports };
}

export const structTyper: Typer = (abiType) => {
  const typeName = STRUCT_REGEX.exec(abiType.swayType)![1];

  const response: TyperReturn = {
    input: `${typeName}Input`,
    output: `${typeName}Output`,
    fuelsTypeImports: [],
  };

  if ('concreteTypeId' in abiType) {
    const { metadata } = abiType;

    if (!metadata?.typeArguments) {
      return response;
    }

    appendMappedComponents(
      response,
      metadata.typeArguments.map((t) => ({ name: '', type: t })),
      {
        includeName: false,
        wrap: '<>',
        padWrap: false,
      }
    );

    return response;
  }

  const { components, typeParameters } = abiType;

  if (typeParameters) {
    appendMappedComponents(
      response,
      typeParameters.map((t) => ({ name: '', type: t })),
      {
        includeName: false,
        wrap: '<>',
        padWrap: false,
      }
    );
  }

  response.input += ' = ';
  response.output += ' = ';

  appendMappedComponents(response, components, {
    includeName: true,
    wrap: '{}',
    padWrap: true,
  });

  return response;
};

export const tupleTyper: Typer = (abiType) => {
  const response: TyperReturn = { input: '', output: '', fuelsTypeImports: [] };

  appendMappedComponents(response, abiType.components, {
    includeName: false,
    wrap: '[]',
    padWrap: false,
  });

  return response;
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
