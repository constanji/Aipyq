import React from 'react';
import type { Option } from '~/common';
import './Dropdown.css';
interface DropdownProps {
    value?: string;
    label?: string;
    onChange: (value: string) => void;
    options: (string | Option | {
        divider: true;
    })[];
    className?: string;
    sizeClasses?: string;
    testId?: string;
    icon?: React.ReactNode;
    iconOnly?: boolean;
    renderValue?: (option: Option) => React.ReactNode;
    ariaLabel?: string;
    'aria-labelledby'?: string;
    portal?: boolean;
}
declare const Dropdown: React.FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=Dropdown.d.ts.map