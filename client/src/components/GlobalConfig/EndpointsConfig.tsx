import React, { useState, useMemo, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useGetStartupConfig } from '~/data-provider';
import { useLocalize, useAuthContext } from '~/hooks';
import { cn } from '~/utils';
import { Plus, Settings, ChevronDown } from 'lucide-react';
import EndpointConfigEditor from './EndpointConfigEditor';

interface EndpointConfig {
  name: string;
  apiKey: string;
  baseURL: string;
  models: {
    default: string[];
    fetch?: boolean;
  };
  titleConvo?: boolean;
  titleModel?: string;
  modelDisplayLabel?: string;
  iconURL?: string;
  dropParams?: string[];
  forceStringContent?: boolean;
}

interface EndpointsConfigProps {
  startupConfig?: any;
}

export default function EndpointsConfig({ startupConfig: propStartupConfig }: EndpointsConfigProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { token } = useAuthContext();
  const { data: startupConfigFromQuery, refetch } = useGetStartupConfig();
  const startupConfig = propStartupConfig || startupConfigFromQuery;

  const [showEditor, setShowEditor] = useState(false);
  const [editingEndpoint, setEditingEndpoint] = useState<EndpointConfig | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedEndpoints, setExpandedEndpoints] = useState<Set<string>>(new Set());
  const [addingModelToEndpoint, setAddingModelToEndpoint] = useState<string | null>(null);
  const [newModelName, setNewModelName] = useState('');

  const [customEndpoints, setCustomEndpoints] = useState<EndpointConfig[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 获取端点配置
  useEffect(() => {
    const fetchEndpoints = async () => {
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

        const response = await fetch(`${apiBase}/api/config/endpoints/custom`, {
          method: 'GET',
          headers,
          credentials: 'include',
        });

        // 检查响应内容类型
        const contentType = response.headers.get('content-type');
        const isJson = contentType && contentType.includes('application/json');

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          
          if (isJson) {
            try {
              const errorData = await response.json();
              errorMessage = errorData.error || errorData.message || errorMessage;
            } catch (e) {
              // JSON 解析失败，使用默认错误信息
            }
          } else {
            // 如果不是 JSON，可能是 HTML 错误页面
            const text = await response.text().catch(() => '');
            if (text.includes('<!DOCTYPE') || text.includes('<html')) {
              errorMessage = `服务器返回了 HTML 页面而不是 JSON。可能是认证失败或路由错误。状态码: ${response.status}`;
            } else {
              errorMessage = text || errorMessage;
            }
          }
          
          throw new Error(errorMessage);
        }

        if (!isJson) {
          const text = await response.text();
          throw new Error(`服务器返回了非 JSON 响应: ${text.substring(0, 100)}`);
        }

        const data = await response.json();
        setCustomEndpoints(data.endpoints || []);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
        const errorMessage = error instanceof Error ? error.message : '未知错误';
        showToast({
          message: `获取端点配置失败: ${errorMessage}`,
          status: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEndpoints();
  }, [showToast, token]);

  // 刷新端点列表
  const refreshEndpoints = async () => {
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

      const response = await fetch(`${apiBase}/api/config/endpoints/custom`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('获取端点配置失败');
      }

      const data = await response.json();
      setCustomEndpoints(data.endpoints || []);
    } catch (error) {
      console.error('Error refreshing endpoints:', error);
    }
  };

  const handleCreateNew = () => {
    setEditingEndpoint(undefined);
    setShowEditor(true);
  };

  const handleEdit = (endpoint: EndpointConfig) => {
    setEditingEndpoint(endpoint);
    setShowEditor(true);
  };

  const handleCancel = () => {
    setShowEditor(false);
    setEditingEndpoint(undefined);
  };

  const handleSave = async (endpoint: EndpointConfig) => {
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

      const response = await fetch(`${apiBase}/api/config/endpoints/custom`, {
        method: 'POST',
        headers,
        credentials: 'include',
        body: JSON.stringify({ endpoint }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '保存失败');
      }

      // 刷新配置
      await refetch();
      await refreshEndpoints();
      setShowEditor(false);
      setEditingEndpoint(undefined);
    } catch (error) {
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (endpointName: string) => {
    if (!confirm(`确定要删除端点配置 "${endpointName}" 吗？此操作无法撤销。`)) {
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

      const response = await fetch(`${apiBase}/api/config/endpoints/custom/${encodeURIComponent(endpointName)}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '删除失败');
      }

      showToast({
        message: '端点配置删除成功',
        status: 'success',
      });

      // 刷新配置
      await refetch();
    } catch (error) {
      showToast({
        message: `删除失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  const handleQuickAddModel = async (endpoint: EndpointConfig, modelName: string) => {
    if (!modelName.trim()) {
      showToast({
        message: '模型名称不能为空',
        status: 'error',
      });
      return;
    }

    // 检查模型是否已存在
    if (endpoint.models?.default?.includes(modelName.trim())) {
      showToast({
        message: '该模型已存在',
        status: 'error',
      });
      setNewModelName('');
      setAddingModelToEndpoint(null);
      return;
    }

    try {
      const updatedEndpoint: EndpointConfig = {
        ...endpoint,
        models: {
          ...endpoint.models,
          default: [...(endpoint.models?.default || []), modelName.trim()],
        },
      };

      await handleSave(updatedEndpoint);
      setNewModelName('');
      setAddingModelToEndpoint(null);
      showToast({
        message: '模型添加成功',
        status: 'success',
      });
    } catch (error) {
      showToast({
        message: `添加失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  // 如果显示编辑器，渲染编辑器
  if (showEditor) {
    return (
      <EndpointConfigEditor
        endpoint={editingEndpoint}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  // 显示端点列表
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">端点配置</h2>
          <p className="mt-1 text-sm text-text-secondary">
            管理自定义端点配置，这些配置将添加到 Aipyq.yaml 文件中
          </p>
        </div>
        <Button
          type="button"
          onClick={handleCreateNew}
          className="btn btn-primary relative flex items-center gap-2 rounded-lg px-3 py-2"
        >
          <Plus className="h-4 w-4" />
          添加端点配置
        </Button>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-text-secondary">
            <p className="text-sm">加载中...</p>
          </div>
        ) : customEndpoints.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
            <p className="text-sm">暂无端点配置</p>
            <p className="text-xs text-text-tertiary">
              点击右上角"添加端点配置"按钮开始创建
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {customEndpoints.map((endpoint) => {
              const models = endpoint.models?.default || [];
              const hasModels = models.length > 0 || endpoint.models?.fetch;
              const isExpanded = expandedEndpoints.has(endpoint.name);

              const toggleExpand = () => {
                setExpandedEndpoints((prev) => {
                  const next = new Set(prev);
                  if (next.has(endpoint.name)) {
                    next.delete(endpoint.name);
                  } else {
                    next.add(endpoint.name);
                  }
                  return next;
                });
              };

              return (
                <div
                  key={endpoint.name}
                  className="rounded-lg border border-border-light bg-surface-secondary"
                >
                  <div className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-surface-hover">
                    <button
                      type="button"
                      onClick={toggleExpand}
                      className="flex flex-1 items-center gap-2 text-left"
                    >
                      <ChevronDown
                        className={cn(
                          'h-4 w-4 transition-transform duration-200',
                          isExpanded && 'rotate-180',
                        )}
                      />
                      <span className="truncate font-medium text-text-primary">{endpoint.name}</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(endpoint);
                      }}
                      className="ml-2 flex items-center gap-1 rounded p-1 text-text-secondary opacity-0 transition-opacity hover:bg-surface-active group-hover:opacity-100"
                      title="设置端点配置"
                      aria-label="设置"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="border-t border-border-light bg-surface-primary px-4 py-3">
                      {hasModels ? (
                        <div className="space-y-3">
                          {models.length > 0 && (
                            <div>
                              <div className="mb-2 text-xs font-medium text-text-secondary">
                                已配置模型 ({models.length})
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {models.map((model) => (
                                  <div
                                    key={model}
                                    className="inline-flex items-center rounded-md border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-primary shadow-sm transition-colors hover:bg-surface-hover"
                                  >
                                    <span className="truncate text-text-primary">{model}</span>
                                  </div>
                                ))}
                                {addingModelToEndpoint === endpoint.name ? (
                                  <div className="inline-flex items-center gap-1.5 rounded-md border border-primary bg-primary/10 px-2.5 py-1">
                                    <input
                                      type="text"
                                      value={newModelName}
                                      onChange={(e) => setNewModelName(e.target.value)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault();
                                          handleQuickAddModel(endpoint, newModelName);
                                        } else if (e.key === 'Escape') {
                                          setNewModelName('');
                                          setAddingModelToEndpoint(null);
                                        }
                                      }}
                                      placeholder="输入模型名称"
                                      className="h-5 w-24 border-none bg-transparent text-xs font-medium text-text-primary outline-none placeholder:text-text-tertiary"
                                      autoFocus
                                    />
                                    <button
                                      type="button"
                                      onClick={() => handleQuickAddModel(endpoint, newModelName)}
                                      className="flex h-4 w-4 items-center justify-center rounded text-primary hover:bg-primary/20"
                                      title="确认添加"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setNewModelName('');
                                        setAddingModelToEndpoint(null);
                                      }}
                                      className="flex h-4 w-4 items-center justify-center rounded text-text-secondary hover:bg-surface-hover"
                                      title="取消"
                                    >
                                      <span className="text-xs">×</span>
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setAddingModelToEndpoint(endpoint.name);
                                      setNewModelName('');
                                    }}
                                    className="inline-flex items-center gap-1 rounded-md border border-dashed border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                                    title="添加模型"
                                  >
                                    <Plus className="h-3 w-3" />
                                    <span>添加模型</span>
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                          {endpoint.models?.fetch && (
                            <div className="flex items-center gap-2 rounded-md border border-blue-200 bg-blue-50/50 px-2.5 py-1.5 dark:border-blue-800 dark:bg-blue-900/20">
                              <div className="flex h-1.5 w-1.5 rounded-full bg-blue-500"></div>
                              <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                                自动获取模型列表
                              </span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-center rounded-lg border border-dashed border-border-subtle bg-surface-secondary py-4">
                            <span className="text-xs text-text-tertiary">暂无模型配置</span>
                          </div>
                          {addingModelToEndpoint === endpoint.name ? (
                            <div className="flex items-center gap-2 rounded-md border border-primary bg-primary/10 px-3 py-2">
                              <input
                                type="text"
                                value={newModelName}
                                onChange={(e) => setNewModelName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleQuickAddModel(endpoint, newModelName);
                                  } else if (e.key === 'Escape') {
                                    setNewModelName('');
                                    setAddingModelToEndpoint(null);
                                  }
                                }}
                                placeholder="输入模型名称"
                                className="flex-1 border-none bg-transparent text-sm font-medium text-text-primary outline-none placeholder:text-text-tertiary"
                                autoFocus
                              />
                              <button
                                type="button"
                                onClick={() => handleQuickAddModel(endpoint, newModelName)}
                                className="flex h-6 w-6 items-center justify-center rounded text-primary hover:bg-primary/20"
                                title="确认添加"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setNewModelName('');
                                  setAddingModelToEndpoint(null);
                                }}
                                className="flex h-6 w-6 items-center justify-center rounded text-text-secondary hover:bg-surface-hover"
                                title="取消"
                              >
                                <span className="text-sm">×</span>
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setAddingModelToEndpoint(endpoint.name);
                                setNewModelName('');
                              }}
                              className="w-full rounded-md border border-dashed border-border-subtle bg-surface-secondary px-3 py-2 text-xs font-medium text-text-secondary transition-colors hover:border-primary hover:bg-primary/5 hover:text-primary"
                            >
                              <Plus className="mr-1.5 inline h-3 w-3" />
                              添加模型
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

