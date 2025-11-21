/// <reference types="react" />
import type { TextareaAutosizeProps } from 'react-textarea-autosize';
type BaseTextareaAutosizeProps = Omit<TextareaAutosizeProps, 'aria-label' | 'aria-labelledby'>;
export type TextareaAutosizePropsWithAria = (BaseTextareaAutosizeProps & {
    'aria-label': string;
    'aria-labelledby'?: never;
}) | (BaseTextareaAutosizeProps & {
    'aria-labelledby': string;
    'aria-label'?: never;
});
export declare const TextareaAutosize: import("react").ForwardRefExoticComponent<TextareaAutosizePropsWithAria & import("react").RefAttributes<HTMLTextAreaElement>>;
export {};
//# sourceMappingURL=TextareaAutosize.d.ts.map