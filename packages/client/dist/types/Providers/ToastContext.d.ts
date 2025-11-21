import { ReactNode } from 'react';
import type { TShowToast } from '~/common';
type ToastContextType = {
    showToast: ({ message, severity, showIcon, duration }: TShowToast) => void;
};
export declare const ToastContext: import("react").Context<ToastContextType>;
export declare function useToastContext(): ToastContextType;
export default function ToastProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ToastContext.d.ts.map