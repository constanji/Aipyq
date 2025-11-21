import React from 'react';
import type { ControllerRenderProps, FieldValues, FieldPath } from 'react-hook-form';
export default function FormInput<TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ field, label, labelClass, inputClass, containerClass, labelAdjacent, placeholder, type, }: {
    field: ControllerRenderProps<TFieldValues, TName>;
    label: string;
    labelClass?: string;
    inputClass?: string;
    placeholder?: string;
    containerClass?: string;
    type?: 'string' | 'number';
    labelAdjacent?: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FormInput.d.ts.map