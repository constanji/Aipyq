import * as React from 'react';
declare const InputOTP: React.ForwardRefExoticComponent<(Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, "maxLength" | "value" | "onChange" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string | undefined;
    onChange?: ((newValue: string) => unknown) | undefined;
    maxLength: number;
    textAlign?: "center" | "left" | "right" | undefined;
    onComplete?: ((...args: any[]) => unknown) | undefined;
    pushPasswordManagerStrategy?: "none" | "increase-width" | undefined;
    pasteTransformer?: ((pasted: string) => string) | undefined;
    containerClassName?: string | undefined;
    noScriptCSSFallback?: string | null | undefined;
} & {
    render: (props: import("input-otp").RenderProps) => React.ReactNode;
    children?: undefined;
} & React.RefAttributes<HTMLInputElement>, "ref"> | Omit<Omit<React.InputHTMLAttributes<HTMLInputElement>, "maxLength" | "value" | "onChange" | "textAlign" | "onComplete" | "pushPasswordManagerStrategy" | "pasteTransformer" | "containerClassName" | "noScriptCSSFallback"> & {
    value?: string | undefined;
    onChange?: ((newValue: string) => unknown) | undefined;
    maxLength: number;
    textAlign?: "center" | "left" | "right" | undefined;
    onComplete?: ((...args: any[]) => unknown) | undefined;
    pushPasswordManagerStrategy?: "none" | "increase-width" | undefined;
    pasteTransformer?: ((pasted: string) => string) | undefined;
    containerClassName?: string | undefined;
    noScriptCSSFallback?: string | null | undefined;
} & {
    render?: undefined;
    children: React.ReactNode;
} & React.RefAttributes<HTMLInputElement>, "ref">) & React.RefAttributes<HTMLInputElement>>;
declare const InputOTPGroup: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSlot: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & {
    index: number;
} & React.RefAttributes<HTMLDivElement>>;
declare const InputOTPSeparator: React.ForwardRefExoticComponent<Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
//# sourceMappingURL=InputOTP.d.ts.map