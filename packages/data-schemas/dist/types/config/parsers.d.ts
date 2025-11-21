import winston from 'winston';
/**
 * Redacts sensitive information from a console message and trims it to a specified length if provided.
 * @param str - The console message to be redacted.
 * @param trimLength - The optional length at which to trim the redacted message.
 * @returns The redacted and optionally trimmed console message.
 */
declare function redactMessage(str: string, trimLength?: number): string;
/**
 * Redacts sensitive information from log messages if the log level is 'error'.
 * Note: Intentionally mutates the object.
 * @param info - The log information object.
 * @returns The modified log information object.
 */
declare const redactFormat: winston.Logform.FormatWrap;
/**
 * Formats log messages for debugging purposes.
 * - Truncates long strings within log messages.
 * - Condenses arrays by truncating long strings and objects as strings within array items.
 * - Redacts sensitive information from log messages if the log level is 'error'.
 * - Converts log information object to a formatted string.
 *
 * @param options - The options for formatting log messages.
 * @returns The formatted log message.
 */
declare const debugTraverse: winston.Logform.Format;
/**
 * Truncates long string values in JSON log objects.
 * Prevents outputting extremely long values (e.g., base64, blobs).
 */
declare const jsonTruncateFormat: winston.Logform.FormatWrap;
export { redactFormat, redactMessage, debugTraverse, jsonTruncateFormat };
