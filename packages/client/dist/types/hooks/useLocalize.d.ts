import { TOptions } from 'i18next';
import { resources } from '~/locales/i18n';
export type TranslationKeys = keyof typeof resources.en.translation;
export default function useLocalize(): (phraseKey: TranslationKeys, options?: TOptions) => string;
//# sourceMappingURL=useLocalize.d.ts.map