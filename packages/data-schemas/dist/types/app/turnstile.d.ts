import type { TCustomConfig, TConfigDefaults } from 'librechat-data-provider';
/**
 * Loads and maps the Cloudflare Turnstile configuration.
 *
 * Expected config structure:
 *
 * turnstile:
 *   siteKey: "your-site-key-here"
 *   options:
 *     language: "auto"    // "auto" or an ISO 639-1 language code (e.g. en)
 *     size: "normal"      // Options: "normal", "compact", "flexible", or "invisible"
 *
 * @param config - The loaded custom configuration.
 * @param configDefaults - The custom configuration default values.
 * @returns The mapped Turnstile configuration.
 */
export declare function loadTurnstileConfig(config: Partial<TCustomConfig> | undefined, configDefaults: TConfigDefaults): Partial<TCustomConfig['turnstile']>;
