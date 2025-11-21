import type { ContainerClient, BlobServiceClient } from '@azure/storage-blob';
/**
 * Initializes the Azure Blob Service client.
 * This function establishes a connection by checking if a connection string is provided.
 * If available, the connection string is used; otherwise, Managed Identity (via DefaultAzureCredential) is utilized.
 * Note: Container creation (and its public access settings) is handled later in the CRUD functions.
 * @returns The initialized client, or null if the required configuration is missing.
 */
export declare const initializeAzureBlobService: () => Promise<BlobServiceClient | null>;
/**
 * Retrieves the Azure ContainerClient for the given container name.
 * @param [containerName=process.env.AZURE_CONTAINER_NAME || 'files'] - The container name.
 * @returns The Azure ContainerClient.
 */
export declare const getAzureContainerClient: (containerName?: string) => Promise<ContainerClient | null>;
//# sourceMappingURL=azure.d.ts.map