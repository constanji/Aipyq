import type { AxiosResponse } from 'axios';
import type * as t from './types';
import * as a from './types/assistants';
import * as ag from './types/agents';
import * as m from './types/mutations';
import * as q from './types/queries';
import * as f from './types/files';
import * as config from './config';
import * as s from './schemas';
import * as r from './roles';
import * as permissions from './accessPermissions';
export declare function revokeUserKey(name: string): Promise<unknown>;
export declare function revokeAllUserKeys(): Promise<unknown>;
export declare function deleteUser(): Promise<s.TPreset>;
export declare function getSharedMessages(shareId: string): Promise<t.TSharedMessagesResponse>;
export declare const listSharedLinks: (params: q.SharedLinksListParams) => Promise<q.SharedLinksResponse>;
export declare function getSharedLink(conversationId: string): Promise<t.TSharedLinkGetResponse>;
export declare function createSharedLink(conversationId: string, targetMessageId?: string): Promise<t.TSharedLinkResponse>;
export declare function updateSharedLink(shareId: string): Promise<t.TSharedLinkResponse>;
export declare function deleteSharedLink(shareId: string): Promise<m.TDeleteSharedLinkResponse>;
export declare function updateUserKey(payload: t.TUpdateUserKeyRequest): Promise<any>;
export declare function getPresets(): Promise<s.TPreset[]>;
export declare function createPreset(payload: s.TPreset): Promise<s.TPreset>;
export declare function updatePreset(payload: s.TPreset): Promise<s.TPreset>;
export declare function deletePreset(arg: s.TPreset | undefined): Promise<m.PresetDeleteResponse>;
export declare function getSearchEnabled(): Promise<boolean>;
export declare function getUser(): Promise<t.TUser>;
export declare function getUserBalance(): Promise<t.TBalanceResponse>;
export declare const updateTokenCount: (text: string) => Promise<any>;
export declare const login: (payload: t.TLoginUser) => Promise<t.TLoginResponse>;
export declare const logout: () => Promise<m.TLogoutResponse>;
export declare const register: (payload: t.TRegisterUser) => Promise<any>;
export declare const userKeyQuery: (name: string) => Promise<t.TCheckUserKeyResponse>;
export declare const getLoginGoogle: () => Promise<unknown>;
export declare const requestPasswordReset: (payload: t.TRequestPasswordReset) => Promise<t.TRequestPasswordResetResponse>;
export declare const resetPassword: (payload: t.TResetPassword) => Promise<any>;
export declare const verifyEmail: (payload: t.TVerifyEmail) => Promise<t.VerifyEmailResponse>;
export declare const resendVerificationEmail: (payload: t.TResendVerificationEmail) => Promise<t.VerifyEmailResponse>;
export declare const getAvailablePlugins: () => Promise<s.TPlugin[]>;
export declare const updateUserPlugins: (payload: t.TUpdateUserPlugins) => Promise<any>;
export declare const reinitializeMCPServer: (serverName: string) => Promise<any>;
export declare const getMCPConnectionStatus: () => Promise<q.MCPConnectionStatusResponse>;
export declare const getMCPServerConnectionStatus: (serverName: string) => Promise<q.MCPServerConnectionStatusResponse>;
export declare const getMCPAuthValues: (serverName: string) => Promise<q.MCPAuthValuesResponse>;
export declare function cancelMCPOAuth(serverName: string): Promise<m.CancelMCPOAuthResponse>;
export declare const getStartupConfig: () => Promise<config.TStartupConfig & {
    mcpCustomUserVars?: Record<string, {
        title: string;
        description: string;
    }>;
}>;
export declare const getAIEndpoints: () => Promise<t.TEndpointsConfig>;
export declare const getModels: () => Promise<t.TModelsConfig>;
export declare const createAssistant: ({ version, ...data }: a.AssistantCreateParams) => Promise<a.Assistant>;
export declare const getAssistantById: ({ endpoint, assistant_id, version, }: {
    endpoint: s.AssistantsEndpoint;
    assistant_id: string;
    version: number | string | number;
}) => Promise<a.Assistant>;
export declare const updateAssistant: ({ assistant_id, data, version, }: {
    assistant_id: string;
    data: a.AssistantUpdateParams;
    version: number | string;
}) => Promise<a.Assistant>;
export declare const deleteAssistant: ({ assistant_id, model, endpoint, version, }: m.DeleteAssistantBody & {
    version: number | string;
}) => Promise<void>;
export declare const listAssistants: (params: a.AssistantListParams, version: number | string) => Promise<a.AssistantListResponse>;
export declare function getAssistantDocs({ endpoint, version, }: {
    endpoint: s.AssistantsEndpoint | string;
    version: number | string;
}): Promise<a.AssistantDocument[]>;
export declare const getAvailableTools: (_endpoint: s.AssistantsEndpoint | s.EModelEndpoint.agents, version?: number | string) => Promise<s.TPlugin[]>;
export declare const getMCPTools: () => Promise<q.MCPServersResponse>;
export declare const getVerifyAgentToolAuth: (params: q.VerifyToolAuthParams) => Promise<q.VerifyToolAuthResponse>;
export declare const callTool: <T extends a.Tools.execute_code>({ toolId, toolParams, }: {
    toolId: T;
    toolParams: m.ToolParams<T>;
}) => Promise<m.ToolCallResponse>;
export declare const getToolCalls: (params: q.GetToolCallParams) => Promise<q.ToolCallResults>;
export declare const getFiles: () => Promise<f.TFile[]>;
export declare const getAgentFiles: (agentId: string) => Promise<f.TFile[]>;
export declare const getFileConfig: () => Promise<f.FileConfig>;
export declare const uploadImage: (data: FormData, signal?: AbortSignal | null) => Promise<f.TFileUpload>;
export declare const uploadFile: (data: FormData, signal?: AbortSignal | null) => Promise<f.TFileUpload>;
export declare const updateAction: (data: m.UpdateActionVariables) => Promise<m.UpdateActionResponse>;
export declare function getActions(): Promise<ag.Action[]>;
export declare const deleteAction: ({ assistant_id, action_id, model, version, endpoint, }: m.DeleteActionVariables & {
    version: number | string;
}) => Promise<void>;
/**
 * Agents
 */
export declare const createAgent: ({ ...data }: a.AgentCreateParams) => Promise<a.Agent>;
export declare const getAgentById: ({ agent_id }: {
    agent_id: string;
}) => Promise<a.Agent>;
export declare const getExpandedAgentById: ({ agent_id }: {
    agent_id: string;
}) => Promise<a.Agent>;
export declare const updateAgent: ({ agent_id, data, }: {
    agent_id: string;
    data: a.AgentUpdateParams;
}) => Promise<a.Agent>;
export declare const duplicateAgent: ({ agent_id, }: m.DuplicateAgentBody) => Promise<{
    agent: a.Agent;
    actions: ag.Action[];
}>;
export declare const deleteAgent: ({ agent_id }: m.DeleteAgentBody) => Promise<void>;
export declare const listAgents: (params: a.AgentListParams) => Promise<a.AgentListResponse>;
export declare const revertAgentVersion: ({ agent_id, version_index, }: {
    agent_id: string;
    version_index: number;
}) => Promise<a.Agent>;
/**
 * Get agent categories with counts for marketplace tabs
 */
export declare const getAgentCategories: () => Promise<t.TMarketplaceCategory[]>;
/**
 * Unified marketplace agents endpoint with query string controls
 */
export declare const getMarketplaceAgents: (params: {
    requiredPermission: number;
    category?: string;
    search?: string;
    limit?: number;
    cursor?: string;
    promoted?: 0 | 1;
}) => Promise<a.AgentListResponse>;
export declare const getAvailableAgentTools: () => Promise<s.TPlugin[]>;
export declare const updateAgentAction: (data: m.UpdateAgentActionVariables) => Promise<m.UpdateAgentActionResponse>;
export declare const deleteAgentAction: ({ agent_id, action_id, }: m.DeleteAgentActionVariables) => Promise<void>;
/**
 * Imports a conversations file.
 *
 * @param data - The FormData containing the file to import.
 * @returns A Promise that resolves to the import start response.
 */
export declare const importConversationsFile: (data: FormData) => Promise<t.TImportResponse>;
export declare const uploadAvatar: (data: FormData) => Promise<f.AvatarUploadResponse>;
export declare const uploadAssistantAvatar: (data: m.AssistantAvatarVariables) => Promise<a.Assistant>;
export declare const uploadAgentAvatar: (data: m.AgentAvatarVariables) => Promise<a.Agent>;
export declare const getFileDownload: (userId: string, file_id: string) => Promise<AxiosResponse>;
export declare const getCodeOutputDownload: (url: string) => Promise<AxiosResponse>;
export declare const deleteFiles: (payload: {
    files: f.BatchFile[];
    agent_id?: string;
    assistant_id?: string;
    tool_resource?: a.EToolResources;
}) => Promise<f.DeleteFilesResponse>;
export declare const speechToText: (data: FormData) => Promise<f.SpeechToTextResponse>;
export declare const textToSpeech: (data: FormData) => Promise<ArrayBuffer>;
export declare const getVoices: () => Promise<f.VoiceResponse>;
export declare const getCustomConfigSpeech: () => Promise<t.TCustomConfigSpeechResponse>;
export declare function duplicateConversation(payload: t.TDuplicateConvoRequest): Promise<t.TDuplicateConvoResponse>;
export declare function forkConversation(payload: t.TForkConvoRequest): Promise<t.TForkConvoResponse>;
export declare function deleteConversation(payload: t.TDeleteConversationRequest): Promise<unknown>;
export declare function clearAllConversations(): Promise<unknown>;
export declare const listConversations: (params?: q.ConversationListParams) => Promise<q.ConversationListResponse>;
export declare function getConversations(cursor: string): Promise<t.TGetConversationsResponse>;
export declare function getConversationById(id: string): Promise<s.TConversation>;
export declare function updateConversation(payload: t.TUpdateConversationRequest): Promise<t.TUpdateConversationResponse>;
export declare function archiveConversation(payload: t.TArchiveConversationRequest): Promise<t.TArchiveConversationResponse>;
export declare function genTitle(payload: m.TGenTitleRequest): Promise<m.TGenTitleResponse>;
export declare const listMessages: (params?: q.MessagesListParams) => Promise<q.MessagesListResponse>;
export declare function updateMessage(payload: t.TUpdateMessageRequest): Promise<unknown>;
export declare function updateMessageContent(payload: t.TUpdateMessageContent): Promise<unknown>;
export declare const editArtifact: ({ messageId, ...params }: m.TEditArtifactRequest) => Promise<m.TEditArtifactResponse>;
export declare function getMessagesByConvoId(conversationId: string): Promise<s.TMessage[]>;
export declare function getPrompt(id: string): Promise<{
    prompt: t.TPrompt;
}>;
export declare function getPrompts(filter: t.TPromptsWithFilterRequest): Promise<t.TPrompt[]>;
export declare function getAllPromptGroups(): Promise<q.AllPromptGroupsResponse>;
export declare function getPromptGroups(filter: t.TPromptGroupsWithFilterRequest): Promise<t.PromptGroupListResponse>;
export declare function getPromptGroup(id: string): Promise<t.TPromptGroup>;
export declare function createPrompt(payload: t.TCreatePrompt): Promise<t.TCreatePromptResponse>;
export declare function addPromptToGroup(groupId: string, payload: t.TCreatePrompt): Promise<t.TCreatePromptResponse>;
export declare function updatePromptGroup(variables: t.TUpdatePromptGroupVariables): Promise<t.TUpdatePromptGroupResponse>;
export declare function deletePrompt(payload: t.TDeletePromptVariables): Promise<t.TDeletePromptResponse>;
export declare function makePromptProduction(id: string): Promise<t.TMakePromptProductionResponse>;
export declare function updatePromptLabels(variables: t.TUpdatePromptLabelsRequest): Promise<t.TUpdatePromptLabelsResponse>;
export declare function deletePromptGroup(id: string): Promise<t.TDeletePromptGroupResponse>;
export declare function getCategories(): Promise<t.TGetCategoriesResponse>;
export declare function getRandomPrompts(variables: t.TGetRandomPromptsRequest): Promise<t.TGetRandomPromptsResponse>;
export declare function getRole(roleName: string): Promise<r.TRole>;
export declare function updatePromptPermissions(variables: m.UpdatePromptPermVars): Promise<m.UpdatePermResponse>;
export declare function updateAgentPermissions(variables: m.UpdateAgentPermVars): Promise<m.UpdatePermResponse>;
export declare function updateMemoryPermissions(variables: m.UpdateMemoryPermVars): Promise<m.UpdatePermResponse>;
export declare function updatePeoplePickerPermissions(variables: m.UpdatePeoplePickerPermVars): Promise<m.UpdatePermResponse>;
export declare function updateMarketplacePermissions(variables: m.UpdateMarketplacePermVars): Promise<m.UpdatePermResponse>;
export declare function getConversationTags(): Promise<t.TConversationTagsResponse>;
export declare function createConversationTag(payload: t.TConversationTagRequest): Promise<t.TConversationTagResponse>;
export declare function updateConversationTag(tag: string, payload: t.TConversationTagRequest): Promise<t.TConversationTagResponse>;
export declare function deleteConversationTag(tag: string): Promise<t.TConversationTagResponse>;
export declare function addTagToConversation(conversationId: string, payload: t.TTagConversationRequest): Promise<t.TTagConversationResponse>;
export declare function rebuildConversationTags(): Promise<t.TConversationTagsResponse>;
export declare function healthCheck(): Promise<string>;
export declare function getUserTerms(): Promise<t.TUserTermsResponse>;
export declare function acceptTerms(): Promise<t.TAcceptTermsResponse>;
export declare function getBanner(): Promise<t.TBannerResponse>;
export declare function updateFeedback(conversationId: string, messageId: string, payload: t.TUpdateFeedbackRequest): Promise<t.TUpdateFeedbackResponse>;
export declare function enableTwoFactor(): Promise<t.TEnable2FAResponse>;
export declare function verifyTwoFactor(payload: t.TVerify2FARequest): Promise<t.TVerify2FAResponse>;
export declare function confirmTwoFactor(payload: t.TVerify2FARequest): Promise<t.TVerify2FAResponse>;
export declare function disableTwoFactor(payload?: t.TDisable2FARequest): Promise<t.TDisable2FAResponse>;
export declare function regenerateBackupCodes(): Promise<t.TRegenerateBackupCodesResponse>;
export declare function verifyTwoFactorTemp(payload: t.TVerify2FATempRequest): Promise<t.TVerify2FATempResponse>;
export declare const getMemories: () => Promise<q.MemoriesResponse>;
export declare const deleteMemory: (key: string) => Promise<void>;
export declare const updateMemory: (key: string, value: string, originalKey?: string) => Promise<q.TUserMemory>;
export declare const updateMemoryPreferences: (preferences: {
    memories: boolean;
}) => Promise<{
    updated: boolean;
    preferences: {
        memories: boolean;
    };
}>;
export declare const createMemory: (data: {
    key: string;
    value: string;
}) => Promise<{
    created: boolean;
    memory: q.TUserMemory;
}>;
export declare function searchPrincipals(params: q.PrincipalSearchParams): Promise<q.PrincipalSearchResponse>;
export declare function getAccessRoles(resourceType: permissions.ResourceType): Promise<q.AccessRolesResponse>;
export declare function getResourcePermissions(resourceType: permissions.ResourceType, resourceId: string): Promise<permissions.TGetResourcePermissionsResponse>;
export declare function updateResourcePermissions(resourceType: permissions.ResourceType, resourceId: string, data: permissions.TUpdateResourcePermissionsRequest): Promise<permissions.TUpdateResourcePermissionsResponse>;
export declare function getEffectivePermissions(resourceType: permissions.ResourceType, resourceId: string): Promise<permissions.TEffectivePermissionsResponse>;
export declare function getGraphApiToken(params: q.GraphTokenParams): Promise<q.GraphTokenResponse>;
export declare function getDomainServerBaseUrl(): string;
