import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
interface OGDialogProps extends DialogPrimitive.DialogProps {
    triggerRef?: React.RefObject<HTMLButtonElement | HTMLInputElement | null>;
    triggerRefs?: React.RefObject<HTMLButtonElement | HTMLInputElement | null>[];
}
declare const Dialog: React.ForwardRefExoticComponent<OGDialogProps & React.RefAttributes<HTMLDivElement>>;
declare const DialogTrigger: React.ForwardRefExoticComponent<DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const DialogPortal: React.FC<DialogPrimitive.DialogPortalProps>;
declare const DialogClose: React.ForwardRefExoticComponent<DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>>;
export declare const DialogOverlay: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const DialogContent: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>, "ref"> & {
    showCloseButton?: boolean | undefined;
    disableScroll?: boolean | undefined;
    overlayClassName?: string | undefined;
} & React.RefAttributes<HTMLDivElement>>;
declare const DialogHeader: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogFooter: {
    ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
declare const DialogTitle: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>, "ref"> & React.RefAttributes<HTMLHeadingElement>>;
declare const DialogDescription: React.ForwardRefExoticComponent<Omit<DialogPrimitive.DialogDescriptionProps & React.RefAttributes<HTMLParagraphElement>, "ref"> & React.RefAttributes<HTMLParagraphElement>>;
export { Dialog as OGDialog, DialogPortal as OGDialogPortal, DialogOverlay as OGDialogOverlay, DialogClose as OGDialogClose, DialogTrigger as OGDialogTrigger, DialogContent as OGDialogContent, DialogHeader as OGDialogHeader, DialogFooter as OGDialogFooter, DialogTitle as OGDialogTitle, DialogDescription as OGDialogDescription, };
//# sourceMappingURL=OriginalDialog.d.ts.map