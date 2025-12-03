import React, { useState, useMemo, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useGetStartupConfig } from '~/data-provider';
import { useLocalize, useAuthContext } from '~/hooks';
import { cn } from '~/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';
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
          <h2 className="text-lg font-semibold">端点配置</h2>
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
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {customEndpoints.map((endpoint) => (
              <div
                key={endpoint.name}
                className="relative flex flex-col rounded-lg border border-border-subtle bg-surface-primary p-4"
              >
                {/* 编辑按钮 */}
                <div className="absolute right-2 top-2 flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleEdit(endpoint)}
                    className="rounded p-1.5 text-text-secondary hover:bg-surface-hover"
                    title="编辑端点配置"
                    aria-label="编辑"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(endpoint.name)}
                    className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    title="删除端点配置"
                    aria-label="删除"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="mb-2 pr-16">
                  <h4 className="text-base font-semibold text-text-primary">{endpoint.name}</h4>
                  {endpoint.modelDisplayLabel && (
                    <p className="mt-1 text-xs text-text-secondary">
                      显示标签: {endpoint.modelDisplayLabel}
                    </p>
                  )}
                </div>

                <div className="mt-2 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <span className="font-medium">Base URL:</span>
                    <span className="truncate text-xs">{endpoint.baseURL}</span>
                  </div>

                  {endpoint.models?.default && endpoint.models.default.length > 0 && (
                    <div>
                      <span className="font-medium text-text-secondary">模型列表:</span>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {endpoint.models.default.slice(0, 3).map((model) => (
                          <span
                            key={model}
                            className="rounded-full bg-surface-secondary px-2 py-0.5 text-[11px] text-text-primary"
                          >
                            {model}
                          </span>
                        ))}
                        {endpoint.models.default.length > 3 && (
                          <span className="text-[11px] text-text-tertiary">
                            +{endpoint.models.default.length - 3} 更多
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {endpoint.models?.fetch && (
                    <div className="text-xs text-text-secondary">
                      <span className="font-medium">自动获取模型列表</span>
                    </div>
                  )}

                  {endpoint.titleConvo && (
                    <div className="text-xs text-text-secondary">
                      <span className="font-medium">启用标题对话</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

