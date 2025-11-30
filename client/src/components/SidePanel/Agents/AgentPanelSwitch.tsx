import { useEffect } from 'react';
import { AgentPanelProvider, useAgentPanelContext } from '~/Providers/AgentPanelContext';
import { Panel, isEphemeralAgent } from '~/common';
import VersionPanel from './Version/VersionPanel';
import { useChatContext } from '~/Providers';
import ActionsPanel from './ActionsPanel';
import AgentPanel from './AgentPanel';
import MCPPanel from './MCPPanel';

export default function AgentPanelSwitch() {
  return (
    <AgentPanelProvider>
      <AgentPanelSwitchWithContext />
    </AgentPanelProvider>
  );
}

function AgentPanelSwitchWithContext() {
  const { conversation } = useChatContext();
  const { activePanel, setCurrentAgentId, agent_id: contextAgentId } = useAgentPanelContext();

  // 只在conversation有agent_id且context中没有设置时才从conversation获取
  useEffect(() => {
    const conversationAgentId = conversation?.agent_id ?? '';
    // 如果context中已经有agent_id，且与conversation的不同，说明是在管理界面编辑模式，保持context的值
    if (contextAgentId && contextAgentId !== conversationAgentId) {
      return; // 保持context中的agent_id（编辑模式）
    }
    // 否则从conversation获取
    if (!isEphemeralAgent(conversationAgentId) && conversationAgentId) {
      setCurrentAgentId(conversationAgentId);
    }
  }, [setCurrentAgentId, conversation?.agent_id, contextAgentId]);

  // 调试信息
  useEffect(() => {
    console.log('[AgentPanelSwitch] activePanel:', activePanel, 'Panel.actions:', Panel.actions);
  }, [activePanel]);

  // 优先检查 actions 面板
  if (activePanel === Panel.actions) {
    console.log('[AgentPanelSwitch] Rendering ActionsPanel');
    return (
      <div className="h-full overflow-hidden">
        <ActionsPanel />
      </div>
    );
  }
  if (activePanel === Panel.version) {
    return (
      <div className="h-full overflow-hidden">
        <VersionPanel />
      </div>
    );
  }
  if (activePanel === Panel.mcp) {
    return (
      <div className="h-full overflow-hidden">
        <MCPPanel />
      </div>
    );
  }
  console.log('[AgentPanelSwitch] Rendering AgentPanel, activePanel:', activePanel);
  return (
    <div className="h-full overflow-hidden">
      <AgentPanel />
    </div>
  );
}
