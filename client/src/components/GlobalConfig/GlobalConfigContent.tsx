import React, { useState } from 'react';
import type { TStartupConfig } from 'aipyq-data-provider';
import { useGetStartupConfig } from '~/data-provider';
import { cn } from '~/utils';
import ModelSpecsConfig from './ModelSpecsConfig';
import AgentsManagement from './AgentsManagement';
import MCPManagement from './MCPManagement';
import EndpointsConfig from './EndpointsConfig';
import UsersManagement from './UsersManagement';

interface GlobalConfigContentProps {
  startupConfig?: TStartupConfig;
}

type TabType = 'modelSpecs' | 'agents' | 'mcp' | 'users';

export default function GlobalConfigContent({ startupConfig: propStartupConfig }: GlobalConfigContentProps) {
  const { data: startupConfigFromQuery } = useGetStartupConfig();
  const startupConfig = propStartupConfig || startupConfigFromQuery;
  const [activeTab, setActiveTab] = useState<TabType>('modelSpecs');

  const tabs: { id: TabType; label: string; description: string }[] = [
    {
      id: 'modelSpecs',
      label: '端点配置',
      description: '管理自定义端点配置，这些配置将添加到 Aipyq.yaml 文件中',
    },
    {
      id: 'agents',
      label: '智能体管理',
      description: '管理所有智能体，设置是否展示给用户',
    },
    {
      id: 'mcp',
      label: 'MCP管理',
      description: '查看和管理MCP服务器的连接状态',
    },
    {
      id: 'users',
      label: '用户管理',
      description: '查看和管理所有注册用户',
    },
  ];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      {/* 标签页导航 */}
      <div className="border-b border-border-light bg-surface-secondary">
        <div className="flex gap-1 px-4 pt-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'relative px-4 py-2 text-sm font-medium transition-colors',
                'border-b-2 border-transparent',
                activeTab === tab.id
                  ? 'border-primary text-text-primary'
                  : 'text-text-secondary hover:text-text-primary hover:border-border-subtle',
              )}
              aria-label={tab.label}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 标签页内容 */}
      <div className="flex-1 overflow-hidden px-4 py-4">
        {activeTab === 'modelSpecs' && <EndpointsConfig startupConfig={startupConfig} />}
        {activeTab === 'agents' && <AgentsManagement />}
        {activeTab === 'mcp' && <MCPManagement startupConfig={startupConfig} />}
        {activeTab === 'users' && <UsersManagement />}
      </div>
    </div>
  );
}

