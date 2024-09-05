import type { AbiGenResult } from '../abi-gen';
import type { ProgramDetails } from '../utils/get-program-details';

export type Renderer = (details: ProgramDetails[]) => AbiGenResult[];
