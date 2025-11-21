import type { TShowToast } from '~/common';
import { type ToastState } from '~/store';
export default function useToast(showDelay?: number): {
    toast: ToastState;
    onOpenChange: (open: boolean) => void;
    showToast: ({ message, severity, showIcon, duration, status, }: TShowToast) => void;
};
//# sourceMappingURL=useToast.d.ts.map