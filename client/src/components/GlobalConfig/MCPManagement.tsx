import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'aipyq-data-provider';
import { useReinitializeMCPServerMutation } from 'aipyq-data-provider/react-query';
import type { TStartupConfig } from 'aipyq-data-provider';
import { useLocalize, useMCPConnectionStatus } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { cn } from '~/utils';
import { RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle } from 'lucide-react';

interface MCPManagementProps {
  startupConfig?: TStartupConfig;
}

interface ServerTestingState {
  [serverName: string]: boolean;
}

export default function MCPManagement({ startupConfig }: MCPManagementProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const queryClient = useQueryClient();
  const { connectionStatus } = useMCPConnectionStatus({
    enabled: !!startupConfig?.mcpServers && Object.keys(startupConfig.mcpServers).length > 0,
  });

  const [testingServers, setTestingServers] = useState<ServerTestingState>({});
  const [isRefreshing, setIsRefreshing] = useState(false);

  const reinitializeMutation = useReinitializeMCPServerMutation();

  // 组件挂载时刷新连接状态
  useEffect(() => {
    if (startupConfig?.mcpServers && Object.keys(startupConfig.mcpServers).length > 0) {
      queryClient.invalidateQueries([QueryKeys.mcpConnectionStatus]);
    }
  }, [startupConfig?.mcpServers, queryClient]);

  const mcpServerDefinitions = useMemo(() => {
    if (!startupConfig?.mcpServers) {
      return [];
    }
    return Object.entries(startupConfig.mcpServers).map(([serverName, config]) => ({
      serverName,
      config: {
        ...config,
        customUserVars: config.customUserVars ?? {},
      },
    }));
  }, [startupConfig?.mcpServers]);

  const handleTestConnection = useCallback(
    async (serverName: string) => {
      setTestingServers((prev) => ({ ...prev, [serverName]: true }));
      try {
        const response = await reinitializeMutation.mutateAsync(serverName);
        
        if (response.success) {
          showToast({
            message: `MCP服务器 "${serverName}" 测试连接成功`,
            status: 'success',
          });
          
          // 刷新连接状态和工具列表
          await Promise.all([
            queryClient.invalidateQueries([QueryKeys.mcpConnectionStatus]),
            queryClient.invalidateQueries([QueryKeys.mcpTools]),
          ]);
        } else {
          showToast({
            message: `MCP服务器 "${serverName}" 测试连接失败: ${response.message || '未知错误'}`,
            status: 'error',
          });
        }
      } catch (error) {
        console.error(`[MCP Management] Failed to test connection for ${serverName}:`, error);
        showToast({
          message: `MCP服务器 "${serverName}" 测试连接失败: ${error instanceof Error ? error.message : '未知错误'}`,
          status: 'error',
        });
      } finally {
        setTestingServers((prev) => ({ ...prev, [serverName]: false }));
      }
    },
    [reinitializeMutation, showToast, queryClient],
  );

  const handleRefreshStatus = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries([QueryKeys.mcpConnectionStatus]);
      showToast({
        message: '连接状态已刷新',
        status: 'success',
      });
    } catch (error) {
      console.error('[MCP Management] Failed to refresh status:', error);
      showToast({
        message: '刷新连接状态失败',
        status: 'error',
      });
    } finally {
      setIsRefreshing(false);
    }
  }, [queryClient, showToast]);

  const getStatusIcon = (connectionState?: string) => {
    switch (connectionState) {
      case 'connected':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-4 w-4 text-gray-400" />;
      case 'connecting':
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <XCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusText = (connectionState?: string) => {
    switch (connectionState) {
      case 'connected':
        return '连接正常';
      case 'disconnected':
        return '未测试连接';
      case 'connecting':
        return '连接中';
      case 'error':
        return '错误';
      default:
        return '未知';
    }
  };

  const getStatusColor = (connectionState?: string) => {
    switch (connectionState) {
      case 'connected':
        return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
      case 'disconnected':
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
      case 'connecting':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
      case 'error':
        return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  if (mcpServerDefinitions.length === 0) {
    return (
      <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
        <p className="text-sm">暂无MCP服务器配置</p>
        <p className="text-xs text-text-tertiary">
          {startupConfig?.mcpServers
            ? '配置文件中没有MCP服务器配置'
            : '配置文件未加载或没有MCP配置'}
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">MCP服务器管理</h2>
          <p className="mt-1 text-sm text-text-secondary">
            查看和管理MCP服务器的连接状态，可以测试服务器连接
          </p>
        </div>
        <Button
          type="button"
          onClick={handleRefreshStatus}
          disabled={isRefreshing}
          className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
          aria-label="刷新连接状态"
        >
          <RefreshCw className={cn('h-4 w-4', isRefreshing && 'animate-spin')} />
          {isRefreshing ? '刷新中...' : '刷新状态'}
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="space-y-3">
          {mcpServerDefinitions.map((server) => {
            const serverStatus = connectionStatus?.[server.serverName];
            const connectionState = serverStatus?.connectionState;
            const isTesting = testingServers[server.serverName] || false;
            const requiresOAuth = serverStatus?.requiresOAuth || false;

            return (
              <div
                key={server.serverName}
                className="rounded-lg border border-border-light bg-surface-primary p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(connectionState)}
                      <h3 className="text-base font-semibold text-text-primary">
                        {server.serverName}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        'rounded-xl px-2 py-0.5 text-xs font-medium',
                        getStatusColor(connectionState),
                      )}
                    >
                      {getStatusText(connectionState)}
                    </span>
                    {requiresOAuth && (
                      <span className="rounded-xl bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                        OAuth
                      </span>
                    )}
                  </div>
                  <Button
                    type="button"
                    onClick={() => handleTestConnection(server.serverName)}
                    disabled={isTesting || reinitializeMutation.isLoading}
                    className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
                    aria-label={`测试连接 ${server.serverName}`}
                  >
                    <RefreshCw
                      className={cn('h-4 w-4', (isTesting || reinitializeMutation.isLoading) && 'animate-spin')}
                    />
                    {isTesting || reinitializeMutation.isLoading ? '测试中...' : '测试连接'}
                  </Button>
                </div>

                <div className="space-y-2 text-sm">
                  {serverStatus && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span className="font-medium">连接状态:</span>
                      <span>{getStatusText(connectionState)}</span>
                    </div>
                  )}
                  {server.config.customUserVars &&
                    Object.keys(server.config.customUserVars).length > 0 && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="font-medium">自定义变量:</span>
                        <span>{Object.keys(server.config.customUserVars).length} 个</span>
                      </div>
                    )}
                  {server.config.isOAuth && (
                    <div className="flex items-center gap-2 text-text-secondary">
                      <span className="font-medium">认证方式:</span>
                      <span>OAuth</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

