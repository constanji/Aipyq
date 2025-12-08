import { PermissionTypes, Permissions } from 'aipyq-data-provider';
import useHasAccess from './Roles/useHasAccess';

export default function usePersonalizationAccess() {
  // 权限：是否允许用户自行关闭记忆（Opt-out）
  const hasMemoryOptOut = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.OPT_OUT,
  });

  // 检查是否有读取记忆的权限，如果没有则隐藏个性化标签页
  const hasReadMemoryAccess = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.READ,
  });

  // 只有当用户有读取记忆权限时，才显示个性化标签页
  const hasAnyPersonalizationFeature = hasReadMemoryAccess;

  return {
    hasMemoryOptOut,
    hasAnyPersonalizationFeature,
   };
}
