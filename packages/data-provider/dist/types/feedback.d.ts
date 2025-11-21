import { z } from 'zod';
export type TFeedbackRating = 'thumbsUp' | 'thumbsDown';
export declare const FEEDBACK_RATINGS: readonly ["thumbsUp", "thumbsDown"];
export declare const FEEDBACK_REASON_KEYS: readonly ["not_matched", "inaccurate", "bad_style", "missing_image", "unjustified_refusal", "not_helpful", "other", "accurate_reliable", "creative_solution", "clear_well_written", "attention_to_detail"];
export type TFeedbackTagKey = (typeof FEEDBACK_REASON_KEYS)[number];
export interface TFeedbackTag {
    key: TFeedbackTagKey;
    label: string;
    direction: TFeedbackRating;
    icon: string;
}
export declare const FEEDBACK_TAGS: TFeedbackTag[];
export declare function getTagsForRating(rating: TFeedbackRating): TFeedbackTag[];
export declare const feedbackTagKeySchema: z.ZodEnum<["not_matched", "inaccurate", "bad_style", "missing_image", "unjustified_refusal", "not_helpful", "other", "accurate_reliable", "creative_solution", "clear_well_written", "attention_to_detail"]>;
export declare const feedbackRatingSchema: z.ZodEnum<["thumbsUp", "thumbsDown"]>;
export declare const feedbackSchema: z.ZodObject<{
    rating: z.ZodEnum<["thumbsUp", "thumbsDown"]>;
    tag: z.ZodEnum<["not_matched", "inaccurate", "bad_style", "missing_image", "unjustified_refusal", "not_helpful", "other", "accurate_reliable", "creative_solution", "clear_well_written", "attention_to_detail"]>;
    text: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    rating: "thumbsUp" | "thumbsDown";
    tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
    text?: string | undefined;
}, {
    rating: "thumbsUp" | "thumbsDown";
    tag: "not_matched" | "inaccurate" | "bad_style" | "missing_image" | "unjustified_refusal" | "not_helpful" | "other" | "accurate_reliable" | "creative_solution" | "clear_well_written" | "attention_to_detail";
    text?: string | undefined;
}>;
export type TMinimalFeedback = z.infer<typeof feedbackSchema>;
export type TFeedback = {
    rating: TFeedbackRating;
    tag: TFeedbackTag | undefined;
    text?: string;
};
export declare function toMinimalFeedback(feedback: TFeedback | undefined): TMinimalFeedback | undefined;
export declare function getTagByKey(key: TFeedbackTagKey | undefined): TFeedbackTag | undefined;
