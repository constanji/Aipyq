import type { UseQueryOptions, UseMutationResult, QueryObserverResult } from '@tanstack/react-query';
import { MCPServerConnectionStatusResponse } from '../types/queries';
import * as m from '../types/mutations';
import * as q from '../types/queries';
import * as s from '../schemas';
import * as t from '../types';
import * as permissions from '../accessPermissions';
import { ResourceType } from '../accessPermissions';
export { hasPermissions } from '../accessPermissions';
export declare const useGetSharedMessages: (shareId: string, config?: UseQueryOptions<t.TSharedMessagesResponse>) => QueryObserverResult<t.TSharedMessagesResponse>;
export declare const useGetSharedLinkQuery: (conversationId: string, config?: UseQueryOptions<t.TSharedLinkGetResponse>) => QueryObserverResult<t.TSharedLinkGetResponse>;
export declare const useGetConversationByIdQuery: (id: string, config?: UseQueryOptions<s.TConversation>) => QueryObserverResult<s.TConversation>;
export declare const useGetConversationByIdMutation: (id: string) => UseMutationResult<s.TConversation>;
export declare const useUpdateMessageMutation: (id: string) => UseMutationResult<unknown, unknown, t.TUpdateMessageRequest, unknown>;
export declare const useUpdateMessageContentMutation: (conversationId: string) => UseMutationResult<unknown, unknown, t.TUpdateMessageContent, unknown>;
export declare const useUpdateUserKeysMutation: () => UseMutationResult<t.TUser, unknown, t.TUpdateUserKeyRequest, unknown>;
export declare const useClearConversationsMutation: () => UseMutationResult<unknown>;
export declare const useRevokeUserKeyMutation: (name: string) => UseMutationResult<unknown>;
export declare const useRevokeAllUserKeysMutation: () => UseMutationResult<unknown>;
export declare const useGetModelsQuery: (config?: UseQueryOptions<t.TModelsConfig>) => QueryObserverResult<t.TModelsConfig>;
export declare const useCreatePresetMutation: () => UseMutationResult<s.TPreset, unknown, s.TPreset, unknown>;
export declare const useDeletePresetMutation: () => UseMutationResult<m.PresetDeleteResponse, unknown, s.TPreset | undefined, unknown>;
export declare const useUpdateTokenCountMutation: () => UseMutationResult<t.TUpdateTokenCountResponse, unknown, {
    text: string;
}, unknown>;
export declare const useRegisterUserMutation: (options?: m.RegistrationOptions) => UseMutationResult<t.TError, unknown, t.TRegisterUser, unknown>;
export declare const useUserKeyQuery: (name: string, config?: UseQueryOptions<t.TCheckUserKeyResponse>) => QueryObserverResult<t.TCheckUserKeyResponse>;
export declare const useRequestPasswordResetMutation: () => UseMutationResult<t.TRequestPasswordResetResponse, unknown, t.TRequestPasswordReset, unknown>;
export declare const useResetPasswordMutation: () => UseMutationResult<unknown, unknown, t.TResetPassword, unknown>;
export declare const useAvailablePluginsQuery: <TData = {
    name: string;
    pluginKey: string;
    description?: string | undefined;
    icon?: string | undefined;
    authConfig?: {
        description: string;
        authField: string;
        label: string;
    }[] | undefined;
    authenticated?: boolean | undefined;
    chatMenu?: boolean | undefined;
    isButton?: boolean | undefined;
    toolkit?: boolean | undefined;
}[]>(config?: UseQueryOptions<{
    name: string;
    pluginKey: string;
    description?: string | undefined;
    icon?: string | undefined;
    authConfig?: {
        description: string;
        authField: string;
        label: string;
    }[] | undefined;
    authenticated?: boolean | undefined;
    chatMenu?: boolean | undefined;
    isButton?: boolean | undefined;
    toolkit?: boolean | undefined;
}[], unknown, TData, import("@tanstack/react-query").QueryKey> | undefined) => QueryObserverResult<TData>;
export declare const useUpdateUserPluginsMutation: (_options?: m.UpdatePluginAuthOptions) => UseMutationResult<t.TUser, unknown, t.TUpdateUserPlugins, unknown>;
export declare const useReinitializeMCPServerMutation: () => UseMutationResult<{
    success: boolean;
    message: string;
    serverName: string;
    oauthRequired?: boolean;
    oauthUrl?: string;
}, unknown, string, unknown>;
export declare const useCancelMCPOAuthMutation: () => UseMutationResult<m.CancelMCPOAuthResponse, unknown, string, unknown>;
export declare const useGetCustomConfigSpeechQuery: (config?: UseQueryOptions<t.TCustomConfigSpeechResponse>) => QueryObserverResult<t.TCustomConfigSpeechResponse>;
export declare const useUpdateFeedbackMutation: (conversationId: string, messageId: string) => UseMutationResult<t.TUpdateFeedbackResponse, Error, t.TUpdateFeedbackRequest>;
export declare const useSearchPrincipalsQuery: (params: q.PrincipalSearchParams, config?: UseQueryOptions<q.PrincipalSearchResponse>) => QueryObserverResult<q.PrincipalSearchResponse>;
export declare const useGetAccessRolesQuery: (resourceType: ResourceType, config?: UseQueryOptions<q.AccessRolesResponse>) => QueryObserverResult<q.AccessRolesResponse>;
export declare const useGetResourcePermissionsQuery: (resourceType: ResourceType, resourceId: string, config?: UseQueryOptions<permissions.TGetResourcePermissionsResponse>) => QueryObserverResult<permissions.TGetResourcePermissionsResponse>;
export declare const useUpdateResourcePermissionsMutation: () => UseMutationResult<permissions.TUpdateResourcePermissionsResponse, Error, {
    resourceType: ResourceType;
    resourceId: string;
    data: permissions.TUpdateResourcePermissionsRequest;
}>;
export declare const useGetEffectivePermissionsQuery: (resourceType: ResourceType, resourceId: string, config?: UseQueryOptions<permissions.TEffectivePermissionsResponse>) => QueryObserverResult<permissions.TEffectivePermissionsResponse>;
export declare const useMCPServerConnectionStatusQuery: (serverName: string, config?: UseQueryOptions<MCPServerConnectionStatusResponse>) => QueryObserverResult<MCPServerConnectionStatusResponse>;
