/// <reference types="react" />
import type { OptionWithIcon } from '~/common';
import './AnimatePopover.css';
interface ControlComboboxProps {
    selectedValue: string;
    displayValue?: string;
    items: OptionWithIcon[];
    setValue: (value: string) => void;
    ariaLabel: string;
    searchPlaceholder?: string;
    selectPlaceholder?: string;
    isCollapsed: boolean;
    SelectIcon?: React.ReactNode;
    containerClassName?: string;
    iconClassName?: string;
    showCarat?: boolean;
    className?: string;
    disabled?: boolean;
    iconSide?: 'left' | 'right';
    selectId?: string;
}
declare function ControlCombobox({ selectedValue, displayValue, items, setValue, ariaLabel, searchPlaceholder, selectPlaceholder, containerClassName, isCollapsed, SelectIcon, showCarat, className, disabled, iconClassName, iconSide, selectId, }: ControlComboboxProps): import("react/jsx-runtime").JSX.Element;
declare const _default: import("react").MemoExoticComponent<typeof ControlCombobox>;
export default _default;
//# sourceMappingURL=ControlCombobox.d.ts.map