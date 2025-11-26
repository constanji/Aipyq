import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Spinner } from '@aipyq/client';
import { PermissionTypes, Permissions } from 'aipyq-data-provider';
import { useGetStartupConfig, useGetEndpointsQuery } from '~/data-provider';
import { useAppStartup, useHasAccess, useLocalize } from '~/hooks';
import { AgentPanelProvider, ChatContext } from '~/Providers';
import useChatHelpers from '~/hooks/Chat/useChatHelpers';
import AgentPanelSwitch from '~/components/SidePanel/Agents/AgentPanelSwitch';
import useAuthRedirect from './useAuthRedirect';
import store from '~/store';

export default function AgentBuilder() {
  const { data: startupConfig } = useGetStartupConfig();
  const { isAuthenticated, user } = useAuthRedirect();
  const navigate = useNavigate();
  const localize = useLocalize();
  const endpointsQuery = useGetEndpointsQuery({ enabled: isAuthenticated });

  useAppStartup({ startupConfig, user });

  const hasAccessToAgents = useHasAccess({
    permissionType: PermissionTypes.AGENTS,
    permission: Permissions.USE,
  });

  const hasAccessToCreateAgents = useHasAccess({
    permissionType: PermissionTypes.AGENTS,
    permission: Permissions.CREATE,
  });

  // 初始化对话状态（与 ChatRoute 保持一致）
  const index = 0;
  const { conversation } = store.useCreateConversationAtom(index);
  
  // Hooks 必须在组件顶层调用，不能在条件语句之后
  // 使用 'new' 作为 paramId，这样 useChatHelpers 会创建一个新对话
  const chatHelpers = useChatHelpers(index, 'new');

  useEffect(() => {
    if (isAuthenticated && (!hasAccessToAgents || !hasAccessToCreateAgents)) {
      navigate('/c/new', { replace: true });
    }
  }, [isAuthenticated, hasAccessToAgents, hasAccessToCreateAgents, navigate]);

  if (endpointsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" aria-live="polite" role="status">
        <Spinner className="text-text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (!hasAccessToAgents || !hasAccessToCreateAgents) {
    return null;
  }

  return (
    <ChatContext.Provider value={chatHelpers}>
      <div className="flex h-full w-full flex-col overflow-hidden bg-background">
        <div className="flex h-full w-full flex-row">
          <div className="flex h-full w-full flex-col overflow-hidden">
            <div className="flex h-full w-full flex-col">
              <div className="mb-4 px-4 pt-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-2xl font-semibold text-text-primary">智能体构建器</h1>
                    <p className="mt-1 text-sm text-text-secondary">
                      创建和配置您的智能体
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
                    onClick={() => navigate('/c/new')}
                    aria-label={localize('com_ui_back')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>{localize('com_ui_back')}</span>
                  </button>
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-hidden">
                <AgentPanelSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ChatContext.Provider>
  );
}

