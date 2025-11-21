/**
 * Determine the log directory in a cross-compatible way.
 * Priority:
 * 1. LIBRECHAT_LOG_DIR environment variable
 * 2. If running within LibreChat monorepo (when cwd ends with /api), use api/logs
 * 3. If api/logs exists relative to cwd, use that (for running from project root)
 * 4. Otherwise, use logs directory relative to process.cwd()
 *
 * This avoids using __dirname which is not available in ESM modules
 */
export declare const getLogDirectory: () => string;
