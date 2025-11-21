export declare const envVarRegex: RegExp;
/** Extracts the environment variable name from a template literal string */
export declare function extractVariableName(value: string): string | null;
/** Extracts the value of an environment variable from a string. */
export declare function extractEnvVariable(value: string): string;
