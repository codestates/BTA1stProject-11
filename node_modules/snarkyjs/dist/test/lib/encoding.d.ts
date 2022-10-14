import { Field } from '../snarky.js';
export { stringToFields, stringFromFields, bytesToFields, bytesFromFields, Bijective, TokenId, ReceiptChainHash, LedgerHash, EpochSeed, StateHash, };
declare function stringToFields(message: string): Field[];
declare function stringFromFields(fields: Field[]): string;
declare function bytesToFields(bytes: Uint8Array): Field[];
declare function bytesFromFields(fields: Field[]): Uint8Array;
declare const Bijective: {
    Fp: {
        toBytes: (fields: Field[]) => Uint8Array;
        fromBytes: (bytes: Uint8Array) => Field[];
        toString(fields: Field[]): string;
        fromString(message: string): Field[];
    };
    Fq: {
        toBytes: (fields: Field[]) => Uint8Array;
        fromBytes: (bytes: Uint8Array) => Field[];
        toString(fields: Field[]): string;
        fromString(message: string): Field[];
    };
};
declare const TokenId: {
    toBase58(field: Field): string;
    fromBase58(base58: string): Field;
};
declare const ReceiptChainHash: {
    toBase58(field: Field): string;
    fromBase58(base58: string): Field;
};
declare const LedgerHash: {
    toBase58(field: Field): string;
    fromBase58(base58: string): Field;
};
declare const EpochSeed: {
    toBase58(field: Field): string;
    fromBase58(base58: string): Field;
};
declare const StateHash: {
    toBase58(field: Field): string;
    fromBase58(base58: string): Field;
};
