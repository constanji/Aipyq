/// <reference types="react" />
import * as Ariakit from '@ariakit/react';
import './Tooltip.css';
interface TooltipAnchorProps extends Ariakit.TooltipAnchorProps {
    role?: string;
    className?: string;
    description: string;
    enableHTML?: boolean;
    side?: 'top' | 'bottom' | 'left' | 'right';
}
export declare const TooltipAnchor: import("react").ForwardRefExoticComponent<Omit<TooltipAnchorProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export {};
//# sourceMappingURL=Tooltip.d.ts.map