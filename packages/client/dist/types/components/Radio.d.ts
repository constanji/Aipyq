import React from 'react';
interface Option {
    value: string;
    label: string;
}
interface RadioProps {
    options: Option[];
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}
declare const Radio: React.NamedExoticComponent<RadioProps>;
export default Radio;
//# sourceMappingURL=Radio.d.ts.map