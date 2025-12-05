import React, { useState, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useForm, Controller } from 'react-hook-form';
import { useLocalize } from '~/hooks';
import { cn, defaultTextProps } from '~/utils';
import { X } from 'lucide-react';

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

interface MCPConfigEditorProps {
  server?: MCPServerConfig;
  onSave: (server: MCPServerConfig) => Promise<void>;
  onCancel: () => void;
}

export default function MCPConfigEditor({
  server,
  onSave,
  onCancel,
}: MCPConfigEditorProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<MCPServerConfig>({
    defaultValues: server || {
      serverName: '',
      config: {
        type: 'streamable-http',
        url: '',
        chatMenu: true,
        startup: false,
        customUserVars: {},
      },
    },
  });

  useEffect(() => {
    if (server) {
      reset(server);
    }
  }, [server, reset]);

  const onSubmit = async (data: MCPServerConfig) => {
    try {
      await onSave(data);
      showToast({
        message: server ? 'MCP服务器配置更新成功' : 'MCP服务器配置创建成功',
        status: 'success',
      });
    } catch (error) {
      showToast({
        message: `保存失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {server ? '编辑MCP服务器配置' : '创建MCP服务器配置'}
          </h3>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              取消
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className="btn btn-primary relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              {isSubmitting ? '保存中...' : '保存'}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="space-y-6">
            {/* 必要信息 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-6">
              <h4 className="mb-6 text-base font-semibold text-text-primary">必要信息</h4>
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    服务器名称 <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="serverName"
                    control={control}
                    rules={{ required: '服务器名称是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        disabled={!!server}
                        className={cn(defaultTextProps, 'w-full', server && 'bg-surface-secondary')}
                        placeholder="例如：my-mcp-server"
                      />
                    )}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    {server ? '服务器名称不可修改' : '用于标识此MCP服务器的唯一名称'}
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    类型 <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="config.type"
                    control={control}
                    rules={{ required: '类型是必需的' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                      >
                        <option value="streamable-http">streamable-http</option>
                        <option value="stdio">stdio</option>
                        <option value="sse">sse</option>
                      </select>
                    )}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    MCP服务器的连接类型
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    URL <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="config.url"
                    control={control}
                    rules={{ required: 'URL是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="https://mcp.example.com/mcp"
                      />
                    )}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    MCP服务器的连接地址
                  </p>
                </div>
              </div>
            </div>

            {/* 可选配置 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-6">
              <h4 className="mb-6 text-base font-semibold text-text-primary">可选配置</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Controller
                    name="config.chatMenu"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value ?? true}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-border-light text-primary focus:ring-2 focus:ring-primary"
                      />
                    )}
                  />
                  <label className="text-sm font-medium text-text-primary">
                    在聊天菜单中显示 (chatMenu)
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name="config.startup"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value ?? false}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-border-light text-primary focus:ring-2 focus:ring-primary"
                      />
                    )}
                  />
                  <label className="text-sm font-medium text-text-primary">
                    启动时自动连接 (startup)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

