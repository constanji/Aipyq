import React from 'react';
import type * as t from '~/common';
import './Dropdown.css';
interface DropdownProps {
    keyPrefix?: string;
    trigger: React.ReactNode;
    items: t.MenuItemProps[];
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    className?: string;
    iconClassName?: string;
    itemClassName?: string;
    sameWidth?: boolean;
    anchor?: {
        x: string;
        y: string;
    };
    gutter?: number;
    modal?: boolean;
    portal?: boolean;
    preserveTabOrder?: boolean;
    focusLoop?: boolean;
    menuId: string;
    mountByState?: boolean;
    unmountOnHide?: boolean;
    finalFocus?: React.RefObject<HTMLElement>;
}
declare const DropdownPopup: React.FC<DropdownProps>;
export default DropdownPopup;
//# sourceMappingURL=DropdownPopup.d.ts.map