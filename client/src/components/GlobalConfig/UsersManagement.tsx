import React, { useState, useEffect } from 'react';
import { Button, useToastContext } from '@aipyq/client';
import { useAuthContext } from '~/hooks';
import { cn } from '~/utils';
import * as Ariakit from '@ariakit/react';
import { RefreshCw, User as UserIcon, Mail, Calendar, Download, Eye, X, List, Grid, Settings, Shield, User, Trash2 } from 'lucide-react';

interface User {
  _id: string;
  email: string;
  username?: string | null;
  name?: string | null;
  avatar?: string | null;
  provider: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserMemory {
  key: string;
  value: string;
  updated_at: string;
  tokenCount?: number;
}

interface UserMemoriesResponse {
  success: boolean;
  userId: string;
  userEmail: string;
  userName: string;
  memories: UserMemory[];
  totalTokens: number;
  count: number;
}

export default function UsersManagement() {
  const { showToast } = useToastContext();
  const { token, user: currentUser } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewingMemories, setViewingMemories] = useState<string | null>(null);
  const [memoriesData, setMemoriesData] = useState<UserMemoriesResponse | null>(null);
  const [isLoadingMemories, setIsLoadingMemories] = useState(false);
  const [viewMode, setViewMode] = useState<'detailed' | 'compact'>('detailed');
  const [updatingRole, setUpdatingRole] = useState<string | null>(null);
  const [deletingUser, setDeletingUser] = useState<string | null>(null);

  // 获取用户列表
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/user/list`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '获取用户列表失败');
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      showToast({
        message: `获取用户列表失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return '管理员';
      case 'USER':
        return '用户';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
      case 'USER':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // 获取用户记忆
  const fetchUserMemories = async (userId: string) => {
    setIsLoadingMemories(true);
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/user/${userId}/memories`, {
        method: 'GET',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '获取用户记忆失败');
      }

      const data = await response.json();
      setMemoriesData(data);
      setViewingMemories(userId);
    } catch (error) {
      console.error('Error fetching user memories:', error);
      showToast({
        message: `获取用户记忆失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    } finally {
      setIsLoadingMemories(false);
    }
  };

  // 导出记忆为JSON
  const exportMemories = () => {
    if (!memoriesData) return;

    const exportData = {
      userId: memoriesData.userId,
      userEmail: memoriesData.userEmail,
      userName: memoriesData.userName,
      exportDate: new Date().toISOString(),
      totalMemories: memoriesData.count,
      totalTokens: memoriesData.totalTokens,
      memories: memoriesData.memories,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `memories_${memoriesData.userEmail}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast({
      message: '记忆导出成功',
      status: 'success',
    });
  };

  // 关闭记忆查看
  const closeMemoriesView = () => {
    setViewingMemories(null);
    setMemoriesData(null);
  };

  // 角色选择菜单组件
  const RoleMenu = ({ user }: { user: User }) => {
    const menuStore = Ariakit.useMenuStore();
    const isOpen = menuStore.useState('open');
    const isCurrentUser = currentUser?.id === user._id;
    const isCurrentUserAdmin = isCurrentUser && currentUser?.role === 'ADMIN';

    return (
      <Ariakit.MenuProvider store={menuStore}>
        <Ariakit.MenuButton
          className="rounded p-1.5 text-text-secondary transition-colors hover:bg-surface-hover disabled:opacity-50"
          title="设置角色"
          aria-label="设置角色"
          disabled={updatingRole === user._id}
        >
          <Settings className="h-4 w-4" />
        </Ariakit.MenuButton>
        <Ariakit.Menu
          portal
          className="z-50 min-w-[180px] rounded-lg border border-border-light bg-surface-primary p-1 shadow-lg"
        >
          <Ariakit.MenuItem
            className={cn(
              'flex w-full cursor-pointer items-center gap-2 rounded px-3 py-2 text-sm text-text-primary outline-none transition-colors hover:bg-surface-hover',
              user.role === 'ADMIN' && 'bg-surface-secondary',
            )}
            onClick={() => {
              if (user.role !== 'ADMIN') {
                if (confirm(`确定要将用户 "${user.name || user.email}" 设置为管理员吗？`)) {
                  updateUserRole(user._id, 'ADMIN');
                }
              }
              menuStore.hide();
            }}
          >
            <Shield className="h-4 w-4" />
            <span>设置为管理员</span>
            {user.role === 'ADMIN' && <span className="ml-auto text-xs">✓</span>}
          </Ariakit.MenuItem>
          <Ariakit.MenuItem
            className={cn(
              'flex w-full items-center gap-2 rounded px-3 py-2 text-sm outline-none transition-colors',
              isCurrentUserAdmin
                ? 'cursor-not-allowed opacity-50 text-text-tertiary'
                : 'cursor-pointer text-text-primary hover:bg-surface-hover',
              user.role === 'USER' && !isCurrentUserAdmin && 'bg-surface-secondary',
            )}
            disabled={isCurrentUserAdmin}
            onClick={() => {
              if (isCurrentUserAdmin) {
                showToast({
                  message: '不能将自己设置为普通用户',
                  status: 'error',
                });
                menuStore.hide();
                return;
              }
              if (user.role !== 'USER') {
                if (confirm(`确定要将用户 "${user.name || user.email}" 设置为普通用户吗？`)) {
                  updateUserRole(user._id, 'USER');
                }
              }
              menuStore.hide();
            }}
            title={isCurrentUserAdmin ? '不能将自己设置为普通用户' : undefined}
          >
            <User className="h-4 w-4" />
            <span>设置为普通用户</span>
            {user.role === 'USER' && !isCurrentUserAdmin && <span className="ml-auto text-xs">✓</span>}
          </Ariakit.MenuItem>
        </Ariakit.Menu>
      </Ariakit.MenuProvider>
    );
  };

  // 删除用户
  const deleteUser = async (userId: string, userName: string) => {
    if (!confirm(`确定要删除用户 "${userName}" 吗？此操作不可撤销，将删除该用户的所有数据。`)) {
      return;
    }

    setDeletingUser(userId);
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/user/${userId}`, {
        method: 'DELETE',
        headers,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '删除用户失败');
      }

      // 从列表中移除已删除的用户
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

      showToast({
        message: '用户已成功删除',
        status: 'success',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      showToast({
        message: `删除用户失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    } finally {
      setDeletingUser(null);
    }
  };

  // 更新用户角色
  const updateUserRole = async (userId: string, role: 'ADMIN' | 'USER') => {
    setUpdatingRole(userId);
    try {
      const baseEl = document.querySelector('base');
      const baseHref = baseEl?.getAttribute('href') || '/';
      const apiBase = baseHref.endsWith('/') ? baseHref.slice(0, -1) : baseHref;

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${apiBase}/api/user/${userId}/role`, {
        method: 'PATCH',
        headers,
        credentials: 'include',
        body: JSON.stringify({ role }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || '更新用户角色失败');
      }

      const data = await response.json();
      
      // 更新本地用户列表
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: data.user.role } : user
        )
      );

      showToast({
        message: `用户角色已更新为${role === 'ADMIN' ? '管理员' : '普通用户'}`,
        status: 'success',
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      showToast({
        message: `更新用户角色失败: ${error instanceof Error ? error.message : '未知错误'}`,
        status: 'error',
      });
    } finally {
      setUpdatingRole(null);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-text-primary">用户管理</h2>
          <p className="mt-1 text-sm text-text-secondary">
            查看和管理所有注册用户
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* 视图切换按钮 */}
          <div className="flex items-center gap-1 rounded-lg border border-border-light bg-surface-secondary p-1">
            <button
              type="button"
              onClick={() => setViewMode('detailed')}
              className={cn(
                'rounded px-2 py-1 text-sm transition-colors',
                viewMode === 'detailed'
                  ? 'bg-surface-primary text-text-primary'
                  : 'text-text-secondary hover:bg-surface-hover',
              )}
              title="详细视图"
              aria-label="详细视图"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('compact')}
              className={cn(
                'rounded px-2 py-1 text-sm transition-colors',
                viewMode === 'compact'
                  ? 'bg-surface-primary text-text-primary'
                  : 'text-text-secondary hover:bg-surface-hover',
              )}
              title="表格视图"
              aria-label="表格视图"
            >
              <Grid className="h-4 w-4" />
            </button>
          </div>
          <Button
            type="button"
            onClick={fetchUsers}
            disabled={isLoading}
            className="btn btn-neutral border-token-border-light relative flex items-center gap-2 rounded-lg px-3 py-2"
            aria-label="刷新用户列表"
          >
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
            {isLoading ? '加载中...' : '刷新'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center text-text-secondary">
            <p className="text-sm">加载中...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
            <p className="text-sm">暂无用户</p>
          </div>
        ) : (
          <div className={cn('space-y-2', viewMode === 'compact' && 'grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3')}>
            {users.map((user) => {
              if (viewMode === 'compact') {
                // 表格视图：只显示头像、昵称、用户名、身份
                return (
                  <div
                    key={user._id}
                    className="relative rounded-lg border border-border-light bg-surface-primary p-3 pr-20 pt-4"
                  >
                    <div className="flex items-center gap-3">
                      {/* 头像 */}
                      <div className="flex-shrink-0">
                        {user.avatar ? (
                          <img
                            src={user.avatar}
                            alt={user.name || user.email}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-secondary">
                            <UserIcon className="h-5 w-5 text-text-secondary" />
                          </div>
                        )}
                      </div>
                      {/* 用户信息 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-text-primary line-clamp-1">
                            {user.name || '未设置昵称'}
                          </h4>
                          <span
                            className={cn(
                              'rounded-xl px-2 py-0.5 text-xs font-medium',
                              getRoleColor(user.role),
                            )}
                          >
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                        {user.username && (
                          <p className="mt-1 text-xs text-text-secondary line-clamp-1">
                            @{user.username}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* 操作按钮 */}
                    <div className="absolute right-2 top-2 flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => fetchUserMemories(user._id)}
                        disabled={isLoadingMemories}
                        className="rounded p-1.5 text-text-secondary transition-colors hover:bg-surface-hover disabled:opacity-50"
                        title="查看记忆"
                        aria-label="查看记忆"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteUser(user._id, user.name || user.email)}
                        disabled={deletingUser === user._id || currentUser?.id === user._id}
                        className="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                        title={currentUser?.id === user._id ? '不能删除自己' : '删除用户'}
                        aria-label="删除用户"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <RoleMenu user={user} />
                    </div>
                  </div>
                );
              }

              // 详细视图：显示完整信息
              return (
                <div
                  key={user._id}
                  className="rounded-lg border border-border-light bg-surface-primary p-4"
                >
                  <div className="flex items-start gap-4">
                    {/* 头像 */}
                    <div className="flex-shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name || user.email}
                          className="h-12 w-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-secondary">
                          <UserIcon className="h-6 w-6 text-text-secondary" />
                        </div>
                      )}
                    </div>

                    {/* 用户信息 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-semibold text-text-primary">
                            {user.name || user.username || '未设置名称'}
                          </h3>
                          <span
                            className={cn(
                              'rounded-xl px-2 py-0.5 text-xs font-medium',
                              getRoleColor(user.role),
                            )}
                          >
                            {getRoleLabel(user.role)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => fetchUserMemories(user._id)}
                            disabled={isLoadingMemories}
                            className="rounded p-1.5 text-text-secondary transition-colors hover:bg-surface-hover disabled:opacity-50"
                            title="查看记忆"
                            aria-label="查看记忆"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteUser(user._id, user.name || user.email)}
                            disabled={deletingUser === user._id || currentUser?.id === user._id}
                            className="rounded p-1.5 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                            title={currentUser?.id === user._id ? '不能删除自己' : '删除用户'}
                            aria-label="删除用户"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                          <RoleMenu user={user} />
                        </div>
                      </div>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Mail className="h-4 w-4" />
                          <span className="truncate">{user.email}</span>
                        </div>
                        {user.username && (
                          <div className="flex items-center gap-2 text-text-secondary">
                            <UserIcon className="h-4 w-4" />
                            <span>{user.username}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-text-secondary">
                          <Calendar className="h-4 w-4" />
                          <span>注册时间: {formatDate(user.createdAt)}</span>
                        </div>
                        {user.provider && user.provider !== 'email' && (
                          <div className="text-xs text-text-tertiary">
                            登录方式: {user.provider}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 记忆查看模态框 */}
      {viewingMemories && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="relative flex h-[80vh] w-full max-w-4xl flex-col rounded-lg border border-border-light bg-surface-primary shadow-lg">
            {/* 头部 */}
            <div className="flex items-center justify-between border-b border-border-light p-4">
              <div>
                <h3 className="text-lg font-semibold text-text-primary">用户记忆</h3>
                {memoriesData && (
                  <p className="mt-1 text-sm text-text-secondary">
                    {memoriesData.userName} ({memoriesData.userEmail})
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {memoriesData && memoriesData.count > 0 && (
                  <Button
                    type="button"
                    onClick={exportMemories}
                    className="btn btn-primary relative flex items-center gap-2 rounded-lg px-3 py-2"
                    title="导出记忆"
                    aria-label="导出记忆"
                  >
                    <Download className="h-4 w-4" />
                    导出
                  </Button>
                )}
                <button
                  type="button"
                  onClick={closeMemoriesView}
                  className="rounded p-2 text-text-secondary hover:bg-surface-hover"
                  title="关闭"
                  aria-label="关闭"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-auto p-4">
              {isLoadingMemories ? (
                <div className="flex h-32 items-center justify-center text-text-secondary">
                  <p className="text-sm">加载中...</p>
                </div>
              ) : memoriesData ? (
                memoriesData.count === 0 ? (
                  <div className="flex h-32 flex-col items-center justify-center gap-2 text-text-secondary">
                    <p className="text-sm">该用户暂无记忆</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* 统计信息 */}
                    <div className="rounded-lg border border-border-light bg-surface-secondary p-4">
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-text-secondary">记忆数量</div>
                          <div className="mt-1 text-lg font-semibold text-text-primary">
                            {memoriesData.count}
                          </div>
                        </div>
                        <div>
                          <div className="text-text-secondary">总Token数</div>
                          <div className="mt-1 text-lg font-semibold text-text-primary">
                            {memoriesData.totalTokens}
                          </div>
                        </div>
                        <div>
                          <div className="text-text-secondary">最后更新</div>
                          <div className="mt-1 text-sm text-text-primary">
                            {memoriesData.memories[0]?.updated_at
                              ? formatDate(memoriesData.memories[0].updated_at)
                              : '未知'}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 记忆列表 */}
                    <div className="space-y-3">
                      {memoriesData.memories.map((memory) => (
                        <div
                          key={memory.key}
                          className="rounded-lg border border-border-light bg-surface-secondary p-4"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="font-semibold text-text-primary">{memory.key}</h4>
                            <div className="flex items-center gap-2 text-xs text-text-secondary">
                              {memory.tokenCount && (
                                <span>{memory.tokenCount} tokens</span>
                              )}
                              <span>更新于: {formatDate(memory.updated_at)}</span>
                            </div>
                          </div>
                          <p className="text-sm text-text-secondary whitespace-pre-wrap break-words">
                            {memory.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

