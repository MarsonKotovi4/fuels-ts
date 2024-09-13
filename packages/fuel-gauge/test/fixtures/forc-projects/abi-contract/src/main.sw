contract;

struct MyStruct {
    a: u8,
    b: bool,
}

struct MyGenericStruct<T> {
    x: u16,
    y: u32,
    z: T,
}

configurable {
    U8: u8 = 4,
    BOOL: bool = false,
    STRUCT: MyStruct = MyStruct { a: 1, b: true },
    GENERIC_STRUCT: MyGenericStruct<bool> = MyGenericStruct {
        x: 1,
        y: 3,
        z: true,
    },
}

abi AbiContract {
    fn types_u8(input: u8) -> u8;
    fn types_bool(input: bool) -> bool;
    fn types_struct(input: MyStruct) -> MyStruct;
    fn types_generic_struct(input: MyGenericStruct<bool>) -> MyGenericStruct<u8>;
    fn types_array(arg: [b256; 5]) -> [b256; 2];
    fn struct_with_tuple(x: MyGenericStruct<(bool, u64)>) -> MyGenericStruct<(bool, u64)>;
    fn types_vector(vec: Vec<u256>) -> Vec<u256>;
}

impl AbiContract for Contract {
    fn types_u8(input: u8) -> u8 {
        0
    }
    fn types_bool(input: bool) -> bool {
        true
    }
    fn types_struct(input: MyStruct) -> MyStruct {
        MyStruct { a: 1, b: true }
    }
    fn types_generic_struct(input: MyGenericStruct<bool>) -> MyGenericStruct<u8> {
        MyGenericStruct {
            x: 1,
            y: 3,
            z: 2,
        }
    }
    fn struct_with_tuple(x: MyGenericStruct<(bool, u64)>) -> MyGenericStruct<(bool, u64)> {
        MyGenericStruct {
            x: 1,
            y: 2,
            z: (true, 55),
        }
    }
    fn types_array(arg: [b256; 5]) -> [b256; 2] {
        [
            0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20,
            0x0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f20,
        ]
    }
    fn types_vector(vec: Vec<u256>) -> Vec<u256> {
        vec
    }
}
