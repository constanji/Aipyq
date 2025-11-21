import type { AzureOptions, GenericClient } from '~/types';
/**
 * Sanitizes the model name to be used in the URL by removing or replacing disallowed characters.
 * @param modelName - The model name to be sanitized.
 * @returns The sanitized model name.
 */
export declare const sanitizeModelName: (modelName: string) => string;
/**
 * Generates the Azure OpenAI API endpoint URL.
 * @param params - The parameters object.
 * @param params.azureOpenAIApiInstanceName - The Azure OpenAI API instance name.
 * @param params.azureOpenAIApiDeploymentName - The Azure OpenAI API deployment name.
 * @returns The complete endpoint URL for the Azure OpenAI API.
 */
export declare const genAzureEndpoint: ({ azureOpenAIApiInstanceName, azureOpenAIApiDeploymentName, }: {
    azureOpenAIApiInstanceName: string;
    azureOpenAIApiDeploymentName: string;
}) => string;
/**
 * Generates the Azure OpenAI API chat completion endpoint URL with the API version.
 * If both deploymentName and modelName are provided, modelName takes precedence.
 * @param azureConfig - The Azure configuration object.
 * @param azureConfig.azureOpenAIApiInstanceName - The Azure OpenAI API instance name.
 * @param azureConfig.azureOpenAIApiDeploymentName - The Azure OpenAI API deployment name (optional).
 * @param azureConfig.azureOpenAIApiVersion - The Azure OpenAI API version.
 * @param modelName - The model name to be included in the deployment name (optional).
 * @param client - The API Client class for optionally setting properties (optional).
 * @returns The complete chat completion endpoint URL for the Azure OpenAI API.
 * @throws Error if neither azureOpenAIApiDeploymentName nor modelName is provided.
 */
export declare const genAzureChatCompletion: ({ azureOpenAIApiInstanceName, azureOpenAIApiDeploymentName, azureOpenAIApiVersion, }: {
    azureOpenAIApiInstanceName: string;
    azureOpenAIApiDeploymentName?: string | undefined;
    azureOpenAIApiVersion: string;
}, modelName?: string, client?: GenericClient) => string;
/**
 * Retrieves the Azure OpenAI API credentials from environment variables.
 * @returns An object containing the Azure OpenAI API credentials.
 */
export declare const getAzureCredentials: () => AzureOptions;
/**
 * Constructs a URL by replacing placeholders in the baseURL with values from the azure object.
 * It specifically looks for '${INSTANCE_NAME}' and '${DEPLOYMENT_NAME}' within the baseURL and replaces
 * them with 'azureOpenAIApiInstanceName' and 'azureOpenAIApiDeploymentName' from the azure object.
 * If the respective azure property is not provided, the placeholder is replaced with an empty string.
 *
 * @param params - The parameters object.
 * @param params.baseURL - The baseURL to inspect for replacement placeholders.
 * @param params.azureOptions - The azure options object containing the instance and deployment names.
 * @returns The complete baseURL with credentials injected for the Azure OpenAI API.
 */
export declare function constructAzureURL({ baseURL, azureOptions, }: {
    baseURL: string;
    azureOptions?: AzureOptions;
}): string;
//# sourceMappingURL=azure.d.ts.map