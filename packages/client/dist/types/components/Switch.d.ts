import * as React from 'react';
import * as SwitchPrimitives from '@radix-ui/react-switch';
type BaseSwitchProps = Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>, 'aria-label' | 'aria-labelledby'>;
type SwitchProps = (BaseSwitchProps & {
    'aria-label': string;
    'aria-labelledby'?: never;
}) | (BaseSwitchProps & {
    'aria-labelledby': string;
    'aria-label'?: never;
});
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLButtonElement>>;
export { Switch };
//# sourceMappingURL=Switch.d.ts.map