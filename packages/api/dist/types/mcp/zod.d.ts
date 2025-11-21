import { z } from 'zod';
import type { JsonSchemaType, ConvertJsonSchemaToZodOptions } from '@librechat/data-schemas';
/**
 * Helper function to resolve $ref references
 * @param schema - The schema to resolve
 * @param definitions - The definitions to use
 * @param visited - The set of visited references
 * @returns The resolved schema
 */
export declare function resolveJsonSchemaRefs<T extends Record<string, unknown>>(schema: T, definitions?: Record<string, unknown>, visited?: Set<string>): T;
export declare function convertJsonSchemaToZod(schema: JsonSchemaType & Record<string, unknown>, options?: ConvertJsonSchemaToZodOptions): z.ZodType | undefined;
/**
 * Helper function for tests that automatically resolves refs before converting to Zod
 * This ensures all tests use resolveJsonSchemaRefs even when not explicitly testing it
 */
export declare function convertWithResolvedRefs(schema: JsonSchemaType & Record<string, unknown>, options?: ConvertJsonSchemaToZodOptions): z.ZodType<any, z.ZodTypeDef, any> | undefined;
//# sourceMappingURL=zod.d.ts.map