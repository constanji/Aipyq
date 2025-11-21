/**
 * Evaluates a mathematical expression provided as a string and returns the result.
 *
 * If the input is already a number, it returns the number as is.
 * If the input is not a string or contains invalid characters, an error is thrown.
 * If the evaluated result is not a number, an error is thrown.
 *
 * @param str - The mathematical expression to evaluate, or a number.
 * @param fallbackValue - The default value to return if the input is not a string or number, or if the evaluated result is not a number.
 *
 * @returns The result of the evaluated expression or the input number.
 *
 * @throws Throws an error if the input is not a string or number, contains invalid characters, or does not evaluate to a number.
 */
export declare function math(str: string | number | undefined, fallbackValue?: number): number;
//# sourceMappingURL=math.d.ts.map