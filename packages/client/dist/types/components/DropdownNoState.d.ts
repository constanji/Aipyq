import { FC } from 'react';
import type { Option } from '~/common';
interface DropdownProps {
    value?: string | Option;
    label?: string;
    onChange: (value: string | Option) => void;
    options: (string | Option)[];
    className?: string;
    sizeClasses?: string;
    testId?: string;
}
declare const Dropdown: FC<DropdownProps>;
export default Dropdown;
//# sourceMappingURL=DropdownNoState.d.ts.map