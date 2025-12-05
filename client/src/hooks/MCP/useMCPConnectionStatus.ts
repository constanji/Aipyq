import { useMCPConnectionStatusQuery } from '~/data-provider/Tools/queries';

export function useMCPConnectionStatus({ enabled }: { enabled?: boolean } = {}) {
  const { data, refetch } = useMCPConnectionStatusQuery({
    enabled: enabled !== false, // 默认启用，除非明确禁用
  });

  return {
    connectionStatus: data?.connectionStatus,
    refetch,
  };
}
