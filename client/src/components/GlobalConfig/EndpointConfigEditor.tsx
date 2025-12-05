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
  const [editingModelIndex, setEditingModelIndex] = useState<number | null>(null);
  const [editingModelValue, setEditingModelValue] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting, isDirty },
    reset,
    watch,
    setValue,
  } = useForm<EndpointConfig>({
    defaultValues: endpoint || {
      name: '',
      apiKey: '',
      baseURL: '',
      models: {
        default: [],
        fetch: false,
      },
      titleConvo: true, // 默认启用
      modelDisplayLabel: '', // 默认与端点名相同
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
      reset({
        ...endpoint,
        titleConvo: endpoint.titleConvo ?? true, // 默认启用
        modelDisplayLabel: endpoint.modelDisplayLabel || endpoint.name, // 默认与端点名相同
      });
    }
  }, [endpoint, reset]);

  const onSubmit = async (data: EndpointConfig) => {
    try {
      // 确保 titleConvo 默认启用，modelDisplayLabel 与端点名相同
      const submitData: EndpointConfig = {
        ...data,
        titleConvo: true,
        modelDisplayLabel: data.name, // 显示标签与端点名相同
      };
      await onSave(submitData);
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
          <div className="space-y-6">
            {/* 必要信息 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-6">
              <h4 className="mb-6 text-base font-semibold text-text-primary">必要信息</h4>
              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    端点名称 <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: '名称是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="例如：deepseek"
                      />
                    )}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    用于标识此端点配置的唯一名称
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    API Key <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="apiKey"
                    control={control}
                    rules={{ required: 'API Key 是必需的' }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={cn(defaultTextProps, 'w-full')}
                        placeholder="${DEEP_SEEK_API_KEY}"
                      />
                    )}
                  />
                  <p className="mt-1.5 text-xs text-text-secondary">
                    支持环境变量格式，如 <code className="rounded bg-surface-secondary px-1 py-0.5 text-[11px]">${'{'}DEEP_SEEK_API_KEY{'}'}</code>
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-text-primary">
                    Base URL <span className="text-red-500">*</span>
                  </label>
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
                  <p className="mt-1.5 text-xs text-text-secondary">
                    API 服务的基础地址，通常以 <code className="rounded bg-surface-secondary px-1 py-0.5 text-[11px]">/v1</code> 结尾
                  </p>
                </div>
              </div>
            </div>

            {/* 模型配置 */}
            <div className="rounded-lg border border-border-light bg-surface-primary p-6">
              <div className="mb-6 flex items-center justify-between">
                <h4 className="text-base font-semibold text-text-primary">模型配置</h4>
                <Button
                  type="button"
                  onClick={() => appendModel('')}
                  className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  添加模型
                </Button>
              </div>

              <div className="mb-5 rounded-lg border border-border-subtle bg-surface-secondary p-3">
                <label className="flex items-center gap-2 text-sm font-medium text-text-primary">
                  <Controller
                    name="models.fetch"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        checked={field.value || false}
                        onChange={field.onChange}
                        className="h-4 w-4 rounded border-border-light text-primary focus:ring-2 focus:ring-primary"
                      />
                    )}
                  />
                  自动获取模型列表
                </label>
                <p className="mt-1.5 ml-6 text-xs text-text-secondary">
                  启用后将从 API 自动获取可用模型列表
                </p>
              </div>

              <div className="space-y-3">
                {modelFields.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {modelFields.map((field, index) => {
                      const isEditing = editingModelIndex === index;
                      return (
                        <div
                          key={field.id}
                          className="group relative inline-flex items-center gap-1 rounded-md border border-border-subtle bg-surface-secondary px-2.5 py-1 text-xs font-medium text-text-primary shadow-sm transition-colors hover:bg-surface-hover"
                        >
                          {isEditing ? (
                            <input
                              type="text"
                              value={editingModelValue}
                              onChange={(e) => setEditingModelValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  if (editingModelValue.trim()) {
                                    // 更新模型名称
                                    const currentValues = watch('models.default');
                                    const updated = [...currentValues];
                                    updated[index] = editingModelValue.trim();
                                    setValue('models.default', updated, { shouldDirty: true });
                                  }
                                  setEditingModelIndex(null);
                                  setEditingModelValue('');
                                } else if (e.key === 'Escape') {
                                  setEditingModelIndex(null);
                                  setEditingModelValue('');
                                }
                              }}
                              onBlur={() => {
                                if (editingModelValue.trim()) {
                                  const currentValues = watch('models.default');
                                  const updated = [...currentValues];
                                  updated[index] = editingModelValue.trim();
                                  setValue('models.default', updated, { shouldDirty: true });
                                }
                                setEditingModelIndex(null);
                                setEditingModelValue('');
                              }}
                              className="h-5 w-24 border-none bg-transparent p-0 text-xs font-medium text-text-primary outline-none"
                              autoFocus
                            />
                          ) : (
                            <>
                              <Controller
                                name={`models.default.${index}`}
                                control={control}
                                render={({ field }) => (
                                  <span
                                    onClick={() => {
                                      setEditingModelIndex(index);
                                      setEditingModelValue(field.value || '');
                                    }}
                                    className="cursor-text truncate"
                                    title="点击编辑"
                                  >
                                    {field.value || '未命名模型'}
                                  </span>
                                )}
                              />
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeModel(index);
                                }}
                                className="ml-1 flex h-3.5 w-3.5 items-center justify-center rounded text-text-secondary opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                                aria-label="删除模型"
                                title="删除此模型"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border-subtle bg-surface-secondary p-4 text-center">
                    <p className="text-sm text-text-secondary">暂无模型配置</p>
                    <p className="mt-1 text-xs text-text-tertiary">
                      点击上方"添加模型"按钮开始添加
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

