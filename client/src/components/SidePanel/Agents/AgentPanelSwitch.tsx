import { useEffect } from 'react';
import { AgentPanelProvider, useAgentPanelContext } from '~/Providers/AgentPanelContext';
import { Panel, isEphemeralAgent } from '~/common';
import VersionPanel from './Version/VersionPanel';
import { useChatContext } from '~/Providers';
import ActionsPanel from './ActionsPanel';
import AgentPanel from './AgentPanel';
import MCPPanel from './MCPPanel';

interface AgentPanelSwitchProps {
  /** 是否从聊天上下文自动获取 agent_id。在管理界面编辑时应设为 false */
  autoSyncFromConversation?: boolean;
}

export default function AgentPanelSwitch({ autoSyncFromConversation = true }: AgentPanelSwitchProps = {}) {
  return (
    <AgentPanelProvider>
      <AgentPanelSwitchWithContext autoSyncFromConversation={autoSyncFromConversation} />
    </AgentPanelProvider>
  );
}

/**
 * 内部组件，用于在已有 AgentPanelProvider 的情况下使用
 * 在管理界面等场景下，可以使用此组件避免嵌套 Provider
 */
export function AgentPanelSwitchWithContext({ autoSyncFromConversation = true }: AgentPanelSwitchProps) {
  const { conversation } = useChatContext();
  const { activePanel, setCurrentAgentId, agent_id: contextAgentId } = useAgentPanelContext();

  // 只在允许自动同步且有conversation时才从conversation获取
  useEffect(() => {
    // 如果在管理界面模式（禁用自动同步），则不从 conversation 获取
    if (!autoSyncFromConversation) {
      return;
    }

    const conversationAgentId = conversation?.agent_id ?? '';
    // 如果context中已经有agent_id，且与conversation的不同，说明是在管理界面编辑模式，保持context的值
    if (contextAgentId && contextAgentId !== conversationAgentId) {
      return; // 保持context中的agent_id（编辑模式）
    }
    // 否则从conversation获取
    if (!isEphemeralAgent(conversationAgentId) && conversationAgentId) {
      setCurrentAgentId(conversationAgentId);
    }
  }, [setCurrentAgentId, conversation?.agent_id, contextAgentId, autoSyncFromConversation]);

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
