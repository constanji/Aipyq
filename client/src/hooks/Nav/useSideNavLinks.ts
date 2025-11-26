import { useMemo } from 'react';
import { Blocks, MCPIcon, AttachmentIcon } from '@aipyq/client';
import { Database, Settings2, ArrowRightToLine, MessageSquareQuote } from 'lucide-react';
import {
  Permissions,
  EModelEndpoint,
  PermissionTypes,
  isParamEndpoint,
  isAgentsEndpoint,
  isAssistantsEndpoint,
} from 'aipyq-data-provider';
import type { TInterfaceConfig, TEndpointsConfig } from 'aipyq-data-provider';
import type { NavLink } from '~/common';
import AgentPanelSwitch from '~/components/SidePanel/Agents/AgentPanelSwitch';
import MemoryViewer from '~/components/SidePanel/Memories/MemoryViewer';
import PanelSwitch from '~/components/SidePanel/Builder/PanelSwitch';
import PromptsAccordion from '~/components/Prompts/PromptsAccordion';
import Parameters from '~/components/SidePanel/Parameters/Panel';
import FilesPanel from '~/components/SidePanel/Files/Panel';
import MCPPanel from '~/components/SidePanel/MCP/MCPPanel';
import { useGetStartupConfig } from '~/data-provider';
import { useHasAccess } from '~/hooks';

export default function useSideNavLinks({
  hidePanel,
  keyProvided,
  endpoint,
  endpointType,
  interfaceConfig,
  endpointsConfig,
}: {
  hidePanel: () => void;
  keyProvided: boolean;
  endpoint?: EModelEndpoint | null;
  endpointType?: EModelEndpoint | null;
  interfaceConfig: Partial<TInterfaceConfig>;
  endpointsConfig: TEndpointsConfig;
}) {
  const hasAccessToPrompts = useHasAccess({
    permissionType: PermissionTypes.PROMPTS,
    permission: Permissions.USE,
  });
  const hasAccessToMemories = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.USE,
  });
  const hasAccessToReadMemories = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.READ,
  });
  const hasAccessToAgents = useHasAccess({
    permissionType: PermissionTypes.AGENTS,
    permission: Permissions.USE,
  });
  const hasAccessToCreateAgents = useHasAccess({
    permissionType: PermissionTypes.AGENTS,
    permission: Permissions.CREATE,
  });
  const { data: startupConfig } = useGetStartupConfig();

  const Links = useMemo(() => {
    // 隐藏侧边栏功能，所有功能已迁移到独立页面
    const links: NavLink[] = [];
    return links;
  }, []);

  return Links;
}
