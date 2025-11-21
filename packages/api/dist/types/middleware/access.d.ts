/// <reference types="qs" />
import { Permissions, PermissionTypes } from 'librechat-data-provider';
import type { NextFunction, Request as ServerRequest, Response as ServerResponse } from 'express';
import type { IRole, IUser } from '@librechat/data-schemas';
export declare function skipAgentCheck(req?: ServerRequest): boolean;
/**
 * Core function to check if a user has one or more required permissions
 * @param user - The user object
 * @param permissionType - The type of permission to check
 * @param permissions - The list of specific permissions to check
 * @param bodyProps - An optional object where keys are permissions and values are arrays of properties to check
 * @param checkObject - The object to check properties against
 * @param skipCheck - An optional function that takes the checkObject and returns true to skip permission checking
 * @returns Whether the user has the required permissions
 */
export declare const checkAccess: ({ req, user, permissionType, permissions, getRoleByName, bodyProps, checkObject, skipCheck, }: {
    user: IUser;
    req?: ServerRequest<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>> | undefined;
    permissionType: PermissionTypes;
    permissions: Permissions[];
    bodyProps?: Record<Permissions, string[]> | undefined;
    checkObject?: object | undefined;
    /** If skipCheck function is provided and returns true, skip permission checking */
    skipCheck?: ((req?: ServerRequest) => boolean) | undefined;
    getRoleByName: (roleName: string, fieldsToSelect?: string | string[]) => Promise<IRole | null>;
}) => Promise<boolean>;
/**
 * Middleware to check if a user has one or more required permissions, optionally based on `req.body` properties.
 * @param permissionType - The type of permission to check.
 * @param permissions - The list of specific permissions to check.
 * @param bodyProps - An optional object where keys are permissions and values are arrays of `req.body` properties to check.
 * @param skipCheck - An optional function that takes req.body and returns true to skip permission checking.
 * @param getRoleByName - A function to get the role by name.
 * @returns Express middleware function.
 */
export declare const generateCheckAccess: ({ permissionType, permissions, bodyProps, skipCheck, getRoleByName, }: {
    permissionType: PermissionTypes;
    permissions: Permissions[];
    bodyProps?: Record<Permissions, string[]> | undefined;
    skipCheck?: ((req?: ServerRequest) => boolean) | undefined;
    getRoleByName: (roleName: string, fieldsToSelect?: string | string[]) => Promise<IRole | null>;
}) => (req: ServerRequest, res: ServerResponse, next: NextFunction) => Promise<unknown>;
//# sourceMappingURL=access.d.ts.map