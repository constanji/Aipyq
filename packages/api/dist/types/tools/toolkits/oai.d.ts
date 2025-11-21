import { z } from 'zod';
export declare const oaiToolkit: {
    readonly image_gen_oai: {
        readonly name: "image_gen_oai";
        readonly description: string;
        readonly schema: z.ZodObject<{
            prompt: z.ZodString;
            background: z.ZodOptional<z.ZodEnum<["transparent", "opaque", "auto"]>>;
            quality: z.ZodOptional<z.ZodEnum<["auto", "high", "medium", "low"]>>;
            size: z.ZodOptional<z.ZodEnum<["auto", "1024x1024", "1536x1024", "1024x1536"]>>;
        }, "strip", z.ZodTypeAny, {
            prompt: string;
            size?: "auto" | "1024x1024" | "1536x1024" | "1024x1536" | undefined;
            background?: "auto" | "transparent" | "opaque" | undefined;
            quality?: "auto" | "high" | "low" | "medium" | undefined;
        }, {
            prompt: string;
            size?: "auto" | "1024x1024" | "1536x1024" | "1024x1536" | undefined;
            background?: "auto" | "transparent" | "opaque" | undefined;
            quality?: "auto" | "high" | "low" | "medium" | undefined;
        }>;
        readonly responseFormat: "content_and_artifact";
    };
    readonly image_edit_oai: {
        readonly name: "image_edit_oai";
        readonly description: string;
        readonly schema: z.ZodObject<{
            image_ids: z.ZodArray<z.ZodString, "many">;
            prompt: z.ZodString;
            quality: z.ZodOptional<z.ZodEnum<["auto", "high", "medium", "low"]>>;
            size: z.ZodOptional<z.ZodEnum<["auto", "1024x1024", "1536x1024", "1024x1536", "256x256", "512x512"]>>;
        }, "strip", z.ZodTypeAny, {
            prompt: string;
            image_ids: string[];
            size?: "auto" | "1024x1024" | "1536x1024" | "1024x1536" | "256x256" | "512x512" | undefined;
            quality?: "auto" | "high" | "low" | "medium" | undefined;
        }, {
            prompt: string;
            image_ids: string[];
            size?: "auto" | "1024x1024" | "1536x1024" | "1024x1536" | "256x256" | "512x512" | undefined;
            quality?: "auto" | "high" | "low" | "medium" | undefined;
        }>;
        readonly responseFormat: "content_and_artifact";
    };
};
//# sourceMappingURL=oai.d.ts.map