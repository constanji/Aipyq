import type {
  AnthropicTextBlockParam,
  AnthropicWebSearchResultBlockParam,
} from '@/llm/anthropic/types';
import type { SearchResultData, ProcessedOrganic } from './types';
import { getAttribution } from './utils';

/**
 * Coerces Anthropic web search results to the SearchResultData format
 * @param results - Array of Anthropic web search results
 * @param turn - The turn number to associate with these results
 * @returns SearchResultData with minimal ProcessedOrganic items
 */
export function coerceAnthropicSearchResults({
  results,
  turn = 0,
}: {
  results: (AnthropicTextBlockParam | AnthropicWebSearchResultBlockParam)[];
  turn?: number;
}): SearchResultData {
  const organic: ProcessedOrganic[] = results
    .filter((result) => result.type === 'web_search_result')
    .map((result, index) => ({
      link: result.url,
      position: index + 1,
      title: result.title,
      date: result.page_age ?? undefined,
      attribution: getAttribution(result.url),
    }));

  return {
    turn,
    organic,
  };
}

/**
 * Helper function to check if an object is an Anthropic web search result
 */
export function isAnthropicWebSearchResult(
  obj: unknown
): obj is AnthropicWebSearchResultBlockParam {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'type' in obj &&
    obj.type === 'web_search_result' &&
    'url' in obj &&
    typeof (obj as Record<string, unknown>).url === 'string'
  );
}
