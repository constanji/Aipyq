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
import mongoose, { Document } from 'mongoose';
export interface IAction extends Document {
    user: mongoose.Types.ObjectId;
    action_id: string;
    type: string;
    settings?: unknown;
    agent_id?: string;
    assistant_id?: string;
    metadata: {
        api_key?: string;
        auth: {
            authorization_type?: string;
            custom_auth_header?: string;
            type: 'service_http' | 'oauth' | 'none';
            authorization_content_type?: string;
            authorization_url?: string;
            client_url?: string;
            scope?: string;
            token_exchange_method: 'default_post' | 'basic_auth_header' | null;
        };
        domain: string;
        privacy_policy_url?: string;
        raw_spec?: string;
        oauth_client_id?: string;
        oauth_client_secret?: string;
    };
}
