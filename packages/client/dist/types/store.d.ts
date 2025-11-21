import { NotificationSeverity } from '~/common';
export declare const langAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const chatDirectionAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export declare const fontSizeAtom: import("jotai").PrimitiveAtom<string> & {
    init: string;
};
export type ToastState = {
    open: boolean;
    message: string;
    severity: NotificationSeverity;
    showIcon: boolean;
};
export declare const toastState: import("jotai").PrimitiveAtom<ToastState> & {
    init: ToastState;
};
//# sourceMappingURL=store.d.ts.map