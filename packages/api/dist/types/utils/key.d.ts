export interface GoogleServiceKey {
    type?: string;
    project_id?: string;
    private_key_id?: string;
    private_key?: string;
    client_email?: string;
    client_id?: string;
    auth_uri?: string;
    token_uri?: string;
    auth_provider_x509_cert_url?: string;
    client_x509_cert_url?: string;
    [key: string]: unknown;
}
/**
 * Load Google service key from file path, URL, or stringified JSON
 * @param keyPath - The path to the service key file, URL to fetch it from, or stringified JSON
 * @returns The parsed service key object or null if failed
 */
export declare function loadServiceKey(keyPath: string): Promise<GoogleServiceKey | null>;
//# sourceMappingURL=key.d.ts.map