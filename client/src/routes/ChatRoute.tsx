import { useEffect } from 'react';
import { Spinner } from '@aipyq/client';
import { useParams } from 'react-router-dom';
import { Constants, EModelEndpoint } from 'aipyq-data-provider';
import { useGetModelsQuery } from 'aipyq-data-provider/react-query';
import type { TPreset } from 'aipyq-data-provider';
import { useGetConvoIdQuery, useGetStartupConfig, useGetEndpointsQuery } from '~/data-provider';
import { useNewConvo, useAppStartup, useAssistantListMap, useIdChangeEffect } from '~/hooks';
import { getDefaultModelSpec, getModelSpecPreset, logger } from '~/utils';
import { ToolCallsMapProvider } from '~/Providers';
import ChatView from '~/components/Chat/ChatView';
import useAuthRedirect from './useAuthRedirect';
import temporaryStore from '~/store/temporary';
import { useRecoilCallback, useRecoilValue } from 'recoil';
import store from '~/store';

export default function ChatRoute() {
  const { data: startupConfig } = useGetStartupConfig();
  const { isAuthenticated, user } = useAuthRedirect();

  const setIsTemporary = useRecoilCallback(
    ({ set }) =>
      (value: boolean) => {
        set(temporaryStore.isTemporary, value);
      },
    [],
  );
  useAppStartup({ startupConfig, user });

  const index = 0;
  const { conversationId = '' } = useParams();
  useIdChangeEffect(conversationId);
  const { hasSetConversation, conversation } = store.useCreateConversationAtom(index);
  const { newConversation } = useNewConvo();
  const isSubmitting = useRecoilValue(store.isSubmittingFamily(index));

  const modelsQuery = useGetModelsQuery({
    enabled: isAuthenticated,
    refetchOnMount: 'always',
  });
  const initialConvoQuery = useGetConvoIdQuery(conversationId, {
    enabled:
      isAuthenticated && conversationId !== Constants.NEW_CONVO && !hasSetConversation.current,
  });
  const endpointsQuery = useGetEndpointsQuery({ enabled: isAuthenticated });
  const assistantListMap = useAssistantListMap();

  const isTemporaryChat = conversation && conversation.expiredAt ? true : false;

  useEffect(() => {
    if (conversationId !== Constants.NEW_CONVO && !isTemporaryChat) {
      setIsTemporary(false);
    } else if (isTemporaryChat) {
      setIsTemporary(isTemporaryChat);
    }
  }, [conversationId, isTemporaryChat, setIsTemporary]);

  /** This effect is mainly for the first conversation state change on first load of the page.
   *  Adjusting this may have unintended consequences on the conversation state.
   */
  useEffect(() => {
    // 当 conversationId 改变时，重置 hasSetConversation 以允许加载新对话或历史对话
    // 这确保每次切换对话时都能正确加载
    // 但需要避免在同一个 conversationId 下重复重置
    if (conversationId && conversation?.conversationId !== conversationId) {
      // 只有在 conversationId 真正改变时才重置
      // 这样可以避免在对话加载过程中重复重置
      hasSetConversation.current = false;
    }
    
    const shouldSetConvo =
      (startupConfig && !hasSetConversation.current && !modelsQuery.data?.initial) ?? false;
    /* Early exit if startupConfig is not loaded and conversation is already set and only initial models have loaded */
    if (!shouldSetConvo) {
      return;
    }

    // 如果正在提交消息，不要调用 newConversation，避免中断正在进行的请求
    if (isSubmitting) {
      logger.log('conversation', 'Skipping newConversation because message is currently being submitted', {
        isSubmitting,
        conversationId,
      });
      return;
    }

    if (conversationId === Constants.NEW_CONVO && endpointsQuery.data && modelsQuery.data) {
      const result = getDefaultModelSpec(startupConfig);
      const spec = result?.default ?? result?.last;
      logger.log('conversation', 'ChatRoute, new convo effect', conversation);
      newConversation({
        modelsData: modelsQuery.data,
        template: conversation ? conversation : undefined,
        ...(spec ? { preset: getModelSpecPreset(spec) } : {}),
      });

      hasSetConversation.current = true;
    } else if (initialConvoQuery.data && endpointsQuery.data && modelsQuery.data) {
      logger.log('conversation', 'ChatRoute initialConvoQuery', initialConvoQuery.data);
      newConversation({
        template: initialConvoQuery.data,
        /* this is necessary to load all existing settings */
        preset: initialConvoQuery.data as TPreset,
        modelsData: modelsQuery.data,
        keepLatestMessage: true,
      });
      hasSetConversation.current = true;
    } else if (
      conversationId === Constants.NEW_CONVO &&
      assistantListMap[EModelEndpoint.assistants] &&
      assistantListMap[EModelEndpoint.azureAssistants]
    ) {
      const result = getDefaultModelSpec(startupConfig);
      const spec = result?.default ?? result?.last;
      logger.log('conversation', 'ChatRoute new convo, assistants effect', conversation);
      newConversation({
        modelsData: modelsQuery.data,
        template: conversation ? conversation : undefined,
        ...(spec ? { preset: getModelSpecPreset(spec) } : {}),
      });
      hasSetConversation.current = true;
    } else if (
      assistantListMap[EModelEndpoint.assistants] &&
      assistantListMap[EModelEndpoint.azureAssistants]
    ) {
      logger.log('conversation', 'ChatRoute convo, assistants effect', initialConvoQuery.data);
      newConversation({
        template: initialConvoQuery.data,
        preset: initialConvoQuery.data as TPreset,
        modelsData: modelsQuery.data,
        keepLatestMessage: true,
      });
      hasSetConversation.current = true;
    }
    /* Creates infinite render if all dependencies included due to newConversation invocations exceeding call stack before hasSetConversation.current becomes truthy */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    startupConfig,
    initialConvoQuery.data,
    endpointsQuery.data,
    modelsQuery.data,
    assistantListMap,
    conversationId,
    conversation?.conversationId,
  ]);

  if (endpointsQuery.isLoading || modelsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" aria-live="polite" role="status">
        <Spinner className="text-text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  // if not a conversation
  if (conversation?.conversationId === Constants.SEARCH) {
    return null;
  }
  
  // 对于 NEW_CONVO，即使 conversation 还没完全匹配，也允许渲染
  // 这样可以避免在发送第一条消息时页面刷新
  if (conversationId === Constants.NEW_CONVO) {
    // 如果 conversation 存在（即使 conversationId 不匹配），允许渲染
    // 这样可以支持在发送第一条消息时的状态过渡
    if (conversation) {
      return (
        <ToolCallsMapProvider conversationId={conversation.conversationId ?? Constants.NEW_CONVO}>
          <ChatView index={index} />
        </ToolCallsMapProvider>
      );
    }
    // 如果 conversation 不存在，等待 useEffect 初始化
    return null;
  }
  
  // 对于非 NEW_CONVO 的对话，保持原有的检查逻辑
  if (conversation?.conversationId !== conversationId && !conversation) {
    return null;
  }
  
  // if conversationId is null
  if (!conversationId) {
    return null;
  }

  // 如果 conversation 存在且匹配，正常渲染
  if (conversation && conversation.conversationId === conversationId) {
    return (
      <ToolCallsMapProvider conversationId={conversation.conversationId ?? ''}>
        <ChatView index={index} />
      </ToolCallsMapProvider>
    );
  }

  // 默认情况：返回 null（允许 useEffect 处理）
  return null;
}
