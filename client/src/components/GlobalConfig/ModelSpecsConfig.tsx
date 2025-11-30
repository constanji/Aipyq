import React, { useMemo } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { useDrag, useDrop } from 'react-dnd';
import type { TStartupConfig, TModelSpec } from 'aipyq-data-provider';
import { useGetModelsQuery } from 'aipyq-data-provider/react-query';
import { useGetEndpointsQuery } from '~/data-provider';
import { useLocalize } from '~/hooks';
import { cn, defaultTextProps } from '~/utils';
import { Plus, Trash2, GripVertical, Eye, EyeOff } from 'lucide-react';

interface ModelSpecsConfigProps {
  startupConfig?: TStartupConfig;
}

interface ModelSpecFormData {
  modelSpecs: (TModelSpec & { visible?: boolean })[];
}

const ITEM_TYPE = 'MODEL_SPEC_ITEM';

export default function ModelSpecsConfig({ startupConfig }: ModelSpecsConfigProps) {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { data: endpointsConfig } = useGetEndpointsQuery();
  const { data: modelsData } = useGetModelsQuery();

  const initialModelSpecs = useMemo(() => {
    const specs = startupConfig?.modelSpecs?.list ?? [];
    console.log('[ModelSpecsConfig] 初始模型规格:', {
      hasStartupConfig: !!startupConfig,
      hasModelSpecs: !!startupConfig?.modelSpecs,
      modelSpecsConfig: startupConfig?.modelSpecs,
      specsCount: specs.length,
      specs,
    });
    return specs.map((spec) => ({
      ...spec,
      visible: true, // 默认显示
    }));
  }, [startupConfig?.modelSpecs?.list]);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<ModelSpecFormData>({
    defaultValues: {
      modelSpecs: initialModelSpecs,
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'modelSpecs',
  });

  const availableEndpoints = useMemo(() => {
    if (!endpointsConfig) return [];
    return Object.keys(endpointsConfig).filter(
      (key) => key !== 'agents' && key !== 'assistants' && key !== 'azureAssistants',
    );
  }, [endpointsConfig]);

  // 获取已配置的端点信息（通过 watch 所有字段）
  const watchedModelSpecs = useWatch({
    control,
    name: 'modelSpecs',
  });

  const configuredEndpoints = useMemo(() => {
    const endpointMap = new Map<string, { count: number; models: string[] }>();

    // 先填充所有可用端点，确保界面显示
    availableEndpoints.forEach((endpoint) => {
      endpointMap.set(endpoint, { count: 0, models: [] });
    });

    if (watchedModelSpecs) {
      watchedModelSpecs.forEach((spec) => {
        const endpoint = spec?.preset?.endpoint;
        const model = spec?.preset?.model;
        if (endpoint) {
          if (!endpointMap.has(endpoint)) {
            endpointMap.set(endpoint, { count: 0, models: [] });
          }
          const info = endpointMap.get(endpoint)!;
          info.count++;
          if (model && !info.models.includes(model)) {
            info.models.push(model);
          }
        }
      });
    }

    return Array.from(endpointMap.entries()).map(([endpoint, info]) => {
      const fallbackModels = modelsData?.[endpoint] ?? [];
      const models = info.models.length > 0 ? info.models : fallbackModels;
      return {
        endpoint,
        count: info.count,
        models,
      };
    });
  }, [watchedModelSpecs, availableEndpoints, modelsData]);

  const onSubmit = async (data: ModelSpecFormData) => {
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;
      
      // 过滤掉 visible: false 的项（不显示的）
      const modelSpecsToSave = data.modelSpecs
        .filter((spec) => spec.visible !== false)
        .map(({ visible, ...spec }) => spec);

      const response = await fetch(`${apiBase}/api/config/modelSpecs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ modelSpecs: modelSpecsToSave }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '保存失败');
      }

      showToast({
        message: '配置保存成功',
        status: 'success',
      });
    } catch (error) {
      showToast({
        message: `保存失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  const addNewModelSpec = () => {
    append({
      name: `model-spec-${Date.now()}`,
      label: '新模型规格',
      preset: {
        endpoint: availableEndpoints[0] || 'openAI',
        model: '',
      },
      order: fields.length,
      visible: true,
    });
  };

  const moveItem = (dragIndex: number, hoverIndex: number) => {
    move(dragIndex, hoverIndex);
  };

  return (
    <div className="flex h-full flex-col">
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">模型规格列表</h2>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={addNewModelSpec}
              className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              <Plus className="h-4 w-4" />
              添加模型规格
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              className="btn btn-primary relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              保存配置
            </Button>
          </div>
        </div>

        {/* 已配置的端点信息 */}
        {configuredEndpoints.length > 0 && (
          <div className="mb-4 rounded-lg border border-border-light bg-surface-secondary p-3">
            <h3 className="mb-2 text-sm font-semibold">已配置的端点</h3>
            <div className="flex flex-wrap gap-2">
              {configuredEndpoints.map(({ endpoint, count, models }) => (
                <div
                  key={endpoint}
                  className="rounded bg-surface-primary px-2 py-1 text-xs"
                >
                  <span className="font-medium">{endpoint}</span>
                  <span className="text-text-secondary ml-1">
                    ({count} 个规格{models.length > 0 ? `, ${models.length} 个模型` : ''})
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex-1 overflow-auto">
          <div className="space-y-3">
            {fields.map((field, index) => (
              <DraggableModelSpecItem
                key={field.id}
                index={index}
                control={control}
                availableEndpoints={availableEndpoints}
                modelsData={modelsData}
                endpointsConfig={endpointsConfig}
                onRemove={() => remove(index)}
                moveItem={moveItem}
              />
            ))}
            {fields.length === 0 && (
              <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
                <p className="text-sm">暂无模型规格配置</p>
                <p className="text-xs text-text-tertiary">
                  {startupConfig?.modelSpecs
                    ? '配置文件中没有 modelSpecs 列表，请添加模型规格'
                    : '配置文件未加载或没有 modelSpecs 配置'}
                </p>
                <Button
                  type="button"
                  onClick={addNewModelSpec}
                  className="btn btn-neutral border-token-border-light relative mt-2 flex items-center gap-2 rounded-lg px-3 py-2"
                >
                  <Plus className="h-4 w-4" />
                  添加第一个模型规格
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

interface DraggableModelSpecItemProps {
  index: number;
  control: any;
  availableEndpoints: string[];
  modelsData?: Record<string, string[]>;
  endpointsConfig?: any;
  onRemove: () => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableModelSpecItem({
  index,
  control,
  availableEndpoints,
  modelsData,
  endpointsConfig,
  onRemove,
  moveItem,
}: DraggableModelSpecItemProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ITEM_TYPE,
    hover: (item: { index: number }) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <ModelSpecItem
      ref={ref}
      index={index}
      control={control}
      availableEndpoints={availableEndpoints}
      modelsData={modelsData}
      endpointsConfig={endpointsConfig}
      onRemove={onRemove}
      isDragging={isDragging}
    />
  );
}

interface ModelSpecItemProps {
  index: number;
  control: any;
  availableEndpoints: string[];
  modelsData?: Record<string, string[]>;
  endpointsConfig?: any;
  onRemove: () => void;
  isDragging: boolean;
}

const ModelSpecItem = React.forwardRef<HTMLDivElement, ModelSpecItemProps>(
  (
    {
      index,
      control,
      availableEndpoints,
      modelsData,
      endpointsConfig,
      onRemove,
      isDragging,
    },
    ref,
  ) => {
    const localize = useLocalize();
    const endpoint = useWatch({
      control,
      name: `modelSpecs.${index}.preset.endpoint`,
    });

    const availableModels = useMemo(() => {
      if (!endpoint || !modelsData) return [];
      return modelsData[endpoint] ?? [];
    }, [endpoint, modelsData]);

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg border border-border-light bg-surface-primary p-4 transition-opacity',
          isDragging && 'opacity-50',
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GripVertical className="h-5 w-5 cursor-move text-text-secondary" />
            <span className="text-sm font-medium text-text-secondary">#{index + 1}</span>
            <Controller
              name={`modelSpecs.${index}.visible`}
              control={control}
              render={({ field }) => (
                <button
                  type="button"
                  onClick={() => field.onChange(!field.value)}
                  className="ml-2 rounded p-1 hover:bg-surface-secondary"
                  aria-label={field.value ? '隐藏' : '显示'}
                  title={field.value ? '点击隐藏' : '点击显示'}
                >
                  {field.value !== false ? (
                    <Eye className="h-4 w-4 text-green-500" />
                  ) : (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              )}
            />
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="rounded p-1 text-red-500 hover:bg-surface-secondary"
            aria-label="删除"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-2 block text-sm font-medium">名称 (name)</label>
            <Controller
              name={`modelSpecs.${index}.name`}
              control={control}
              rules={{ required: '名称是必需的' }}
              render={({ field }) => (
                <input
                  {...field}
                  className={cn(defaultTextProps, 'w-full')}
                  placeholder="模型规格名称"
                />
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">标签 (label)</label>
            <Controller
              name={`modelSpecs.${index}.label`}
              control={control}
              rules={{ required: '标签是必需的' }}
              render={({ field }) => (
                <input
                  {...field}
                  className={cn(defaultTextProps, 'w-full')}
                  placeholder="显示标签"
                />
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">端点 (endpoint)</label>
            <Controller
              name={`modelSpecs.${index}.preset.endpoint`}
              control={control}
              rules={{ required: '端点是必需的' }}
              render={({ field }) => (
                <select {...field} className={cn(defaultTextProps, 'w-full')}>
                  {availableEndpoints.map((ep) => (
                    <option key={ep} value={ep}>
                      {ep}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">模型 (model)</label>
            <Controller
              name={`modelSpecs.${index}.preset.model`}
              control={control}
              rules={{ required: '模型是必需的' }}
              render={({ field }) => (
                <select {...field} className={cn(defaultTextProps, 'w-full')}>
                  <option value="">选择模型</option>
                  {availableModels.map((model) => (
                    <option key={model} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">排序 (order)</label>
            <Controller
              name={`modelSpecs.${index}.order`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={cn(defaultTextProps, 'w-full')}
                  placeholder="排序值"
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 0)}
                />
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">默认</label>
            <Controller
              name={`modelSpecs.${index}.default`}
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
          </div>

          <div className="col-span-2">
            <label className="mb-2 block text-sm font-medium">描述 (description)</label>
            <Controller
              name={`modelSpecs.${index}.description`}
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  className={cn(defaultTextProps, 'w-full')}
                  rows={2}
                  placeholder="模型规格描述"
                />
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">分组 (group)</label>
            <Controller
              name={`modelSpecs.${index}.group`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={cn(defaultTextProps, 'w-full')}
                  placeholder="分组名称（可选）"
                />
              )}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">图标 URL (iconURL)</label>
            <Controller
              name={`modelSpecs.${index}.iconURL`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  className={cn(defaultTextProps, 'w-full')}
                  placeholder="图标 URL（可选）"
                />
              )}
            />
          </div>
        </div>
      </div>
    );
  },
);

ModelSpecItem.displayName = 'ModelSpecItem';
