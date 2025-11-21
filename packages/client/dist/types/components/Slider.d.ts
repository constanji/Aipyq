import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
type SliderProps = React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    className?: string;
    onDoubleClick?: () => void;
    'aria-describedby'?: string;
} & ({
    'aria-label': string;
    'aria-labelledby'?: never;
} | {
    'aria-labelledby': string;
    'aria-label'?: never;
} | {
    'aria-label': string;
    'aria-labelledby': string;
});
declare const Slider: React.ForwardRefExoticComponent<SliderProps & React.RefAttributes<HTMLSpanElement>>;
export { Slider };
//# sourceMappingURL=Slider.d.ts.map