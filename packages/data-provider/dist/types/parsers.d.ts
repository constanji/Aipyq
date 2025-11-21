import type { ZodIssue } from 'zod';
import type * as a from './types/assistants';
import type * as s from './schemas';
import type * as t from './types';
import { EModelEndpoint } from './schemas';
export type EndpointSchemaKey = Exclude<EModelEndpoint, EModelEndpoint.chatGPTBrowser>;
/** Get the enabled endpoints from the `ENDPOINTS` environment variable */
export declare function getEnabledEndpoints(): string[];
/** Orders an existing EndpointsConfig object based on enabled endpoint/custom ordering */
export declare function orderEndpointsConfig(endpointsConfig: t.TEndpointsConfig): Record<string, t.TConfig | null | undefined>;
/** Converts an array of Zod issues into a string. */
export declare function errorsToString(errors: ZodIssue[]): string;
export declare function getFirstDefinedValue(possibleValues: string[]): string | undefined;
export declare function getNonEmptyValue(possibleValues: string[]): string | undefined;
export type TPossibleValues = {
    models: string[];
    secondaryModels?: string[];
};
export declare const parseConvo: ({ endpoint, endpointType, conversation, possibleValues, }: {
    endpoint: EndpointSchemaKey;
    endpointType?: EndpointSchemaKey | null | undefined;
    conversation: Partial<s.TConversation | s.TPreset> | null;
    possibleValues?: TPossibleValues | undefined;
}) => s.TConversation | undefined;
export declare const getResponseSender: (endpointOption: t.TEndpointOption) => string;
export declare const parseCompactConvo: ({ endpoint, endpointType, conversation, possibleValues, }: {
    endpoint?: EndpointSchemaKey | undefined;
    endpointType?: EndpointSchemaKey | null | undefined;
    conversation: Partial<s.TConversation | s.TPreset>;
    possibleValues?: TPossibleValues | undefined;
}) => s.TConversation | null;
export declare function parseTextParts(contentParts: a.TMessageContentParts[], skipReasoning?: boolean): string;
export declare const SEPARATORS: string[];
export declare function findLastSeparatorIndex(text: string, separators?: string[]): number;
export declare function replaceSpecialVars({ text, user }: {
    text: string;
    user?: t.TUser | null;
}): string;
