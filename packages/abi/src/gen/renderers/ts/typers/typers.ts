/* eslint-disable @typescript-eslint/no-use-before-define */
import {
  ARRAY_REGEX,
  createMatcher,
  ENUM_REGEX,
  GENERIC_REGEX,
  STRUCT_REGEX,
  swayTypeMatchers,
} from '../../../../matchers/sway-type-matchers';
import type { AbiType, AbiTypeComponent, AbiTypeMetadata } from '../../../../parser';

export interface TyperReturn {
  input: string;
  output: string;
  fuelsTypeImports?: string[];
  commonTypeImports?: string[];
  tsType?: 'enum' | 'type';
  inputAndOutputDiffer?: boolean;
}

export type Typer = (
  abiType: AbiType | AbiTypeMetadata,
  metadataTypeResults?: TyperReturn[]
) => TyperReturn;

const numberTyperReturn: ReturnType<Typer> = {
  input: 'BigNumberish',
  output: 'number',
  fuelsTypeImports: ['BigNumberish'],
  inputAndOutputDiffer: true,
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
    commonTypeImports: mapped.commonTypeImports,
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

function mapTypeParameters(
  typeArgs: NonNullable<AbiType['metadata']>['typeArguments'] | AbiTypeMetadata['typeParameters']
): TyperReturn {
  if (!typeArgs) {
    return {
      input: '',
      output: '',
    };
  }
  const results = typeArgs.map((ta) => typerMatcher(ta)!(ta));
  const input = results.map((r) => r.input).join(', ');
  const output = results.map((r) => r.output).join(', ');
  return {
    input: `<${input}>`,
    output: `<${output}>`,
  };
}

function mapStructAsReference(abiType: AbiType): TyperReturn {
  const { swayType, metadata } = abiType;
  const typeName = STRUCT_REGEX.exec(swayType)?.[1] ?? ENUM_REGEX.exec(swayType)?.[1];

  const inputName = `${typeName}Input`;
  const outputName = `${typeName}Output`;
  if (!metadata?.typeArguments) {
    return {
      input: inputName,
      output: outputName,
    };
  }
  const typeArgs = mapTypeParameters(metadata.typeArguments);
  return {
    input: `${inputName}${typeArgs.input}`,
    output: `${outputName}${typeArgs.output}`,
  };
}

function mapContent(
  components: AbiType['components'] | AbiTypeMetadata['components'],
  opts: { includeName: boolean }
) {
  const mapped = components!.map((c) => componentMapper(c, opts.includeName));
  const input = mapped.map((m) => m.input).join(', ');
  const output = mapped.map((m) => m.output).join(', ');
  const fuelsTypeImports = mapped.flatMap((m) => m.fuelsTypeImports).filter((x) => x !== undefined);
  const commonTypeImports = mapped
    .flatMap((m) => m.commonTypeImports)
    .filter((x) => x !== undefined);

  return {
    input: `{ ${input} }`,
    output: `{ ${output} }`,
    fuelsTypeImports,
    commonTypeImports,
  };
}

export const structTyper: Typer = (abiType) => {
  if ('concreteTypeId' in abiType) {
    return mapStructAsReference(abiType);
  }

  const typeName =
    STRUCT_REGEX.exec(abiType.swayType)?.[1] ?? ENUM_REGEX.exec(abiType.swayType)?.[1];

  function wrapContent(content: TyperReturn): TyperReturn {
    if (!ENUM_REGEX.test(abiType.swayType)) {
      return content;
    }

    return {
      ...content,
      commonTypeImports: ['Enum', ...(content.commonTypeImports ?? [])],
      input: `Enum<${content.input}>`,
      output: `Enum<${content.output}>`,
    };
  }

  const { components } = abiType;

  const typeParameters = mapTypeParameters(abiType.typeParameters);
  const content = wrapContent(mapContent(components, { includeName: true }));

  const inputName = `${typeName}Input`;
  const inputType = `${inputName}${typeParameters.input}`;
  const outputType = `${typeName}Output${typeParameters.output}`;

  const input = `${inputType} = ${content.input}`;
  let output = '';
  if (content.input === content.output) {
    output = `${outputType} = ${inputType}`;
  } else {
    output = `${outputType} = ${content.output}`;
  }

  return {
    input,
    output,
    commonTypeImports: content.commonTypeImports,
    fuelsTypeImports: content.fuelsTypeImports,
    tsType: 'type',
  };
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

export const optionTyper: Typer = (abiType) => {
  const { type } = abiType.components![1]!;
  const some = typerMatcher(type)!(type);
  const input = `Option<${some.input}>`;
  const output = `Option<${some.output}>`;
  return {
    input,
    output,
    commonTypeImports: ['Option'],
  };
};

export const b512Typer: Typer = stringTyper;

const bytesTyperReturn: TyperReturn = {
  input: 'Bytes',
  output: 'Bytes',
  fuelsTypeImports: ['Bytes'],
};
export const bytesTyper: Typer = () => bytesTyperReturn;

const strTyperReturn: TyperReturn = {
  input: 'StrSlice',
  output: 'StrSlice',
  fuelsTypeImports: ['StrSlice'],
};
export const strTyper: Typer = () => strTyperReturn;

const rawSliceTyperReturn: TyperReturn = {
  input: 'RawSlice',
  output: 'RawSlice',
  fuelsTypeImports: ['RawSlice'],
};
export const rawSliceTyper = () => rawSliceTyperReturn;

const stdStringTyperReturn: TyperReturn = {
  input: 'StdString',
  output: 'StdString',
  fuelsTypeImports: ['StdString'],
};
export const stdStringTyper: Typer = () => stdStringTyperReturn;

function isNativeEnum(abiType: AbiType | AbiTypeMetadata) {
  return abiType.components?.every((t) => swayTypeMatchers.void(t.type.swayType)) === true;
}

export const enumTyper: Typer = (abiType) => {
  if (isNativeEnum(abiType)) {
    const typeName = ENUM_REGEX.exec(abiType.swayType)![1];

    if ('concreteTypeId' in abiType) {
      return { input: typeName, output: typeName };
    }

    const enumFields = abiType.components!.map((c) => `${c.name} = '${c.name}'`).join(', ');
    const input = `${typeName} { ${enumFields} }`;
    return {
      input,
      output: input,
      tsType: 'enum',
    };
  }

  return structTyper(abiType);
};
export const typerMatcher = createMatcher<Typer | undefined>({
  bool: boolTyper,
  u8: u8Typer,
  u16: u16Typer,
  u32: u32Typer,
  u64: u64Typer,
  u256: u256Typer,
  b256: b256Typer,
  b512: b512Typer,
  tuple: tupleTyper,
  array: arrayTyper,
  struct: structTyper,
  generic: genericTyper,
  string: stringTyper,
  vector: vectorTyper,
  option: optionTyper,
  bytes: bytesTyper,
  str: strTyper,
  rawUntypedSlice: rawSliceTyper,
  stdString: stdStringTyper,
  enum: enumTyper,
  void: undefined,
  result: undefined,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
});
