import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, EyeOff, List, Grid } from 'lucide-react';
import { Button, useToastContext } from '@aipyq/client';
import { SystemRoles, ResourceType, AccessRoleIds } from 'aipyq-data-provider';
import { useListAgentsQuery, useDeleteAgentMutation } from '~/data-provider';
import { useUpdateResourcePermissionsMutation } from 'aipyq-data-provider/react-query';
import { dataService } from 'aipyq-data-provider';
import { useAuthContext, useLocalize, useAgentDefaultPermissionLevel } from '~/hooks';
import { AgentPanelProvider, useAgentPanelContext } from '~/Providers/AgentPanelContext';
import { AgentPanelSwitchWithContext } from '~/components/SidePanel/Agents/AgentPanelSwitch';
import { cn } from '~/utils';
import { getAgentAvatarUrl } from '~/utils/agents';
import type { Agent } from 'aipyq-data-provider';

// 包装组件，用于在编辑模式下设置agent_id
function AgentPanelProviderWithAgentId({
  agentId,
  children,
}: {
  agentId?: string;
  children: React.ReactNode;
}) {
  return (
    <AgentPanelProvider>
      <AgentIdSetter agentId={agentId}>{children}</AgentIdSetter>
    </AgentPanelProvider>
  );
}

function AgentIdSetter({
  agentId,
  children,
}: {
  agentId?: string;
  children: React.ReactNode;
}) {
  const { setCurrentAgentId } = useAgentPanelContext();
  const previousAgentIdRef = useRef<string | undefined | null>(null);

  useEffect(() => {
    // 如果 agentId 没有变化，不需要更新
    if (agentId === previousAgentIdRef.current) {
      return;
    }

    // 记录当前值
    const previousValue = previousAgentIdRef.current;
    previousAgentIdRef.current = agentId ?? null;

    if (agentId) {
      // 有 agentId：设置它（如果是新值，先清除再设置以确保重新加载）
      if (previousValue !== null) {
        // 从另一个值切换过来，先清除再设置
        setCurrentAgentId(undefined);
        setTimeout(() => {
          setCurrentAgentId(agentId);
        }, 0);
      } else {
        // 首次设置
        setCurrentAgentId(agentId);
      }
    } else {
      // agentId 为 undefined：清除（用于创建新智能体）
      setCurrentAgentId(undefined);
    }
  }, [agentId, setCurrentAgentId]);

  return <>{children}</>;
}

export default function AgentsManagement() {
  const localize = useLocalize();
  const { showToast } = useToastContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const permissionLevel = useAgentDefaultPermissionLevel();
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | undefined>(undefined);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');

  // 获取所有智能体（管理员可以看到所有）
  const { data: agentsResponse, refetch } = useListAgentsQuery(
    { requiredPermission: permissionLevel },
    {
      select: (res) => res.data,
    },
  );

  const agents = useMemo(() => agentsResponse ?? [], [agentsResponse]);

  const deleteMutation = useDeleteAgentMutation({
    onSuccess: () => {
      showToast({
        message: '智能体删除成功',
        status: 'success',
      });
      refetch();
      if (editingAgentId) {
        setEditingAgentId(undefined);
        setShowBuilder(false);
      }
    },
    onError: (error) => {
      showToast({
        message: `删除失败: ${error.message}`,
        status: 'error',
      });
    },
  });

  // 使用权限API来更新isPublic状态
  const updatePermissionsMutation = useUpdateResourcePermissionsMutation();

  const handleDelete = (agentId: string) => {
    if (confirm('确定要删除这个智能体吗？此操作无法撤销。')) {
      deleteMutation.mutate(agentId);
    }
  };

  const handleEdit = (agentId: string) => {
    // 先设置 showBuilder，然后设置 editingAgentId，确保组件正确初始化
    setShowBuilder(true);
    // 使用 setTimeout 确保组件已经挂载后再设置 agentId
    setTimeout(() => {
      setEditingAgentId(agentId);
    }, 0);
  };

  const handleCreateNew = () => {
    setEditingAgentId(undefined);
    setShowBuilder(true);
  };

  const handleBackToList = () => {
    setShowBuilder(false);
    setEditingAgentId(undefined);
    refetch();
  };

  const handleTogglePublic = async (agent: Agent) => {
    try {
      // 使用dataService获取agent的完整信息（包含_id），这样可以正确传递认证信息
      const fullAgent = await dataService.getExpandedAgentById({
        agent_id: agent.id,
      });
      
      if (!fullAgent?._id) {
        showToast({
          message: '无法获取智能体数据库ID',
          status: 'error',
        });
        return;
      }

      await updatePermissionsMutation.mutateAsync({
        resourceType: ResourceType.AGENT,
        resourceId: fullAgent._id,
        data: {
          updated: [],
          removed: [],
          public: !agent.isPublic,
          publicAccessRoleId: !agent.isPublic ? AccessRoleIds.AGENT_VIEWER : undefined,
        },
      });

      showToast({
        message: agent.isPublic ? '已隐藏智能体' : '已展示智能体',
        status: 'success',
      });
      refetch();
    } catch (error) {
      showToast({
        message: `操作失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    }
  };

  // 如果显示构建器，渲染构建器界面
  if (showBuilder) {
    return (
      <AgentPanelProviderWithAgentId agentId={editingAgentId}>
        <div className="flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {editingAgentId ? '编辑智能体' : '创建新智能体'}
            </h3>
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToList}
              className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
            >
              返回列表
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            {/* 在管理界面禁用自动从 conversation 同步 agent_id，使用内部组件避免嵌套 Provider */}
            <AgentPanelSwitchWithContext autoSyncFromConversation={false} />
          </div>
        </div>
      </AgentPanelProviderWithAgentId>
    );
  }

  // 显示智能体列表
  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">智能体列表</h3>
          <p className="mt-1 text-sm text-text-secondary">
            管理所有智能体，设置是否展示给用户
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
              title="简略视图"
              aria-label="简略视图"
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
            创建智能体
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {agents.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-text-secondary">
            <div className="text-center">
              <p className="text-sm">暂无智能体</p>
              <p className="mt-2 text-xs text-text-tertiary">
                点击右上角"创建智能体"按钮开始创建
              </p>
            </div>
          </div>
        ) : (
          <div className={cn('space-y-2', viewMode === 'compact' && 'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3')}>
            {agents.map((agent) => (
              <AgentListItem
                key={agent.id}
                agent={agent}
                viewMode={viewMode}
                onEdit={() => handleEdit(agent.id)}
                onDelete={() => handleDelete(agent.id)}
                onTogglePublic={() => handleTogglePublic(agent)}
                isUpdating={updatePermissionsMutation.isLoading}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface AgentListItemProps {
  agent: Agent;
  viewMode: 'detailed' | 'compact';
  onEdit: () => void;
  onDelete: () => void;
  onTogglePublic: () => void;
  isUpdating?: boolean;
}

function AgentListItem({ agent, viewMode, onEdit, onDelete, onTogglePublic, isUpdating }: AgentListItemProps) {
  const avatarUrl = getAgentAvatarUrl(agent);
  
  if (viewMode === 'compact') {
    return (
      <div className="relative rounded-lg border border-border-light bg-surface-primary p-3 pr-10 pt-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={agent.name || '智能体'}
                className="h-12 w-12 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
                <span className="text-xl">🤖</span>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-text-primary line-clamp-1">{agent.name}</h4>
            {agent.description && (
              <p className="mt-1 line-clamp-2 text-xs text-text-secondary">
                {agent.description}
              </p>
            )}
          </div>
        </div>
        <div className="absolute right-2 top-2 flex items-center gap-1">
          {/* 是否展示给用户 */}
          <button
            type="button"
            onClick={onTogglePublic}
            disabled={isUpdating}
            className={cn(
              'rounded p-1.5 transition-colors',
              agent.isPublic
                ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
              isUpdating && 'opacity-50 cursor-not-allowed',
            )}
            title={agent.isPublic ? '已展示给用户（点击隐藏）' : '未展示给用户（点击显示）'}
            aria-label={agent.isPublic ? '隐藏' : '显示'}
          >
            {agent.isPublic ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4" />
            )}
          </button>
          {/* 编辑按钮 */}
          <button
            type="button"
            onClick={onEdit}
            className="rounded p-1.5 text-text-secondary hover:bg-surface-hover"
            title="编辑智能体"
            aria-label="编辑"
          >
            <Edit className="h-4 w-4" />
          </button>
          {/* 删除按钮 */}
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="删除智能体"
            aria-label="删除"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  // 详细视图
  return (
    <div className="rounded-lg border border-border-light bg-surface-primary p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={agent.name || '智能体'}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary">
                  <span className="text-lg">🤖</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-semibold text-text-primary">{agent.name}</h4>
              {agent.description && (
                <p className="mt-1 line-clamp-2 text-sm text-text-secondary">
                  {agent.description}
                </p>
              )}
              <div className="mt-2 flex items-center gap-4 text-xs text-text-tertiary">
                <span>ID: {agent.id}</span>
                {agent.category && <span>分类: {agent.category}</span>}
              </div>
            </div>
          </div>
        </div>
        <div className="ml-4 flex items-center gap-2">
          {/* 是否展示给用户 */}
          <button
            type="button"
            onClick={onTogglePublic}
            disabled={isUpdating}
            className={cn(
              'rounded p-2 transition-colors',
              agent.isPublic
                ? 'text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20'
                : 'text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800',
              isUpdating && 'opacity-50 cursor-not-allowed',
            )}
            title={agent.isPublic ? '已展示给用户（点击隐藏）' : '未展示给用户（点击显示）'}
            aria-label={agent.isPublic ? '隐藏' : '显示'}
          >
            {agent.isPublic ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
          {/* 编辑按钮 */}
          <button
            type="button"
            onClick={onEdit}
            className="rounded p-2 text-text-secondary hover:bg-surface-hover"
            title="编辑智能体"
            aria-label="编辑"
          >
            <Edit className="h-5 w-5" />
          </button>
          {/* 删除按钮 */}
          <button
            type="button"
            onClick={onDelete}
            className="rounded p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            title="删除智能体"
            aria-label="删除"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
