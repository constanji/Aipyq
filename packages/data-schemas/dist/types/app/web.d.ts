import type { TCustomConfig } from 'librechat-data-provider';
import type { TWebSearchKeys } from '~/types/web';
export declare const webSearchAuth: {
    providers: {
        serper: {
            serperApiKey: 1;
        };
        searxng: {
            searxngInstanceUrl: 1;
            /** Optional (0) */
            searxngApiKey: 0;
        };
    };
    scrapers: {
        firecrawl: {
            firecrawlApiKey: 1;
            /** Optional (0) */
            firecrawlApiUrl: 0;
            firecrawlVersion: 0;
        };
        serper: {
            serperApiKey: 1;
        };
    };
    rerankers: {
        jina: {
            jinaApiKey: 1;
            /** Optional (0) */
            jinaApiUrl: 0;
        };
        cohere: {
            cohereApiKey: 1;
        };
    };
};
/**
 * Extracts all unique API keys from the webSearchAuth configuration object
 */
export declare function getWebSearchKeys(): TWebSearchKeys[];
export declare const webSearchKeys: TWebSearchKeys[];
export declare function loadWebSearchConfig(config: TCustomConfig['webSearch']): TCustomConfig['webSearch'];
