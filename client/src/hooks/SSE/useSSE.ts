import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { SSE } from 'sse.js';
import { useSetRecoilState } from 'recoil';
import {
  request,
  Constants,
  /* @ts-ignore */
  createPayload,
  LocalStorageKeys,
  removeNullishValues,
} from 'aipyq-data-provider';
import type { TMessage, TPayload, TSubmission, EventSubmission } from 'aipyq-data-provider';
import type { EventHandlerParams } from './useEventHandlers';
import type { TResData } from '~/common';
import { useGenTitleMutation, useGetStartupConfig, useGetUserBalance } from '~/data-provider';
import { useAuthContext } from '~/hooks/AuthContext';
import useEventHandlers from './useEventHandlers';
import store from '~/store';
import logger from '~/utils/logger';

const clearDraft = (conversationId?: string | null) => {
  if (conversationId) {
    localStorage.removeItem(`${LocalStorageKeys.TEXT_DRAFT}${conversationId}`);
    localStorage.removeItem(`${LocalStorageKeys.FILES_DRAFT}${conversationId}`);
  } else {
    localStorage.removeItem(`${LocalStorageKeys.TEXT_DRAFT}${Constants.NEW_CONVO}`);
    localStorage.removeItem(`${LocalStorageKeys.FILES_DRAFT}${Constants.NEW_CONVO}`);
  }
};

type ChatHelpers = Pick<
  EventHandlerParams,
  | 'setMessages'
  | 'getMessages'
  | 'setConversation'
  | 'setIsSubmitting'
  | 'newConversation'
  | 'resetLatestMessage'
>;

export default function useSSE(
  submission: TSubmission | null,
  chatHelpers: ChatHelpers,
  isAddedRequest = false,
  runIndex = 0,
) {
  const genTitle = useGenTitleMutation();
  const setActiveRunId = useSetRecoilState(store.activeRunFamily(runIndex));

  const { token, isAuthenticated } = useAuthContext();
  const [completed, setCompleted] = useState(new Set());
  const setAbortScroll = useSetRecoilState(store.abortScrollFamily(runIndex));
  const setShowStopButton = useSetRecoilState(store.showStopButtonByIndex(runIndex));

  const {
    setMessages,
    getMessages,
    setConversation,
    setIsSubmitting,
    newConversation,
    resetLatestMessage,
  } = chatHelpers;

  const {
    clearStepMaps,
    stepHandler,
    syncHandler,
    finalHandler,
    errorHandler,
    messageHandler,
    contentHandler,
    createdHandler,
    attachmentHandler,
    abortConversation,
  } = useEventHandlers({
    genTitle,
    setMessages,
    getMessages,
    setCompleted,
    isAddedRequest,
    setConversation,
    setIsSubmitting,
    newConversation,
    setShowStopButton,
    resetLatestMessage,
  });

  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.balance?.enabled,
  });

  useEffect(() => {
    // 如果 submission 是 null 或空对象，直接返回，不创建 SSE 连接
    if (submission == null || Object.keys(submission).length === 0) {
      return;
    }

    // Store the submission reference to check in cleanup
    // 确保 submission 有有效的 initialResponse.messageId
    if (!submission.initialResponse?.messageId) {
      logger.log('sse', 'Submission missing initialResponse.messageId, skipping SSE connection');
      return;
    }

    // 使用 useRef 来跟踪 SSE 连接是否已经建立
    // 这样可以避免在连接刚建立时就被清理函数取消
    let sseConnectionEstablished = false;
    let sseConnectionClosed = false;

    const currentSubmission = submission;
    let { userMessage } = submission;

    const payloadData = createPayload(submission);
    let { payload } = payloadData;
    payload = removeNullishValues(payload) as TPayload;

    let textIndex = null;
    clearStepMaps();

    const sse = new SSE(payloadData.server, {
      payload: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    });

    sse.addEventListener('attachment', (e: MessageEvent) => {
      try {
        // 场景1: 处理空字符串或null
        if (!e.data || e.data.trim() === '') {
          logger.warn('sse', 'Empty or null data in attachment event', { event: e });
          return;
        }

        // 场景3: 处理残缺JSON
        let data: any;
        try {
          data = JSON.parse(e.data);
        } catch (parseError) {
          logger.warn('sse', 'Malformed JSON in attachment event (possibly truncated)', {
            error: parseError,
            data: e.data,
            event: e,
          });
          return;
        }

        // 场景1: 处理 JSON.parse('null')
        if (data === null || (typeof data !== 'object' && !Array.isArray(data))) {
          logger.warn('sse', 'Parsed data is null or invalid in attachment event', { data, event: e });
          return;
        }

        attachmentHandler({ data, submission: submission as EventSubmission });
      } catch (error) {
        logger.error('sse', 'Error processing attachment event', { error, event: e });
        console.error(error);
      }
    });

    sse.addEventListener('message', (e: MessageEvent) => {
      try {
        // 场景1: 处理空字符串或null的e.data
        // 后端可能发送 data: 或 data: null
        if (!e.data || e.data.trim() === '') {
          logger.warn('sse', 'Empty or null data in message event', { event: e });
          return;
        }

        // 场景3: 处理代理层截断导致的残缺JSON（会被catch捕获）
        let data: any;
        try {
          data = JSON.parse(e.data);
        } catch (parseError) {
          // 残缺的JSON会被这里捕获
          logger.warn('sse', 'Malformed JSON in message event (possibly truncated by proxy)', {
            error: parseError,
            data: e.data,
            event: e,
          });
          return;
        }

        // 场景1: 处理 JSON.parse('null') 返回 null 的情况
        // 注意：typeof null === 'object' 是JS的bug，需要显式检查
        if (data === null) {
          logger.warn('sse', 'Parsed data is null (backend sent data: null)', { event: e });
          return;
        }

        // 场景2: 处理空对象 {} 的情况（流式JSON最后多送的空对象）
        if (typeof data !== 'object' || Array.isArray(data)) {
          logger.warn('sse', 'Parsed data is not a valid object in message event', { data, event: e });
          return;
        }

        // 检查是否为空对象（没有任何有效字段）
        const hasValidFields =
          'final' in data ||
          'created' in data ||
          'event' in data ||
          'sync' in data ||
          'type' in data ||
          'text' in data ||
          'response' in data ||
          'message' in data;
        if (!hasValidFields) {
          logger.warn('sse', 'Empty object received (possibly trailing empty object from stream)', {
            data,
            event: e,
          });
          return;
        }

        if (data.final != null) {
          clearDraft(submission.conversation?.conversationId);
          const { plugins } = data;
          finalHandler(data, { ...submission, plugins } as EventSubmission);
          (startupConfig?.balance?.enabled ?? false) && balanceQuery.refetch();
          console.log('final', data);
          return;
        } else if (data.created != null) {
          const runId = v4();
          setActiveRunId(runId);
          userMessage = {
            ...userMessage,
            ...data.message,
            overrideParentMessageId: userMessage.overrideParentMessageId,
          };

          createdHandler(data, { ...submission, userMessage } as EventSubmission);
        } else if (data.event != null) {
          // 验证 data.data 不为 null（stepHandler 期望 { event, data } 格式）
          if (data.data === null || data.data === undefined) {
            logger.warn('sse', 'Event data is null in stepHandler', { event: data.event, data });
            return;
          }
          stepHandler(data, { ...submission, userMessage } as EventSubmission);
        } else if (data.sync != null) {
          const runId = v4();
          setActiveRunId(runId);
          /* synchronize messages to Assistants API as well as with real DB ID's */
          syncHandler(data, { ...submission, userMessage } as EventSubmission);
        } else if (data.type != null) {
          const { text, index } = data;
          if (text != null && index !== textIndex) {
            textIndex = index;
          }

          contentHandler({ data, submission: submission as EventSubmission });
        } else {
          const text = data.text ?? data.response;
          const { plugin, plugins } = data;

          const initialResponse = {
            ...(submission.initialResponse as TMessage),
            parentMessageId: data.parentMessageId,
            messageId: data.messageId,
          };

          if (data.message != null) {
            messageHandler(text, { ...submission, plugin, plugins, userMessage, initialResponse });
          }
        }
      } catch (error) {
        logger.error('sse', 'Error processing message event', { error, event: e });
        console.error('Error processing SSE message:', error);
      }
    });

    sse.addEventListener('open', () => {
      sseConnectionEstablished = true;
      setAbortScroll(false);
      console.log('connection is opened');
    });

    sse.addEventListener('cancel', async () => {
      const streamKey = (submission as TSubmission | null)?.['initialResponse']?.messageId;
      if (completed.has(streamKey)) {
        setIsSubmitting(false);
        setCompleted((prev) => {
          prev.delete(streamKey);
          return new Set(prev);
        });
        return;
      }

      setCompleted((prev) => new Set(prev.add(streamKey)));
      const latestMessages = getMessages();
      const conversationId = latestMessages?.[latestMessages.length - 1]?.conversationId;
      return await abortConversation(
        conversationId ??
          userMessage.conversationId ??
          submission.conversation?.conversationId ??
          '',
        submission as EventSubmission,
        latestMessages,
      );
    });

    sse.addEventListener('error', async (e: MessageEvent) => {
      /* @ts-ignore */
      if (e.responseCode === 401) {
        /* token expired, refresh and retry */
        try {
          const refreshResponse = await request.refreshToken();
          const token = refreshResponse?.token ?? '';
          if (!token) {
            throw new Error('Token refresh failed.');
          }
          sse.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          };

          request.dispatchTokenUpdatedEvent(token);
          sse.stream();
          return;
        } catch (error) {
          /* token refresh failed, continue handling the original 401 */
          console.log(error);
        }
      }

      console.log('error in server stream.');
      (startupConfig?.balance?.enabled ?? false) && balanceQuery.refetch();

      let data: TResData | undefined = undefined;
      try {
        // 场景1: 处理空字符串或null
        if (!e.data || e.data.trim() === '') {
          logger.warn('sse', 'Empty or null data in error event', { event: e });
          setIsSubmitting(false);
          return;
        }

        // 场景3: 处理残缺JSON
        try {
          data = JSON.parse(e.data) as TResData;
        } catch (parseError) {
          logger.warn('sse', 'Malformed JSON in error event (possibly truncated)', {
            error: parseError,
            data: e.data,
            event: e,
          });
          setIsSubmitting(false);
          return;
        }

        // 场景1: 处理 JSON.parse('null')
        if (data === null) {
          logger.warn('sse', 'Parsed error data is null (backend sent data: null)', { event: e });
          setIsSubmitting(false);
          return;
        }

        // 场景2: 处理空对象
        if (typeof data !== 'object' || Array.isArray(data)) {
          logger.warn('sse', 'Parsed error data is not a valid object', { data, event: e });
          setIsSubmitting(false);
          return;
        }
      } catch (error) {
        logger.error('sse', 'Error processing error event', { error, event: e });
        console.error(error);
        console.log(e);
        setIsSubmitting(false);
        return;
      }

      errorHandler({ data, submission: { ...submission, userMessage } as EventSubmission });
    });

    setIsSubmitting(true);
    sse.stream();

    return () => {
      // 如果连接已经关闭，直接返回，不执行任何操作
      if (sseConnectionClosed) {
        return;
      }

      // Only cancel if the connection is still in progress (CONNECTING or OPEN)
      // Don't cancel if it's already CLOSED or CLOSING
      const isCancelled = sse.readyState <= 1; // 0 = CONNECTING, 1 = OPEN
      
      // Check if this cleanup is happening because submission was cleared (empty object or null)
      // This happens when switching conversations via newConversation() which calls setSubmission(null)
      // In this case, we should NOT trigger cancel event as it's not a user-initiated cancellation
      const isSubmissionCleared = currentSubmission == null || 
        Object.keys(currentSubmission).length === 0 ||
        !currentSubmission.initialResponse?.messageId;
      
      // 如果连接还没有建立（还在 CONNECTING 状态），并且 submission 被清空，
      // 这可能是由于组件重新渲染或对话切换导致的，不应该取消请求
      // 只有在连接已经建立后，才考虑取消
      const shouldCancel = isCancelled && 
        !isSubmissionCleared && 
        sseConnectionEstablished;
      
      sseConnectionClosed = true;
      sse.close();
      
      // Only trigger cancel event if:
      // 1. Connection was still active (CONNECTING or OPEN)
      // 2. Current submission exists and has valid data (not empty, has messageId)
      // 3. Submission was NOT cleared (this is a real cancellation, not a conversation switch)
      // 4. Connection was already established (not cancelled during initial connection)
      // This prevents accidental cancellation when switching conversations or clearing submission
      if (shouldCancel) {
        logger.log('sse_cleanup', 'SSE connection cancelled during cleanup (user cancellation)', {
          readyState: sse.readyState,
          messageId: currentSubmission.initialResponse?.messageId,
          connectionEstablished: sseConnectionEstablished,
        });
        const e = new Event('cancel');
        /* @ts-ignore */
        sse.dispatchEvent(e);
      } else {
        logger.log('sse_cleanup', 'SSE connection closed without cancel event', {
          readyState: sse.readyState,
          isCancelled,
          isSubmissionCleared,
          hasMessageId: !!currentSubmission?.initialResponse?.messageId,
          connectionEstablished: sseConnectionEstablished,
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission]);
}
