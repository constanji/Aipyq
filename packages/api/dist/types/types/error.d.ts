/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import type { Error as MongooseError } from 'mongoose';
/** MongoDB duplicate key error interface */
export interface MongoServerError extends Error {
    code: number;
    keyValue?: Record<string, unknown>;
    errmsg?: string;
}
/** Mongoose validation error interface */
export interface ValidationError extends MongooseError {
    name: 'ValidationError';
    errors: Record<string, {
        message: string;
        path?: string;
    }>;
}
/** Custom error with status code and body */
export interface CustomError extends Error {
    statusCode?: number;
    body?: unknown;
    code?: string | number;
}
//# sourceMappingURL=error.d.ts.map