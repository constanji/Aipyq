import { z } from 'zod';
import type { ActionMetadata, ActionMetadataRuntime } from './types/agents';
import type { FunctionTool, Schema, Reference } from './types/assistants';
import { AuthorizationTypeEnum } from './types/agents';
import type { OpenAPIV3 } from 'openapi-types';
export type ParametersSchema = {
    type: string;
    properties: Record<string, Reference | Schema>;
    required: string[];
    additionalProperties?: boolean;
};
export type OpenAPISchema = OpenAPIV3.SchemaObject & ParametersSchema & {
    items?: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject;
};
export type ApiKeyCredentials = {
    api_key: string;
    custom_auth_header?: string;
    authorization_type?: AuthorizationTypeEnum;
};
export type OAuthCredentials = {
    tokenUrl: string;
    clientId: string;
    clientSecret: string;
    scope: string;
};
export type Credentials = ApiKeyCredentials | OAuthCredentials;
export declare function sha1(input: string): string;
export declare function createURL(domain: string, path: string): string;
/**
 * Class representing a function signature.
 */
export declare class FunctionSignature {
    name: string;
    description: string;
    parameters: ParametersSchema;
    strict: boolean;
    constructor(name: string, description: string, parameters: ParametersSchema, strict?: boolean);
    toObjectTool(): FunctionTool;
}
declare class RequestConfig {
    readonly domain: string;
    readonly basePath: string;
    readonly method: string;
    readonly operation: string;
    readonly isConsequential: boolean;
    readonly contentType: string;
    readonly parameterLocations?: Record<string, "path" | "query" | "header" | "body"> | undefined;
    constructor(domain: string, basePath: string, method: string, operation: string, isConsequential: boolean, contentType: string, parameterLocations?: Record<string, "path" | "query" | "header" | "body"> | undefined);
}
declare class RequestExecutor {
    private config;
    path: string;
    params?: Record<string, unknown>;
    private operationHash?;
    private authHeaders;
    private authToken?;
    constructor(config: RequestConfig);
    setParams(params: Record<string, unknown>): this;
    setAuth(metadata: ActionMetadataRuntime): Promise<this>;
    execute(): Promise<import("axios").AxiosResponse<any, any, {}>>;
    getConfig(): RequestConfig;
}
export declare class ActionRequest {
    private config;
    constructor(domain: string, path: string, method: string, operation: string, isConsequential: boolean, contentType: string, parameterLocations?: Record<string, 'query' | 'path' | 'header' | 'body'>);
    get domain(): string;
    get path(): string;
    get method(): string;
    get operation(): string;
    get isConsequential(): boolean;
    get contentType(): string;
    createExecutor(): RequestExecutor;
    setParams(params: Record<string, unknown>): RequestExecutor;
    setAuth(metadata: ActionMetadata): Promise<RequestExecutor>;
    execute(): Promise<import("axios").AxiosResponse<any, any, {}>>;
}
export declare function resolveRef<T extends OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject | OpenAPIV3.ParameterObject | OpenAPIV3.RequestBodyObject>(obj: T, components?: OpenAPIV3.ComponentsObject): Exclude<T, OpenAPIV3.ReferenceObject>;
/**
 * Converts an OpenAPI spec to function signatures and request builders.
 */
export declare function openapiToFunction(openapiSpec: OpenAPIV3.Document, generateZodSchemas?: boolean): {
    functionSignatures: FunctionSignature[];
    requestBuilders: Record<string, ActionRequest>;
    zodSchemas?: Record<string, z.ZodTypeAny>;
};
export type ValidationResult = {
    status: boolean;
    message: string;
    spec?: OpenAPIV3.Document;
};
/**
 * Validates and parses an OpenAPI spec.
 */
export declare function validateAndParseOpenAPISpec(specString: string): ValidationResult;
export {};
