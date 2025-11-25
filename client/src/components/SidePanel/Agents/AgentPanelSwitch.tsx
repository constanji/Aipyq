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
  const { activePanel, setCurrentAgentId } = useAgentPanelContext();

  useEffect(() => {
    const agent_id = conversation?.agent_id ?? '';
    if (!isEphemeralAgent(agent_id)) {
      setCurrentAgentId(agent_id);
    }
  }, [setCurrentAgentId, conversation?.agent_id]);

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
