/// <reference types="react" />
import type { OptionWithIcon } from '~/common';
export default function ComboboxComponent({ selectedValue, displayValue, items, setValue, ariaLabel, searchPlaceholder, selectPlaceholder, isCollapsed, SelectIcon, }: {
    ariaLabel: string;
    displayValue?: string;
    selectedValue: string;
    searchPlaceholder?: string;
    selectPlaceholder?: string;
    items: OptionWithIcon[] | string[];
    setValue: (value: string) => void;
    isCollapsed: boolean;
    SelectIcon?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Combobox.d.ts.map