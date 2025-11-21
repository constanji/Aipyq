import React from 'react';
/** This is a generic that can be added to Menu and Select components */
export default function MultiSearch({ value, onChange, placeholder, className, }: {
    value: string | null;
    onChange: (filter: string) => void;
    placeholder?: string;
    className?: string;
}): import("react/jsx-runtime").JSX.Element;
/**
 * Hook for conditionally making a multi-element list component into a sortable component
 * Returns a RenderNode for search input when search functionality is available
 * @param availableOptions
 * @param placeholder
 * @param getTextKeyOverride
 * @param className - Additional classnames to add to the search container
 * @param disabled - If the search should be disabled
 * @returns
 */
export declare function useMultiSearch<OptionsType extends unknown[]>({ availableOptions, placeholder, getTextKeyOverride, className, disabled, }: {
    availableOptions?: OptionsType;
    placeholder?: string;
    getTextKeyOverride?: (node: OptionsType[0]) => string;
    className?: string;
    disabled?: boolean;
}): [OptionsType, React.ReactNode];
//# sourceMappingURL=MultiSearch.d.ts.map