import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as Tabs from '@radix-ui/react-tabs';
import type { TStartupConfig } from 'aipyq-data-provider';
import { useLocalize } from '~/hooks';
import ModelSpecsConfig from './ModelSpecsConfig';
import AgentsManagement from './AgentsManagement';

interface GlobalConfigContentProps {
  startupConfig?: TStartupConfig;
}

export default function GlobalConfigContent({ startupConfig }: GlobalConfigContentProps) {
  const localize = useLocalize();
  const [searchParams, setSearchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabParam === 'agents' ? 'agents' : 'modelspecs');

  // 同步 URL 参数和标签页状态
  useEffect(() => {
    if (tabParam === 'agents') {
      setActiveTab('agents');
    } else if (tabParam === 'modelspecs') {
      setActiveTab('modelspecs');
    }
  }, [tabParam]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // 更新 URL 参数
    const newSearchParams = new URLSearchParams(searchParams);
    if (value === 'agents') {
      newSearchParams.set('tab', 'agents');
    } else {
      newSearchParams.delete('tab');
    }
    setSearchParams(newSearchParams, { replace: true });
  };

  React.useEffect(() => {
    console.log('[GlobalConfigContent] 组件已加载', { activeTab, hasStartupConfig: !!startupConfig });
  }, [activeTab, startupConfig]);

  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-4">
      <Tabs.Root value={activeTab} onValueChange={handleTabChange} className="flex h-full flex-col">
        <Tabs.List className="mb-4 flex gap-2 border-b border-border-light">
          <Tabs.Trigger
            value="modelspecs"
            className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            模型规格配置
          </Tabs.Trigger>
          <Tabs.Trigger
            value="agents"
            className="px-4 py-2 text-sm font-medium data-[state=active]:border-b-2 data-[state=active]:border-primary"
          >
            智能体管理
          </Tabs.Trigger>
        </Tabs.List>
        <div className="flex-1 overflow-auto">
          <Tabs.Content value="modelspecs" className="h-full">
            <ModelSpecsConfig startupConfig={startupConfig} />
          </Tabs.Content>
          <Tabs.Content value="agents" className="h-full">
            <AgentsManagement />
          </Tabs.Content>
        </div>
      </Tabs.Root>
    </div>
  );
}

