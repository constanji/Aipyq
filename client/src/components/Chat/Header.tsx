import { useMemo } from 'react';
import { useMediaQuery } from '@aipyq/client';
import { useOutletContext } from 'react-router-dom';
import { getConfigDefaults, PermissionTypes, Permissions, SystemRoles, isAgentsEndpoint } from 'aipyq-data-provider';
import type { ContextType } from '~/common';
import ModelSelector from './Menus/Endpoints/ModelSelector';
import { PresetsMenu, HeaderNewChat, OpenSidebar } from './Menus';
import { useGetStartupConfig } from '~/data-provider';
import ExportAndShareMenu from './ExportAndShareMenu';
import AddMultiConvo from './AddMultiConvo';
import { useHasAccess, useAuthContext } from '~/hooks';
import { useAgentsMapContext } from '~/Providers';
import { useRecoilValue } from 'recoil';
import store from '~/store';

const defaultInterface = getConfigDefaults().interface;

export default function Header() {
  const { data: startupConfig } = useGetStartupConfig();
  const { navVisible, setNavVisible } = useOutletContext<ContextType>();
  const { user } = useAuthContext();
  const conversation = useRecoilValue(store.conversationByIndex(0));

  const interfaceConfig = useMemo(
    () => startupConfig?.interface ?? defaultInterface,
    [startupConfig],
  );

  const hasAccessToMultiConvo = useHasAccess({
    permissionType: PermissionTypes.MULTI_CONVO,
    permission: Permissions.USE,
  });

  const isSmallScreen = useMediaQuery('(max-width: 768px)');
  const agentsMap = useAgentsMapContext();
  
  // 只有管理员才能看到模型选择器
  const isAdmin = user?.role === SystemRoles.ADMIN;
  
  // 普通用户：如果有智能体，显示当前智能体的名称
  const currentAgentName = useMemo(() => {
    if (isAdmin) return null; // 管理员显示完整选择器
    
    // 如果是 agents endpoint 且有 agent_id，显示 agent 名称
    if (isAgentsEndpoint(conversation?.endpoint) && conversation?.agent_id) {
      const agent = agentsMap?.[conversation.agent_id];
      if (agent?.name) {
        return agent.name;
      }
      // 如果 agent 存在但没有 name，返回 null 以显示"当前没有选择Agent"
      return null;
    }
    
    // 非 agents endpoint，不显示 agent 名称
    return null;
  }, [conversation?.agent_id, conversation?.endpoint, isAdmin, agentsMap]);

  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between bg-white p-2 font-semibold text-text-primary dark:bg-gray-800">
      <div className="hide-scrollbar flex w-full items-center justify-between gap-2 overflow-x-auto">
        <div className="mx-1 flex items-center gap-2">
          <div
            className={`flex items-center gap-2 ${
              !isSmallScreen ? 'transition-all duration-200 ease-in-out' : ''
            } ${
              !navVisible
                ? 'translate-x-0 opacity-100'
                : 'pointer-events-none translate-x-[-100px] opacity-0'
            }`}
          >
            <OpenSidebar setNavVisible={setNavVisible} className="max-md:hidden" />
            <HeaderNewChat />
          </div>
          <div
            className={`flex items-center gap-2 ${
              !isSmallScreen ? 'transition-all duration-200 ease-in-out' : ''
            } ${!navVisible ? 'translate-x-0' : 'translate-x-[-100px]'}`}
          >
            {/* 管理员：显示完整模型选择器 */}
            {isAdmin && (
              <>
            <ModelSelector startupConfig={startupConfig} />
            {interfaceConfig.presets === true && interfaceConfig.modelSelect && <PresetsMenu />}
              </>
            )}
            {/* 普通用户：显示当前 Agent 名称或提示（类似端点选择器的样式） */}
            {!isAdmin && (
              <div className="my-1 flex h-10 w-full max-w-[70vw] items-center justify-center gap-2 rounded-xl border border-border-light bg-surface-secondary px-3 py-2 text-sm text-text-primary">
                <span className="flex-grow truncate text-left">
                  {currentAgentName || '当前没有选择Agent'}
                </span>
              </div>
            )}
            {hasAccessToMultiConvo === true && <AddMultiConvo />}
            {isSmallScreen && (
              <ExportAndShareMenu
                isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
              />
            )}
          </div>
        </div>
        {!isSmallScreen && (
          <div className="flex items-center gap-2">
            <ExportAndShareMenu
              isSharedButtonEnabled={startupConfig?.sharedLinksEnabled ?? false}
            />
          </div>
        )}
      </div>
      {/* Empty div for spacing */}
      <div />
    </div>
  );
}
