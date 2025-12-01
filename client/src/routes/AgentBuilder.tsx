import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@aipyq/client';
import { SystemRoles } from 'aipyq-data-provider';
import { useGetEndpointsQuery } from '~/data-provider';
import { useAuthContext } from '~/hooks';
import useAuthRedirect from './useAuthRedirect';

/**
 * AgentBuilder 路由已迁移到全局配置管理页面
 * 此路由现在重定向到全局配置管理页面
 */
export default function AgentBuilder() {
  const { isAuthenticated } = useAuthRedirect();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const endpointsQuery = useGetEndpointsQuery({ enabled: isAuthenticated });

  const isAdmin = user?.role === SystemRoles.ADMIN;

  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        // 管理员重定向到全局配置管理的智能体管理标签页
        navigate('/global-config?tab=agents', { replace: true });
      } else {
        // 非管理员重定向到主页
      navigate('/c/new', { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (endpointsQuery.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center" aria-live="polite" role="status">
        <Spinner className="text-text-primary" />
      </div>
    );
  }

    return null;
}

