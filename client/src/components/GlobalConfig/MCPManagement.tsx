import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'aipyq-data-provider';
import { useReinitializeMCPServerMutation } from 'aipyq-data-provider/react-query';
import type { TStartupConfig } from 'aipyq-data-provider';
import { useLocalize, useMCPConnectionStatus, useAuthContext } from '~/hooks';
import { useGetStartupConfig } from '~/data-provider';
import { cn } from '~/utils';
import { RefreshCw, CheckCircle2, XCircle, Clock, AlertCircle, Plus, Edit, Trash2, List, Grid } from 'lucide-react';
import MCPConfigEditor from './MCPConfigEditor';

interface MCPManagementProps {
  startupConfig?: TStartupConfig;
}

interface ServerTestingState {
  [serverName: string]: boolean;
}

interface MCPServerConfig {
  serverName: string;
  config: {
    type?: string;
    url?: string;
    chatMenu?: boolean;
    startup?: boolean;
    customUserVars?: Record<string, any>;
    [key: string]: any;
  };
}

export default function MCPManagement({ startupConfig: propStartupConfig }: MCPManagementProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { token } = useAuthContext();
  const queryClient = useQueryClient();
  const { data: startupConfigFromQuery, refetch } = useGetStartupConfig();
  const startupConfig = propStartupConfig || startupConfigFromQuery;
  const { connectionStatus, refetch: refetchConnectionStatus } = useMCPConnectionStatus({
    enabled: true, // 始终启用，以便自动获取连接状态
  });

  const [testingServers, setTestingServers] = useState<ServerTestingState>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editingServer, setEditingServer] = useState<MCPServerConfig | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [customServers, setCustomServers] = useState<MCPServerConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  const reinitializeMutation = useReinitializeMCPServerMutation();

  // 组件挂载时和服务器列表变化时自动获取连接状态
  useEffect(() => {
    if (customServers.length > 0 && !isLoading) {
      // 立即获取连接状态
      const fetchStatus = async () => {
        try {
          await refetchConnectionStatus();
        } catch (error) {
          console.error('Failed to fetch MCP connection status:', error);
        }
      };
      fetchStatus();
      // 同时使缓存失效，确保获取最新状态
      queryClient.invalidateQueries([QueryKeys.mcpConnectionStatus]);
    }
  }, [customServers.length, isLoading, queryClient, refetchConnectionStatus]);

  // 获取MCP服务器配置
  useEffect(() => {
    const fetchServers = async () => {
      setIsLoading(true);
      try {
        const baseEl = document.querySelector('base');
        const baseHref = baseEl?.getAttribute('href') || '/';
        const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

        const headers: HeadersInit = {
          'Content-Type': 'application/json',
        };
        
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(`${apiBase}/api/config/mcp/custom`, {
          method: 'GET',
          headers,
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('获取MCP服务器配置失败');
        }

        const data = await response.json();
        setCustomServers(data.servers || []);
      } catch (error) {
        console.error('Error fetching MCP servers:', error);
        showToast({
          message: `获取MCP服务器配置失败: ${error instanceof Error ? error.message : '未知错误'}`,
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchServers();
  }, [showToast, token]);

  // 刷新服务器列表
  const refreshServers = async () => {
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/config/mcp/custom`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('获取MCP服务器配置失败');
      }

      const data = await response.json();
      setCustomServers(data.servers || []);
    } catch (error) {
      console.error('Error refreshing servers:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingServer(undefined);
    setShowEditor(true);
  };

  const handleEdit = (server: MCPServerConfig) => {
    setEditingServer(server);
    setShowEditor(true);
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingServer(undefined);
  };

  const handleSave = async (server: MCPServerConfig) => {
    setIsSaving(true);
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/config/mcp/custom`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ server }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '保存失败');
      }

      await refetch();
      await refreshServers();
      setShowEditor(false);
      setEditingServer(undefined);
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (serverName: string) => {
    if (!confirm(`确定要删除MCP服务器配置 "${serverName}" 吗？此操作无法撤销。`)) {
      return;
    }

    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {};
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/config/mcp/custom/${encodeURIComponent(serverName)}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '删除失败');
      }

      showToast({
        message: 'MCP服务器配置删除成功',
        status: 'success',
      });

      await refetch();
      await refreshServers();
    } catch (error) {
      showToast({
        message: `删除失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  const mcpServerDefinitions = useMemo(() => {
    return customServers.map((server) => ({
      serverName: server.serverName,
      config: {
        ...server.config,
        customUserVars: server.config.customUserVars ?? {},
      },
    }));
  }, [customServers]);

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
        return '未连接';
      case 'connecting':
        return '连接中';
      case 'error':
        return '连接失败';
      default:
        return '未连接'; // 默认显示未连接，而不是未知
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

  // 如果显示编辑器，渲染编辑器（必须在所有 hooks 之后）
  if (showEditor) {
    return (
      <MCPConfigEditor
        server={editingServer}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">MCP服务器管理</h2>
          <p className="mt-1 text-sm text-text-secondary">
            管理MCP服务器配置，可以增删改服务器配置并测试连接
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* 视图切换按钮 */}
          <div className="flex items-center gap-1 rounded-lg border border-border-light bg-surface-secondary p-1">
            <button
              type="button"
              onClick={() => setViewMode('detailed')}
              className={cn(
                'rounded px-2 py-1 text-sm transition-colors',
                viewMode === 'detailed'
                  ? 'bg-surface-primary text-text-primary'
                  : 'text-text-secondary hover:bg-surface-hover',
              )}
              title="详细视图"
              aria-label="详细视图"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={cn(
                'rounded px-2 py-1 text-sm transition-colors',
                viewMode === 'compact'
                  ? 'bg-surface-primary text-text-primary'
                  : 'text-text-secondary hover:bg-surface-hover',
              )}
              title="表格视图"
              aria-label="表格视图"
            >
              <Grid className="h-4 w-4" />
            </button>
        </div>
        <Button
          type="button"
            onClick={handleCreateNew}
            className="btn btn-primary relative flex items-center gap-2 rounded-lg px-3 py-2"
        >
            <Plus className="h-4 w-4" />
            添加MCP服务器
        </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-text-secondary">
            <p className="text-sm">加载中...</p>
          </div>
        ) : mcpServerDefinitions.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
            <p className="text-sm">暂无MCP服务器配置</p>
            <p className="text-xs text-text-tertiary">
              点击右上角"添加MCP服务器"按钮开始创建
            </p>
          </div>
        ) : (
          <div className={cn('space-y-2', viewMode === 'compact' && 'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3')}>
          {mcpServerDefinitions.map((server) => {
            const serverStatus = connectionStatus?.[server.serverName];
              // 如果没有连接状态，默认显示为 disconnected（未连接）
              const connectionState = serverStatus?.connectionState ?? 'disconnected';
            const isTesting = testingServers[server.serverName] || false;
            const requiresOAuth = serverStatus?.requiresOAuth || false;

              if (viewMode === 'compact') {
                // 表格视图：只显示服务器名称和连接状态
            return (
              <div
                key={server.serverName}
                    className="relative rounded-lg border border-border-light bg-surface-primary p-3 pr-10 pt-4"
              >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(connectionState)}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-text-primary line-clamp-1">
                          {server.serverName}
                        </h4>
                        <p className="mt-1 text-xs text-text-secondary">
                          {getStatusText(connectionState)}
                        </p>
                      </div>
                    </div>
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleTestConnection(server.serverName)}
                        disabled={isTesting || reinitializeMutation.isLoading}
                        className="rounded p-1.5 text-text-secondary transition-colors hover:bg-surface-hover disabled:opacity-50"
                        title="测试连接"
                        aria-label="测试连接"
                      >
                        <RefreshCw
                          className={cn('h-4 w-4', (isTesting || reinitializeMutation.isLoading) && 'animate-spin')}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEdit(server)}
                        className="rounded p-1.5 text-text-secondary transition-colors hover:bg-surface-hover"
                        title="编辑MCP服务器配置"
                        aria-label="编辑"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(server.serverName)}
                        className="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                        title="删除MCP服务器配置"
                        aria-label="删除"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              }

              // 详细视图：显示完整信息
              return (
                <div
                  key={server.serverName}
                  className="relative rounded-lg border border-border-light bg-surface-primary p-4"
                >
                  <div className="absolute right-2 top-2 flex gap-1">
                    <button
                      type="button"
                      onClick={() => handleEdit(server)}
                      className="rounded p-1.5 text-text-secondary hover:bg-surface-hover"
                      title="编辑MCP服务器配置"
                      aria-label="编辑"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(server.serverName)}
                      className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                      title="删除MCP服务器配置"
                      aria-label="删除"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mb-3 flex items-center justify-between pr-20">
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
                    {server.config.type && (
                      <div className="flex items-center gap-2 text-text-secondary">
                        <span className="font-medium">类型:</span>
                        <span>{server.config.type}</span>
                      </div>
                    )}
                    {server.config.url && (
                    <div className="flex items-center gap-2 text-text-secondary">
                        <span className="font-medium">URL:</span>
                        <span className="truncate text-xs">{server.config.url}</span>
                    </div>
                  )}
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

