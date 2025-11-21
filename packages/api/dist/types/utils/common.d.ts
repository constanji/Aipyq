/**
 * Checks if the given value is truthy by being either the boolean `true` or a string
 * that case-insensitively matches 'true'.
 *
 * @param value - The value to check.
 * @returns Returns `true` if the value is the boolean `true` or a case-insensitive
 *                    match for the string 'true', otherwise returns `false`.
 * @example
 *
 * isEnabled("True");  // returns true
 * isEnabled("TRUE");  // returns true
 * isEnabled(true);    // returns true
 * isEnabled("false"); // returns false
 * isEnabled(false);   // returns false
 * isEnabled(null);    // returns false
 * isEnabled();        // returns false
 */
export declare function isEnabled(value?: string | boolean | null | undefined): boolean;
/**
 * Checks if the provided value is 'user_provided'.
 *
 * @param value - The value to check.
 * @returns - Returns true if the value is 'user_provided', otherwise false.
 */
export declare const isUserProvided: (value?: string) => boolean;
/**
 * @param values
 */
export declare function optionalChainWithEmptyCheck(...values: (string | number | undefined)[]): string | number | undefined;
/**
 * Normalize the endpoint name to system-expected value.
 * @param name
 */
export declare function normalizeEndpointName(name?: string): string;
//# sourceMappingURL=common.d.ts.map