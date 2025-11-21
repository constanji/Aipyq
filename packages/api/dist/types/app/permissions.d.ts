import { PermissionTypes } from 'librechat-data-provider';
import type { IRole, AppConfig } from '@librechat/data-schemas';
export declare function updateInterfacePermissions({ appConfig, getRoleByName, updateAccessPermissions, }: {
    appConfig: AppConfig;
    getRoleByName: (roleName: string, fieldsToSelect?: string | string[]) => Promise<IRole | null>;
    updateAccessPermissions: (roleName: string, permissionsUpdate: Partial<Record<PermissionTypes, Record<string, boolean | undefined>>>, roleData?: IRole | null) => Promise<void>;
}): Promise<void>;
//# sourceMappingURL=permissions.d.ts.map