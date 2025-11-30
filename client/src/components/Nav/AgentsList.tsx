import React, { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bot } from 'lucide-react';
import { useListAgentsQuery } from '~/data-provider';
import { useLocalize, useAgentDefaultPermissionLevel } from '~/hooks';
import { cn } from '~/utils';
import type { Agent } from 'aipyq-data-provider';

interface AgentsListProps {
  toggleNav?: () => void;
}

export default function AgentsList({ toggleNav }: AgentsListProps) {
  const localize = useLocalize();
  const navigate = useNavigate();
  const location = useLocation();
  const permissionLevel = useAgentDefaultPermissionLevel();
  
  // 只获取公开的智能体（管理员选择展示的）
  const { data: agentsResponse } = useListAgentsQuery(
    { requiredPermission: permissionLevel },
    {
      select: (res) => ({
        ...res,
        // 只显示公开的智能体（isPublic: true）
        data: res.data.filter((agent) => agent.isPublic === true),
      }),
    },
  );

  const agents = useMemo(() => agentsResponse?.data ?? [], [agentsResponse]);

  const handleAgentClick = (agent: Agent) => {
    // 导航到新对话，并设置智能体
    // 使用 URL 参数传递 agent_id（与 useQueryParams 保持一致）
    navigate(`/c/new?agent_id=${agent.id}`, {
      state: {
        agentId: agent.id,
        agentName: agent.name,
      },
    });
    if (toggleNav) {
      toggleNav();
    }
  };

  return (
    <div className="mb-4 border-t border-border-light pt-4">
      <div className="mb-2 px-2">
        <h2 className="text-sm font-semibold text-text-secondary">智能体</h2>
      </div>
      <div className="rounded-lg border border-border-light bg-surface-secondary p-2">
        {agents.length === 0 ? (
          <div className="py-2 text-center text-xs text-text-tertiary">
            暂无可用智能体
          </div>
        ) : (
          <div className="space-y-1">
        {agents.map((agent) => {
          const isActive = location.pathname.includes(`/c/`) && 
            location.state?.agentId === agent.id;
          
          return (
            <button
              key={agent.id}
              onClick={() => handleAgentClick(agent)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors',
                'hover:bg-surface-hover',
                isActive && 'bg-surface-active text-text-primary',
                !isActive && 'text-text-secondary',
              )}
              aria-label={agent.name}
            >
              <div className="flex-shrink-0">
                {agent.icon ? (
                  <img
                    src={agent.icon}
                    alt={agent.name}
                    className="h-5 w-5 rounded"
                  />
                ) : (
                  <Bot className="h-5 w-5" />
                )}
              </div>
              <span className="flex-1 truncate text-sm font-medium">{agent.name}</span>
            </button>
          );
        })}
          </div>
        )}
      </div>
    </div>
  );
}

