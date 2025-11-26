import { useState } from 'react';
import {
  GearIcon,
  TrashIcon,
  OGDialog,
  OGDialogTrigger,
  OGDialogTemplate,
  Label,
  useToastContext,
} from '@aipyq/client';
import type { Action } from 'aipyq-data-provider';
import { useDeleteAgentAction } from '~/data-provider';
import { isEphemeralAgent } from '~/common';
import { useLocalize } from '~/hooks';
import { cn } from '~/utils';

export default function Action({
  action,
  onClick,
  agentId,
}: {
  action: Action;
  onClick: () => void;
  agentId?: string;
}) {
  const [isHovering, setIsHovering] = useState(false);
  const localize = useLocalize();
  const { showToast } = useToastContext();

  const deleteAgentAction = useDeleteAgentAction({
    onSuccess: () => {
      showToast({
        message: localize('com_assistants_delete_actions_success'),
        status: 'success',
      });
    },
    onError(error) {
      showToast({
        message: (error as Error).message ?? localize('com_assistants_delete_actions_error'),
        status: 'error',
      });
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick();
        }
      }}
      className="group flex w-full rounded-lg border border-border-medium bg-surface-secondary text-sm text-text-primary hover:cursor-pointer hover:bg-surface-hover focus:outline-none focus:ring-2 focus:ring-text-primary"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      aria-label={`Action for ${action.metadata.domain}`}
    >
      <div
        className="h-9 grow overflow-hidden text-ellipsis whitespace-nowrap px-3 py-2"
        style={{ wordBreak: 'break-all' }}
      >
        {action.metadata.domain}
      </div>
      <div
        className={cn(
          'flex h-9 items-center justify-center gap-1 pr-1 transition-colors duration-200',
          isHovering ? 'visible' : 'invisible',
        )}
      >
        <div
          className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-surface-tertiary"
          aria-label="Settings"
        >
          <GearIcon className="icon-sm text-text-secondary" aria-hidden="true" />
        </div>
        {agentId && action.action_id && (
          <OGDialog>
            <OGDialogTrigger asChild>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isEphemeralAgent(agentId)}
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-red-100 dark:hover:bg-red-900/30"
                aria-label={localize('com_ui_delete')}
              >
                <TrashIcon className="icon-sm text-red-500" aria-hidden="true" />
              </button>
            </OGDialogTrigger>
            <OGDialogTemplate
              showCloseButton={false}
              title={localize('com_ui_delete_action')}
              className="max-w-[450px]"
              main={
                <Label className="text-left text-sm font-medium">
                  {localize('com_ui_delete_action_confirm')}
                </Label>
              }
              selection={{
                selectHandler: () => {
                  if (isEphemeralAgent(agentId)) {
                    return showToast({
                      message: localize('com_agents_no_agent_id_error'),
                      status: 'error',
                    });
                  }
                  deleteAgentAction.mutate({
                    action_id: action.action_id,
                    agent_id: agentId,
                  });
                },
                selectClasses:
                  'bg-red-700 dark:bg-red-600 hover:bg-red-800 dark:hover:bg-red-800 transition-color duration-200 text-white',
                selectText: localize('com_ui_delete'),
              }}
            />
          </OGDialog>
        )}
      </div>
    </div>
  );
}
