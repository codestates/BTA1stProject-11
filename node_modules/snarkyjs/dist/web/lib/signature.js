import { __decorate, __metadata } from "tslib";
import { Group, Field, Bool, Scalar, Ledger } from '../snarky.js';
import { prop, CircuitValue } from './circuit_value.js';
import { Poseidon } from './hash.js';
// external API
export { PrivateKey, PublicKey, Signature };
/**
 * A signing key. You can generate one via [[random]].
 */
class PrivateKey extends CircuitValue {
    /**
     * You can use this method to generate a private key. You can then obtain
     * the associated public key via [[toPublicKey]]. And generate signatures
     * via [[Signature.create]].
     *
     * @returns a new [[PrivateKey]].
     */
    static random() {
        return new PrivateKey(Scalar.random());
    }
    /**
     * Deserializes a list of bits into a [[PrivateKey]].
     *
     * @param bs a list of [[Bool]]s.
     * @returns a [[PrivateKey]].
     */
    static ofBits(bs) {
        return new PrivateKey(Scalar.ofBits(bs));
    }
    /**
     * Derives the associated public key.
     *
     * @returns a [[PublicKey]].
     */
    toPublicKey() {
        return PublicKey.fromPrivateKey(this);
    }
    static fromBase58(privateKeyBase58) {
        let scalar = Ledger.privateKeyOfString(privateKeyBase58);
        return new PrivateKey(scalar);
    }
    toBase58() {
        return PrivateKey.toBase58(this);
    }
    // static version, to operate on non-class versions of this type
    static toBase58(privateKey) {
        return Ledger.privateKeyToString(privateKey);
    }
}
__decorate([
    prop,
    __metadata("design:type", Scalar)
], PrivateKey.prototype, "s", void 0);
// TODO: this doesn't have a non-default check method yet. does it need one?
class PublicKey extends CircuitValue {
    toGroup() {
        // compute y from elliptic curve equation y^2 = x^3 + 5
        // TODO: we have to improve constraint efficiency by using range checks
        let { x, isOdd } = this;
        let ySquared = x.mul(x).mul(x).add(5);
        let someY = ySquared.sqrt();
        let isTheRightY = isOdd.equals(someY.toBits()[0]);
        let y = isTheRightY
            .toField()
            .mul(someY)
            .add(isTheRightY.not().toField().mul(someY.neg()));
        return new Group(x, y);
    }
    static fromGroup({ x, y }) {
        let isOdd = y.toBits()[0];
        return PublicKey.fromObject({ x, isOdd });
    }
    static fromPrivateKey({ s }) {
        return PublicKey.fromGroup(Group.generator.scale(s));
    }
    static from(g) {
        return PublicKey.fromObject(g);
    }
    static empty() {
        return PublicKey.from({ x: Field.zero, isOdd: Bool(false) });
    }
    isEmpty() {
        // there are no curve points with x === 0
        return this.x.isZero();
    }
    static fromBase58(publicKeyBase58) {
        let pk = Ledger.publicKeyOfString(publicKeyBase58);
        return PublicKey.from(pk);
    }
    toBase58() {
        return PublicKey.toBase58(this);
    }
    // static version, to operate on non-class versions of this type
    static toBase58(publicKey) {
        return Ledger.publicKeyToString(publicKey);
    }
    static toJSON(publicKey) {
        return publicKey.toBase58();
    }
    static fromJSON(publicKey) {
        return PublicKey.fromBase58(publicKey);
    }
}
__decorate([
    prop,
    __metadata("design:type", Field)
], PublicKey.prototype, "x", void 0);
__decorate([
    prop,
    __metadata("design:type", Bool)
], PublicKey.prototype, "isOdd", void 0);
class Signature extends CircuitValue {
    static create(privKey, msg) {
        const publicKey = PublicKey.fromPrivateKey(privKey).toGroup();
        const d = privKey.s;
        const kPrime = Scalar.random();
        let { x: r, y: ry } = Group.generator.scale(kPrime);
        const k = ry.toBits()[0].toBoolean() ? kPrime.neg() : kPrime;
        const e = Scalar.ofBits(Poseidon.hash(msg.concat([publicKey.x, publicKey.y, r])).toBits());
        const s = e.mul(d).add(k);
        return new Signature(r, s);
    }
    verify(publicKey, msg) {
        const point = publicKey.toGroup();
        let e = Scalar.ofBits(Poseidon.hash(msg.concat([point.x, point.y, this.r])).toBits());
        let r = point.scale(e).neg().add(Group.generator.scale(this.s));
        return Bool.and(r.x.equals(this.r), r.y.toBits()[0].equals(false));
    }
}
__decorate([
    prop,
    __metadata("design:type", Field)
], Signature.prototype, "r", void 0);
__decorate([
    prop,
    __metadata("design:type", Scalar)
], Signature.prototype, "s", void 0);
//# sourceMappingURL=signature.js.map