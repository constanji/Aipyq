import { S3Client } from '@aws-sdk/client-s3';
/**
 * Initializes and returns an instance of the AWS S3 client.
 *
 * If AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY are provided, they will be used.
 * Otherwise, the AWS SDK's default credentials chain (including IRSA) is used.
 *
 * If AWS_ENDPOINT_URL is provided, it will be used as the endpoint.
 *
 * @returns An instance of S3Client if the region is provided; otherwise, null.
 */
export declare const initializeS3: () => S3Client | null;
//# sourceMappingURL=s3.d.ts.map