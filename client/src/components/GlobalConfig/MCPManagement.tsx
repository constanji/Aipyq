import React, { useMemo } from 'react';
import { RefreshCw, CheckCircle2, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Button, useToastContext } from '@aipyq/client';
import { useGetStartupConfig } from '~/data-provider';
import { useMCPConnectionStatus } from '~/hooks';
import { cn } from '~/utils';

interface MCPServerConfig {
  type?: string;
  url?: string;
  chatMenu?: boolean;
  startup?: boolean;
  [key: string]: unknown;
}

export default function MCPManagement() {
  const { showToast } = useToastContext();
  const { data: startupConfig } = useGetStartupConfig();
  const { connectionStatus, refetch } = useMCPConnectionStatus({
    enabled: !!startupConfig?.mcpServers && Object.keys(startupConfig.mcpServers).length > 0,
  });

  const mcpServers = useMemo(() => {
    if (!startupConfig?.mcpServers) return [];
    return Object.entries(startupConfig.mcpServers).map(([serverName, config]) => ({
      name: serverName,
      config: config as MCPServerConfig,
    }));
  }, [startupConfig?.mcpServers]);

  const handleRefresh = async () => {
    try {
      await refetch();
      showToast({
        message: '连接状态已刷新',
        status: 'success',
      });
    } catch (error) {
      showToast({
        message: '刷新失败',
        status: 'error',
      });
    }
  };

  const getConnectionStatus = (serverName: string) => {
    if (!connectionStatus) return null;
    return connectionStatus[serverName] || null;
  };

  const getStatusIcon = (status: string | undefined) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'connecting':
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'disconnected':
      default:
        return <XCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string | undefined) => {
    switch (status) {
      case 'connected':
        return '已连接';
      case 'connecting':
        return '连接中';
      case 'error':
        return '连接错误';
      case 'disconnected':
      default:
        return '未连接';
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'connected':
        return 'text-green-500';
      case 'connecting':
        return 'text-blue-500';
      case 'error':
        return 'text-red-500';
      case 'disconnected':
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">MCP 服务器管理</h3>
          <p className="mt-1 text-sm text-text-secondary">
            查看所有配置的 MCP 服务器及其连接状态
          </p>
        </div>
        <Button
          type="button"
          onClick={handleRefresh}
          className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
        >
          <RefreshCw className="h-4 w-4" />
          刷新状态
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {mcpServers.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-text-secondary">
            <div className="text-center">
              <p className="text-sm">暂无配置的 MCP 服务器</p>
              <p className="mt-2 text-xs text-text-tertiary">
                请在配置文件中添加 MCP 服务器配置
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {mcpServers.map((server) => {
              const status = getConnectionStatus(server.name);
              const connectionState = status?.connectionState || 'disconnected';
              const requiresOAuth = status?.requiresOAuth || false;

              return (
                <div
                  key={server.name}
                  className="rounded-lg border border-border-light bg-surface-primary p-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(connectionState)}
                          <h4 className="text-base font-semibold text-text-primary">
                            {server.name}
                          </h4>
                        </div>
                      </div>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-secondary">连接状态：</span>
                          <span className={cn('font-medium', getStatusColor(connectionState))}>
                            {getStatusText(connectionState)}
                          </span>
                        </div>
                        {server.config.url && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-secondary">URL：</span>
                            <span className="text-text-primary font-mono text-xs">
                              {server.config.url}
                            </span>
                          </div>
                        )}
                        {server.config.type && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-secondary">类型：</span>
                            <span className="text-text-primary">{server.config.type}</span>
                          </div>
                        )}
                        {requiresOAuth && (
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-text-secondary">认证：</span>
                            <span className="text-yellow-500">需要 OAuth 认证</span>
                          </div>
                        )}
                        <div className="flex items-center gap-4 text-xs text-text-tertiary">
                          {server.config.chatMenu !== false && (
                            <span>✓ 在聊天菜单中显示</span>
                          )}
                          {server.config.startup === true && <span>✓ 启动时自动连接</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

