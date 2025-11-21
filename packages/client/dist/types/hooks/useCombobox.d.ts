/// <reference types="react" />
import type { OptionWithIcon, MentionOption } from '~/common';
export default function useCombobox({ value, options, }: {
    value: string;
    options: Array<OptionWithIcon | MentionOption>;
}): {
    open: boolean;
    setOpen: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    searchValue: string;
    setSearchValue: import("react").Dispatch<import("react").SetStateAction<string>>;
    matches: (OptionWithIcon | MentionOption)[];
};
//# sourceMappingURL=useCombobox.d.ts.map