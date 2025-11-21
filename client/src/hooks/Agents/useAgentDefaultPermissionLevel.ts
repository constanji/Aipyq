import { PermissionBits } from 'librechat-data-provider';

/**
 * Hook to determine the appropriate permission level for agent queries
 */
const useAgentDefaultPermissionLevel = () => {
  // Default to VIEW permissions (browse mode)
  return PermissionBits.VIEW;
};

export default useAgentDefaultPermissionLevel;
