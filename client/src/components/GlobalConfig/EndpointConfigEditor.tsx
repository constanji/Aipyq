import React, { useState, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { useLocalize } from '~/hooks';
import { cn, defaultTextProps } from '~/utils';
import { X, Plus } from 'lucide-react';

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

interface EndpointConfigEditorProps {
  endpoint?: EndpointConfig;
  onSave: (endpoint: EndpointConfig) => Promise<void>;
  onCancel: () => void;
}

export default function EndpointConfigEditor({
  endpoint,
  onSave,
  onCancel,
}: EndpointConfigEditorProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
  } = useForm<EndpointConfig>({
    defaultValues: endpoint || {
      name: '',
      apiKey: '',
      baseURL: '',
      models: {
        default: [],
        fetch: false,
      },
      titleConvo: false,
    },
  });

  const {
    fields: modelFields,
    append: appendModel,
    remove: removeModel,
  } = useFieldArray({
    control,
    name: 'models.default',
  });

  useEffect(() => {
    if (endpoint) {
      reset(endpoint);
    }
  }, [endpoint, reset]);

  const onSubmit = async (data: EndpointConfig) => {
    try {
      await onSave(data);
      showToast({
        message: endpoint ? '端点配置更新成功' : '端点配置创建成功',
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
            {endpoint ? '编辑端点配置' : '创建端点配置'}
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
          <div className="space-y-4">
            {/* 基本信息 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-4">
              <h4 className="mb-4 text-base font-semibold">基本信息</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">名称 (name) *</label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: '名称是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="端点名称，如 deepseek"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">API Key *</label>
                  <Controller
                    name="apiKey"
                    control={control}
                    rules={{ required: 'API Key 是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="${DEEP_SEEK_API_KEY}"
                      />
                    )}
                  />
                  <p className="mt-1 text-xs text-text-secondary">
                    支持环境变量，如 ${'{'}DEEP_SEEK_API_KEY{'}'}
                  </p>
                </div>

                <div className="col-span-2">
                  <label className="mb-2 block text-sm font-medium">Base URL *</label>
                  <Controller
                    name="baseURL"
                    control={control}
                    rules={{ required: 'Base URL 是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="https://api.deepseek.com/v1"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* 模型配置 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-4">
              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-base font-semibold">模型配置</h4>
                <Button
                  type="button"
                  onClick={() => appendModel('')}
                  className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-2 py-1 text-sm"
                >
                  <Plus className="h-3 w-3" />
                  添加模型
                </Button>
              </div>

              <div className="mb-4">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                  <Controller
                    name="models.fetch"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    )}
                  />
                  自动获取模型列表 (fetch)
                </label>
              </div>

              <div className="space-y-2">
                {modelFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <Controller
                      name={`models.default.${index}`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          className={cn(defaultTextProps, 'flex-1')}
                          placeholder="模型名称，如 deepseek-chat"
                        />
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => removeModel(index)}
                      className="rounded p-1 text-red-500 hover:bg-surface-secondary"
                      aria-label="删除模型"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {modelFields.length === 0 && (
                  <p className="text-sm text-text-secondary">暂无模型，点击"添加模型"添加</p>
                )}
              </div>
            </div>

            {/* 可选配置 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-4">
              <h4 className="mb-4 text-base font-semibold">可选配置</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">模型显示标签</label>
                  <Controller
                    name="modelDisplayLabel"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="Deepseek"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">标题模型</label>
                  <Controller
                    name="titleModel"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="deepseek-chat"
                      />
                    )}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">图标 URL</label>
                  <Controller
                    name="iconURL"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="/assets/icon.svg"
                      />
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name="titleConvo"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    )}
                  />
                  <label className="text-sm font-medium">启用标题对话 (titleConvo)</label>
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name="forceStringContent"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    )}
                  />
                  <label className="text-sm font-medium">强制字符串内容 (forceStringContent)</label>
                </div>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-sm font-medium">需要删除的参数 (dropParams)</label>
                <Controller
                  name="dropParams"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      value={field.value?.join(', ') || ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(
                          value ? value.split(',').map((s) => s.trim()).filter(Boolean) : [],
                        );
                      }}
                      className={cn(defaultTextProps, 'w-full')}
                      placeholder="stop, temperature (用逗号分隔)"
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

