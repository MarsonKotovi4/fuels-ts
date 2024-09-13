/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ARRAY_REGEX,
  createMatcher,
  GENERIC_REGEX,
  STRUCT_REGEX,
} from '../../../../matchers/sway-type-matchers';
import type { AbiType, AbiTypeComponent, AbiTypeMetadata } from '../../../../parser';

export interface TyperReturn {
  input: string;
  output: string;
  fuelsTypeImports?: string[];
  commonTypeImports?: string[];
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
  ...numberTyperReturn,
  output: 'BigNumberish',
};
const u64Typer: Typer = () => u64TyperReturn;
const u256Typer: Typer = u64Typer;

const boolTyperReturn = {
  input: 'boolean',
  output: 'boolean',
};
const boolTyper: Typer = () => boolTyperReturn;

const stringTyperReturn: TyperReturn = {
  input: 'string',
  output: 'string',
};

const stringTyper: Typer = () => stringTyperReturn;
const b256Typer: Typer = stringTyper;

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
) {
  const { wrap, padWrap, includeName } = opts;
  const mappedComponents = components!.map((c) => componentMapper(c, includeName));

  const [leftWrap, rightWrap] = wrap.split('');
  const wrapPadding = padWrap ? ' ' : '';

  const input = `${leftWrap}${wrapPadding}${mappedComponents.map((c) => c.input).join(', ')}${wrapPadding}${rightWrap}`;
  const output = `${leftWrap}${wrapPadding}${mappedComponents.map((c) => c.output).join(', ')}${wrapPadding}${rightWrap}`;
  const fuelsTypeImports = mappedComponents
    .flatMap((v) => v.fuelsTypeImports)
    .filter((v) => v !== undefined) as string[];

  const commonTypeImports = mappedComponents
    .flatMap((v) => v.commonTypeImports)
    .filter((v) => v !== undefined) as string[];

  // eslint-disable-next-line no-param-reassign
  obj.input += input;
  // eslint-disable-next-line no-param-reassign
  obj.output += output;
  obj.fuelsTypeImports?.push(...fuelsTypeImports);
  obj.commonTypeImports?.push(...commonTypeImports);
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

export const arrayTyper: Typer = (abiType) => {
  const length = ARRAY_REGEX.exec(abiType.swayType)![2];

  const { type } = abiType.components![0]!;
  const mappedComponent = typerMatcher(type)!(type);

  const input = `ArrayOfLength<${mappedComponent.input}, ${length}>`;
  const output = `ArrayOfLength<${mappedComponent.output}, ${length}>`;

  return {
    input,
    output,
    fuelsTypeImports: mappedComponent.fuelsTypeImports,
    commonTypeImports: [...(mappedComponent.commonTypeImports ?? []), 'ArrayOfLength'],
  };
};

export const vectorTyper: Typer = (abiType) => {
  const { type } = abiType.components![0]!;
  const mappedComponent = typerMatcher(type)!(type);
  const input = `${mappedComponent.input}[]`;
  const output = `${mappedComponent.output}[]`;
  return {
    ...mappedComponent,
    input,
    output,
  };
};

export const typerMatcher = createMatcher<Typer | undefined>({
  bool: boolTyper,
  u8: u8Typer,
  u16: u16Typer,
  u32: u32Typer,
  u64: u64Typer,
  u256: u256Typer,
  b256: b256Typer,
  tuple: tupleTyper,
  array: arrayTyper,
  struct: structTyper,
  generic: genericTyper,
  string: stringTyper,
  vector: vectorTyper,
  void: undefined,
  stdString: undefined,
  option: undefined,
  result: undefined,
  enum: undefined,
  b512: undefined,
  bytes: undefined,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
  rawUntypedSlice: undefined,
});
