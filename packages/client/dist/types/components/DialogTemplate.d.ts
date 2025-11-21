import { ReactNode } from 'react';
type SelectionProps = {
    selectHandler?: () => void;
    selectClasses?: string;
    selectText?: string;
};
type DialogTemplateProps = {
    title: string;
    description?: string;
    main?: ReactNode;
    buttons?: ReactNode;
    leftButtons?: ReactNode;
    selection?: SelectionProps;
    className?: string;
    headerClassName?: string;
    footerClassName?: string;
    showCloseButton?: boolean;
    showCancelButton?: boolean;
};
declare const DialogTemplate: import("react").ForwardRefExoticComponent<DialogTemplateProps & import("react").RefAttributes<HTMLDivElement>>;
export default DialogTemplate;
//# sourceMappingURL=DialogTemplate.d.ts.map