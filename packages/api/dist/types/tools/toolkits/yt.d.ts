import { z } from 'zod';
export declare const ytToolkit: {
    readonly youtube_search: {
        readonly name: "youtube_search";
        readonly description: "Search for YouTube videos by keyword or phrase.\n- Required: query (search terms to find videos)\n- Optional: maxResults (number of videos to return, 1-50, default: 5)\n- Returns: List of videos with titles, descriptions, and URLs\n- Use for: Finding specific videos, exploring content, research\nExample: query=\"cooking pasta tutorials\" maxResults=3";
        readonly schema: z.ZodObject<{
            query: z.ZodString;
            maxResults: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            query: string;
            maxResults?: number | undefined;
        }, {
            query: string;
            maxResults?: number | undefined;
        }>;
    };
    readonly youtube_info: {
        readonly name: "youtube_info";
        readonly description: "Get detailed metadata and statistics for a specific YouTube video.\n- Required: url (full YouTube URL or video ID)\n- Returns: Video title, description, view count, like count, comment count\n- Use for: Getting video metrics and basic metadata\n- DO NOT USE FOR VIDEO SUMMARIES, USE TRANSCRIPTS FOR COMPREHENSIVE ANALYSIS\n- Accepts both full URLs and video IDs\nExample: url=\"https://youtube.com/watch?v=abc123\" or url=\"abc123\"";
        readonly schema: z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>;
    };
    readonly youtube_comments: {
        readonly name: "youtube_comments";
        readonly description: "Retrieve top-level comments from a YouTube video.\n- Required: url (full YouTube URL or video ID)\n- Optional: maxResults (number of comments, 1-50, default: 10)\n- Returns: Comment text, author names, like counts\n- Use for: Sentiment analysis, audience feedback, engagement review\nExample: url=\"abc123\" maxResults=20";
        readonly schema: z.ZodObject<{
            url: z.ZodString;
            maxResults: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            url: string;
            maxResults?: number | undefined;
        }, {
            url: string;
            maxResults?: number | undefined;
        }>;
    };
    readonly youtube_transcript: {
        readonly name: "youtube_transcript";
        readonly description: "Fetch and parse the transcript/captions of a YouTube video.\n- Required: url (full YouTube URL or video ID)\n- Returns: Full video transcript as plain text\n- Use for: Content analysis, summarization, translation reference\n- This is the \"Go-to\" tool for analyzing actual video content\n- Attempts to fetch English first, then German, then any available language\nExample: url=\"https://youtube.com/watch?v=abc123\"";
        readonly schema: z.ZodObject<{
            url: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            url: string;
        }, {
            url: string;
        }>;
    };
};
//# sourceMappingURL=yt.d.ts.map