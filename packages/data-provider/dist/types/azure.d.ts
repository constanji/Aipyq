import type { TAzureGroups, TAzureGroupMap, TValidatedAzureConfig, TAzureConfigValidationResult } from '../src/config';
export declare function validateAzureGroups(configs: TAzureGroups): TAzureConfigValidationResult;
type AzureOptions = {
    azureOpenAIApiKey: string;
    azureOpenAIApiInstanceName?: string;
    azureOpenAIApiDeploymentName?: string;
    azureOpenAIApiVersion?: string;
};
type MappedAzureConfig = {
    azureOptions: AzureOptions;
    baseURL?: string;
    headers?: Record<string, string>;
    serverless?: boolean;
};
export declare function mapModelToAzureConfig({ modelName, modelGroupMap, groupMap, }: Omit<TValidatedAzureConfig, 'modelNames'> & {
    modelName: string;
}): MappedAzureConfig;
export declare function mapGroupToAzureConfig({ groupName, groupMap, }: {
    groupName: string;
    groupMap: TAzureGroupMap;
}): MappedAzureConfig;
export {};
