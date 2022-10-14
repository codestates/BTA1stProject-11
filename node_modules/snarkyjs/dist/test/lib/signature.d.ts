import { Group, Field, Bool, Scalar } from '../snarky.js';
import { CircuitValue, AnyConstructor } from './circuit_value.js';
export { PrivateKey, PublicKey, Signature };
/**
 * A signing key. You can generate one via [[random]].
 */
declare class PrivateKey extends CircuitValue {
    s: Scalar;
    /**
     * You can use this method to generate a private key. You can then obtain
     * the associated public key via [[toPublicKey]]. And generate signatures
     * via [[Signature.create]].
     *
     * @returns a new [[PrivateKey]].
     */
    static random(): PrivateKey;
    /**
     * Deserializes a list of bits into a [[PrivateKey]].
     *
     * @param bs a list of [[Bool]]s.
     * @returns a [[PrivateKey]].
     */
    static ofBits(bs: Bool[]): PrivateKey;
    /**
     * Derives the associated public key.
     *
     * @returns a [[PublicKey]].
     */
    toPublicKey(): PublicKey;
    static fromBase58(privateKeyBase58: string): PrivateKey;
    toBase58(): string;
    static toBase58(privateKey: {
        s: Scalar;
    }): string;
}
declare class PublicKey extends CircuitValue {
    x: Field;
    isOdd: Bool;
    toGroup(): Group;
    static fromGroup({ x, y }: Group): PublicKey;
    static fromPrivateKey({ s }: PrivateKey): PublicKey;
    static from(g: {
        x: Field;
        isOdd: Bool;
    }): PublicKey;
    static empty(): PublicKey;
    isEmpty(): Bool;
    static fromBase58(publicKeyBase58: string): PublicKey;
    toBase58(): string;
    static toBase58(publicKey: PublicKey): string;
    static toJSON(publicKey: PublicKey): string;
    static fromJSON<T extends AnyConstructor>(this: T, publicKey: string): InstanceType<T>;
}
declare class Signature extends CircuitValue {
    r: Field;
    s: Scalar;
    static create(privKey: PrivateKey, msg: Field[]): Signature;
    verify(publicKey: PublicKey, msg: Field[]): Bool;
}
