/* eslint-disable @typescript-eslint/no-use-before-define */
import { assertUnreachable } from '@fuel-ts/utils';

import {
  ARRAY_REGEX,
  createMatcher,
  ENUM_REGEX,
  GENERIC_REGEX,
  STRUCT_REGEX,
  swayTypeMatchers,
  TUPLE_REGEX,
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
  opts?: {
    asReference?: boolean;
  }
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
  const mapped = typerMatcher(c.type)!(c.type, { asReference: true });

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

function mapTypeParameters(
  typeArgs: NonNullable<AbiType['metadata']>['typeArguments'] | AbiTypeMetadata['typeParameters']
): TyperReturn {
  if (!typeArgs) {
    return {
      input: '',
      output: '',
    };
  }
  const results = typeArgs.map((ta) => typerMatcher(ta)!(ta, { asReference: true }));
  const input = results.map((r) => r.input).join(', ');
  const output = results.map((r) => r.output).join(', ');
  return {
    input: `<${input}>`,
    output: `<${output}>`,
  };
}

function wrapText(text: string, wrap: '{}' | '[]' | 'Enum'): string {
  switch (wrap) {
    case '{}':
      return `{ ${text} }`;
    case '[]':
      return `[${text}]`;
    case 'Enum': {
      const wrappedAsObj = wrapText(text, '{}');
      return `Enum<${wrappedAsObj}>`;
    }
    default:
      return assertUnreachable(wrap);
  }
}

function mapComponents(parent: AbiType | AbiTypeMetadata, opts: { includeComponentName: boolean }) {
  const components = parent.components;
  const mapped = components!.map((c) => componentMapper(c, opts.includeComponentName));

  // eslint-disable-next-line no-nested-ternary
  const wrap = ENUM_REGEX.test(parent.swayType)
    ? 'Enum'
    : TUPLE_REGEX.test(parent.swayType)
      ? '[]'
      : '{}';

  const input = wrapText(mapped.map((m) => m.input).join(', '), wrap);
  const output = wrapText(mapped.map((m) => m.output).join(', '), wrap);

  const fuelsTypeImports = mapped.flatMap((m) => m.fuelsTypeImports).filter((x) => x !== undefined);
  const commonTypeImports = mapped
    .flatMap((m) => m.commonTypeImports)
    .filter((x) => x !== undefined);

  if (wrap === 'Enum') {
    commonTypeImports.push('Enum');
  }

  return {
    input,
    output,
    fuelsTypeImports,
    commonTypeImports,
  };
}

function mapStructAsReference(abiType: AbiType | AbiTypeMetadata): TyperReturn {
  const { swayType } = abiType;
  const typeName = STRUCT_REGEX.exec(swayType)?.[2] ?? ENUM_REGEX.exec(swayType)?.[2];
  const inputName = `${typeName}Input`;
  const outputName = `${typeName}Output`;

  const typeArgs = mapTypeParameters(
    'concreteTypeId' in abiType ? abiType.metadata?.typeArguments : abiType.typeParameters
  );

  return {
    input: `${inputName}${typeArgs.input}`,
    output: `${outputName}${typeArgs.output}`,
  };
}

export const structTyper: Typer = (abiType, opts) => {
  if ('concreteTypeId' in abiType || opts?.asReference) {
    return mapStructAsReference(abiType);
  }

  const typeName =
    STRUCT_REGEX.exec(abiType.swayType)?.[2] ?? ENUM_REGEX.exec(abiType.swayType)?.[2];

  const typeParameters = mapTypeParameters(abiType.typeParameters);
  const content = mapComponents(abiType, { includeComponentName: true });

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

export const tupleTyper: Typer = (abiType) =>
  mapComponents(abiType, { includeComponentName: false });

export const arrayTyper: Typer = (abiType) => {
  const length = ARRAY_REGEX.exec(abiType.swayType)![2];

  const { type } = abiType.components![0]!;
  const mapped = typerMatcher(type)!(type, { asReference: true });

  const input = `ArrayOfLength<${mapped.input}, ${length}>`;
  const output = `ArrayOfLength<${mapped.output}, ${length}>`;

  return {
    input,
    output,
    fuelsTypeImports: mapped.fuelsTypeImports,
    commonTypeImports: ['ArrayOfLength', ...(mapped.commonTypeImports ?? [])],
  };
};

export const vectorTyper: Typer = (abiType) => {
  const { type } = abiType.components![0]!;
  const mapped = typerMatcher(type)!(type, { asReference: true });
  const input = `${mapped.input}[]`;
  const output = `${mapped.output}[]`;
  return {
    ...mapped,
    input,
    output,
  };
};

export const optionTyper: Typer = (abiType) => {
  const { type } = abiType.components![1]!;
  const some = typerMatcher(type)!(type, { asReference: true });
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

export const enumTyper: Typer = (abiType, opts) => {
  if (isNativeEnum(abiType)) {
    const typeName = ENUM_REGEX.exec(abiType.swayType)![2];

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

  return structTyper(abiType, opts);
};

export const resultTyper: Typer = (abiType) => {
  const [{ type: ok }, { type: err }] = abiType.components!;
  const mappedOk = typerMatcher(ok)!(ok, { asReference: true });
  const mappedErr = typerMatcher(err)!(err, { asReference: true });

  const input = `Result<${mappedOk.input}, ${mappedErr.input}>`;
  const output = `Result<${mappedOk.output}, ${mappedErr.output}>`;

  const fuelsTypeImports = [
    mappedOk.fuelsTypeImports ?? [],
    mappedErr.fuelsTypeImports ?? [],
  ].flat();
  const commonTypeImports = [
    mappedOk.commonTypeImports ?? [],
    mappedErr.commonTypeImports ?? [],
    ['Result'],
  ].flat();
  return {
    input,
    output,
    fuelsTypeImports,
    commonTypeImports,
  };
};

export const voidTyper: Typer = () => ({
  input: 'undefined',
  output: 'void',
});

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
  result: resultTyper,
  void: voidTyper,
  assetId: undefined,
  evmAddress: undefined,
  rawUntypedPtr: undefined,
});
