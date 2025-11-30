import { z } from 'zod';

export enum DATE_RANGE {
  PAST_HOUR = 'h',
  PAST_24_HOURS = 'd',
  PAST_WEEK = 'w',
  PAST_MONTH = 'm',
  PAST_YEAR = 'y',
}

export const DEFAULT_QUERY_DESCRIPTION = `
GUIDELINES:
- Start broad, then narrow: Begin with key concepts, then refine with specifics
- Think like sources: Use terminology experts would use in the field
- Consider perspective: Frame queries from different viewpoints for better results
- Quality over quantity: A precise 3-4 word query often beats lengthy sentences

TECHNIQUES (combine for power searches):
- EXACT PHRASES: Use quotes ("climate change report")
- EXCLUDE TERMS: Use minus to remove unwanted results (-wikipedia)
- SITE-SPECIFIC: Restrict to websites (site:edu research)
- FILETYPE: Find specific documents (filetype:pdf study)
- OR OPERATOR: Find alternatives (electric OR hybrid cars)
- DATE RANGE: Recent information (data after:2020)
- WILDCARDS: Use * for unknown terms (how to * bread)
- SPECIFIC QUESTIONS: Use who/what/when/where/why/how
- DOMAIN TERMS: Include technical terminology for specialized topics
- CONCISE TERMS: Prioritize keywords over sentences
`.trim();

export const DEFAULT_COUNTRY_DESCRIPTION =
  `Country code to localize search results.
Use standard 2-letter country codes: "us", "uk", "ca", "de", "fr", "jp", "br", etc.
Provide this when the search should return results specific to a particular country.
Examples:
- "us" for United States (default)
- "de" for Germany
- "in" for India
`.trim();

export const querySchema = z.string().describe(DEFAULT_QUERY_DESCRIPTION);
export const dateSchema = z
  .nativeEnum(DATE_RANGE)
  .optional()
  .describe('Date range for search results.');
export const countrySchema = z
  .string()
  .optional()
  .describe(DEFAULT_COUNTRY_DESCRIPTION);
export const imagesSchema = z
  .boolean()
  .optional()
  .describe('Whether to also run an image search.');

export const videosSchema = z
  .boolean()
  .optional()
  .describe('Whether to also run a video search.');

export const newsSchema = z
  .boolean()
  .optional()
  .describe('Whether to also run a news search.');
