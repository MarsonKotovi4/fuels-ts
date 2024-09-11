contract;

configurable {
    U8: u8 = 4,
}

abi AbiContract {
    fn types_u8() -> u8;
}

impl AbiContract for Contract {
    fn types_u8() -> u8 {
        0
    }
}
