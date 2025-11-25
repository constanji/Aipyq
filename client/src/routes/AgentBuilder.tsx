import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@librechat/client';
import { PermissionTypes, Permissions } from 'librechat-data-provider';
import { useGetStartupConfig, useGetEndpointsQuery } from '~/data-provider';
import { useAppStartup, useHasAccess } from '~/hooks';
import { AgentPanelProvider } from '~/Providers/AgentPanelContext';
import AgentPanelSwitch from '~/components/SidePanel/Agents/AgentPanelSwitch';
import useAuthRedirect from './useAuthRedirect';

export default function AgentBuilder() {
  const { data: startupConfig } = useGetStartupConfig();
  const { isAuthenticated, user } = useAuthRedirect();
  const navigate = useNavigate();
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
    <div className="flex h-full w-full flex-col overflow-hidden bg-background">
      <div className="flex h-full w-full flex-row">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          <div className="flex h-full w-full flex-col p-4">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold text-text-primary">智能体构建器</h1>
              <p className="mt-1 text-sm text-text-secondary">
                创建和配置您的智能体
              </p>
            </div>
            <div className="flex-1">
              <AgentPanelProvider>
                <AgentPanelSwitch />
              </AgentPanelProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

