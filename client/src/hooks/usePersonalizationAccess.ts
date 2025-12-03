import { PermissionTypes, Permissions } from 'aipyq-data-provider';
import useHasAccess from './Roles/useHasAccess';

export default function usePersonalizationAccess() {
  // 权限：是否允许用户自行关闭记忆（Opt-out）
  const hasMemoryOptOut = useHasAccess({
    permissionType: PermissionTypes.MEMORIES,
    permission: Permissions.OPT_OUT,
  });

  // 当前实现：始终启用个性化 Tab（记忆已集成到个人中心），Opt-out 只控制是否显示记忆开关
  const hasAnyPersonalizationFeature = true;

  return {
    hasMemoryOptOut,
    hasAnyPersonalizationFeature,
  };
}
