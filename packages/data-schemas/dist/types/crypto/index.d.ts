import { SignPayloadParams } from '~/types';
export declare function signPayload({ payload, secret, expirationTime, }: SignPayloadParams): Promise<string>;
export declare function hashToken(str: string): Promise<string>;
