import { Group, Field } from '../snarky.js';
import { PrivateKey, PublicKey } from './signature.js';
export { encrypt, decrypt };
declare type CipherText = {
    publicKey: Group;
    cipherText: Field[];
};
declare function encrypt(message: Field[], otherPublicKey: PublicKey): {
    publicKey: Group;
    cipherText: Field[];
};
declare function decrypt({ publicKey, cipherText }: CipherText, privateKey: PrivateKey): Field[];
