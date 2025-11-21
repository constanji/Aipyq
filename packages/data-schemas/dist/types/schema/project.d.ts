/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
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
import { Schema, Document, Types } from 'mongoose';
export interface IMongoProject extends Document {
    name: string;
    promptGroupIds: Types.ObjectId[];
    agentIds: string[];
    createdAt?: Date;
    updatedAt?: Date;
}
declare const projectSchema: Schema<IMongoProject, import("mongoose").Model<IMongoProject, any, any, any, Document<unknown, any, IMongoProject> & IMongoProject & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, IMongoProject, Document<unknown, {}, import("mongoose").FlatRecord<IMongoProject>> & import("mongoose").FlatRecord<IMongoProject> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export default projectSchema;
