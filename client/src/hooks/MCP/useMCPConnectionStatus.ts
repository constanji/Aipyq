import { useMCPConnectionStatusQuery } from '~/data-provider/Tools/queries';

export function useMCPConnectionStatus({ enabled }: { enabled?: boolean } = {}) {
  const { data, refetch } = useMCPConnectionStatusQuery({
    enabled,
  });

  return {
    connectionStatus: data?.connectionStatus,
    refetch,
  };
}
