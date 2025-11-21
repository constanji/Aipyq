import * as React from 'react';
export type InputWithDropdownProps = React.InputHTMLAttributes<HTMLInputElement> & {
    options: string[];
    onSelect?: (value: string) => void;
};
declare const InputWithDropdown: React.ForwardRefExoticComponent<React.InputHTMLAttributes<HTMLInputElement> & {
    options: string[];
    onSelect?: ((value: string) => void) | undefined;
} & React.RefAttributes<HTMLInputElement>>;
export default InputWithDropdown;
//# sourceMappingURL=InputWithDropDown.d.ts.map