import { EModelEndpoint } from 'librechat-data-provider';
import type { TCustomConfig, TEndpoint, TTransactionsConfig } from 'librechat-data-provider';
import type { AppConfig } from '@librechat/data-schemas';
/**
 * Retrieves the balance configuration object
 * */
export declare function getBalanceConfig(appConfig?: AppConfig): Partial<TCustomConfig['balance']> | null;
/**
 * Retrieves the transactions configuration object
 * */
export declare function getTransactionsConfig(appConfig?: AppConfig): Partial<TTransactionsConfig>;
export declare const getCustomEndpointConfig: ({ endpoint, appConfig, }: {
    endpoint: string | EModelEndpoint;
    appConfig?: AppConfig | undefined;
}) => Partial<TEndpoint> | undefined;
export declare function hasCustomUserVars(appConfig?: AppConfig): boolean;
//# sourceMappingURL=config.d.ts.map