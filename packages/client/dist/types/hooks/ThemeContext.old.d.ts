import React from 'react';
type ProviderValue = {
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
};
export declare const isDark: (theme: string) => boolean;
export declare const ThemeContext: React.Context<ProviderValue>;
export declare const ThemeProvider: ({ initialTheme, children, }: {
    initialTheme?: string | undefined;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ThemeContext.old.d.ts.map