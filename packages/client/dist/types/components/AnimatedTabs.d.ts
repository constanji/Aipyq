/// <reference types="react" />
import * as Ariakit from '@ariakit/react';
import './AnimatedTabs.css';
export interface TabItem {
    id?: string;
    label: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
}
export interface AnimatedTabsProps {
    tabs: TabItem[];
    className?: string;
    tabListClassName?: string;
    tabClassName?: string;
    tabPanelClassName?: string;
    tabListProps?: Ariakit.TabListProps;
    containerClassName?: string;
    defaultSelectedId?: string;
}
export declare function AnimatedTabs({ tabs, className, tabListClassName, tabClassName, tabPanelClassName, containerClassName, tabListProps, defaultSelectedId, }: AnimatedTabsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AnimatedTabs.d.ts.map