import type { IUser, UserMethods } from '@librechat/data-schemas';
/**
 * Finds or migrates a user for OpenID authentication
 * @returns user object (with migration fields if needed), error message, and whether migration is needed
 */
export declare function findOpenIDUser({ openidId, findUser, email, idOnTheSource, strategyName, }: {
    openidId: string;
    findUser: UserMethods['findUser'];
    email?: string;
    idOnTheSource?: string;
    strategyName?: string;
}): Promise<{
    user: IUser | null;
    error: string | null;
    migration: boolean;
}>;
//# sourceMappingURL=openid.d.ts.map