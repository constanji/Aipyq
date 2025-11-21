import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
type BaseCheckboxProps = Omit<React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>, 'aria-label' | 'aria-labelledby'> & {
    asChild?: boolean;
};
export type CheckboxProps = (BaseCheckboxProps & {
    'aria-label': string;
    'aria-labelledby'?: never;
}) | (BaseCheckboxProps & {
    'aria-labelledby': string;
    'aria-label'?: never;
});
declare const Checkbox: React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLButtonElement>>;
export { Checkbox };
//# sourceMappingURL=Checkbox.d.ts.map