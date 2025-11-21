import { IThemeRGB } from '../types';
/**
 * Atom for storing the theme mode (light/dark/system) in localStorage
 * Key: 'color-theme'
 */
export declare const themeModeAtom: import("jotai").WritableAtom<string, [string | typeof import("jotai/utils").RESET | ((prev: string) => string | typeof import("jotai/utils").RESET)], void>;
/**
 * Atom for storing custom theme colors in localStorage
 * Key: 'theme-colors'
 */
export declare const themeColorsAtom: import("jotai").WritableAtom<IThemeRGB | undefined, [typeof import("jotai/utils").RESET | IThemeRGB | ((prev: IThemeRGB | undefined) => typeof import("jotai/utils").RESET | IThemeRGB | undefined) | undefined], void>;
/**
 * Atom for storing the theme name in localStorage
 * Key: 'theme-name'
 */
export declare const themeNameAtom: import("jotai").WritableAtom<string | undefined, [string | typeof import("jotai/utils").RESET | ((prev: string | undefined) => string | typeof import("jotai/utils").RESET | undefined) | undefined], void>;
//# sourceMappingURL=themeAtoms.d.ts.map