import React from 'react';
import { IThemeRGB } from '../types';
type ThemeContextType = {
    theme: string;
    setTheme: (theme: string) => void;
    themeRGB?: IThemeRGB;
    setThemeRGB: (colors?: IThemeRGB) => void;
    themeName?: string;
    setThemeName: (name?: string) => void;
    resetTheme: () => void;
};
export declare const ThemeContext: React.Context<ThemeContextType>;
export interface ThemeProviderProps {
    children: React.ReactNode;
    themeRGB?: IThemeRGB;
    themeName?: string;
    initialTheme?: string;
}
/**
 * Check if theme is dark
 */
export declare const isDark: (theme: string) => boolean;
/**
 * ThemeProvider component that handles both dark/light mode switching
 * and dynamic color themes via CSS variables with localStorage persistence
 */
export declare function ThemeProvider({ children, themeRGB: propThemeRGB, themeName: propThemeName, initialTheme, }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Hook to access the current theme context
 */
export declare function useTheme(): ThemeContextType;
export default ThemeProvider;
//# sourceMappingURL=ThemeProvider.d.ts.map