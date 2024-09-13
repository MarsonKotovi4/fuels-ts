export interface AbiType {
  // Concrete type ID
  concreteTypeId: string;
  concreteType: string; // u8, struct GenericStruct<u8>
  swayType: string; // u8, struct GenericStruct
  // This will reference the metadata type
  // Fallback to concrete type when no metadata type is referenced (i.e. for built in types)
  // swayType: string;
  components?: AbiTypeComponent[];
  // metadataType?: AbiTypeMetadata;

  // // metadataTypeId?: number;
  // // typeArguments?: AbiType[];

  // /**
  //  * This metadata was used to construct the components of this type
  //  */
  metadata?: {
    metadataTypeId: number;
    /**
     * the metadata type used to fully resolve this type.
     */
    // type: AbiTypeMetadata; // key/pointer reference to an element in the metadataTypes array
    /**
     * type arguments that replace the generic type parameters of the metadata types.
     */
    typeArguments?: AbiType[];
    // <BigNumberish, FooBarStruct<FooBarStruct<NonGenericStruct>>, BigNumberish>
  };
}

export interface AbiTypeMetadata {
  metadataTypeId: number;
  swayType: string;
  components?: { name: string; type: AbiType | AbiTypeMetadata }[];
  typeParameters?: AbiTypeMetadata[]; // typeParamters[0].typeName === 'generic T'
  // {typeId: 5, type: 'generic T', components: null, typeParameters: null}
}

export interface Abi {
  specVersion: string;
  encodingVersion: string;
  programType: string;

  metadataTypes: AbiTypeMetadata[];
  types: AbiType[];
  functions: AbiFunction[];
  loggedTypes: AbiLoggedType[];
  messageTypes: AbiMessageType[];
  configurables: AbiConfigurable[];
}

export interface AbiTypeComponent {
  name: string;
  type: AbiType;
}

export interface AbiFunctionInput {
  name: string;
  type: AbiType;
}

export interface AbiFunction {
  name: string;
  inputs: AbiFunctionInput[];
  output: AbiType;
  attributes?: readonly AbiFunctionAttribute[];
}

export interface AbiLoggedType {
  logId: string;
  type: AbiType;
}

export interface AbiMessageType {
  messageId: string;
  type: AbiType;
}

export interface AbiConfigurable {
  name: string;
  offset: number;
  type: AbiType;
}

type AbiFunctionAttribute =
  | StorageAttr
  | PayableAttr
  | TestAttr
  | InlineAttr
  | DocCommentAttr
  | DocAttr;

export interface PayableAttr {
  readonly name: 'payable';
}

export interface StorageAttr {
  readonly name: 'storage';
  readonly arguments: readonly ('read' | 'write')[];
}

export interface TestAttr {
  readonly name: 'test';
}
export interface InlineAttr {
  readonly name: 'inline';
  readonly arguments: 'never' | 'always';
}

export interface DocCommentAttr {
  readonly name: 'doc-comment';
  readonly arguments: string[];
}

export interface DocAttr {
  readonly name: 'doc';
}
