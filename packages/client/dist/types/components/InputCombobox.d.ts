import React from 'react';
import type { OptionWithIcon } from '~/common';
type ComboboxProps = {
    label?: string;
    placeholder?: string;
    options: OptionWithIcon[] | string[];
    className?: string;
    labelClassName?: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
};
export declare const InputCombobox: React.FC<ComboboxProps>;
export {};
//# sourceMappingURL=InputCombobox.d.ts.map