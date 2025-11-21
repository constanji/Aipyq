import 'dotenv/config';
export declare function encrypt(value: string): Promise<string>;
export declare function decrypt(encryptedValue: string): Promise<string>;
export declare function encryptV2(value: string): Promise<string>;
export declare function decryptV2(encryptedValue: string): Promise<string>;
/**
 * Encrypts a value using AES-256-CTR.
 * Note: AES-256 requires a 32-byte key. Ensure that process.env.CREDS_KEY is a 64-character hex string.
 *
 * @param value - The plaintext to encrypt.
 * @returns The encrypted string with a "v3:" prefix.
 */
export declare function encryptV3(value: string): string;
export declare function decryptV3(encryptedValue: string): string;
export declare function getRandomValues(length: number): Promise<string>;
/**
 * Computes SHA-256 hash for the given input.
 * @param input - The input to hash.
 * @returns The SHA-256 hash of the input.
 */
export declare function hashBackupCode(input: string): Promise<string>;
//# sourceMappingURL=encryption.d.ts.map