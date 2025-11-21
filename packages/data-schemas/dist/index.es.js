import { EModelEndpoint, agentsEndpointSchema, memorySchema, removeNullishValues, SafeSearchTypes, defaultAssistantsVersion, Capabilities, assistantEndpointSchema, validateAzureGroups, mapModelToAzureConfig, OCRStrategy, getConfigDefaults, FileSources, Constants, PermissionTypes, Permissions, SystemRoles, ResourceType, PrincipalType, PrincipalModel, roleDefaults, AccessRoleIds } from 'librechat-data-provider';
import winston from 'winston';
import 'winston-daily-rotate-file';
import { klona } from 'klona';
import path from 'path';
import jwt from 'jsonwebtoken';
import { webcrypto } from 'node:crypto';
import mongoose, { Schema, Types } from 'mongoose';
import _ from 'lodash';
import { MeiliSearch } from 'meilisearch';
import { nanoid } from 'nanoid';

/**
 * Sets up the Agents configuration from the config (`librechat.yaml`) file.
 * If no agents config is defined, uses the provided defaults or parses empty object.
 *
 * @param config - The loaded custom configuration.
 * @param [defaultConfig] - Default configuration from getConfigDefaults.
 * @returns The Agents endpoint configuration.
 */
function agentsConfigSetup(config, defaultConfig) {
    var _a;
    const agentsConfig = (_a = config === null || config === void 0 ? void 0 : config.endpoints) === null || _a === void 0 ? void 0 : _a[EModelEndpoint.agents];
    if (!agentsConfig) {
        return defaultConfig || agentsEndpointSchema.parse({});
    }
    const parsedConfig = agentsEndpointSchema.parse(agentsConfig);
    return parsedConfig;
}

const hasValidAgent = (agent) => !!agent &&
    (('id' in agent && !!agent.id) ||
        ('provider' in agent && 'model' in agent && !!agent.provider && !!agent.model));
const isDisabled = (config) => !config || config.disabled === true;
function loadMemoryConfig(config) {
    var _a;
    if (!config)
        return undefined;
    if (isDisabled(config))
        return config;
    if (!hasValidAgent(config.agent)) {
        return { ...config, disabled: true };
    }
    const charLimit = (_a = memorySchema.shape.charLimit.safeParse(config.charLimit).data) !== null && _a !== void 0 ? _a : 10000;
    return { ...config, charLimit };
}
function isMemoryEnabled(config) {
    if (isDisabled(config))
        return false;
    return hasValidAgent(config.agent);
}

/**
 * Loads the default interface object.
 * @param params - The loaded custom configuration.
 * @param params.config - The loaded custom configuration.
 * @param params.configDefaults - The custom configuration default values.
 * @returns default interface object.
 */
async function loadDefaultInterface({ config, configDefaults, }) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    const { interface: interfaceConfig } = config !== null && config !== void 0 ? config : {};
    const { interface: defaults } = configDefaults;
    const hasModelSpecs = ((_c = (_b = (_a = config === null || config === void 0 ? void 0 : config.modelSpecs) === null || _a === void 0 ? void 0 : _a.list) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0;
    const includesAddedEndpoints = ((_f = (_e = (_d = config === null || config === void 0 ? void 0 : config.modelSpecs) === null || _d === void 0 ? void 0 : _d.addedEndpoints) === null || _e === void 0 ? void 0 : _e.length) !== null && _f !== void 0 ? _f : 0) > 0;
    const memoryConfig = config === null || config === void 0 ? void 0 : config.memory;
    const memoryEnabled = isMemoryEnabled(memoryConfig);
    /** Only disable memories if memory config is present but disabled/invalid */
    const shouldDisableMemories = memoryConfig && !memoryEnabled;
    const loadedInterface = removeNullishValues({
        // UI elements - use schema defaults
        endpointsMenu: (_g = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.endpointsMenu) !== null && _g !== void 0 ? _g : (hasModelSpecs ? false : defaults.endpointsMenu),
        modelSelect: (_h = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.modelSelect) !== null && _h !== void 0 ? _h : (hasModelSpecs ? includesAddedEndpoints : defaults.modelSelect),
        parameters: (_j = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.parameters) !== null && _j !== void 0 ? _j : (hasModelSpecs ? false : defaults.parameters),
        presets: (_k = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.presets) !== null && _k !== void 0 ? _k : (hasModelSpecs ? false : defaults.presets),
        sidePanel: (_l = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.sidePanel) !== null && _l !== void 0 ? _l : defaults.sidePanel,
        privacyPolicy: (_m = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.privacyPolicy) !== null && _m !== void 0 ? _m : defaults.privacyPolicy,
        termsOfService: (_o = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.termsOfService) !== null && _o !== void 0 ? _o : defaults.termsOfService,
        mcpServers: (_p = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.mcpServers) !== null && _p !== void 0 ? _p : defaults.mcpServers,
        customWelcome: (_q = interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.customWelcome) !== null && _q !== void 0 ? _q : defaults.customWelcome,
        // Permissions - only include if explicitly configured
        bookmarks: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.bookmarks,
        memories: shouldDisableMemories ? false : interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.memories,
        prompts: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.prompts,
        multiConvo: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.multiConvo,
        agents: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.agents,
        temporaryChat: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.temporaryChat,
        runCode: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.runCode,
        webSearch: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.webSearch,
        fileSearch: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.fileSearch,
        fileCitations: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.fileCitations,
        peoplePicker: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.peoplePicker,
        marketplace: interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.marketplace,
    });
    return loadedInterface;
}

/**
 * ESM-native object traversal utility
 * Simplified implementation focused on the forEach use case
 */
function isObject(value) {
    if (value === null || typeof value !== 'object') {
        return false;
    }
    // Treat these built-in types as leaf nodes, not objects to traverse
    if (value instanceof Date)
        return false;
    if (value instanceof RegExp)
        return false;
    if (value instanceof Error)
        return false;
    if (value instanceof URL)
        return false;
    // Check for Buffer (Node.js)
    if (typeof Buffer !== 'undefined' && Buffer.isBuffer(value))
        return false;
    // Check for TypedArrays and ArrayBuffer
    if (ArrayBuffer.isView(value))
        return false;
    if (value instanceof ArrayBuffer)
        return false;
    if (value instanceof SharedArrayBuffer)
        return false;
    // Check for other built-in types that shouldn't be traversed
    if (value instanceof Promise)
        return false;
    if (value instanceof WeakMap)
        return false;
    if (value instanceof WeakSet)
        return false;
    if (value instanceof Map)
        return false;
    if (value instanceof Set)
        return false;
    // Check if it's a primitive wrapper object
    const stringTag = Object.prototype.toString.call(value);
    if (stringTag === '[object Boolean]' ||
        stringTag === '[object Number]' ||
        stringTag === '[object String]') {
        return false;
    }
    return true;
}
// Helper to safely set a property on an object or array
function setProperty(obj, key, value) {
    if (Array.isArray(obj) && typeof key === 'number') {
        obj[key] = value;
    }
    else if (!Array.isArray(obj) && typeof key === 'string') {
        obj[key] = value;
    }
    else if (!Array.isArray(obj) && typeof key === 'number') {
        // Handle numeric keys on objects
        obj[key] = value;
    }
}
// Helper to safely delete a property from an object
function deleteProperty(obj, key) {
    if (Array.isArray(obj) && typeof key === 'number') {
        // For arrays, we should use splice, but this is handled in remove()
        // This function is only called for non-array deletion
        return;
    }
    if (!Array.isArray(obj)) {
        delete obj[key];
    }
}
function forEach(obj, callback) {
    const visited = new WeakSet();
    function walk(node, path = [], parent) {
        // Check for circular references
        let circular = null;
        if (isObject(node)) {
            if (visited.has(node)) {
                // Find the circular reference in the parent chain
                let p = parent;
                while (p) {
                    if (p.node === node) {
                        circular = p;
                        break;
                    }
                    p = p.parent;
                }
                return; // Skip circular references
            }
            visited.add(node);
        }
        const key = path.length > 0 ? path[path.length - 1] : undefined;
        const isRoot = path.length === 0;
        const level = path.length;
        // Determine if this is a leaf node
        const isLeaf = !isObject(node) ||
            (Array.isArray(node) && node.length === 0) ||
            Object.keys(node).length === 0;
        // Create context
        const context = {
            node,
            path: [...path],
            parent,
            key,
            isLeaf,
            notLeaf: !isLeaf,
            isRoot,
            notRoot: !isRoot,
            level,
            circular,
            update(value) {
                if (!isRoot && parent && key !== undefined && isObject(parent.node)) {
                    setProperty(parent.node, key, value);
                }
                this.node = value;
            },
            remove() {
                if (!isRoot && parent && key !== undefined && isObject(parent.node)) {
                    if (Array.isArray(parent.node) && typeof key === 'number') {
                        parent.node.splice(key, 1);
                    }
                    else {
                        deleteProperty(parent.node, key);
                    }
                }
            },
        };
        // Call the callback with the context
        callback.call(context, node);
        // Traverse children if not circular and is an object
        if (!circular && isObject(node) && !isLeaf) {
            if (Array.isArray(node)) {
                for (let i = 0; i < node.length; i++) {
                    walk(node[i], [...path, i], context);
                }
            }
            else {
                for (const [childKey, childValue] of Object.entries(node)) {
                    walk(childValue, [...path, childKey], context);
                }
            }
        }
    }
    walk(obj);
}
// Main traverse function that returns an object with forEach method
function traverse(obj) {
    return {
        forEach(callback) {
            forEach(obj, callback);
        },
    };
}

const SPLAT_SYMBOL = Symbol.for('splat');
const MESSAGE_SYMBOL = Symbol.for('message');
const CONSOLE_JSON_STRING_LENGTH = parseInt(process.env.CONSOLE_JSON_STRING_LENGTH || '', 10) || 255;
const sensitiveKeys = [
    /^(sk-)[^\s]+/, // OpenAI API key pattern
    /(Bearer )[^\s]+/, // Header: Bearer token pattern
    /(api-key:? )[^\s]+/, // Header: API key pattern
    /(key=)[^\s]+/, // URL query param: sensitive key pattern (Google)
];
/**
 * Determines if a given value string is sensitive and returns matching regex patterns.
 *
 * @param valueStr - The value string to check.
 * @returns An array of regex patterns that match the value string.
 */
function getMatchingSensitivePatterns(valueStr) {
    if (valueStr) {
        // Filter and return all regex patterns that match the value string
        return sensitiveKeys.filter((regex) => regex.test(valueStr));
    }
    return [];
}
/**
 * Redacts sensitive information from a console message and trims it to a specified length if provided.
 * @param str - The console message to be redacted.
 * @param trimLength - The optional length at which to trim the redacted message.
 * @returns The redacted and optionally trimmed console message.
 */
function redactMessage(str, trimLength) {
    if (!str) {
        return '';
    }
    const patterns = getMatchingSensitivePatterns(str);
    patterns.forEach((pattern) => {
        str = str.replace(pattern, '$1[REDACTED]');
    });
    return str;
}
/**
 * Redacts sensitive information from log messages if the log level is 'error'.
 * Note: Intentionally mutates the object.
 * @param info - The log information object.
 * @returns The modified log information object.
 */
const redactFormat = winston.format((info) => {
    if (info.level === 'error') {
        // Type guard to ensure message is a string
        if (typeof info.message === 'string') {
            info.message = redactMessage(info.message);
        }
        // Handle MESSAGE_SYMBOL with type safety
        const symbolValue = info[MESSAGE_SYMBOL];
        if (typeof symbolValue === 'string') {
            info[MESSAGE_SYMBOL] = redactMessage(symbolValue);
        }
    }
    return info;
});
/**
 * Truncates long strings, especially base64 image data, within log messages.
 *
 * @param value - The value to be inspected and potentially truncated.
 * @param length - The length at which to truncate the value. Default: 100.
 * @returns The truncated or original value.
 */
const truncateLongStrings = (value, length = 100) => {
    if (typeof value === 'string') {
        return value.length > length ? value.substring(0, length) + '... [truncated]' : value;
    }
    return value;
};
/**
 * An array mapping function that truncates long strings (objects converted to JSON strings).
 * @param item - The item to be condensed.
 * @returns The condensed item.
 */
const condenseArray = (item) => {
    if (typeof item === 'string') {
        return truncateLongStrings(JSON.stringify(item));
    }
    else if (typeof item === 'object') {
        return truncateLongStrings(JSON.stringify(item));
    }
    return item;
};
/**
 * Formats log messages for debugging purposes.
 * - Truncates long strings within log messages.
 * - Condenses arrays by truncating long strings and objects as strings within array items.
 * - Redacts sensitive information from log messages if the log level is 'error'.
 * - Converts log information object to a formatted string.
 *
 * @param options - The options for formatting log messages.
 * @returns The formatted log message.
 */
const debugTraverse = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
    if (!message) {
        return `${timestamp} ${level}`;
    }
    // Type-safe version of the CJS logic: !message?.trim || typeof message !== 'string'
    if (typeof message !== 'string' || !message.trim) {
        return `${timestamp} ${level}: ${JSON.stringify(message)}`;
    }
    const msgParts = [
        `${timestamp} ${level}: ${truncateLongStrings(message.trim(), 150)}`,
    ];
    try {
        if (level !== 'debug') {
            return msgParts[0];
        }
        if (!metadata) {
            return msgParts[0];
        }
        // Type-safe access to SPLAT_SYMBOL using bracket notation
        const metadataRecord = metadata;
        const splatArray = metadataRecord[SPLAT_SYMBOL];
        const debugValue = Array.isArray(splatArray) ? splatArray[0] : undefined;
        if (!debugValue) {
            return msgParts[0];
        }
        if (debugValue && Array.isArray(debugValue)) {
            msgParts.push(`\n${JSON.stringify(debugValue.map(condenseArray))}`);
            return msgParts.join('');
        }
        if (typeof debugValue !== 'object') {
            msgParts.push(` ${debugValue}`);
            return msgParts.join('');
        }
        msgParts.push('\n{');
        const copy = klona(metadata);
        try {
            const traversal = traverse(copy);
            traversal.forEach(function (value) {
                var _a;
                if (typeof (this === null || this === void 0 ? void 0 : this.key) === 'symbol') {
                    return;
                }
                let _parentKey = '';
                const parent = this.parent;
                if (typeof (parent === null || parent === void 0 ? void 0 : parent.key) !== 'symbol' && (parent === null || parent === void 0 ? void 0 : parent.key) !== undefined) {
                    _parentKey = String(parent.key);
                }
                const parentKey = `${parent && parent.notRoot ? _parentKey + '.' : ''}`;
                const tabs = `${parent && parent.notRoot ? '    ' : '  '}`;
                const currentKey = (_a = this === null || this === void 0 ? void 0 : this.key) !== null && _a !== void 0 ? _a : 'unknown';
                if (this.isLeaf && typeof value === 'string') {
                    const truncatedText = truncateLongStrings(value);
                    msgParts.push(`\n${tabs}${parentKey}${currentKey}: ${JSON.stringify(truncatedText)},`);
                }
                else if (this.notLeaf && Array.isArray(value) && value.length > 0) {
                    const currentMessage = `\n${tabs}// ${value.length} ${String(currentKey).replace(/s$/, '')}(s)`;
                    this.update(currentMessage);
                    msgParts.push(currentMessage);
                    const stringifiedArray = value.map(condenseArray);
                    msgParts.push(`\n${tabs}${parentKey}${currentKey}: [${stringifiedArray}],`);
                }
                else if (this.isLeaf && typeof value === 'function') {
                    msgParts.push(`\n${tabs}${parentKey}${currentKey}: function,`);
                }
                else if (this.isLeaf) {
                    msgParts.push(`\n${tabs}${parentKey}${currentKey}: ${value},`);
                }
            });
        }
        catch (e) {
            const errorMessage = e instanceof Error ? e.message : 'Unknown error';
            msgParts.push(`\n[LOGGER TRAVERSAL ERROR] ${errorMessage}`);
        }
        msgParts.push('\n}');
        return msgParts.join('');
    }
    catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'Unknown error';
        msgParts.push(`\n[LOGGER PARSING ERROR] ${errorMessage}`);
        return msgParts.join('');
    }
});
/**
 * Truncates long string values in JSON log objects.
 * Prevents outputting extremely long values (e.g., base64, blobs).
 */
const jsonTruncateFormat = winston.format((info) => {
    const truncateLongStrings = (str, maxLength) => str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
    const seen = new WeakSet();
    const truncateObject = (obj) => {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        // Handle circular references - now with proper object type
        if (seen.has(obj)) {
            return '[Circular]';
        }
        seen.add(obj);
        if (Array.isArray(obj)) {
            return obj.map((item) => truncateObject(item));
        }
        // We know this is an object at this point
        const objectRecord = obj;
        const newObj = {};
        Object.entries(objectRecord).forEach(([key, value]) => {
            if (typeof value === 'string') {
                newObj[key] = truncateLongStrings(value, CONSOLE_JSON_STRING_LENGTH);
            }
            else {
                newObj[key] = truncateObject(value);
            }
        });
        return newObj;
    };
    return truncateObject(info);
});

/**
 * Determine the log directory in a cross-compatible way.
 * Priority:
 * 1. LIBRECHAT_LOG_DIR environment variable
 * 2. If running within LibreChat monorepo (when cwd ends with /api), use api/logs
 * 3. If api/logs exists relative to cwd, use that (for running from project root)
 * 4. Otherwise, use logs directory relative to process.cwd()
 *
 * This avoids using __dirname which is not available in ESM modules
 */
const getLogDirectory = () => {
    if (process.env.LIBRECHAT_LOG_DIR) {
        return process.env.LIBRECHAT_LOG_DIR;
    }
    const cwd = process.cwd();
    // Check if we're running from within the api directory
    if (cwd.endsWith('/api') || cwd.endsWith('\\api')) {
        return path.join(cwd, 'logs');
    }
    // Check if api/logs exists relative to current directory (running from project root)
    // We'll just use the path and let the file system create it if needed
    const apiLogsPath = path.join(cwd, 'api', 'logs');
    // For LibreChat project structure, use api/logs
    // For external consumers, they should set LIBRECHAT_LOG_DIR
    if (cwd.includes('LibreChat')) {
        return apiLogsPath;
    }
    // Default to logs directory relative to current working directory
    return path.join(cwd, 'logs');
};

const logDir$1 = getLogDirectory();
const { NODE_ENV: NODE_ENV$1, DEBUG_LOGGING: DEBUG_LOGGING$1, CONSOLE_JSON, DEBUG_CONSOLE } = process.env;
const useConsoleJson = typeof CONSOLE_JSON === 'string' && CONSOLE_JSON.toLowerCase() === 'true';
const useDebugConsole = typeof DEBUG_CONSOLE === 'string' && DEBUG_CONSOLE.toLowerCase() === 'true';
const useDebugLogging$1 = typeof DEBUG_LOGGING$1 === 'string' && DEBUG_LOGGING$1.toLowerCase() === 'true';
const levels$1 = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    activity: 6,
    silly: 7,
};
winston.addColors({
    info: 'green',
    warn: 'italic yellow',
    error: 'red',
    debug: 'blue',
});
const level$1 = () => {
    const env = NODE_ENV$1 || 'development';
    return env === 'development' ? 'debug' : 'warn';
};
const fileFormat$1 = winston.format.combine(redactFormat(), winston.format.timestamp({ format: () => new Date().toISOString() }), winston.format.errors({ stack: true }), winston.format.splat());
const transports$1 = [
    new winston.transports.DailyRotateFile({
        level: 'error',
        filename: `${logDir$1}/error-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(fileFormat$1, winston.format.json()),
    }),
];
if (useDebugLogging$1) {
    transports$1.push(new winston.transports.DailyRotateFile({
        level: 'debug',
        filename: `${logDir$1}/debug-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(fileFormat$1, debugTraverse),
    }));
}
const consoleFormat$1 = winston.format.combine(redactFormat(), winston.format.colorize({ all: true }), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.printf((info) => {
    const message = `${info.timestamp} ${info.level}: ${info.message}`;
    return info.level.includes('error') ? redactMessage(message) : message;
}));
let consoleLogLevel = 'info';
if (useDebugConsole) {
    consoleLogLevel = 'debug';
}
// Add console transport
if (useDebugConsole) {
    transports$1.push(new winston.transports.Console({
        level: consoleLogLevel,
        format: useConsoleJson
            ? winston.format.combine(fileFormat$1, jsonTruncateFormat(), winston.format.json())
            : winston.format.combine(fileFormat$1, debugTraverse),
    }));
}
else if (useConsoleJson) {
    transports$1.push(new winston.transports.Console({
        level: consoleLogLevel,
        format: winston.format.combine(fileFormat$1, jsonTruncateFormat(), winston.format.json()),
    }));
}
else {
    transports$1.push(new winston.transports.Console({
        level: consoleLogLevel,
        format: consoleFormat$1,
    }));
}
// Create logger
const logger$1 = winston.createLogger({
    level: level$1(),
    levels: levels$1,
    transports: transports$1,
});

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
function loadTurnstileConfig(config, configDefaults) {
    var _a, _b;
    const { turnstile: customTurnstile } = config !== null && config !== void 0 ? config : {};
    const { turnstile: defaults } = configDefaults;
    const loadedTurnstile = removeNullishValues({
        siteKey: (_a = customTurnstile === null || customTurnstile === void 0 ? void 0 : customTurnstile.siteKey) !== null && _a !== void 0 ? _a : defaults === null || defaults === void 0 ? void 0 : defaults.siteKey,
        options: (_b = customTurnstile === null || customTurnstile === void 0 ? void 0 : customTurnstile.options) !== null && _b !== void 0 ? _b : defaults === null || defaults === void 0 ? void 0 : defaults.options,
    });
    const enabled = Boolean(loadedTurnstile.siteKey);
    if (enabled) {
        logger$1.debug('Turnstile is ENABLED with configuration:\n' + JSON.stringify(loadedTurnstile, null, 2));
    }
    else {
        logger$1.debug('Turnstile is DISABLED (no siteKey provided).');
    }
    return loadedTurnstile;
}

const webSearchAuth = {
    providers: {
        serper: {
            serperApiKey: 1,
        },
        searxng: {
            searxngInstanceUrl: 1,
            /** Optional (0) */
            searxngApiKey: 0,
        },
    },
    scrapers: {
        firecrawl: {
            firecrawlApiKey: 1,
            /** Optional (0) */
            firecrawlApiUrl: 0,
            firecrawlVersion: 0,
        },
        serper: {
            serperApiKey: 1,
        },
    },
    rerankers: {
        jina: {
            jinaApiKey: 1,
            /** Optional (0) */
            jinaApiUrl: 0,
        },
        cohere: { cohereApiKey: 1 },
    },
};
/**
 * Extracts all unique API keys from the webSearchAuth configuration object
 */
function getWebSearchKeys() {
    const keysSet = new Set();
    // Iterate through each category (providers, scrapers, rerankers)
    for (const category of Object.keys(webSearchAuth)) {
        const categoryObj = webSearchAuth[category];
        // Iterate through each service within the category
        for (const service of Object.keys(categoryObj)) {
            const serviceObj = categoryObj[service];
            // Extract the API keys from the service and add to set for deduplication
            for (const key of Object.keys(serviceObj)) {
                keysSet.add(key);
            }
        }
    }
    return Array.from(keysSet);
}
const webSearchKeys = getWebSearchKeys();
function loadWebSearchConfig(config) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const serperApiKey = (_a = config === null || config === void 0 ? void 0 : config.serperApiKey) !== null && _a !== void 0 ? _a : '${SERPER_API_KEY}';
    const searxngInstanceUrl = (_b = config === null || config === void 0 ? void 0 : config.searxngInstanceUrl) !== null && _b !== void 0 ? _b : '${SEARXNG_INSTANCE_URL}';
    const searxngApiKey = (_c = config === null || config === void 0 ? void 0 : config.searxngApiKey) !== null && _c !== void 0 ? _c : '${SEARXNG_API_KEY}';
    const firecrawlApiKey = (_d = config === null || config === void 0 ? void 0 : config.firecrawlApiKey) !== null && _d !== void 0 ? _d : '${FIRECRAWL_API_KEY}';
    const firecrawlApiUrl = (_e = config === null || config === void 0 ? void 0 : config.firecrawlApiUrl) !== null && _e !== void 0 ? _e : '${FIRECRAWL_API_URL}';
    const firecrawlVersion = (_f = config === null || config === void 0 ? void 0 : config.firecrawlVersion) !== null && _f !== void 0 ? _f : '${FIRECRAWL_VERSION}';
    const jinaApiKey = (_g = config === null || config === void 0 ? void 0 : config.jinaApiKey) !== null && _g !== void 0 ? _g : '${JINA_API_KEY}';
    const jinaApiUrl = (_h = config === null || config === void 0 ? void 0 : config.jinaApiUrl) !== null && _h !== void 0 ? _h : '${JINA_API_URL}';
    const cohereApiKey = (_j = config === null || config === void 0 ? void 0 : config.cohereApiKey) !== null && _j !== void 0 ? _j : '${COHERE_API_KEY}';
    const safeSearch = (_k = config === null || config === void 0 ? void 0 : config.safeSearch) !== null && _k !== void 0 ? _k : SafeSearchTypes.MODERATE;
    return {
        ...config,
        safeSearch,
        jinaApiKey,
        jinaApiUrl,
        cohereApiKey,
        serperApiKey,
        searxngApiKey,
        firecrawlApiKey,
        firecrawlApiUrl,
        firecrawlVersion,
        searxngInstanceUrl,
    };
}

/**
 * Normalize the endpoint name to system-expected value.
 * @param name
 */
function normalizeEndpointName(name = '') {
    return name.toLowerCase() === 'ollama' ? 'ollama' : name;
}
/**
 * Sets up Model Specs from the config (`librechat.yaml`) file.
 * @param [endpoints] - The loaded custom configuration for endpoints.
 * @param [modelSpecs] - The loaded custom configuration for model specs.
 * @param [interfaceConfig] - The loaded interface configuration.
 * @returns The processed model specs, if any.
 */
function processModelSpecs(endpoints, _modelSpecs, interfaceConfig) {
    var _a, _b, _c, _d;
    if (!_modelSpecs) {
        return undefined;
    }
    const list = _modelSpecs.list;
    const modelSpecs = [];
    const customEndpoints = (_a = endpoints === null || endpoints === void 0 ? void 0 : endpoints[EModelEndpoint.custom]) !== null && _a !== void 0 ? _a : [];
    if ((interfaceConfig === null || interfaceConfig === void 0 ? void 0 : interfaceConfig.modelSelect) !== true && ((_c = (_b = _modelSpecs.addedEndpoints) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0) > 0) {
        logger$1.warn(`To utilize \`addedEndpoints\`, which allows provider/model selections alongside model specs, set \`modelSelect: true\` in the interface configuration.

      Example:
      \`\`\`yaml
      interface:
        modelSelect: true
      \`\`\`
      `);
    }
    if (!list || list.length === 0) {
        return undefined;
    }
    for (const spec of list) {
        const currentEndpoint = (_d = spec.preset) === null || _d === void 0 ? void 0 : _d.endpoint;
        if (!currentEndpoint) {
            logger$1.warn('A model spec is missing the `endpoint` field within its `preset`. Skipping model spec...');
            continue;
        }
        if (EModelEndpoint[currentEndpoint] && currentEndpoint !== EModelEndpoint.custom) {
            modelSpecs.push(spec);
            continue;
        }
        else if (currentEndpoint === EModelEndpoint.custom) {
            logger$1.warn(`Model Spec with endpoint "${currentEndpoint}" is not supported. You must specify the name of the custom endpoint (case-sensitive, as defined in your config). Skipping model spec...`);
            continue;
        }
        const normalizedName = normalizeEndpointName(currentEndpoint);
        const endpoint = customEndpoints.find((customEndpoint) => normalizedName === normalizeEndpointName(customEndpoint.name));
        if (!endpoint) {
            logger$1.warn(`Model spec with endpoint "${currentEndpoint}" was skipped: Endpoint not found in configuration. The \`endpoint\` value must exactly match either a system-defined endpoint or a custom endpoint defined by the user.

For more information, see the documentation at https://www.librechat.ai/docs/configuration/librechat_yaml/object_structure/model_specs#endpoint`);
            continue;
        }
        modelSpecs.push({
            ...spec,
            preset: {
                ...spec.preset,
                endpoint: normalizedName,
            },
        });
    }
    return {
        ..._modelSpecs,
        list: modelSpecs,
    };
}

/**
 * Sets up the minimum, default Assistants configuration if Azure OpenAI Assistants option is enabled.
 * @returns The Assistants endpoint configuration.
 */
function azureAssistantsDefaults() {
    return {
        capabilities: [Capabilities.tools, Capabilities.actions, Capabilities.code_interpreter],
        version: defaultAssistantsVersion.azureAssistants,
    };
}
/**
 * Sets up the Assistants configuration from the config (`librechat.yaml`) file.
 * @param config - The loaded custom configuration.
 * @param assistantsEndpoint - The Assistants endpoint name.
 * - The previously loaded assistants configuration from Azure OpenAI Assistants option.
 * @param [prevConfig]
 * @returns The Assistants endpoint configuration.
 */
function assistantsConfigSetup(config, assistantsEndpoint, prevConfig = {}) {
    var _a, _b, _c, _d, _e;
    const assistantsConfig = (_a = config.endpoints) === null || _a === void 0 ? void 0 : _a[assistantsEndpoint];
    const parsedConfig = assistantEndpointSchema.parse(assistantsConfig);
    if (((_b = assistantsConfig === null || assistantsConfig === void 0 ? void 0 : assistantsConfig.supportedIds) === null || _b === void 0 ? void 0 : _b.length) && ((_c = assistantsConfig.excludedIds) === null || _c === void 0 ? void 0 : _c.length)) {
        logger$1.warn(`Configuration conflict: The '${assistantsEndpoint}' endpoint has both 'supportedIds' and 'excludedIds' defined. The 'excludedIds' will be ignored.`);
    }
    if ((assistantsConfig === null || assistantsConfig === void 0 ? void 0 : assistantsConfig.privateAssistants) &&
        (((_d = assistantsConfig.supportedIds) === null || _d === void 0 ? void 0 : _d.length) || ((_e = assistantsConfig.excludedIds) === null || _e === void 0 ? void 0 : _e.length))) {
        logger$1.warn(`Configuration conflict: The '${assistantsEndpoint}' endpoint has both 'privateAssistants' and 'supportedIds' or 'excludedIds' defined. The 'supportedIds' and 'excludedIds' will be ignored.`);
    }
    return {
        ...prevConfig,
        retrievalModels: parsedConfig.retrievalModels,
        disableBuilder: parsedConfig.disableBuilder,
        pollIntervalMs: parsedConfig.pollIntervalMs,
        supportedIds: parsedConfig.supportedIds,
        capabilities: parsedConfig.capabilities,
        excludedIds: parsedConfig.excludedIds,
        privateAssistants: parsedConfig.privateAssistants,
        timeoutMs: parsedConfig.timeoutMs,
        streamRate: parsedConfig.streamRate,
        titlePrompt: parsedConfig.titlePrompt,
        titleMethod: parsedConfig.titleMethod,
        titleModel: parsedConfig.titleModel,
        titleEndpoint: parsedConfig.titleEndpoint,
        titlePromptTemplate: parsedConfig.titlePromptTemplate,
    };
}

/**
 * Sets up the Azure OpenAI configuration from the config (`librechat.yaml`) file.
 * @param config - The loaded custom configuration.
 * @returns The Azure OpenAI configuration.
 */
function azureConfigSetup(config) {
    var _a, _b, _c;
    const azureConfig = (_a = config.endpoints) === null || _a === void 0 ? void 0 : _a[EModelEndpoint.azureOpenAI];
    if (!azureConfig) {
        throw new Error('Azure OpenAI configuration is missing.');
    }
    const { groups, ...azureConfiguration } = azureConfig;
    const { isValid, modelNames, modelGroupMap, groupMap, errors } = validateAzureGroups(groups);
    if (!isValid) {
        const errorString = errors.join('\n');
        const errorMessage = 'Invalid Azure OpenAI configuration:\n' + errorString;
        logger$1.error(errorMessage);
        throw new Error(errorMessage);
    }
    const assistantModels = [];
    const assistantGroups = new Set();
    for (const modelName of modelNames) {
        mapModelToAzureConfig({ modelName, modelGroupMap, groupMap });
        const groupName = (_b = modelGroupMap === null || modelGroupMap === void 0 ? void 0 : modelGroupMap[modelName]) === null || _b === void 0 ? void 0 : _b.group;
        const modelGroup = groupMap === null || groupMap === void 0 ? void 0 : groupMap[groupName];
        const supportsAssistants = (modelGroup === null || modelGroup === void 0 ? void 0 : modelGroup.assistants) || ((_c = modelGroup === null || modelGroup === void 0 ? void 0 : modelGroup[modelName]) === null || _c === void 0 ? void 0 : _c.assistants);
        if (supportsAssistants) {
            assistantModels.push(modelName);
            if (!assistantGroups.has(groupName)) {
                assistantGroups.add(groupName);
            }
        }
    }
    if (azureConfiguration.assistants && assistantModels.length === 0) {
        throw new Error('No Azure models are configured to support assistants. Please remove the `assistants` field or configure at least one model to support assistants.');
    }
    if (azureConfiguration.assistants &&
        process.env.ENDPOINTS &&
        !process.env.ENDPOINTS.includes(EModelEndpoint.azureAssistants)) {
        logger$1.warn(`Azure Assistants are configured, but the endpoint will not be accessible as it's not included in the ENDPOINTS environment variable.
      Please add the value "${EModelEndpoint.azureAssistants}" to the ENDPOINTS list if expected.`);
    }
    return {
        errors,
        isValid,
        groupMap,
        modelNames,
        modelGroupMap,
        assistantModels,
        assistantGroups: Array.from(assistantGroups),
        ...azureConfiguration,
    };
}

/**
 * Loads custom config endpoints
 * @param [config]
 * @param [agentsDefaults]
 */
const loadEndpoints = (config, agentsDefaults) => {
    var _a;
    const loadedEndpoints = {};
    const endpoints = config === null || config === void 0 ? void 0 : config.endpoints;
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[EModelEndpoint.azureOpenAI]) {
        loadedEndpoints[EModelEndpoint.azureOpenAI] = azureConfigSetup(config);
    }
    if ((_a = endpoints === null || endpoints === void 0 ? void 0 : endpoints[EModelEndpoint.azureOpenAI]) === null || _a === void 0 ? void 0 : _a.assistants) {
        loadedEndpoints[EModelEndpoint.azureAssistants] = azureAssistantsDefaults();
    }
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[EModelEndpoint.azureAssistants]) {
        loadedEndpoints[EModelEndpoint.azureAssistants] = assistantsConfigSetup(config, EModelEndpoint.azureAssistants, loadedEndpoints[EModelEndpoint.azureAssistants]);
    }
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[EModelEndpoint.assistants]) {
        loadedEndpoints[EModelEndpoint.assistants] = assistantsConfigSetup(config, EModelEndpoint.assistants, loadedEndpoints[EModelEndpoint.assistants]);
    }
    loadedEndpoints[EModelEndpoint.agents] = agentsConfigSetup(config, agentsDefaults);
    const endpointKeys = [
        EModelEndpoint.openAI,
        EModelEndpoint.google,
        EModelEndpoint.custom,
        EModelEndpoint.bedrock,
        EModelEndpoint.anthropic,
    ];
    endpointKeys.forEach((key) => {
        const currentKey = key;
        if (endpoints === null || endpoints === void 0 ? void 0 : endpoints[currentKey]) {
            loadedEndpoints[currentKey] = endpoints[currentKey];
        }
    });
    if (endpoints === null || endpoints === void 0 ? void 0 : endpoints.all) {
        loadedEndpoints.all = endpoints.all;
    }
    return loadedEndpoints;
};

function loadOCRConfig(config) {
    var _a, _b, _c, _d;
    if (!config)
        return;
    const baseURL = (_a = config === null || config === void 0 ? void 0 : config.baseURL) !== null && _a !== void 0 ? _a : '';
    const apiKey = (_b = config === null || config === void 0 ? void 0 : config.apiKey) !== null && _b !== void 0 ? _b : '';
    const mistralModel = (_c = config === null || config === void 0 ? void 0 : config.mistralModel) !== null && _c !== void 0 ? _c : '';
    return {
        apiKey,
        baseURL,
        mistralModel,
        strategy: (_d = config === null || config === void 0 ? void 0 : config.strategy) !== null && _d !== void 0 ? _d : OCRStrategy.MISTRAL_OCR,
    };
}

/**
 * Loads custom config and initializes app-wide variables.
 * @function AppService
 */
const AppService = async (params) => {
    var _a, _b, _c, _d, _e, _f;
    const { config, paths, systemTools } = params || {};
    if (!config) {
        throw new Error('Config is required');
    }
    const configDefaults = getConfigDefaults();
    const ocr = loadOCRConfig(config.ocr);
    const webSearch = loadWebSearchConfig(config.webSearch);
    const memory = loadMemoryConfig(config.memory);
    const filteredTools = config.filteredTools;
    const includedTools = config.includedTools;
    const fileStrategy = ((_a = config.fileStrategy) !== null && _a !== void 0 ? _a : configDefaults.fileStrategy);
    const startBalance = process.env.START_BALANCE;
    const balance = (_b = config.balance) !== null && _b !== void 0 ? _b : {
        enabled: ((_c = process.env.CHECK_BALANCE) === null || _c === void 0 ? void 0 : _c.toLowerCase().trim()) === 'true',
        startBalance: startBalance ? parseInt(startBalance, 10) : undefined,
    };
    const transactions = (_d = config.transactions) !== null && _d !== void 0 ? _d : configDefaults.transactions;
    const imageOutputType = (_e = config === null || config === void 0 ? void 0 : config.imageOutputType) !== null && _e !== void 0 ? _e : configDefaults.imageOutputType;
    process.env.CDN_PROVIDER = fileStrategy;
    const availableTools = systemTools;
    const mcpConfig = config.mcpServers || null;
    const registration = (_f = config.registration) !== null && _f !== void 0 ? _f : configDefaults.registration;
    const interfaceConfig = await loadDefaultInterface({ config, configDefaults });
    const turnstileConfig = loadTurnstileConfig(config, configDefaults);
    const speech = config.speech;
    const defaultConfig = {
        ocr,
        paths,
        config,
        memory,
        speech,
        balance,
        transactions,
        mcpConfig,
        webSearch,
        fileStrategy,
        registration,
        filteredTools,
        includedTools,
        availableTools,
        imageOutputType,
        interfaceConfig,
        turnstileConfig,
        fileStrategies: config.fileStrategies,
    };
    const agentsDefaults = agentsConfigSetup(config);
    if (!Object.keys(config).length) {
        const appConfig = {
            ...defaultConfig,
            endpoints: {
                [EModelEndpoint.agents]: agentsDefaults,
            },
        };
        return appConfig;
    }
    const loadedEndpoints = loadEndpoints(config, agentsDefaults);
    const appConfig = {
        ...defaultConfig,
        fileConfig: config === null || config === void 0 ? void 0 : config.fileConfig,
        secureImageLinks: config === null || config === void 0 ? void 0 : config.secureImageLinks,
        modelSpecs: processModelSpecs(config === null || config === void 0 ? void 0 : config.endpoints, config.modelSpecs, interfaceConfig),
        endpoints: loadedEndpoints,
    };
    return appConfig;
};

/**
 * Common role combinations
 */
var RoleBits;
(function (RoleBits) {
    /** 0001 = 1 */
    RoleBits[RoleBits["VIEWER"] = 1] = "VIEWER";
    /** 0011 = 3 */
    RoleBits[RoleBits["EDITOR"] = 3] = "EDITOR";
    /** 0111 = 7 */
    RoleBits[RoleBits["MANAGER"] = 7] = "MANAGER";
    /** 1111 = 15 */
    RoleBits[RoleBits["OWNER"] = 15] = "OWNER";
})(RoleBits || (RoleBits = {}));

async function signPayload({ payload, secret, expirationTime, }) {
    return jwt.sign(payload, secret, { expiresIn: expirationTime });
}
async function hashToken(str) {
    const data = new TextEncoder().encode(str);
    const hashBuffer = await webcrypto.subtle.digest('SHA-256', data);
    return Buffer.from(hashBuffer).toString('hex');
}

// Define the Auth sub-schema with type-safety.
const AuthSchema = new Schema({
    authorization_type: { type: String },
    custom_auth_header: { type: String },
    type: { type: String, enum: ['service_http', 'oauth', 'none'] },
    authorization_content_type: { type: String },
    authorization_url: { type: String },
    client_url: { type: String },
    scope: { type: String },
    token_exchange_method: { type: String, enum: ['default_post', 'basic_auth_header', null] },
}, { _id: false });
const Action = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
    action_id: {
        type: String,
        index: true,
        required: true,
    },
    type: {
        type: String,
        default: 'action_prototype',
    },
    settings: Schema.Types.Mixed,
    agent_id: String,
    assistant_id: String,
    metadata: {
        api_key: String,
        auth: AuthSchema,
        domain: {
            type: String,
            required: true,
        },
        privacy_policy_url: String,
        raw_spec: String,
        oauth_client_id: String,
        oauth_client_secret: String,
    },
});

const agentSchema = new Schema({
    id: {
        type: String,
        index: true,
        unique: true,
        required: true,
    },
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    instructions: {
        type: String,
    },
    avatar: {
        type: Schema.Types.Mixed,
        default: undefined,
    },
    provider: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    model_parameters: {
        type: Object,
    },
    artifacts: {
        type: String,
    },
    access_level: {
        type: Number,
    },
    recursion_limit: {
        type: Number,
    },
    tools: {
        type: [String],
        default: undefined,
    },
    tool_kwargs: {
        type: [{ type: Schema.Types.Mixed }],
    },
    actions: {
        type: [String],
        default: undefined,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    authorName: {
        type: String,
        default: undefined,
    },
    hide_sequential_outputs: {
        type: Boolean,
    },
    end_after_tools: {
        type: Boolean,
    },
    /** @deprecated Use edges instead */
    agent_ids: {
        type: [String],
    },
    edges: {
        type: [{ type: Schema.Types.Mixed }],
        default: [],
    },
    isCollaborative: {
        type: Boolean,
        default: undefined,
    },
    conversation_starters: {
        type: [String],
        default: [],
    },
    tool_resources: {
        type: Schema.Types.Mixed,
        default: {},
    },
    projectIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Project',
        index: true,
    },
    versions: {
        type: [Schema.Types.Mixed],
        default: [],
    },
    category: {
        type: String,
        trim: true,
        index: true,
        default: 'general',
    },
    support_contact: {
        type: Schema.Types.Mixed,
        default: undefined,
    },
    is_promoted: {
        type: Boolean,
        default: false,
        index: true,
    },
}, {
    timestamps: true,
});
agentSchema.index({ updatedAt: -1, _id: 1 });

const agentCategorySchema = new Schema({
    value: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    label: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
        default: '',
    },
    order: {
        type: Number,
        default: 0,
        index: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        index: true,
    },
    custom: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
agentCategorySchema.index({ isActive: 1, order: 1 });
agentCategorySchema.index({ order: 1, label: 1 });

const assistantSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    assistant_id: {
        type: String,
        index: true,
        required: true,
    },
    avatar: {
        type: Schema.Types.Mixed,
        default: undefined,
    },
    conversation_starters: {
        type: [String],
        default: [],
    },
    access_level: {
        type: Number,
    },
    file_ids: { type: [String], default: undefined },
    actions: { type: [String], default: undefined },
    append_current_datetime: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});

const balanceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
    // 1000 tokenCredits = 1 mill ($0.001 USD)
    tokenCredits: {
        type: Number,
        default: 0,
    },
    // Automatic refill settings
    autoRefillEnabled: {
        type: Boolean,
        default: false,
    },
    refillIntervalValue: {
        type: Number,
        default: 30,
    },
    refillIntervalUnit: {
        type: String,
        enum: ['seconds', 'minutes', 'hours', 'days', 'weeks', 'months'],
        default: 'days',
    },
    lastRefill: {
        type: Date,
        default: Date.now,
    },
    // amount to add on each refill
    refillAmount: {
        type: Number,
        default: 0,
    },
});

const bannerSchema = new Schema({
    bannerId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    displayFrom: {
        type: Date,
        required: true,
        default: Date.now,
    },
    displayTo: {
        type: Date,
    },
    type: {
        type: String,
        enum: ['banner', 'popup'],
        default: 'banner',
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const categoriesSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true,
    },
    value: {
        type: String,
        required: true,
        unique: true,
    },
});

const conversationTag = new Schema({
    tag: {
        type: String,
        index: true,
    },
    user: {
        type: String,
        index: true,
    },
    description: {
        type: String,
        index: true,
    },
    count: {
        type: Number,
        default: 0,
    },
    position: {
        type: Number,
        default: 0,
        index: true,
    },
}, { timestamps: true });
// Create a compound index on tag and user with unique constraint.
conversationTag.index({ tag: 1, user: 1 }, { unique: true });

// @ts-ignore
const conversationPreset = {
    // endpoint: [azureOpenAI, openAI, anthropic, chatGPTBrowser]
    endpoint: {
        type: String,
        default: null,
        required: true,
    },
    endpointType: {
        type: String,
    },
    // for azureOpenAI, openAI, chatGPTBrowser only
    model: {
        type: String,
        required: false,
    },
    // for bedrock only
    region: {
        type: String,
        required: false,
    },
    // for azureOpenAI, openAI only
    chatGptLabel: {
        type: String,
        required: false,
    },
    // for google only
    examples: { type: [{ type: Schema.Types.Mixed }], default: undefined },
    modelLabel: {
        type: String,
        required: false,
    },
    promptPrefix: {
        type: String,
        required: false,
    },
    temperature: {
        type: Number,
        required: false,
    },
    top_p: {
        type: Number,
        required: false,
    },
    // for google only
    topP: {
        type: Number,
        required: false,
    },
    topK: {
        type: Number,
        required: false,
    },
    maxOutputTokens: {
        type: Number,
        required: false,
    },
    maxTokens: {
        type: Number,
        required: false,
    },
    presence_penalty: {
        type: Number,
        required: false,
    },
    frequency_penalty: {
        type: Number,
        required: false,
    },
    file_ids: { type: [{ type: String }], default: undefined },
    // deprecated
    resendImages: {
        type: Boolean,
    },
    /* Anthropic only */
    promptCache: {
        type: Boolean,
    },
    thinking: {
        type: Boolean,
    },
    thinkingBudget: {
        type: Number,
    },
    system: {
        type: String,
    },
    // files
    resendFiles: {
        type: Boolean,
    },
    imageDetail: {
        type: String,
    },
    /* agents */
    agent_id: {
        type: String,
    },
    /* assistants */
    assistant_id: {
        type: String,
    },
    instructions: {
        type: String,
    },
    stop: { type: [{ type: String }], default: undefined },
    isArchived: {
        type: Boolean,
        default: false,
    },
    /* UI Components */
    iconURL: {
        type: String,
    },
    greeting: {
        type: String,
    },
    spec: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
    },
    tools: { type: [{ type: String }], default: undefined },
    maxContextTokens: {
        type: Number,
    },
    max_tokens: {
        type: Number,
    },
    useResponsesApi: {
        type: Boolean,
    },
    /** OpenAI Responses API / Anthropic API / Google API */
    web_search: {
        type: Boolean,
    },
    disableStreaming: {
        type: Boolean,
    },
    fileTokenLimit: {
        type: Number,
    },
    /** Reasoning models only */
    reasoning_effort: {
        type: String,
    },
    reasoning_summary: {
        type: String,
    },
    /** Verbosity control */
    verbosity: {
        type: String,
    },
};

const convoSchema = new Schema({
    conversationId: {
        type: String,
        unique: true,
        required: true,
        index: true,
        meiliIndex: true,
    },
    title: {
        type: String,
        default: 'New Chat',
        meiliIndex: true,
    },
    user: {
        type: String,
        index: true,
        meiliIndex: true,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    agentOptions: {
        type: Schema.Types.Mixed,
    },
    ...conversationPreset,
    agent_id: {
        type: String,
    },
    tags: {
        type: [String],
        default: [],
        meiliIndex: true,
    },
    files: {
        type: [String],
    },
    expiredAt: {
        type: Date,
    },
}, { timestamps: true });
convoSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
convoSchema.index({ createdAt: 1, updatedAt: 1 });
convoSchema.index({ conversationId: 1, user: 1 }, { unique: true });

const file = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
    conversationId: {
        type: String,
        ref: 'Conversation',
        index: true,
    },
    file_id: {
        type: String,
        index: true,
        required: true,
    },
    temp_file_id: {
        type: String,
    },
    bytes: {
        type: Number,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    filepath: {
        type: String,
        required: true,
    },
    object: {
        type: String,
        required: true,
        default: 'file',
    },
    embedded: {
        type: Boolean,
    },
    type: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    context: {
        type: String,
    },
    usage: {
        type: Number,
        required: true,
        default: 0,
    },
    source: {
        type: String,
        default: FileSources.local,
    },
    model: {
        type: String,
    },
    width: Number,
    height: Number,
    metadata: {
        fileIdentifier: String,
    },
    expiresAt: {
        type: Date,
        expires: 3600, // 1 hour in seconds
    },
}, {
    timestamps: true,
});
file.index({ createdAt: 1, updatedAt: 1 });

const keySchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
    },
});
keySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const messageSchema = new Schema({
    messageId: {
        type: String,
        unique: true,
        required: true,
        index: true,
        meiliIndex: true,
    },
    conversationId: {
        type: String,
        index: true,
        required: true,
        meiliIndex: true,
    },
    user: {
        type: String,
        index: true,
        required: true,
        default: null,
        meiliIndex: true,
    },
    model: {
        type: String,
        default: null,
    },
    endpoint: {
        type: String,
    },
    conversationSignature: {
        type: String,
    },
    clientId: {
        type: String,
    },
    invocationId: {
        type: Number,
    },
    parentMessageId: {
        type: String,
    },
    tokenCount: {
        type: Number,
    },
    summaryTokenCount: {
        type: Number,
    },
    sender: {
        type: String,
        meiliIndex: true,
    },
    text: {
        type: String,
        meiliIndex: true,
    },
    summary: {
        type: String,
    },
    isCreatedByUser: {
        type: Boolean,
        required: true,
        default: false,
    },
    unfinished: {
        type: Boolean,
        default: false,
    },
    error: {
        type: Boolean,
        default: false,
    },
    finish_reason: {
        type: String,
    },
    feedback: {
        type: {
            rating: {
                type: String,
                enum: ['thumbsUp', 'thumbsDown'],
                required: true,
            },
            tag: {
                type: mongoose.Schema.Types.Mixed,
                required: false,
            },
            text: {
                type: String,
                required: false,
            },
        },
        default: undefined,
        required: false,
    },
    _meiliIndex: {
        type: Boolean,
        required: false,
        select: false,
        default: false,
    },
    files: { type: [{ type: mongoose.Schema.Types.Mixed }], default: undefined },
    plugin: {
        type: {
            latest: {
                type: String,
                required: false,
            },
            inputs: {
                type: [mongoose.Schema.Types.Mixed],
                required: false,
                default: undefined,
            },
            outputs: {
                type: String,
                required: false,
            },
        },
        default: undefined,
    },
    plugins: { type: [{ type: mongoose.Schema.Types.Mixed }], default: undefined },
    content: {
        type: [{ type: mongoose.Schema.Types.Mixed }],
        default: undefined,
        meiliIndex: true,
    },
    thread_id: {
        type: String,
    },
    /* frontend components */
    iconURL: {
        type: String,
    },
    attachments: { type: [{ type: mongoose.Schema.Types.Mixed }], default: undefined },
    /*
    attachments: {
      type: [
        {
          file_id: String,
          filename: String,
          filepath: String,
          expiresAt: Date,
          width: Number,
          height: Number,
          type: String,
          conversationId: String,
          messageId: {
            type: String,
            required: true,
          },
          toolCallId: String,
        },
      ],
      default: undefined,
    },
    */
    expiredAt: {
        type: Date,
    },
}, { timestamps: true });
messageSchema.index({ expiredAt: 1 }, { expireAfterSeconds: 0 });
messageSchema.index({ createdAt: 1 });
messageSchema.index({ messageId: 1, user: 1 }, { unique: true });

const pluginAuthSchema = new Schema({
    authField: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    pluginKey: {
        type: String,
    },
}, { timestamps: true });

const presetSchema = new Schema({
    presetId: {
        type: String,
        unique: true,
        required: true,
        index: true,
    },
    title: {
        type: String,
        default: 'New Chat',
        meiliIndex: true,
    },
    user: {
        type: String,
        default: null,
    },
    defaultPreset: {
        type: Boolean,
    },
    order: {
        type: Number,
    },
    ...conversationPreset,
    agentOptions: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
}, { timestamps: true });

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    promptGroupIds: {
        type: [Schema.Types.ObjectId],
        ref: 'PromptGroup',
        default: [],
    },
    agentIds: {
        type: [String],
        ref: 'Agent',
        default: [],
    },
}, {
    timestamps: true,
});

const promptSchema = new Schema({
    groupId: {
        type: Schema.Types.ObjectId,
        ref: 'PromptGroup',
        required: true,
        index: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    prompt: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['text', 'chat'],
        required: true,
    },
}, {
    timestamps: true,
});
promptSchema.index({ createdAt: 1, updatedAt: 1 });

const promptGroupSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    numberOfGenerations: {
        type: Number,
        default: 0,
    },
    oneliner: {
        type: String,
        default: '',
    },
    category: {
        type: String,
        default: '',
        index: true,
    },
    projectIds: {
        type: [Schema.Types.ObjectId],
        ref: 'Project',
        index: true,
        default: [],
    },
    productionId: {
        type: Schema.Types.ObjectId,
        ref: 'Prompt',
        required: true,
        index: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    command: {
        type: String,
        index: true,
        validate: {
            validator: function (v) {
                return v === undefined || v === null || v === '' || /^[a-z0-9-]+$/.test(v);
            },
            message: (props) => { var _a; return `${(_a = props === null || props === void 0 ? void 0 : props.value) !== null && _a !== void 0 ? _a : 'Value'} is not a valid command. Only lowercase alphanumeric characters and hyphens are allowed.`; },
        },
        maxlength: [
            Constants.COMMANDS_MAX_LENGTH,
            `Command cannot be longer than ${Constants.COMMANDS_MAX_LENGTH} characters`,
        ],
    }, // Casting here bypasses the type error for the command field.
}, {
    timestamps: true,
});
promptGroupSchema.index({ createdAt: 1, updatedAt: 1 });

/**
 * Uses a sub-schema for permissions. Notice we disable `_id` for this subdocument.
 */
const rolePermissionsSchema = new Schema({
    [PermissionTypes.BOOKMARKS]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.PROMPTS]: {
        [Permissions.SHARED_GLOBAL]: { type: Boolean },
        [Permissions.USE]: { type: Boolean },
        [Permissions.CREATE]: { type: Boolean },
    },
    [PermissionTypes.MEMORIES]: {
        [Permissions.USE]: { type: Boolean },
        [Permissions.CREATE]: { type: Boolean },
        [Permissions.UPDATE]: { type: Boolean },
        [Permissions.READ]: { type: Boolean },
        [Permissions.OPT_OUT]: { type: Boolean },
    },
    [PermissionTypes.AGENTS]: {
        [Permissions.SHARED_GLOBAL]: { type: Boolean },
        [Permissions.USE]: { type: Boolean },
        [Permissions.CREATE]: { type: Boolean },
    },
    [PermissionTypes.MULTI_CONVO]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.TEMPORARY_CHAT]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.RUN_CODE]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.WEB_SEARCH]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.PEOPLE_PICKER]: {
        [Permissions.VIEW_USERS]: { type: Boolean },
        [Permissions.VIEW_GROUPS]: { type: Boolean },
        [Permissions.VIEW_ROLES]: { type: Boolean },
    },
    [PermissionTypes.MARKETPLACE]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.FILE_SEARCH]: {
        [Permissions.USE]: { type: Boolean },
    },
    [PermissionTypes.FILE_CITATIONS]: {
        [Permissions.USE]: { type: Boolean },
    },
}, { _id: false });
const roleSchema = new Schema({
    name: { type: String, required: true, unique: true, index: true },
    permissions: {
        type: rolePermissionsSchema,
    },
});

const sessionSchema = new Schema({
    refreshTokenHash: {
        type: String,
        required: true,
    },
    expiration: {
        type: Date,
        required: true,
        expires: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

const shareSchema = new Schema({
    conversationId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        index: true,
    },
    user: {
        type: String,
        index: true,
    },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
    shareId: {
        type: String,
        index: true,
    },
    targetMessageId: {
        type: String,
        required: false,
        index: true,
    },
    isPublic: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
shareSchema.index({ conversationId: 1, user: 1, targetMessageId: 1 });

const tokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user',
    },
    email: {
        type: String,
    },
    type: {
        type: String,
    },
    identifier: {
        type: String,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        required: true,
    },
    metadata: {
        type: Map,
        of: Schema.Types.Mixed,
    },
});
tokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const toolCallSchema = new Schema({
    conversationId: {
        type: String,
        required: true,
    },
    messageId: {
        type: String,
        required: true,
    },
    toolId: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    result: {
        type: mongoose.Schema.Types.Mixed,
    },
    attachments: {
        type: mongoose.Schema.Types.Mixed,
    },
    blockIndex: {
        type: Number,
    },
    partIndex: {
        type: Number,
    },
}, { timestamps: true });
toolCallSchema.index({ messageId: 1, user: 1 });
toolCallSchema.index({ conversationId: 1, user: 1 });

const transactionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
    conversationId: {
        type: String,
        ref: 'Conversation',
        index: true,
    },
    tokenType: {
        type: String,
        enum: ['prompt', 'completion', 'credits'],
        required: true,
    },
    model: {
        type: String,
    },
    context: {
        type: String,
    },
    valueKey: {
        type: String,
    },
    rate: Number,
    rawAmount: Number,
    tokenValue: Number,
    inputTokens: { type: Number },
    writeTokens: { type: Number },
    readTokens: { type: Number },
}, {
    timestamps: true,
});

// Session sub-schema
const SessionSchema = new Schema({
    refreshToken: {
        type: String,
        default: '',
    },
}, { _id: false });
// Backup code sub-schema
const BackupCodeSchema = new Schema({
    codeHash: { type: String, required: true },
    used: { type: Boolean, default: false },
    usedAt: { type: Date, default: null },
}, { _id: false });
const userSchema = new Schema({
    name: {
        type: String,
    },
    username: {
        type: String,
        lowercase: true,
        default: '',
    },
    email: {
        type: String,
        required: [true, "can't be blank"],
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true,
    },
    emailVerified: {
        type: Boolean,
        required: true,
        default: false,
    },
    password: {
        type: String,
        trim: true,
        minlength: 8,
        maxlength: 128,
        select: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    provider: {
        type: String,
        required: true,
        default: 'local',
    },
    role: {
        type: String,
        default: SystemRoles.USER,
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    openidId: {
        type: String,
        unique: true,
        sparse: true,
    },
    samlId: {
        type: String,
        unique: true,
        sparse: true,
    },
    ldapId: {
        type: String,
        unique: true,
        sparse: true,
    },
    githubId: {
        type: String,
        unique: true,
        sparse: true,
    },
    discordId: {
        type: String,
        unique: true,
        sparse: true,
    },
    appleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    plugins: {
        type: Array,
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false,
    },
    totpSecret: {
        type: String,
        select: false,
    },
    backupCodes: {
        type: [BackupCodeSchema],
        select: false,
    },
    refreshToken: {
        type: [SessionSchema],
    },
    expiresAt: {
        type: Date,
        expires: 604800, // 7 days in seconds
    },
    termsAccepted: {
        type: Boolean,
        default: false,
    },
    personalization: {
        type: {
            memories: {
                type: Boolean,
                default: true,
            },
        },
        default: {},
    },
    /** Field for external source identification (for consistency with TPrincipal schema) */
    idOnTheSource: {
        type: String,
        sparse: true,
    },
}, { timestamps: true });

const MemoryEntrySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true,
        required: true,
    },
    key: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[a-z_]+$/.test(v),
            message: 'Key must only contain lowercase letters and underscores',
        },
    },
    value: {
        type: String,
        required: true,
    },
    tokenCount: {
        type: Number,
        default: 0,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true,
    },
    description: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        index: true,
    },
    avatar: {
        type: String,
        required: false,
    },
    memberIds: [
        {
            type: String,
            required: false,
        },
    ],
    source: {
        type: String,
        enum: ['local', 'entra'],
        default: 'local',
    },
    /** External ID (e.g., Entra ID) */
    idOnTheSource: {
        type: String,
        sparse: true,
        index: true,
        required: function () {
            return this.source !== 'local';
        },
    },
}, { timestamps: true });
groupSchema.index({ idOnTheSource: 1, source: 1 }, {
    unique: true,
    partialFilterExpression: { idOnTheSource: { $exists: true } },
});
groupSchema.index({ memberIds: 1 });

/**
 * Checks if the connected MongoDB deployment supports transactions
 * This requires a MongoDB replica set configuration
 *
 * @returns True if transactions are supported, false otherwise
 */
const supportsTransactions = async (mongoose) => {
    var _a;
    try {
        const session = await mongoose.startSession();
        try {
            session.startTransaction();
            await ((_a = mongoose.connection.db) === null || _a === void 0 ? void 0 : _a.collection('__transaction_test__').findOne({}, { session }));
            await session.abortTransaction();
            logger$1.debug('MongoDB transactions are supported');
            return true;
        }
        catch (transactionError) {
            logger$1.debug('MongoDB transactions not supported (transaction error):', (transactionError === null || transactionError === void 0 ? void 0 : transactionError.message) || 'Unknown error');
            return false;
        }
        finally {
            await session.endSession();
        }
    }
    catch (error) {
        logger$1.debug('MongoDB transactions not supported (session error):', (error === null || error === void 0 ? void 0 : error.message) || 'Unknown error');
        return false;
    }
};
/**
 * Gets whether the current MongoDB deployment supports transactions
 * Caches the result for performance
 *
 * @returns True if transactions are supported, false otherwise
 */
const getTransactionSupport = async (mongoose, transactionSupportCache) => {
    let transactionsSupported = false;
    if (transactionSupportCache === null) {
        transactionsSupported = await supportsTransactions(mongoose);
    }
    return transactionsSupported;
};

/**
 * Creates or returns the User model using the provided mongoose instance and schema
 */
function createUserModel(mongoose) {
    return mongoose.models.User || mongoose.model('User', userSchema);
}

/**
 * Creates or returns the Token model using the provided mongoose instance and schema
 */
function createTokenModel(mongoose) {
    return mongoose.models.Token || mongoose.model('Token', tokenSchema);
}

/**
 * Creates or returns the Session model using the provided mongoose instance and schema
 */
function createSessionModel(mongoose) {
    return mongoose.models.Session || mongoose.model('Session', sessionSchema);
}

/**
 * Creates or returns the Balance model using the provided mongoose instance and schema
 */
function createBalanceModel(mongoose) {
    return mongoose.models.Balance || mongoose.model('Balance', balanceSchema);
}

const logDir = getLogDirectory();
const { NODE_ENV, DEBUG_LOGGING = 'false' } = process.env;
const useDebugLogging = (typeof DEBUG_LOGGING === 'string' && DEBUG_LOGGING.toLowerCase() === 'true') ||
    DEBUG_LOGGING === 'true';
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    activity: 6,
    silly: 7,
};
winston.addColors({
    info: 'green',
    warn: 'italic yellow',
    error: 'red',
    debug: 'blue',
});
const level = () => {
    const env = NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};
const fileFormat = winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.errors({ stack: true }), winston.format.splat());
const logLevel = useDebugLogging ? 'debug' : 'error';
const transports = [
    new winston.transports.DailyRotateFile({
        level: logLevel,
        filename: `${logDir}/meiliSync-%DATE%.log`,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: fileFormat,
    }),
];
const consoleFormat = winston.format.combine(winston.format.colorize({ all: true }), winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
transports.push(new winston.transports.Console({
    level: 'info',
    format: consoleFormat,
}));
const logger = winston.createLogger({
    level: level(),
    levels,
    transports,
});

// Environment flags
/**
 * Flag to indicate if search is enabled based on environment variables.
 */
const searchEnabled = process.env.SEARCH != null && process.env.SEARCH.toLowerCase() === 'true';
/**
 * Flag to indicate if MeiliSearch is enabled based on required environment variables.
 */
const meiliEnabled = process.env.MEILI_HOST != null && process.env.MEILI_MASTER_KEY != null && searchEnabled;
/**
 * Get sync configuration from environment variables
 */
const getSyncConfig = () => ({
    batchSize: parseInt(process.env.MEILI_SYNC_BATCH_SIZE || '100', 10),
    delayMs: parseInt(process.env.MEILI_SYNC_DELAY_MS || '100', 10),
});
/**
 * Local implementation of parseTextParts to avoid dependency on librechat-data-provider
 * Extracts text content from an array of content items
 */
const parseTextParts = (content) => {
    if (!Array.isArray(content)) {
        return '';
    }
    return content
        .filter((item) => item.type === 'text' && typeof item.text === 'string')
        .map((item) => item.text)
        .join(' ')
        .trim();
};
/**
 * Local implementation to handle Bing convoId conversion
 */
const cleanUpPrimaryKeyValue = (value) => {
    return value.replace(/--/g, '|');
};
/**
 * Validates the required options for configuring the mongoMeili plugin.
 */
const validateOptions = (options) => {
    const requiredKeys = ['host', 'apiKey', 'indexName'];
    requiredKeys.forEach((key) => {
        if (!options[key]) {
            throw new Error(`Missing mongoMeili Option: ${key}`);
        }
    });
};
/**
 * Helper function to process documents in batches with rate limiting
 */
const processBatch = async (items, batchSize, delayMs, processor) => {
    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);
        await processor(batch);
        // Add delay between batches to prevent overwhelming resources
        if (i + batchSize < items.length && delayMs > 0) {
            await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
    }
};
/**
 * Factory function to create a MeiliMongooseModel class which extends a Mongoose model.
 * This class contains static and instance methods to synchronize and manage the MeiliSearch index
 * corresponding to the MongoDB collection.
 *
 * @param config - Configuration object.
 * @param config.index - The MeiliSearch index object.
 * @param config.attributesToIndex - List of attributes to index.
 * @param config.syncOptions - Sync configuration options.
 * @returns A class definition that will be loaded into the Mongoose schema.
 */
const createMeiliMongooseModel = ({ index, attributesToIndex, syncOptions, }) => {
    const primaryKey = attributesToIndex[0];
    const syncConfig = { ...getSyncConfig(), ...syncOptions };
    class MeiliMongooseModel {
        /**
         * Get the current sync progress
         */
        static async getSyncProgress() {
            const totalDocuments = await this.countDocuments();
            const indexedDocuments = await this.countDocuments({ _meiliIndex: true });
            return {
                totalProcessed: indexedDocuments,
                totalDocuments,
                isComplete: indexedDocuments === totalDocuments,
            };
        }
        /**
         * Synchronizes the data between the MongoDB collection and the MeiliSearch index.
         * Now uses streaming and batching to reduce memory usage.
         */
        static async syncWithMeili(options) {
            try {
                const startTime = Date.now();
                const { batchSize, delayMs } = syncConfig;
                logger.info(`[syncWithMeili] Starting sync for ${primaryKey === 'messageId' ? 'messages' : 'conversations'} with batch size ${batchSize}`);
                // Build query with resume capability
                const query = {};
                if (options === null || options === void 0 ? void 0 : options.resumeFromId) {
                    query._id = { $gt: options.resumeFromId };
                }
                // Get total count for progress tracking
                const totalCount = await this.countDocuments(query);
                let processedCount = 0;
                // First, handle documents that need to be removed from Meili
                await this.cleanupMeiliIndex(index, primaryKey, batchSize, delayMs);
                // Process MongoDB documents in batches using cursor
                const cursor = this.find(query)
                    .select(attributesToIndex.join(' ') + ' _meiliIndex')
                    .sort({ _id: 1 })
                    .batchSize(batchSize)
                    .cursor();
                const format = (doc) => _.omitBy(_.pick(doc, attributesToIndex), (v, k) => k.startsWith('$'));
                let documentBatch = [];
                let updateOps = [];
                // Process documents in streaming fashion
                for await (const doc of cursor) {
                    const typedDoc = doc.toObject();
                    const formatted = format(typedDoc);
                    // Check if document needs indexing
                    if (!typedDoc._meiliIndex) {
                        documentBatch.push(formatted);
                        updateOps.push({
                            updateOne: {
                                filter: { _id: typedDoc._id },
                                update: { $set: { _meiliIndex: true } },
                            },
                        });
                    }
                    processedCount++;
                    // Process batch when it reaches the configured size
                    if (documentBatch.length >= batchSize) {
                        await this.processSyncBatch(index, documentBatch, updateOps);
                        documentBatch = [];
                        updateOps = [];
                        // Log progress
                        const progress = Math.round((processedCount / totalCount) * 100);
                        logger.info(`[syncWithMeili] Progress: ${progress}% (${processedCount}/${totalCount})`);
                        // Add delay to prevent overwhelming resources
                        if (delayMs > 0) {
                            await new Promise((resolve) => setTimeout(resolve, delayMs));
                        }
                    }
                }
                // Process remaining documents
                if (documentBatch.length > 0) {
                    await this.processSyncBatch(index, documentBatch, updateOps);
                }
                const duration = Date.now() - startTime;
                logger.info(`[syncWithMeili] Completed sync for ${primaryKey === 'messageId' ? 'messages' : 'conversations'} in ${duration}ms`);
            }
            catch (error) {
                logger.error('[syncWithMeili] Error during sync:', error);
                throw error;
            }
        }
        /**
         * Process a batch of documents for syncing
         */
        static async processSyncBatch(index, documents, updateOps) {
            if (documents.length === 0) {
                return;
            }
            try {
                // Add documents to MeiliSearch
                await index.addDocuments(documents);
                // Update MongoDB to mark documents as indexed
                if (updateOps.length > 0) {
                    await this.collection.bulkWrite(updateOps);
                }
            }
            catch (error) {
                logger.error('[processSyncBatch] Error processing batch:', error);
                // Don't throw - allow sync to continue with other documents
            }
        }
        /**
         * Clean up documents in MeiliSearch that no longer exist in MongoDB
         */
        static async cleanupMeiliIndex(index, primaryKey, batchSize, delayMs) {
            try {
                let offset = 0;
                let moreDocuments = true;
                while (moreDocuments) {
                    const batch = await index.getDocuments({ limit: batchSize, offset });
                    if (batch.results.length === 0) {
                        moreDocuments = false;
                        break;
                    }
                    const meiliIds = batch.results.map((doc) => doc[primaryKey]);
                    const query = {};
                    query[primaryKey] = { $in: meiliIds };
                    // Find which documents exist in MongoDB
                    const existingDocs = await this.find(query).select(primaryKey).lean();
                    const existingIds = new Set(existingDocs.map((doc) => doc[primaryKey]));
                    // Delete documents that don't exist in MongoDB
                    const toDelete = meiliIds.filter((id) => !existingIds.has(id));
                    if (toDelete.length > 0) {
                        await Promise.all(toDelete.map((id) => index.deleteDocument(id)));
                        logger.debug(`[cleanupMeiliIndex] Deleted ${toDelete.length} orphaned documents`);
                    }
                    offset += batchSize;
                    // Add delay between batches
                    if (delayMs > 0) {
                        await new Promise((resolve) => setTimeout(resolve, delayMs));
                    }
                }
            }
            catch (error) {
                logger.error('[cleanupMeiliIndex] Error during cleanup:', error);
            }
        }
        /**
         * Updates settings for the MeiliSearch index
         */
        static async setMeiliIndexSettings(settings) {
            return await index.updateSettings(settings);
        }
        /**
         * Searches the MeiliSearch index and optionally populates results
         */
        static async meiliSearch(q, params, populate) {
            const data = await index.search(q, params);
            if (populate) {
                const query = {};
                query[primaryKey] = _.map(data.hits, (hit) => cleanUpPrimaryKeyValue(hit[primaryKey]));
                const projection = Object.keys(this.schema.obj).reduce((results, key) => {
                    if (!key.startsWith('$')) {
                        results[key] = 1;
                    }
                    return results;
                }, { _id: 1, __v: 1 });
                const hitsFromMongoose = await this.find(query, projection).lean();
                const populatedHits = data.hits.map((hit) => {
                    hit[primaryKey];
                    const originalHit = _.find(hitsFromMongoose, (item) => {
                        const typedItem = item;
                        return typedItem[primaryKey] === hit[primaryKey];
                    });
                    return {
                        ...(originalHit && typeof originalHit === 'object' ? originalHit : {}),
                        ...hit,
                    };
                });
                data.hits = populatedHits;
            }
            return data;
        }
        /**
         * Preprocesses the current document for indexing
         */
        preprocessObjectForIndex() {
            const object = _.omitBy(_.pick(this.toJSON(), attributesToIndex), (v, k) => k.startsWith('$'));
            if (object.conversationId &&
                typeof object.conversationId === 'string' &&
                object.conversationId.includes('|')) {
                object.conversationId = object.conversationId.replace(/\|/g, '--');
            }
            if (object.content && Array.isArray(object.content)) {
                object.text = parseTextParts(object.content);
                delete object.content;
            }
            return object;
        }
        /**
         * Adds the current document to the MeiliSearch index with retry logic
         */
        async addObjectToMeili(next) {
            const object = this.preprocessObjectForIndex();
            const maxRetries = 3;
            let retryCount = 0;
            while (retryCount < maxRetries) {
                try {
                    await index.addDocuments([object]);
                    break;
                }
                catch (error) {
                    retryCount++;
                    if (retryCount >= maxRetries) {
                        logger.error('[addObjectToMeili] Error adding document to Meili after retries:', error);
                        return next();
                    }
                    // Exponential backoff
                    await new Promise((resolve) => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                }
            }
            try {
                await this.collection.updateMany({ _id: this._id }, { $set: { _meiliIndex: true } });
            }
            catch (error) {
                logger.error('[addObjectToMeili] Error updating _meiliIndex field:', error);
                return next();
            }
            next();
        }
        /**
         * Updates the current document in the MeiliSearch index
         */
        async updateObjectToMeili(next) {
            try {
                const object = _.omitBy(_.pick(this.toJSON(), attributesToIndex), (v, k) => k.startsWith('$'));
                await index.updateDocuments([object]);
                next();
            }
            catch (error) {
                logger.error('[updateObjectToMeili] Error updating document in Meili:', error);
                return next();
            }
        }
        /**
         * Deletes the current document from the MeiliSearch index.
         *
         * @returns {Promise<void>}
         */
        async deleteObjectFromMeili(next) {
            try {
                await index.deleteDocument(this._id);
                next();
            }
            catch (error) {
                logger.error('[deleteObjectFromMeili] Error deleting document from Meili:', error);
                return next();
            }
        }
        /**
         * Post-save hook to synchronize the document with MeiliSearch.
         *
         * If the document is already indexed (i.e. `_meiliIndex` is true), it updates it;
         * otherwise, it adds the document to the index.
         */
        postSaveHook(next) {
            if (this._meiliIndex) {
                this.updateObjectToMeili(next);
            }
            else {
                this.addObjectToMeili(next);
            }
        }
        /**
         * Post-update hook to update the document in MeiliSearch.
         *
         * This hook is triggered after a document update, ensuring that changes are
         * propagated to the MeiliSearch index if the document is indexed.
         */
        postUpdateHook(next) {
            if (this._meiliIndex) {
                this.updateObjectToMeili(next);
            }
            else {
                next();
            }
        }
        /**
         * Post-remove hook to delete the document from MeiliSearch.
         *
         * This hook is triggered after a document is removed, ensuring that the document
         * is also removed from the MeiliSearch index if it was previously indexed.
         */
        postRemoveHook(next) {
            if (this._meiliIndex) {
                this.deleteObjectFromMeili(next);
            }
            else {
                next();
            }
        }
    }
    return MeiliMongooseModel;
};
/**
 * Mongoose plugin to synchronize MongoDB collections with a MeiliSearch index.
 *
 * This plugin:
 *   - Validates the provided options.
 *   - Adds a `_meiliIndex` field to the schema to track indexing status.
 *   - Sets up a MeiliSearch client and creates an index if it doesn't already exist.
 *   - Loads class methods for syncing, searching, and managing documents in MeiliSearch.
 *   - Registers Mongoose hooks (post-save, post-update, post-remove, etc.) to maintain index consistency.
 *
 * @param schema - The Mongoose schema to which the plugin is applied.
 * @param options - Configuration options.
 * @param options.host - The MeiliSearch host.
 * @param options.apiKey - The MeiliSearch API key.
 * @param options.indexName - The name of the MeiliSearch index.
 * @param options.primaryKey - The primary key field for indexing.
 * @param options.syncBatchSize - Batch size for sync operations.
 * @param options.syncDelayMs - Delay between batches in milliseconds.
 */
function mongoMeili(schema, options) {
    const mongoose = options.mongoose;
    validateOptions(options);
    // Add _meiliIndex field to the schema to track if a document has been indexed in MeiliSearch.
    schema.add({
        _meiliIndex: {
            type: Boolean,
            required: false,
            select: false,
            default: false,
        },
    });
    const { host, apiKey, indexName, primaryKey } = options;
    const syncOptions = {
        batchSize: options.syncBatchSize || getSyncConfig().batchSize,
        delayMs: options.syncDelayMs || getSyncConfig().delayMs,
    };
    const client = new MeiliSearch({ host, apiKey });
    /** Create index only if it doesn't exist */
    const index = client.index(indexName);
    // Check if index exists and create if needed
    (async () => {
        try {
            await index.getRawInfo();
            logger.debug(`[mongoMeili] Index ${indexName} already exists`);
        }
        catch (error) {
            const errorCode = error === null || error === void 0 ? void 0 : error.code;
            if (errorCode === 'index_not_found') {
                try {
                    logger.info(`[mongoMeili] Creating new index: ${indexName}`);
                    await client.createIndex(indexName, { primaryKey });
                    logger.info(`[mongoMeili] Successfully created index: ${indexName}`);
                }
                catch (createError) {
                    // Index might have been created by another instance
                    logger.debug(`[mongoMeili] Index ${indexName} may already exist:`, createError);
                }
            }
            else {
                logger.error(`[mongoMeili] Error checking index ${indexName}:`, error);
            }
        }
        // Configure index settings to make 'user' field filterable
        try {
            await index.updateSettings({
                filterableAttributes: ['user'],
            });
            logger.debug(`[mongoMeili] Updated index ${indexName} settings to make 'user' filterable`);
        }
        catch (settingsError) {
            logger.error(`[mongoMeili] Error updating index settings for ${indexName}:`, settingsError);
        }
    })();
    // Collect attributes from the schema that should be indexed
    const attributesToIndex = [
        ...Object.entries(schema.obj).reduce((results, [key, value]) => {
            const schemaValue = value;
            return schemaValue.meiliIndex ? [...results, key] : results;
        }, []),
    ];
    // CRITICAL: Always include 'user' field for proper filtering
    // This ensures existing deployments can filter by user after migration
    if (schema.obj.user && !attributesToIndex.includes('user')) {
        attributesToIndex.push('user');
        logger.debug(`[mongoMeili] Added 'user' field to ${indexName} index attributes`);
    }
    schema.loadClass(createMeiliMongooseModel({ index, attributesToIndex, syncOptions }));
    // Register Mongoose hooks
    schema.post('save', function (doc, next) {
        var _a;
        (_a = doc.postSaveHook) === null || _a === void 0 ? void 0 : _a.call(doc, next);
    });
    schema.post('updateOne', function (doc, next) {
        var _a;
        (_a = doc.postUpdateHook) === null || _a === void 0 ? void 0 : _a.call(doc, next);
    });
    schema.post('deleteOne', function (doc, next) {
        var _a;
        (_a = doc.postRemoveHook) === null || _a === void 0 ? void 0 : _a.call(doc, next);
    });
    // Pre-deleteMany hook: remove corresponding documents from MeiliSearch when multiple documents are deleted.
    schema.pre('deleteMany', async function (next) {
        if (!meiliEnabled) {
            return next();
        }
        try {
            const conditions = this.getQuery();
            const { batchSize, delayMs } = syncOptions;
            if (Object.prototype.hasOwnProperty.call(schema.obj, 'messages')) {
                const convoIndex = client.index('convos');
                const deletedConvos = await mongoose
                    .model('Conversation')
                    .find(conditions)
                    .select('conversationId')
                    .lean();
                // Process deletions in batches
                await processBatch(deletedConvos, batchSize, delayMs, async (batch) => {
                    const promises = batch.map((convo) => convoIndex.deleteDocument(convo.conversationId));
                    await Promise.all(promises);
                });
            }
            if (Object.prototype.hasOwnProperty.call(schema.obj, 'messageId')) {
                const messageIndex = client.index('messages');
                const deletedMessages = await mongoose
                    .model('Message')
                    .find(conditions)
                    .select('messageId')
                    .lean();
                // Process deletions in batches
                await processBatch(deletedMessages, batchSize, delayMs, async (batch) => {
                    const promises = batch.map((message) => messageIndex.deleteDocument(message.messageId));
                    await Promise.all(promises);
                });
            }
            return next();
        }
        catch (error) {
            if (meiliEnabled) {
                logger.error('[MeiliMongooseModel.deleteMany] There was an issue deleting conversation indexes upon deletion. Next startup may trigger syncing.', error);
            }
            return next();
        }
    });
    // Post-findOneAndUpdate hook
    schema.post('findOneAndUpdate', async function (doc, next) {
        var _a;
        if (!meiliEnabled) {
            return next();
        }
        if (doc.unfinished) {
            return next();
        }
        let meiliDoc;
        if (doc.messages) {
            try {
                meiliDoc = await client.index('convos').getDocument(doc.conversationId);
            }
            catch (error) {
                logger.debug('[MeiliMongooseModel.findOneAndUpdate] Convo not found in MeiliSearch and will index ' +
                    doc.conversationId, error);
            }
        }
        if (meiliDoc && meiliDoc.title === doc.title) {
            return next();
        }
        (_a = doc.postSaveHook) === null || _a === void 0 ? void 0 : _a.call(doc, next);
    });
}

/**
 * Creates or returns the Conversation model using the provided mongoose instance and schema
 */
function createConversationModel(mongoose) {
    if (process.env.MEILI_HOST && process.env.MEILI_MASTER_KEY) {
        convoSchema.plugin(mongoMeili, {
            mongoose,
            host: process.env.MEILI_HOST,
            apiKey: process.env.MEILI_MASTER_KEY,
            /** Note: Will get created automatically if it doesn't exist already */
            indexName: 'convos',
            primaryKey: 'conversationId',
        });
    }
    return (mongoose.models.Conversation || mongoose.model('Conversation', convoSchema));
}

/**
 * Creates or returns the Message model using the provided mongoose instance and schema
 */
function createMessageModel(mongoose) {
    if (process.env.MEILI_HOST && process.env.MEILI_MASTER_KEY) {
        messageSchema.plugin(mongoMeili, {
            mongoose,
            host: process.env.MEILI_HOST,
            apiKey: process.env.MEILI_MASTER_KEY,
            indexName: 'messages',
            primaryKey: 'messageId',
        });
    }
    return mongoose.models.Message || mongoose.model('Message', messageSchema);
}

/**
 * Creates or returns the Agent model using the provided mongoose instance and schema
 */
function createAgentModel(mongoose) {
    return mongoose.models.Agent || mongoose.model('Agent', agentSchema);
}

/**
 * Creates or returns the AgentCategory model using the provided mongoose instance and schema
 */
function createAgentCategoryModel(mongoose) {
    return mongoose.models.AgentCategory || mongoose.model('AgentCategory', agentCategorySchema);
}

/**
 * Creates or returns the Role model using the provided mongoose instance and schema
 */
function createRoleModel(mongoose) {
    return mongoose.models.Role || mongoose.model('Role', roleSchema);
}

/**
 * Creates or returns the Action model using the provided mongoose instance and schema
 */
function createActionModel(mongoose) {
    return mongoose.models.Action || mongoose.model('Action', Action);
}

/**
 * Creates or returns the Assistant model using the provided mongoose instance and schema
 */
function createAssistantModel(mongoose) {
    return mongoose.models.Assistant || mongoose.model('Assistant', assistantSchema);
}

/**
 * Creates or returns the File model using the provided mongoose instance and schema
 */
function createFileModel(mongoose) {
    return mongoose.models.File || mongoose.model('File', file);
}

/**
 * Creates or returns the Banner model using the provided mongoose instance and schema
 */
function createBannerModel(mongoose) {
    return mongoose.models.Banner || mongoose.model('Banner', bannerSchema);
}

/**
 * Creates or returns the Project model using the provided mongoose instance and schema
 */
function createProjectModel(mongoose) {
    return mongoose.models.Project || mongoose.model('Project', projectSchema);
}

/**
 * Creates or returns the Key model using the provided mongoose instance and schema
 */
function createKeyModel(mongoose) {
    return mongoose.models.Key || mongoose.model('Key', keySchema);
}

/**
 * Creates or returns the PluginAuth model using the provided mongoose instance and schema
 */
function createPluginAuthModel(mongoose) {
    return mongoose.models.PluginAuth || mongoose.model('PluginAuth', pluginAuthSchema);
}

/**
 * Creates or returns the Transaction model using the provided mongoose instance and schema
 */
function createTransactionModel(mongoose) {
    return (mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema));
}

/**
 * Creates or returns the Preset model using the provided mongoose instance and schema
 */
function createPresetModel(mongoose) {
    return mongoose.models.Preset || mongoose.model('Preset', presetSchema);
}

/**
 * Creates or returns the Prompt model using the provided mongoose instance and schema
 */
function createPromptModel(mongoose) {
    return mongoose.models.Prompt || mongoose.model('Prompt', promptSchema);
}

/**
 * Creates or returns the PromptGroup model using the provided mongoose instance and schema
 */
function createPromptGroupModel(mongoose) {
    return (mongoose.models.PromptGroup ||
        mongoose.model('PromptGroup', promptGroupSchema));
}

/**
 * Creates or returns the ConversationTag model using the provided mongoose instance and schema
 */
function createConversationTagModel(mongoose) {
    return (mongoose.models.ConversationTag ||
        mongoose.model('ConversationTag', conversationTag));
}

/**
 * Creates or returns the SharedLink model using the provided mongoose instance and schema
 */
function createSharedLinkModel(mongoose) {
    return mongoose.models.SharedLink || mongoose.model('SharedLink', shareSchema);
}

/**
 * Creates or returns the ToolCall model using the provided mongoose instance and schema
 */
function createToolCallModel(mongoose) {
    return mongoose.models.ToolCall || mongoose.model('ToolCall', toolCallSchema);
}

function createMemoryModel(mongoose) {
    return mongoose.models.MemoryEntry || mongoose.model('MemoryEntry', MemoryEntrySchema);
}

const accessRoleSchema = new Schema({
    accessRoleId: {
        type: String,
        required: true,
        index: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: String,
    resourceType: {
        type: String,
        enum: ['agent', 'project', 'file', 'promptGroup'],
        required: true,
        default: 'agent',
    },
    permBits: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

/**
 * Creates or returns the AccessRole model using the provided mongoose instance and schema
 */
function createAccessRoleModel(mongoose) {
    return (mongoose.models.AccessRole || mongoose.model('AccessRole', accessRoleSchema));
}

const aclEntrySchema = new Schema({
    principalType: {
        type: String,
        enum: Object.values(PrincipalType),
        required: true,
    },
    principalId: {
        type: Schema.Types.Mixed, // Can be ObjectId for users/groups or String for roles
        refPath: 'principalModel',
        required: function () {
            return this.principalType !== PrincipalType.PUBLIC;
        },
        index: true,
    },
    principalModel: {
        type: String,
        enum: Object.values(PrincipalModel),
        required: function () {
            return this.principalType !== PrincipalType.PUBLIC;
        },
    },
    resourceType: {
        type: String,
        enum: Object.values(ResourceType),
        required: true,
    },
    resourceId: {
        type: Schema.Types.ObjectId,
        required: true,
        index: true,
    },
    permBits: {
        type: Number,
        default: 1,
    },
    roleId: {
        type: Schema.Types.ObjectId,
        ref: 'AccessRole',
    },
    inheritedFrom: {
        type: Schema.Types.ObjectId,
        sparse: true,
        index: true,
    },
    grantedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    grantedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
aclEntrySchema.index({ principalId: 1, principalType: 1, resourceType: 1, resourceId: 1 });
aclEntrySchema.index({ resourceId: 1, principalType: 1, principalId: 1 });
aclEntrySchema.index({ principalId: 1, permBits: 1, resourceType: 1 });

/**
 * Creates or returns the AclEntry model using the provided mongoose instance and schema
 */
function createAclEntryModel(mongoose) {
    return mongoose.models.AclEntry || mongoose.model('AclEntry', aclEntrySchema);
}

/**
 * Creates or returns the Group model using the provided mongoose instance and schema
 */
function createGroupModel(mongoose) {
    return mongoose.models.Group || mongoose.model('Group', groupSchema);
}

/**
 * Creates all database models for all collections
 */
function createModels(mongoose) {
    return {
        User: createUserModel(mongoose),
        Token: createTokenModel(mongoose),
        Session: createSessionModel(mongoose),
        Balance: createBalanceModel(mongoose),
        Conversation: createConversationModel(mongoose),
        Message: createMessageModel(mongoose),
        Agent: createAgentModel(mongoose),
        AgentCategory: createAgentCategoryModel(mongoose),
        Role: createRoleModel(mongoose),
        Action: createActionModel(mongoose),
        Assistant: createAssistantModel(mongoose),
        File: createFileModel(mongoose),
        Banner: createBannerModel(mongoose),
        Project: createProjectModel(mongoose),
        Key: createKeyModel(mongoose),
        PluginAuth: createPluginAuthModel(mongoose),
        Transaction: createTransactionModel(mongoose),
        Preset: createPresetModel(mongoose),
        Prompt: createPromptModel(mongoose),
        PromptGroup: createPromptGroupModel(mongoose),
        ConversationTag: createConversationTagModel(mongoose),
        SharedLink: createSharedLinkModel(mongoose),
        ToolCall: createToolCallModel(mongoose),
        MemoryEntry: createMemoryModel(mongoose),
        AccessRole: createAccessRoleModel(mongoose),
        AclEntry: createAclEntryModel(mongoose),
        Group: createGroupModel(mongoose),
    };
}

var _a;
class SessionError extends Error {
    constructor(message, code = 'SESSION_ERROR') {
        super(message);
        this.name = 'SessionError';
        this.code = code;
    }
}
const { REFRESH_TOKEN_EXPIRY } = (_a = process.env) !== null && _a !== void 0 ? _a : {};
const expires = REFRESH_TOKEN_EXPIRY ? eval(REFRESH_TOKEN_EXPIRY) : 1000 * 60 * 60 * 24 * 7; // 7 days default
// Factory function that takes mongoose instance and returns the methods
function createSessionMethods(mongoose) {
    /**
     * Creates a new session for a user
     */
    async function createSession(userId, options = {}) {
        if (!userId) {
            throw new SessionError('User ID is required', 'INVALID_USER_ID');
        }
        try {
            const Session = mongoose.models.Session;
            const currentSession = new Session({
                user: userId,
                expiration: options.expiration || new Date(Date.now() + expires),
            });
            const refreshToken = await generateRefreshToken(currentSession);
            return { session: currentSession, refreshToken };
        }
        catch (error) {
            logger$1.error('[createSession] Error creating session:', error);
            throw new SessionError('Failed to create session', 'CREATE_SESSION_FAILED');
        }
    }
    /**
     * Finds a session by various parameters
     */
    async function findSession(params, options = { lean: true }) {
        try {
            const Session = mongoose.models.Session;
            const query = {};
            if (!params.refreshToken && !params.userId && !params.sessionId) {
                throw new SessionError('At least one search parameter is required', 'INVALID_SEARCH_PARAMS');
            }
            if (params.refreshToken) {
                const tokenHash = await hashToken(params.refreshToken);
                query.refreshTokenHash = tokenHash;
            }
            if (params.userId) {
                query.user = params.userId;
            }
            if (params.sessionId) {
                const sessionId = typeof params.sessionId === 'object' &&
                    params.sessionId !== null &&
                    'sessionId' in params.sessionId
                    ? params.sessionId.sessionId
                    : params.sessionId;
                if (!mongoose.Types.ObjectId.isValid(sessionId)) {
                    throw new SessionError('Invalid session ID format', 'INVALID_SESSION_ID');
                }
                query._id = sessionId;
            }
            // Add expiration check to only return valid sessions
            query.expiration = { $gt: new Date() };
            const sessionQuery = Session.findOne(query);
            if (options.lean) {
                return (await sessionQuery.lean());
            }
            return await sessionQuery.exec();
        }
        catch (error) {
            logger$1.error('[findSession] Error finding session:', error);
            throw new SessionError('Failed to find session', 'FIND_SESSION_FAILED');
        }
    }
    /**
     * Updates session expiration
     */
    async function updateExpiration(session, newExpiration) {
        try {
            const Session = mongoose.models.Session;
            const sessionDoc = typeof session === 'string' ? await Session.findById(session) : session;
            if (!sessionDoc) {
                throw new SessionError('Session not found', 'SESSION_NOT_FOUND');
            }
            sessionDoc.expiration = newExpiration || new Date(Date.now() + expires);
            return await sessionDoc.save();
        }
        catch (error) {
            logger$1.error('[updateExpiration] Error updating session:', error);
            throw new SessionError('Failed to update session expiration', 'UPDATE_EXPIRATION_FAILED');
        }
    }
    /**
     * Deletes a session by refresh token or session ID
     */
    async function deleteSession(params) {
        try {
            const Session = mongoose.models.Session;
            if (!params.refreshToken && !params.sessionId) {
                throw new SessionError('Either refreshToken or sessionId is required', 'INVALID_DELETE_PARAMS');
            }
            const query = {};
            if (params.refreshToken) {
                query.refreshTokenHash = await hashToken(params.refreshToken);
            }
            if (params.sessionId) {
                query._id = params.sessionId;
            }
            const result = await Session.deleteOne(query);
            if (result.deletedCount === 0) {
                logger$1.warn('[deleteSession] No session found to delete');
            }
            return result;
        }
        catch (error) {
            logger$1.error('[deleteSession] Error deleting session:', error);
            throw new SessionError('Failed to delete session', 'DELETE_SESSION_FAILED');
        }
    }
    /**
     * Deletes all sessions for a user
     */
    async function deleteAllUserSessions(userId, options = {}) {
        try {
            const Session = mongoose.models.Session;
            if (!userId) {
                throw new SessionError('User ID is required', 'INVALID_USER_ID');
            }
            const userIdString = typeof userId === 'object' && userId !== null ? userId.userId : userId;
            if (!mongoose.Types.ObjectId.isValid(userIdString)) {
                throw new SessionError('Invalid user ID format', 'INVALID_USER_ID_FORMAT');
            }
            const query = { user: userIdString };
            if (options.excludeCurrentSession && options.currentSessionId) {
                query._id = { $ne: options.currentSessionId };
            }
            const result = await Session.deleteMany(query);
            if (result.deletedCount && result.deletedCount > 0) {
                logger$1.debug(`[deleteAllUserSessions] Deleted ${result.deletedCount} sessions for user ${userIdString}.`);
            }
            return result;
        }
        catch (error) {
            logger$1.error('[deleteAllUserSessions] Error deleting user sessions:', error);
            throw new SessionError('Failed to delete user sessions', 'DELETE_ALL_SESSIONS_FAILED');
        }
    }
    /**
     * Generates a refresh token for a session
     */
    async function generateRefreshToken(session) {
        if (!session || !session.user) {
            throw new SessionError('Invalid session object', 'INVALID_SESSION');
        }
        try {
            const expiresIn = session.expiration ? session.expiration.getTime() : Date.now() + expires;
            if (!session.expiration) {
                session.expiration = new Date(expiresIn);
            }
            const refreshToken = await signPayload({
                payload: {
                    id: session.user,
                    sessionId: session._id,
                },
                secret: process.env.JWT_REFRESH_SECRET,
                expirationTime: Math.floor((expiresIn - Date.now()) / 1000),
            });
            session.refreshTokenHash = await hashToken(refreshToken);
            await session.save();
            return refreshToken;
        }
        catch (error) {
            logger$1.error('[generateRefreshToken] Error generating refresh token:', error);
            throw new SessionError('Failed to generate refresh token', 'GENERATE_TOKEN_FAILED');
        }
    }
    /**
     * Counts active sessions for a user
     */
    async function countActiveSessions(userId) {
        try {
            const Session = mongoose.models.Session;
            if (!userId) {
                throw new SessionError('User ID is required', 'INVALID_USER_ID');
            }
            return await Session.countDocuments({
                user: userId,
                expiration: { $gt: new Date() },
            });
        }
        catch (error) {
            logger$1.error('[countActiveSessions] Error counting active sessions:', error);
            throw new SessionError('Failed to count active sessions', 'COUNT_SESSIONS_FAILED');
        }
    }
    return {
        findSession,
        SessionError,
        deleteSession,
        createSession,
        updateExpiration,
        countActiveSessions,
        generateRefreshToken,
        deleteAllUserSessions,
    };
}

// Factory function that takes mongoose instance and returns the methods
function createTokenMethods(mongoose) {
    /**
     * Creates a new Token instance.
     */
    async function createToken(tokenData) {
        try {
            const Token = mongoose.models.Token;
            const currentTime = new Date();
            const expiresAt = new Date(currentTime.getTime() + tokenData.expiresIn * 1000);
            const newTokenData = {
                ...tokenData,
                createdAt: currentTime,
                expiresAt,
            };
            return await Token.create(newTokenData);
        }
        catch (error) {
            logger$1.debug('An error occurred while creating token:', error);
            throw error;
        }
    }
    /**
     * Updates a Token document that matches the provided query.
     */
    async function updateToken(query, updateData) {
        try {
            const Token = mongoose.models.Token;
            return await Token.findOneAndUpdate(query, updateData, { new: true });
        }
        catch (error) {
            logger$1.debug('An error occurred while updating token:', error);
            throw error;
        }
    }
    /**
     * Deletes all Token documents that match the provided token, user ID, or email.
     */
    async function deleteTokens(query) {
        try {
            const Token = mongoose.models.Token;
            const conditions = [];
            if (query.userId !== undefined) {
                conditions.push({ userId: query.userId });
            }
            if (query.token !== undefined) {
                conditions.push({ token: query.token });
            }
            if (query.email !== undefined) {
                conditions.push({ email: query.email });
            }
            if (query.identifier !== undefined) {
                conditions.push({ identifier: query.identifier });
            }
            /**
             * If no conditions are specified, throw an error to prevent accidental deletion of all tokens
             */
            if (conditions.length === 0) {
                throw new Error('At least one query parameter must be provided');
            }
            return await Token.deleteMany({
                $or: conditions,
            });
        }
        catch (error) {
            logger$1.debug('An error occurred while deleting tokens:', error);
            throw error;
        }
    }
    /**
     * Finds a Token document that matches the provided query.
     */
    async function findToken(query, options) {
        try {
            const Token = mongoose.models.Token;
            const conditions = [];
            if (query.userId) {
                conditions.push({ userId: query.userId });
            }
            if (query.token) {
                conditions.push({ token: query.token });
            }
            if (query.email) {
                conditions.push({ email: query.email });
            }
            if (query.identifier) {
                conditions.push({ identifier: query.identifier });
            }
            const token = await Token.findOne({ $and: conditions }, null, options).lean();
            return token;
        }
        catch (error) {
            logger$1.debug('An error occurred while finding token:', error);
            throw error;
        }
    }
    // Return all methods
    return {
        findToken,
        createToken,
        updateToken,
        deleteTokens,
    };
}

// Factory function that takes mongoose instance and returns the methods
function createRoleMethods(mongoose) {
    /**
     * Initialize default roles in the system.
     * Creates the default roles (ADMIN, USER) if they don't exist in the database.
     * Updates existing roles with new permission types if they're missing.
     */
    async function initializeRoles() {
        var _a, _b;
        const Role = mongoose.models.Role;
        for (const roleName of [SystemRoles.ADMIN, SystemRoles.USER]) {
            let role = await Role.findOne({ name: roleName });
            const defaultPerms = roleDefaults[roleName].permissions;
            if (!role) {
                role = new Role(roleDefaults[roleName]);
            }
            else {
                const permissions = (_b = (_a = role.toObject()) === null || _a === void 0 ? void 0 : _a.permissions) !== null && _b !== void 0 ? _b : {};
                role.permissions = role.permissions || {};
                for (const permType of Object.keys(defaultPerms)) {
                    if (permissions[permType] == null || Object.keys(permissions[permType]).length === 0) {
                        role.permissions[permType] = defaultPerms[permType];
                    }
                }
            }
            await role.save();
        }
    }
    /**
     * List all roles in the system (for testing purposes)
     * Returns an array of all roles with their names and permissions
     */
    async function listRoles() {
        const Role = mongoose.models.Role;
        return await Role.find({}).select('name permissions').lean();
    }
    // Return all methods you want to expose
    return {
        listRoles,
        initializeRoles,
    };
}

/** Factory function that takes mongoose instance and returns the methods */
function createUserMethods(mongoose) {
    /**
     * Search for a single user based on partial data and return matching user document as plain object.
     */
    async function findUser(searchCriteria, fieldsToSelect) {
        const User = mongoose.models.User;
        const query = User.findOne(searchCriteria);
        if (fieldsToSelect) {
            query.select(fieldsToSelect);
        }
        return (await query.lean());
    }
    /**
     * Count the number of user documents in the collection based on the provided filter.
     */
    async function countUsers(filter = {}) {
        const User = mongoose.models.User;
        return await User.countDocuments(filter);
    }
    /**
     * Creates a new user, optionally with a TTL of 1 week.
     */
    async function createUser(data, balanceConfig, disableTTL = true, returnUser = false) {
        const User = mongoose.models.User;
        const Balance = mongoose.models.Balance;
        const userData = {
            ...data,
            expiresAt: disableTTL ? undefined : new Date(Date.now() + 604800 * 1000), // 1 week in milliseconds
        };
        if (disableTTL) {
            delete userData.expiresAt;
        }
        const user = await User.create(userData);
        // If balance is enabled, create or update a balance record for the user
        if ((balanceConfig === null || balanceConfig === void 0 ? void 0 : balanceConfig.enabled) && (balanceConfig === null || balanceConfig === void 0 ? void 0 : balanceConfig.startBalance)) {
            const update = {
                $inc: { tokenCredits: balanceConfig.startBalance },
            };
            if (balanceConfig.autoRefillEnabled &&
                balanceConfig.refillIntervalValue != null &&
                balanceConfig.refillIntervalUnit != null &&
                balanceConfig.refillAmount != null) {
                update.$set = {
                    autoRefillEnabled: true,
                    refillIntervalValue: balanceConfig.refillIntervalValue,
                    refillIntervalUnit: balanceConfig.refillIntervalUnit,
                    refillAmount: balanceConfig.refillAmount,
                };
            }
            await Balance.findOneAndUpdate({ user: user._id }, update, {
                upsert: true,
                new: true,
            }).lean();
        }
        if (returnUser) {
            return user.toObject();
        }
        return user._id;
    }
    /**
     * Update a user with new data without overwriting existing properties.
     */
    async function updateUser(userId, updateData) {
        const User = mongoose.models.User;
        const updateOperation = {
            $set: updateData,
            $unset: { expiresAt: '' }, // Remove the expiresAt field to prevent TTL
        };
        return (await User.findByIdAndUpdate(userId, updateOperation, {
            new: true,
            runValidators: true,
        }).lean());
    }
    /**
     * Retrieve a user by ID and convert the found user document to a plain object.
     */
    async function getUserById(userId, fieldsToSelect) {
        const User = mongoose.models.User;
        const query = User.findById(userId);
        if (fieldsToSelect) {
            query.select(fieldsToSelect);
        }
        return (await query.lean());
    }
    /**
     * Delete a user by their unique ID.
     */
    async function deleteUserById(userId) {
        try {
            const User = mongoose.models.User;
            const result = await User.deleteOne({ _id: userId });
            if (result.deletedCount === 0) {
                return { deletedCount: 0, message: 'No user found with that ID.' };
            }
            return { deletedCount: result.deletedCount, message: 'User was deleted successfully.' };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            throw new Error('Error deleting user: ' + errorMessage);
        }
    }
    /**
     * Generates a JWT token for a given user.
     */
    async function generateToken(user) {
        if (!user) {
            throw new Error('No user provided');
        }
        let expires = 1000 * 60 * 15;
        if (process.env.SESSION_EXPIRY !== undefined && process.env.SESSION_EXPIRY !== '') {
            try {
                const evaluated = eval(process.env.SESSION_EXPIRY);
                if (evaluated) {
                    expires = evaluated;
                }
            }
            catch (error) {
                console.warn('Invalid SESSION_EXPIRY expression, using default:', error);
            }
        }
        return await signPayload({
            payload: {
                id: user._id,
                username: user.username,
                provider: user.provider,
                email: user.email,
            },
            secret: process.env.JWT_SECRET,
            expirationTime: expires / 1000,
        });
    }
    /**
     * Update a user's personalization memories setting.
     * Handles the edge case where the personalization object doesn't exist.
     */
    async function toggleUserMemories(userId, memoriesEnabled) {
        const User = mongoose.models.User;
        // First, ensure the personalization object exists
        const user = await User.findById(userId);
        if (!user) {
            return null;
        }
        // Use $set to update the nested field, which will create the personalization object if it doesn't exist
        const updateOperation = {
            $set: {
                'personalization.memories': memoriesEnabled,
            },
        };
        return (await User.findByIdAndUpdate(userId, updateOperation, {
            new: true,
            runValidators: true,
        }).lean());
    }
    /**
     * Search for users by pattern matching on name, email, or username (case-insensitive)
     * @param searchPattern - The pattern to search for
     * @param limit - Maximum number of results to return
     * @param fieldsToSelect - The fields to include or exclude in the returned documents
     * @returns Array of matching user documents
     */
    const searchUsers = async function ({ searchPattern, limit = 20, fieldsToSelect = null, }) {
        if (!searchPattern || searchPattern.trim().length === 0) {
            return [];
        }
        const regex = new RegExp(searchPattern.trim(), 'i');
        const User = mongoose.models.User;
        const query = User.find({
            $or: [{ email: regex }, { name: regex }, { username: regex }],
        }).limit(limit * 2); // Get more results to allow for relevance sorting
        if (fieldsToSelect) {
            query.select(fieldsToSelect);
        }
        const users = await query.lean();
        // Score results by relevance
        const exactRegex = new RegExp(`^${searchPattern.trim()}$`, 'i');
        const startsWithPattern = searchPattern.trim().toLowerCase();
        const scoredUsers = users.map((user) => {
            const searchableFields = [user.name, user.email, user.username].filter(Boolean);
            let maxScore = 0;
            for (const field of searchableFields) {
                const fieldLower = field.toLowerCase();
                let score = 0;
                // Exact match gets highest score
                if (exactRegex.test(field)) {
                    score = 100;
                }
                // Starts with query gets high score
                else if (fieldLower.startsWith(startsWithPattern)) {
                    score = 80;
                }
                // Contains query gets medium score
                else if (fieldLower.includes(startsWithPattern)) {
                    score = 50;
                }
                // Default score for regex match
                else {
                    score = 10;
                }
                maxScore = Math.max(maxScore, score);
            }
            return { ...user, _searchScore: maxScore };
        });
        /** Top results sorted by relevance */
        return scoredUsers
            .sort((a, b) => b._searchScore - a._searchScore)
            .slice(0, limit)
            .map((user) => {
            // Remove the search score from final results
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _searchScore, ...userWithoutScore } = user;
            return userWithoutScore;
        });
    };
    return {
        findUser,
        countUsers,
        createUser,
        updateUser,
        searchUsers,
        getUserById,
        generateToken,
        deleteUserById,
        toggleUserMemories,
    };
}

/**
 * Formats a date in YYYY-MM-DD format
 */
const formatDate = (date) => {
    return date.toISOString().split('T')[0];
};
// Factory function that takes mongoose instance and returns the methods
function createMemoryMethods(mongoose) {
    /**
     * Creates a new memory entry for a user
     * Throws an error if a memory with the same key already exists
     */
    async function createMemory({ userId, key, value, tokenCount = 0, }) {
        try {
            if ((key === null || key === void 0 ? void 0 : key.toLowerCase()) === 'nothing') {
                return { ok: false };
            }
            const MemoryEntry = mongoose.models.MemoryEntry;
            const existingMemory = await MemoryEntry.findOne({ userId, key });
            if (existingMemory) {
                throw new Error('Memory with this key already exists');
            }
            await MemoryEntry.create({
                userId,
                key,
                value,
                tokenCount,
                updated_at: new Date(),
            });
            return { ok: true };
        }
        catch (error) {
            throw new Error(`Failed to create memory: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Sets or updates a memory entry for a user
     */
    async function setMemory({ userId, key, value, tokenCount = 0, }) {
        try {
            if ((key === null || key === void 0 ? void 0 : key.toLowerCase()) === 'nothing') {
                return { ok: false };
            }
            const MemoryEntry = mongoose.models.MemoryEntry;
            await MemoryEntry.findOneAndUpdate({ userId, key }, {
                value,
                tokenCount,
                updated_at: new Date(),
            }, {
                upsert: true,
                new: true,
            });
            return { ok: true };
        }
        catch (error) {
            throw new Error(`Failed to set memory: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Deletes a specific memory entry for a user
     */
    async function deleteMemory({ userId, key }) {
        try {
            const MemoryEntry = mongoose.models.MemoryEntry;
            const result = await MemoryEntry.findOneAndDelete({ userId, key });
            return { ok: !!result };
        }
        catch (error) {
            throw new Error(`Failed to delete memory: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Gets all memory entries for a user
     */
    async function getAllUserMemories(userId) {
        try {
            const MemoryEntry = mongoose.models.MemoryEntry;
            return (await MemoryEntry.find({ userId }).lean());
        }
        catch (error) {
            throw new Error(`Failed to get all memories: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Gets and formats all memories for a user in two different formats
     */
    async function getFormattedMemories({ userId, }) {
        try {
            const memories = await getAllUserMemories(userId);
            if (!memories || memories.length === 0) {
                return { withKeys: '', withoutKeys: '', totalTokens: 0 };
            }
            const sortedMemories = memories.sort((a, b) => new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime());
            const totalTokens = sortedMemories.reduce((sum, memory) => {
                return sum + (memory.tokenCount || 0);
            }, 0);
            const withKeys = sortedMemories
                .map((memory, index) => {
                const date = formatDate(new Date(memory.updated_at));
                const tokenInfo = memory.tokenCount ? ` [${memory.tokenCount} tokens]` : '';
                return `${index + 1}. [${date}]. ["key": "${memory.key}"]${tokenInfo}. ["value": "${memory.value}"]`;
            })
                .join('\n\n');
            const withoutKeys = sortedMemories
                .map((memory, index) => {
                const date = formatDate(new Date(memory.updated_at));
                return `${index + 1}. [${date}]. ${memory.value}`;
            })
                .join('\n\n');
            return { withKeys, withoutKeys, totalTokens };
        }
        catch (error) {
            logger$1.error('Failed to get formatted memories:', error);
            return { withKeys: '', withoutKeys: '', totalTokens: 0 };
        }
    }
    return {
        setMemory,
        createMemory,
        deleteMemory,
        getAllUserMemories,
        getFormattedMemories,
    };
}

function createAgentCategoryMethods(mongoose) {
    /**
     * Get all active categories sorted by order
     * @returns Array of active categories
     */
    async function getActiveCategories() {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.find({ isActive: true }).sort({ order: 1, label: 1 }).lean();
    }
    /**
     * Get categories with agent counts
     * @returns Categories with agent counts
     */
    async function getCategoriesWithCounts() {
        const Agent = mongoose.models.Agent;
        const categoryCounts = await Agent.aggregate([
            { $match: { category: { $exists: true, $ne: null } } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
        ]);
        const countMap = new Map(categoryCounts.map((c) => [c._id, c.count]));
        const categories = await getActiveCategories();
        return categories.map((category) => ({
            ...category,
            agentCount: countMap.get(category.value) || 0,
        }));
    }
    /**
     * Get valid category values for Agent model validation
     * @returns Array of valid category values
     */
    async function getValidCategoryValues() {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.find({ isActive: true }).distinct('value').lean();
    }
    /**
     * Seed initial categories from existing constants
     * @param categories - Array of category data to seed
     * @returns Bulk write result
     */
    async function seedCategories(categories) {
        const AgentCategory = mongoose.models.AgentCategory;
        const operations = categories.map((category, index) => ({
            updateOne: {
                filter: { value: category.value },
                update: {
                    $setOnInsert: {
                        value: category.value,
                        label: category.label || category.value,
                        description: category.description || '',
                        order: category.order || index,
                        isActive: true,
                        custom: category.custom || false,
                    },
                },
                upsert: true,
            },
        }));
        return await AgentCategory.bulkWrite(operations);
    }
    /**
     * Find a category by value
     * @param value - The category value to search for
     * @returns The category document or null
     */
    async function findCategoryByValue(value) {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.findOne({ value }).lean();
    }
    /**
     * Create a new category
     * @param categoryData - The category data to create
     * @returns The created category
     */
    async function createCategory(categoryData) {
        const AgentCategory = mongoose.models.AgentCategory;
        const category = await AgentCategory.create(categoryData);
        return category.toObject();
    }
    /**
     * Update a category by value
     * @param value - The category value to update
     * @param updateData - The data to update
     * @returns The updated category or null
     */
    async function updateCategory(value, updateData) {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.findOneAndUpdate({ value }, { $set: updateData }, { new: true, runValidators: true }).lean();
    }
    /**
     * Delete a category by value
     * @param value - The category value to delete
     * @returns Whether the deletion was successful
     */
    async function deleteCategory(value) {
        const AgentCategory = mongoose.models.AgentCategory;
        const result = await AgentCategory.deleteOne({ value });
        return result.deletedCount > 0;
    }
    /**
     * Find a category by ID
     * @param id - The category ID to search for
     * @returns The category document or null
     */
    async function findCategoryById(id) {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.findById(id).lean();
    }
    /**
     * Get all categories (active and inactive)
     * @returns Array of all categories
     */
    async function getAllCategories() {
        const AgentCategory = mongoose.models.AgentCategory;
        return await AgentCategory.find({}).sort({ order: 1, label: 1 }).lean();
    }
    /**
     * Ensure default categories exist and update them if they don't have localization keys
     * @returns Promise<boolean> - true if categories were created/updated, false if no changes
     */
    async function ensureDefaultCategories() {
        const AgentCategory = mongoose.models.AgentCategory;
        const defaultCategories = [
            {
                value: 'general',
                label: 'com_agents_category_general',
                description: 'com_agents_category_general_description',
                order: 0,
            },
            {
                value: 'hr',
                label: 'com_agents_category_hr',
                description: 'com_agents_category_hr_description',
                order: 1,
            },
            {
                value: 'rd',
                label: 'com_agents_category_rd',
                description: 'com_agents_category_rd_description',
                order: 2,
            },
            {
                value: 'finance',
                label: 'com_agents_category_finance',
                description: 'com_agents_category_finance_description',
                order: 3,
            },
            {
                value: 'it',
                label: 'com_agents_category_it',
                description: 'com_agents_category_it_description',
                order: 4,
            },
            {
                value: 'sales',
                label: 'com_agents_category_sales',
                description: 'com_agents_category_sales_description',
                order: 5,
            },
            {
                value: 'aftersales',
                label: 'com_agents_category_aftersales',
                description: 'com_agents_category_aftersales_description',
                order: 6,
            },
        ];
        const existingCategories = await getAllCategories();
        const existingCategoryMap = new Map(existingCategories.map((cat) => [cat.value, cat]));
        const updates = [];
        let created = 0;
        for (const defaultCategory of defaultCategories) {
            const existingCategory = existingCategoryMap.get(defaultCategory.value);
            if (existingCategory) {
                const isNotCustom = !existingCategory.custom;
                const needsLocalization = !existingCategory.label.startsWith('com_');
                if (isNotCustom && needsLocalization) {
                    updates.push({
                        value: defaultCategory.value,
                        label: defaultCategory.label,
                        description: defaultCategory.description,
                    });
                }
            }
            else {
                await createCategory({
                    ...defaultCategory,
                    isActive: true,
                    custom: false,
                });
                created++;
            }
        }
        if (updates.length > 0) {
            const bulkOps = updates.map((update) => ({
                updateOne: {
                    filter: { value: update.value, custom: { $ne: true } },
                    update: {
                        $set: {
                            label: update.label,
                            description: update.description,
                        },
                    },
                },
            }));
            await AgentCategory.bulkWrite(bulkOps, { ordered: false });
        }
        return updates.length > 0 || created > 0;
    }
    return {
        getActiveCategories,
        getCategoriesWithCounts,
        getValidCategoryValues,
        seedCategories,
        findCategoryByValue,
        createCategory,
        updateCategory,
        deleteCategory,
        findCategoryById,
        getAllCategories,
        ensureDefaultCategories,
    };
}

// Factory function that takes mongoose instance and returns the methods
function createPluginAuthMethods(mongoose) {
    /**
     * Finds a single plugin auth entry by userId and authField (and optionally pluginKey)
     */
    async function findOnePluginAuth({ userId, authField, pluginKey, }) {
        try {
            const PluginAuth = mongoose.models.PluginAuth;
            return await PluginAuth.findOne({
                userId,
                authField,
                ...(pluginKey && { pluginKey }),
            }).lean();
        }
        catch (error) {
            throw new Error(`Failed to find plugin auth: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Finds multiple plugin auth entries by userId and pluginKeys
     */
    async function findPluginAuthsByKeys({ userId, pluginKeys, }) {
        try {
            if (!pluginKeys || pluginKeys.length === 0) {
                return [];
            }
            const PluginAuth = mongoose.models.PluginAuth;
            return await PluginAuth.find({
                userId,
                pluginKey: { $in: pluginKeys },
            }).lean();
        }
        catch (error) {
            throw new Error(`Failed to find plugin auths: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Updates or creates a plugin auth entry
     */
    async function updatePluginAuth({ userId, authField, pluginKey, value, }) {
        try {
            const PluginAuth = mongoose.models.PluginAuth;
            const existingAuth = await PluginAuth.findOne({ userId, pluginKey, authField }).lean();
            if (existingAuth) {
                return await PluginAuth.findOneAndUpdate({ userId, pluginKey, authField }, { $set: { value } }, { new: true, upsert: true }).lean();
            }
            else {
                const newPluginAuth = await new PluginAuth({
                    userId,
                    authField,
                    value,
                    pluginKey,
                });
                await newPluginAuth.save();
                return newPluginAuth.toObject();
            }
        }
        catch (error) {
            throw new Error(`Failed to update plugin auth: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Deletes plugin auth entries based on provided parameters
     */
    async function deletePluginAuth({ userId, authField, pluginKey, all = false, }) {
        try {
            const PluginAuth = mongoose.models.PluginAuth;
            if (all) {
                const filter = { userId };
                if (pluginKey) {
                    filter.pluginKey = pluginKey;
                }
                return await PluginAuth.deleteMany(filter);
            }
            if (!authField) {
                throw new Error('authField is required when all is false');
            }
            return await PluginAuth.deleteOne({ userId, authField });
        }
        catch (error) {
            throw new Error(`Failed to delete plugin auth: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    /**
     * Deletes all plugin auth entries for a user
     */
    async function deleteAllUserPluginAuths(userId) {
        try {
            const PluginAuth = mongoose.models.PluginAuth;
            return await PluginAuth.deleteMany({ userId });
        }
        catch (error) {
            throw new Error(`Failed to delete all user plugin auths: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }
    return {
        findOnePluginAuth,
        findPluginAuthsByKeys,
        updatePluginAuth,
        deletePluginAuth,
        deleteAllUserPluginAuths,
    };
}

function createAccessRoleMethods(mongoose) {
    /**
     * Find an access role by its ID
     * @param roleId - The role ID
     * @returns The role document or null if not found
     */
    async function findRoleById(roleId) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.findById(roleId).lean();
    }
    /**
     * Find an access role by its unique identifier
     * @param accessRoleId - The unique identifier (e.g., "agent_viewer")
     * @returns The role document or null if not found
     */
    async function findRoleByIdentifier(accessRoleId) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.findOne({ accessRoleId }).lean();
    }
    /**
     * Find all access roles for a specific resource type
     * @param resourceType - The type of resource ('agent', 'project', 'file')
     * @returns Array of role documents
     */
    async function findRolesByResourceType(resourceType) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.find({ resourceType }).lean();
    }
    /**
     * Find an access role by resource type and permission bits
     * @param resourceType - The type of resource
     * @param permBits - The permission bits (use PermissionBits or RoleBits enum)
     * @returns The role document or null if not found
     */
    async function findRoleByPermissions(resourceType, permBits) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.findOne({ resourceType, permBits }).lean();
    }
    /**
     * Create a new access role
     * @param roleData - Role data (accessRoleId, name, description, resourceType, permBits)
     * @returns The created role document
     */
    async function createRole(roleData) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.create(roleData);
    }
    /**
     * Update an existing access role
     * @param accessRoleId - The unique identifier of the role to update
     * @param updateData - Data to update
     * @returns The updated role document or null if not found
     */
    async function updateRole(accessRoleId, updateData) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.findOneAndUpdate({ accessRoleId }, { $set: updateData }, { new: true }).lean();
    }
    /**
     * Delete an access role
     * @param accessRoleId - The unique identifier of the role to delete
     * @returns The result of the delete operation
     */
    async function deleteRole(accessRoleId) {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.deleteOne({ accessRoleId });
    }
    /**
     * Get all predefined roles
     * @returns Array of all role documents
     */
    async function getAllRoles() {
        const AccessRole = mongoose.models.AccessRole;
        return await AccessRole.find().lean();
    }
    /**
     * Seed default roles if they don't exist
     * @returns Object containing created roles
     */
    async function seedDefaultRoles() {
        const AccessRole = mongoose.models.AccessRole;
        const defaultRoles = [
            {
                accessRoleId: AccessRoleIds.AGENT_VIEWER,
                name: 'com_ui_role_viewer',
                description: 'com_ui_role_viewer_desc',
                resourceType: ResourceType.AGENT,
                permBits: RoleBits.VIEWER,
            },
            {
                accessRoleId: AccessRoleIds.AGENT_EDITOR,
                name: 'com_ui_role_editor',
                description: 'com_ui_role_editor_desc',
                resourceType: ResourceType.AGENT,
                permBits: RoleBits.EDITOR,
            },
            {
                accessRoleId: AccessRoleIds.AGENT_OWNER,
                name: 'com_ui_role_owner',
                description: 'com_ui_role_owner_desc',
                resourceType: ResourceType.AGENT,
                permBits: RoleBits.OWNER,
            },
            {
                accessRoleId: AccessRoleIds.PROMPTGROUP_VIEWER,
                name: 'com_ui_role_viewer',
                description: 'com_ui_role_viewer_desc',
                resourceType: ResourceType.PROMPTGROUP,
                permBits: RoleBits.VIEWER,
            },
            {
                accessRoleId: AccessRoleIds.PROMPTGROUP_EDITOR,
                name: 'com_ui_role_editor',
                description: 'com_ui_role_editor_desc',
                resourceType: ResourceType.PROMPTGROUP,
                permBits: RoleBits.EDITOR,
            },
            {
                accessRoleId: AccessRoleIds.PROMPTGROUP_OWNER,
                name: 'com_ui_role_owner',
                description: 'com_ui_role_owner_desc',
                resourceType: ResourceType.PROMPTGROUP,
                permBits: RoleBits.OWNER,
            },
        ];
        const result = {};
        for (const role of defaultRoles) {
            const upsertedRole = await AccessRole.findOneAndUpdate({ accessRoleId: role.accessRoleId }, { $setOnInsert: role }, { upsert: true, new: true }).lean();
            result[role.accessRoleId] = upsertedRole;
        }
        return result;
    }
    /**
     * Helper to get the appropriate role for a set of permissions
     * @param resourceType - The type of resource
     * @param permBits - The permission bits
     * @returns The matching role or null if none found
     */
    async function getRoleForPermissions(resourceType, permBits) {
        const AccessRole = mongoose.models.AccessRole;
        const exactMatch = await AccessRole.findOne({ resourceType, permBits }).lean();
        if (exactMatch) {
            return exactMatch;
        }
        /** If no exact match, the closest role without exceeding permissions */
        const roles = await AccessRole.find({ resourceType }).sort({ permBits: -1 }).lean();
        return roles.find((role) => (role.permBits & permBits) === role.permBits) || null;
    }
    return {
        createRole,
        updateRole,
        deleteRole,
        getAllRoles,
        findRoleById,
        seedDefaultRoles,
        findRoleByIdentifier,
        getRoleForPermissions,
        findRoleByPermissions,
        findRolesByResourceType,
    };
}

function createUserGroupMethods(mongoose) {
    /**
     * Find a group by its ID
     * @param groupId - The group ID
     * @param projection - Optional projection of fields to return
     * @param session - Optional MongoDB session for transactions
     * @returns The group document or null if not found
     */
    async function findGroupById(groupId, projection = {}, session) {
        const Group = mongoose.models.Group;
        const query = Group.findOne({ _id: groupId }, projection);
        if (session) {
            query.session(session);
        }
        return await query.lean();
    }
    /**
     * Find a group by its external ID (e.g., Entra ID)
     * @param idOnTheSource - The external ID
     * @param source - The source ('entra' or 'local')
     * @param projection - Optional projection of fields to return
     * @param session - Optional MongoDB session for transactions
     * @returns The group document or null if not found
     */
    async function findGroupByExternalId(idOnTheSource, source = 'entra', projection = {}, session) {
        const Group = mongoose.models.Group;
        const query = Group.findOne({ idOnTheSource, source }, projection);
        if (session) {
            query.session(session);
        }
        return await query.lean();
    }
    /**
     * Find groups by name pattern (case-insensitive partial match)
     * @param namePattern - The name pattern to search for
     * @param source - Optional source filter ('entra', 'local', or null for all)
     * @param limit - Maximum number of results to return
     * @param session - Optional MongoDB session for transactions
     * @returns Array of matching groups
     */
    async function findGroupsByNamePattern(namePattern, source = null, limit = 20, session) {
        const Group = mongoose.models.Group;
        const regex = new RegExp(namePattern, 'i');
        const query = {
            $or: [{ name: regex }, { email: regex }, { description: regex }],
        };
        if (source) {
            query.source = source;
        }
        const dbQuery = Group.find(query).limit(limit);
        if (session) {
            dbQuery.session(session);
        }
        return await dbQuery.lean();
    }
    /**
     * Find all groups a user is a member of by their ID or idOnTheSource
     * @param userId - The user ID
     * @param session - Optional MongoDB session for transactions
     * @returns Array of groups the user is a member of
     */
    async function findGroupsByMemberId(userId, session) {
        const User = mongoose.models.User;
        const Group = mongoose.models.Group;
        const userQuery = User.findById(userId, 'idOnTheSource');
        if (session) {
            userQuery.session(session);
        }
        const user = (await userQuery.lean());
        if (!user) {
            return [];
        }
        const userIdOnTheSource = user.idOnTheSource || userId.toString();
        const query = Group.find({ memberIds: userIdOnTheSource });
        if (session) {
            query.session(session);
        }
        return await query.lean();
    }
    /**
     * Create a new group
     * @param groupData - Group data including name, source, and optional idOnTheSource
     * @param session - Optional MongoDB session for transactions
     * @returns The created group
     */
    async function createGroup(groupData, session) {
        const Group = mongoose.models.Group;
        const options = session ? { session } : {};
        return await Group.create([groupData], options).then((groups) => groups[0]);
    }
    /**
     * Update or create a group by external ID
     * @param idOnTheSource - The external ID
     * @param source - The source ('entra' or 'local')
     * @param updateData - Data to update or set if creating
     * @param session - Optional MongoDB session for transactions
     * @returns The updated or created group
     */
    async function upsertGroupByExternalId(idOnTheSource, source, updateData, session) {
        const Group = mongoose.models.Group;
        const options = {
            new: true,
            upsert: true,
            ...(session ? { session } : {}),
        };
        return await Group.findOneAndUpdate({ idOnTheSource, source }, { $set: updateData }, options);
    }
    /**
     * Add a user to a group
     * Only updates Group.memberIds (one-way relationship)
     * Note: memberIds stores idOnTheSource values, not ObjectIds
     *
     * @param userId - The user ID
     * @param groupId - The group ID to add
     * @param session - Optional MongoDB session for transactions
     * @returns The user and updated group documents
     */
    async function addUserToGroup(userId, groupId, session) {
        const User = mongoose.models.User;
        const Group = mongoose.models.Group;
        const options = { new: true, ...(session ? { session } : {}) };
        const user = (await User.findById(userId, 'idOnTheSource', options).lean());
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const userIdOnTheSource = user.idOnTheSource || userId.toString();
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { $addToSet: { memberIds: userIdOnTheSource } }, options).lean();
        return { user: user, group: updatedGroup };
    }
    /**
     * Remove a user from a group
     * Only updates Group.memberIds (one-way relationship)
     * Note: memberIds stores idOnTheSource values, not ObjectIds
     *
     * @param userId - The user ID
     * @param groupId - The group ID to remove
     * @param session - Optional MongoDB session for transactions
     * @returns The user and updated group documents
     */
    async function removeUserFromGroup(userId, groupId, session) {
        const User = mongoose.models.User;
        const Group = mongoose.models.Group;
        const options = { new: true, ...(session ? { session } : {}) };
        const user = (await User.findById(userId, 'idOnTheSource', options).lean());
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        const userIdOnTheSource = user.idOnTheSource || userId.toString();
        const updatedGroup = await Group.findByIdAndUpdate(groupId, { $pull: { memberIds: userIdOnTheSource } }, options).lean();
        return { user: user, group: updatedGroup };
    }
    /**
     * Get all groups a user is a member of
     * @param userId - The user ID
     * @param session - Optional MongoDB session for transactions
     * @returns Array of group documents
     */
    async function getUserGroups(userId, session) {
        return await findGroupsByMemberId(userId, session);
    }
    /**
     * Get a list of all principal identifiers for a user (user ID + group IDs + public)
     * For use in permission checks
     * @param params - Parameters object
     * @param params.userId - The user ID
     * @param params.role - Optional user role (if not provided, will query from DB)
     * @param session - Optional MongoDB session for transactions
     * @returns Array of principal objects with type and id
     */
    async function getUserPrincipals(params, session) {
        const { userId, role } = params;
        /** `userId` must be an `ObjectId` for USER principal since ACL entries store `ObjectId`s */
        const userObjectId = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;
        const principals = [
            { principalType: PrincipalType.USER, principalId: userObjectId },
        ];
        // If role is not provided, query user to get it
        let userRole = role;
        if (userRole === undefined) {
            const User = mongoose.models.User;
            const query = User.findById(userId).select('role');
            if (session) {
                query.session(session);
            }
            const user = await query.lean();
            userRole = user === null || user === void 0 ? void 0 : user.role;
        }
        // Add role as a principal if user has one
        if (userRole && userRole.trim()) {
            principals.push({ principalType: PrincipalType.ROLE, principalId: userRole });
        }
        const userGroups = await getUserGroups(userId, session);
        if (userGroups && userGroups.length > 0) {
            userGroups.forEach((group) => {
                principals.push({ principalType: PrincipalType.GROUP, principalId: group._id });
            });
        }
        principals.push({ principalType: PrincipalType.PUBLIC });
        return principals;
    }
    /**
     * Sync a user's Entra ID group memberships
     * @param userId - The user ID
     * @param entraGroups - Array of Entra groups with id and name
     * @param session - Optional MongoDB session for transactions
     * @returns The updated user with new group memberships
     */
    async function syncUserEntraGroups(userId, entraGroups, session) {
        var _a;
        const User = mongoose.models.User;
        const Group = mongoose.models.Group;
        const query = User.findById(userId, { idOnTheSource: 1 });
        if (session) {
            query.session(session);
        }
        const user = (await query.lean());
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }
        /** Get user's idOnTheSource for storing in group.memberIds */
        const userIdOnTheSource = user.idOnTheSource || userId.toString();
        const entraIdMap = new Map();
        const addedGroups = [];
        const removedGroups = [];
        for (const entraGroup of entraGroups) {
            entraIdMap.set(entraGroup.id, true);
            let group = await findGroupByExternalId(entraGroup.id, 'entra', {}, session);
            if (!group) {
                group = await createGroup({
                    name: entraGroup.name,
                    description: entraGroup.description,
                    email: entraGroup.email,
                    idOnTheSource: entraGroup.id,
                    source: 'entra',
                    memberIds: [userIdOnTheSource],
                }, session);
                addedGroups.push(group);
            }
            else if (!((_a = group.memberIds) === null || _a === void 0 ? void 0 : _a.includes(userIdOnTheSource))) {
                const { group: updatedGroup } = await addUserToGroup(userId, group._id, session);
                if (updatedGroup) {
                    addedGroups.push(updatedGroup);
                }
            }
        }
        const groupsQuery = Group.find({ source: 'entra', memberIds: userIdOnTheSource }, { _id: 1, idOnTheSource: 1 });
        if (session) {
            groupsQuery.session(session);
        }
        const existingGroups = (await groupsQuery.lean());
        for (const group of existingGroups) {
            if (group.idOnTheSource && !entraIdMap.has(group.idOnTheSource)) {
                const { group: removedGroup } = await removeUserFromGroup(userId, group._id, session);
                if (removedGroup) {
                    removedGroups.push(removedGroup);
                }
            }
        }
        const userQuery = User.findById(userId);
        if (session) {
            userQuery.session(session);
        }
        const updatedUser = await userQuery.lean();
        if (!updatedUser) {
            throw new Error(`User not found after update: ${userId}`);
        }
        return {
            user: updatedUser,
            addedGroups,
            removedGroups,
        };
    }
    /**
     * Calculate relevance score for a search result
     * @param item - The search result item
     * @param searchPattern - The search pattern
     * @returns Relevance score (0-100)
     */
    function calculateRelevanceScore(item, searchPattern) {
        const exactRegex = new RegExp(`^${searchPattern}$`, 'i');
        const startsWithPattern = searchPattern.toLowerCase();
        /** Get searchable text based on type */
        const searchableFields = item.type === PrincipalType.USER
            ? [item.name, item.email, item.username].filter(Boolean)
            : [item.name, item.email, item.description].filter(Boolean);
        let maxScore = 0;
        for (const field of searchableFields) {
            if (!field)
                continue;
            const fieldLower = field.toLowerCase();
            let score = 0;
            /** Exact match gets highest score */
            if (exactRegex.test(field)) {
                score = 100;
            }
            else if (fieldLower.startsWith(startsWithPattern)) {
                /** Starts with query gets high score */
                score = 80;
            }
            else if (fieldLower.includes(startsWithPattern)) {
                /** Contains query gets medium score */
                score = 50;
            }
            else {
                /** Default score for regex match */
                score = 10;
            }
            maxScore = Math.max(maxScore, score);
        }
        return maxScore;
    }
    /**
     * Sort principals by relevance score and type priority
     * @param results - Array of results with _searchScore property
     * @returns Sorted array
     */
    function sortPrincipalsByRelevance(results) {
        return results.sort((a, b) => {
            if (b._searchScore !== a._searchScore) {
                return (b._searchScore || 0) - (a._searchScore || 0);
            }
            if (a.type !== b.type) {
                return a.type === PrincipalType.USER ? -1 : 1;
            }
            const aName = a.name || a.email || '';
            const bName = b.name || b.email || '';
            return aName.localeCompare(bName);
        });
    }
    /**
     * Transform user object to TPrincipalSearchResult format
     * @param user - User object from database
     * @returns Transformed user result
     */
    function transformUserToTPrincipalSearchResult(user) {
        return {
            id: user.id,
            type: PrincipalType.USER,
            name: user.name || user.email,
            email: user.email,
            username: user.username,
            avatar: user.avatar,
            provider: user.provider,
            source: 'local',
            idOnTheSource: user.idOnTheSource || user.id,
        };
    }
    /**
     * Transform group object to TPrincipalSearchResult format
     * @param group - Group object from database
     * @returns Transformed group result
     */
    function transformGroupToTPrincipalSearchResult(group) {
        var _a, _b;
        return {
            id: (_a = group._id) === null || _a === void 0 ? void 0 : _a.toString(),
            type: PrincipalType.GROUP,
            name: group.name,
            email: group.email,
            avatar: group.avatar,
            description: group.description,
            source: group.source || 'local',
            memberCount: group.memberIds ? group.memberIds.length : 0,
            idOnTheSource: group.idOnTheSource || ((_b = group._id) === null || _b === void 0 ? void 0 : _b.toString()),
        };
    }
    /**
     * Search for principals (users and groups) by pattern matching on name/email
     * Returns combined results in TPrincipalSearchResult format without sorting
     * @param searchPattern - The pattern to search for
     * @param limitPerType - Maximum number of results to return
     * @param typeFilter - Optional array of types to filter by, or null for all types
     * @param session - Optional MongoDB session for transactions
     * @returns Array of principals in TPrincipalSearchResult format
     */
    async function searchPrincipals(searchPattern, limitPerType = 10, typeFilter = null, session) {
        if (!searchPattern || searchPattern.trim().length === 0) {
            return [];
        }
        const trimmedPattern = searchPattern.trim();
        const promises = [];
        if (!typeFilter || typeFilter.includes(PrincipalType.USER)) {
            /** Note: searchUsers is imported from ~/models and needs to be passed in or implemented */
            const userFields = 'name email username avatar provider idOnTheSource';
            /** For now, we'll use a direct query instead of searchUsers */
            const User = mongoose.models.User;
            const regex = new RegExp(trimmedPattern, 'i');
            const userQuery = User.find({
                $or: [{ name: regex }, { email: regex }, { username: regex }],
            })
                .select(userFields)
                .limit(limitPerType);
            if (session) {
                userQuery.session(session);
            }
            promises.push(userQuery.lean().then((users) => users.map((user) => {
                var _a;
                const userWithId = user;
                return transformUserToTPrincipalSearchResult({
                    id: ((_a = userWithId._id) === null || _a === void 0 ? void 0 : _a.toString()) || '',
                    name: userWithId.name,
                    email: userWithId.email,
                    username: userWithId.username,
                    avatar: userWithId.avatar,
                    provider: userWithId.provider,
                });
            })));
        }
        else {
            promises.push(Promise.resolve([]));
        }
        if (!typeFilter || typeFilter.includes(PrincipalType.GROUP)) {
            promises.push(findGroupsByNamePattern(trimmedPattern, null, limitPerType, session).then((groups) => groups.map(transformGroupToTPrincipalSearchResult)));
        }
        else {
            promises.push(Promise.resolve([]));
        }
        if (!typeFilter || typeFilter.includes(PrincipalType.ROLE)) {
            const Role = mongoose.models.Role;
            if (Role) {
                const regex = new RegExp(trimmedPattern, 'i');
                const roleQuery = Role.find({ name: regex }).select('name').limit(limitPerType);
                if (session) {
                    roleQuery.session(session);
                }
                promises.push(roleQuery.lean().then((roles) => roles.map((role) => ({
                    /** Role name as ID */
                    id: role.name,
                    type: PrincipalType.ROLE,
                    name: role.name,
                    source: 'local',
                    idOnTheSource: role.name,
                }))));
            }
        }
        else {
            promises.push(Promise.resolve([]));
        }
        const results = await Promise.all(promises);
        const combined = results.flat();
        return combined;
    }
    return {
        findGroupById,
        findGroupByExternalId,
        findGroupsByNamePattern,
        findGroupsByMemberId,
        createGroup,
        upsertGroupByExternalId,
        addUserToGroup,
        removeUserFromGroup,
        getUserGroups,
        getUserPrincipals,
        syncUserEntraGroups,
        searchPrincipals,
        calculateRelevanceScore,
        sortPrincipalsByRelevance,
    };
}

function createAclEntryMethods(mongoose) {
    /**
     * Find ACL entries for a specific principal (user or group)
     * @param principalType - The type of principal ('user', 'group')
     * @param principalId - The ID of the principal
     * @param resourceType - Optional filter by resource type
     * @returns Array of ACL entries
     */
    async function findEntriesByPrincipal(principalType, principalId, resourceType) {
        const AclEntry = mongoose.models.AclEntry;
        const query = { principalType, principalId };
        if (resourceType) {
            query.resourceType = resourceType;
        }
        return await AclEntry.find(query).lean();
    }
    /**
     * Find ACL entries for a specific resource
     * @param resourceType - The type of resource ('agent', 'project', 'file')
     * @param resourceId - The ID of the resource
     * @returns Array of ACL entries
     */
    async function findEntriesByResource(resourceType, resourceId) {
        const AclEntry = mongoose.models.AclEntry;
        return await AclEntry.find({ resourceType, resourceId }).lean();
    }
    /**
     * Find all ACL entries for a set of principals (including public)
     * @param principalsList - List of principals, each containing { principalType, principalId }
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @returns Array of matching ACL entries
     */
    async function findEntriesByPrincipalsAndResource(principalsList, resourceType, resourceId) {
        const AclEntry = mongoose.models.AclEntry;
        const principalsQuery = principalsList.map((p) => ({
            principalType: p.principalType,
            ...(p.principalType !== PrincipalType.PUBLIC && { principalId: p.principalId }),
        }));
        return await AclEntry.find({
            $or: principalsQuery,
            resourceType,
            resourceId,
        }).lean();
    }
    /**
     * Check if a set of principals has a specific permission on a resource
     * @param principalsList - List of principals, each containing { principalType, principalId }
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @param permissionBit - The permission bit to check (use PermissionBits enum)
     * @returns Whether any of the principals has the permission
     */
    async function hasPermission(principalsList, resourceType, resourceId, permissionBit) {
        const AclEntry = mongoose.models.AclEntry;
        const principalsQuery = principalsList.map((p) => ({
            principalType: p.principalType,
            ...(p.principalType !== PrincipalType.PUBLIC && { principalId: p.principalId }),
        }));
        const entry = await AclEntry.findOne({
            $or: principalsQuery,
            resourceType,
            resourceId,
            permBits: { $bitsAllSet: permissionBit },
        }).lean();
        return !!entry;
    }
    /**
     * Get the combined effective permissions for a set of principals on a resource
     * @param principalsList - List of principals, each containing { principalType, principalId }
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @returns {Promise<number>} Effective permission bitmask
     */
    async function getEffectivePermissions(principalsList, resourceType, resourceId) {
        const aclEntries = await findEntriesByPrincipalsAndResource(principalsList, resourceType, resourceId);
        let effectiveBits = 0;
        for (const entry of aclEntries) {
            effectiveBits |= entry.permBits;
        }
        return effectiveBits;
    }
    /**
     * Grant permission to a principal for a resource
     * @param principalType - The type of principal ('user', 'group', 'public')
     * @param principalId - The ID of the principal (null for 'public')
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @param permBits - The permission bits to grant
     * @param grantedBy - The ID of the user granting the permission
     * @param session - Optional MongoDB session for transactions
     * @param roleId - Optional role ID to associate with this permission
     * @returns The created or updated ACL entry
     */
    async function grantPermission(principalType, principalId, resourceType, resourceId, permBits, grantedBy, session, roleId) {
        const AclEntry = mongoose.models.AclEntry;
        const query = {
            principalType,
            resourceType,
            resourceId,
        };
        if (principalType !== PrincipalType.PUBLIC) {
            query.principalId =
                typeof principalId === 'string' && principalType !== PrincipalType.ROLE
                    ? new Types.ObjectId(principalId)
                    : principalId;
            if (principalType === PrincipalType.USER) {
                query.principalModel = PrincipalModel.USER;
            }
            else if (principalType === PrincipalType.GROUP) {
                query.principalModel = PrincipalModel.GROUP;
            }
            else if (principalType === PrincipalType.ROLE) {
                query.principalModel = PrincipalModel.ROLE;
            }
        }
        const update = {
            $set: {
                permBits,
                grantedBy,
                grantedAt: new Date(),
                ...(roleId && { roleId }),
            },
        };
        const options = {
            upsert: true,
            new: true,
            ...(session ? { session } : {}),
        };
        return await AclEntry.findOneAndUpdate(query, update, options);
    }
    /**
     * Revoke permissions from a principal for a resource
     * @param principalType - The type of principal ('user', 'group', 'public')
     * @param principalId - The ID of the principal (null for 'public')
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @param session - Optional MongoDB session for transactions
     * @returns The result of the delete operation
     */
    async function revokePermission(principalType, principalId, resourceType, resourceId, session) {
        const AclEntry = mongoose.models.AclEntry;
        const query = {
            principalType,
            resourceType,
            resourceId,
        };
        if (principalType !== PrincipalType.PUBLIC) {
            query.principalId =
                typeof principalId === 'string' && principalType !== PrincipalType.ROLE
                    ? new Types.ObjectId(principalId)
                    : principalId;
        }
        const options = session ? { session } : {};
        return await AclEntry.deleteOne(query, options);
    }
    /**
     * Modify existing permission bits for a principal on a resource
     * @param principalType - The type of principal ('user', 'group', 'public')
     * @param principalId - The ID of the principal (null for 'public')
     * @param resourceType - The type of resource
     * @param resourceId - The ID of the resource
     * @param addBits - Permission bits to add
     * @param removeBits - Permission bits to remove
     * @param session - Optional MongoDB session for transactions
     * @returns The updated ACL entry
     */
    async function modifyPermissionBits(principalType, principalId, resourceType, resourceId, addBits, removeBits, session) {
        const AclEntry = mongoose.models.AclEntry;
        const query = {
            principalType,
            resourceType,
            resourceId,
        };
        if (principalType !== PrincipalType.PUBLIC) {
            query.principalId =
                typeof principalId === 'string' && principalType !== PrincipalType.ROLE
                    ? new Types.ObjectId(principalId)
                    : principalId;
        }
        const update = {};
        if (addBits) {
            update.$bit = { permBits: { or: addBits } };
        }
        if (removeBits) {
            if (!update.$bit)
                update.$bit = {};
            const bitUpdate = update.$bit;
            bitUpdate.permBits = { ...bitUpdate.permBits, and: ~removeBits };
        }
        const options = {
            new: true,
            ...(session ? { session } : {}),
        };
        return await AclEntry.findOneAndUpdate(query, update, options);
    }
    /**
     * Find all resources of a specific type that a set of principals has access to
     * @param principalsList - List of principals, each containing { principalType, principalId }
     * @param resourceType - The type of resource
     * @param requiredPermBit - Required permission bit (use PermissionBits enum)
     * @returns Array of resource IDs
     */
    async function findAccessibleResources(principalsList, resourceType, requiredPermBit) {
        const AclEntry = mongoose.models.AclEntry;
        const principalsQuery = principalsList.map((p) => ({
            principalType: p.principalType,
            ...(p.principalType !== PrincipalType.PUBLIC && { principalId: p.principalId }),
        }));
        const entries = await AclEntry.find({
            $or: principalsQuery,
            resourceType,
            permBits: { $bitsAllSet: requiredPermBit },
        }).distinct('resourceId');
        return entries;
    }
    return {
        findEntriesByPrincipal,
        findEntriesByResource,
        findEntriesByPrincipalsAndResource,
        hasPermission,
        getEffectivePermissions,
        grantPermission,
        revokePermission,
        modifyPermissionBits,
        findAccessibleResources,
    };
}

class ShareServiceError extends Error {
    constructor(message, code) {
        super(message);
        this.name = 'ShareServiceError';
        this.code = code;
    }
}
function memoizedAnonymizeId(prefix) {
    const memo = new Map();
    return (id) => {
        if (!memo.has(id)) {
            memo.set(id, `${prefix}_${nanoid()}`);
        }
        return memo.get(id);
    };
}
const anonymizeConvoId = memoizedAnonymizeId('convo');
const anonymizeAssistantId = memoizedAnonymizeId('a');
const anonymizeMessageId = (id) => id === Constants.NO_PARENT ? id : memoizedAnonymizeId('msg')(id);
function anonymizeConvo(conversation) {
    if (!conversation) {
        return null;
    }
    const newConvo = { ...conversation };
    if (newConvo.assistant_id) {
        newConvo.assistant_id = anonymizeAssistantId(newConvo.assistant_id);
    }
    return newConvo;
}
function anonymizeMessages(messages, newConvoId) {
    if (!Array.isArray(messages)) {
        return [];
    }
    const idMap = new Map();
    return messages.map((message) => {
        var _a, _b;
        const newMessageId = anonymizeMessageId(message.messageId);
        idMap.set(message.messageId, newMessageId);
        const anonymizedAttachments = (_a = message.attachments) === null || _a === void 0 ? void 0 : _a.map((attachment) => {
            return {
                ...attachment,
                messageId: newMessageId,
                conversationId: newConvoId,
            };
        });
        return {
            ...message,
            messageId: newMessageId,
            parentMessageId: idMap.get(message.parentMessageId || '') ||
                anonymizeMessageId(message.parentMessageId || ''),
            conversationId: newConvoId,
            model: ((_b = message.model) === null || _b === void 0 ? void 0 : _b.startsWith('asst_'))
                ? anonymizeAssistantId(message.model)
                : message.model,
            attachments: anonymizedAttachments,
        };
    });
}
/**
 * Filter messages up to and including the target message (branch-specific)
 * Similar to getMessagesUpToTargetLevel from fork utilities
 */
function getMessagesUpToTarget(messages, targetMessageId) {
    var _a, _b;
    if (!messages || messages.length === 0) {
        return [];
    }
    // If only one message and it's the target, return it
    if (messages.length === 1 && ((_a = messages[0]) === null || _a === void 0 ? void 0 : _a.messageId) === targetMessageId) {
        return messages;
    }
    // Create a map of parentMessageId to children messages
    const parentToChildrenMap = new Map();
    for (const message of messages) {
        const parentId = message.parentMessageId || Constants.NO_PARENT;
        if (!parentToChildrenMap.has(parentId)) {
            parentToChildrenMap.set(parentId, []);
        }
        (_b = parentToChildrenMap.get(parentId)) === null || _b === void 0 ? void 0 : _b.push(message);
    }
    // Find the target message
    const targetMessage = messages.find((msg) => msg.messageId === targetMessageId);
    if (!targetMessage) {
        // If target not found, return all messages for backwards compatibility
        return messages;
    }
    const visited = new Set();
    const rootMessages = parentToChildrenMap.get(Constants.NO_PARENT) || [];
    let currentLevel = rootMessages.length > 0 ? [...rootMessages] : [targetMessage];
    const results = new Set(currentLevel);
    // Check if the target message is at the root level
    if (currentLevel.some((msg) => msg.messageId === targetMessageId) &&
        targetMessage.parentMessageId === Constants.NO_PARENT) {
        return Array.from(results);
    }
    // Iterate level by level until the target is found
    let targetFound = false;
    while (!targetFound && currentLevel.length > 0) {
        const nextLevel = [];
        for (const node of currentLevel) {
            if (visited.has(node.messageId)) {
                continue;
            }
            visited.add(node.messageId);
            const children = parentToChildrenMap.get(node.messageId) || [];
            for (const child of children) {
                if (visited.has(child.messageId)) {
                    continue;
                }
                nextLevel.push(child);
                results.add(child);
                if (child.messageId === targetMessageId) {
                    targetFound = true;
                }
            }
        }
        currentLevel = nextLevel;
    }
    return Array.from(results);
}
/** Factory function that takes mongoose instance and returns the methods */
function createShareMethods(mongoose) {
    /**
     * Get shared messages for a public share link
     */
    async function getSharedMessages(shareId) {
        try {
            const SharedLink = mongoose.models.SharedLink;
            const share = (await SharedLink.findOne({ shareId, isPublic: true })
                .populate({
                path: 'messages',
                select: '-_id -__v -user',
            })
                .select('-_id -__v -user')
                .lean());
            if (!(share === null || share === void 0 ? void 0 : share.conversationId) || !share.isPublic) {
                return null;
            }
            /** Filtered messages based on targetMessageId if present (branch-specific sharing) */
            let messagesToShare = share.messages;
            if (share.targetMessageId) {
                messagesToShare = getMessagesUpToTarget(share.messages, share.targetMessageId);
            }
            const newConvoId = anonymizeConvoId(share.conversationId);
            const result = {
                shareId: share.shareId || shareId,
                title: share.title,
                isPublic: share.isPublic,
                createdAt: share.createdAt,
                updatedAt: share.updatedAt,
                conversationId: newConvoId,
                messages: anonymizeMessages(messagesToShare, newConvoId),
            };
            return result;
        }
        catch (error) {
            logger$1.error('[getSharedMessages] Error getting share link', {
                error: error instanceof Error ? error.message : 'Unknown error',
                shareId,
            });
            throw new ShareServiceError('Error getting share link', 'SHARE_FETCH_ERROR');
        }
    }
    /**
     * Get shared links for a specific user with pagination and search
     */
    async function getSharedLinks(user, pageParam, pageSize = 10, isPublic = true, sortBy = 'createdAt', sortDirection = 'desc', search) {
        var _a;
        try {
            const SharedLink = mongoose.models.SharedLink;
            const Conversation = mongoose.models.Conversation;
            const query = { user, isPublic };
            if (pageParam) {
                if (sortDirection === 'desc') {
                    query[sortBy] = { $lt: pageParam };
                }
                else {
                    query[sortBy] = { $gt: pageParam };
                }
            }
            if (search && search.trim()) {
                try {
                    const searchResults = await Conversation.meiliSearch(search, {
                        filter: `user = "${user}"`,
                    });
                    if (!((_a = searchResults === null || searchResults === void 0 ? void 0 : searchResults.hits) === null || _a === void 0 ? void 0 : _a.length)) {
                        return {
                            links: [],
                            nextCursor: undefined,
                            hasNextPage: false,
                        };
                    }
                    const conversationIds = searchResults.hits.map((hit) => hit.conversationId);
                    query['conversationId'] = { $in: conversationIds };
                }
                catch (searchError) {
                    logger$1.error('[getSharedLinks] Meilisearch error', {
                        error: searchError instanceof Error ? searchError.message : 'Unknown error',
                        user,
                    });
                    return {
                        links: [],
                        nextCursor: undefined,
                        hasNextPage: false,
                    };
                }
            }
            const sort = {};
            sort[sortBy] = sortDirection === 'desc' ? -1 : 1;
            const sharedLinks = await SharedLink.find(query)
                .sort(sort)
                .limit(pageSize + 1)
                .select('-__v -user')
                .lean();
            const hasNextPage = sharedLinks.length > pageSize;
            const links = sharedLinks.slice(0, pageSize);
            const nextCursor = hasNextPage
                ? links[links.length - 1][sortBy]
                : undefined;
            return {
                links: links.map((link) => ({
                    shareId: link.shareId || '',
                    title: (link === null || link === void 0 ? void 0 : link.title) || 'Untitled',
                    isPublic: link.isPublic,
                    createdAt: link.createdAt || new Date(),
                    conversationId: link.conversationId,
                })),
                nextCursor,
                hasNextPage,
            };
        }
        catch (error) {
            logger$1.error('[getSharedLinks] Error getting shares', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
            });
            throw new ShareServiceError('Error getting shares', 'SHARES_FETCH_ERROR');
        }
    }
    /**
     * Delete all shared links for a user
     */
    async function deleteAllSharedLinks(user) {
        try {
            const SharedLink = mongoose.models.SharedLink;
            const result = await SharedLink.deleteMany({ user });
            return {
                message: 'All shared links deleted successfully',
                deletedCount: result.deletedCount,
            };
        }
        catch (error) {
            logger$1.error('[deleteAllSharedLinks] Error deleting shared links', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
            });
            throw new ShareServiceError('Error deleting shared links', 'BULK_DELETE_ERROR');
        }
    }
    /**
     * Delete shared links by conversation ID
     */
    async function deleteConvoSharedLink(user, conversationId) {
        if (!user || !conversationId) {
            throw new ShareServiceError('Missing required parameters', 'INVALID_PARAMS');
        }
        try {
            const SharedLink = mongoose.models.SharedLink;
            const result = await SharedLink.deleteMany({ user, conversationId });
            return {
                message: 'Shared links deleted successfully',
                deletedCount: result.deletedCount,
            };
        }
        catch (error) {
            logger$1.error('[deleteConvoSharedLink] Error deleting shared links', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
                conversationId,
            });
            throw new ShareServiceError('Error deleting shared links', 'SHARE_DELETE_ERROR');
        }
    }
    /**
     * Create a new shared link for a conversation
     */
    async function createSharedLink(user, conversationId, targetMessageId) {
        if (!user || !conversationId) {
            throw new ShareServiceError('Missing required parameters', 'INVALID_PARAMS');
        }
        try {
            const Message = mongoose.models.Message;
            const SharedLink = mongoose.models.SharedLink;
            const Conversation = mongoose.models.Conversation;
            const [existingShare, conversationMessages] = await Promise.all([
                SharedLink.findOne({
                    conversationId,
                    user,
                    isPublic: true,
                    ...(targetMessageId && { targetMessageId }),
                })
                    .select('-_id -__v -user')
                    .lean(),
                Message.find({ conversationId, user }).sort({ createdAt: 1 }).lean(),
            ]);
            if (existingShare && existingShare.isPublic) {
                logger$1.error('[createSharedLink] Share already exists', {
                    user,
                    conversationId,
                    targetMessageId,
                });
                throw new ShareServiceError('Share already exists', 'SHARE_EXISTS');
            }
            else if (existingShare) {
                await SharedLink.deleteOne({
                    conversationId,
                    user,
                    ...(targetMessageId && { targetMessageId }),
                });
            }
            const conversation = (await Conversation.findOne({ conversationId, user }).lean());
            // Check if user owns the conversation
            if (!conversation) {
                throw new ShareServiceError('Conversation not found or access denied', 'CONVERSATION_NOT_FOUND');
            }
            // Check if there are any messages to share
            if (!conversationMessages || conversationMessages.length === 0) {
                throw new ShareServiceError('No messages to share', 'NO_MESSAGES');
            }
            const title = conversation.title || 'Untitled';
            const shareId = nanoid();
            await SharedLink.create({
                shareId,
                conversationId,
                messages: conversationMessages,
                title,
                user,
                ...(targetMessageId && { targetMessageId }),
            });
            return { shareId, conversationId };
        }
        catch (error) {
            if (error instanceof ShareServiceError) {
                throw error;
            }
            logger$1.error('[createSharedLink] Error creating shared link', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
                conversationId,
                targetMessageId,
            });
            throw new ShareServiceError('Error creating shared link', 'SHARE_CREATE_ERROR');
        }
    }
    /**
     * Get a shared link for a conversation
     */
    async function getSharedLink(user, conversationId) {
        if (!user || !conversationId) {
            throw new ShareServiceError('Missing required parameters', 'INVALID_PARAMS');
        }
        try {
            const SharedLink = mongoose.models.SharedLink;
            const share = (await SharedLink.findOne({ conversationId, user, isPublic: true })
                .select('shareId -_id')
                .lean());
            if (!share) {
                return { shareId: null, success: false };
            }
            return { shareId: share.shareId || null, success: true };
        }
        catch (error) {
            logger$1.error('[getSharedLink] Error getting shared link', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
                conversationId,
            });
            throw new ShareServiceError('Error getting shared link', 'SHARE_FETCH_ERROR');
        }
    }
    /**
     * Update a shared link with new messages
     */
    async function updateSharedLink(user, shareId) {
        if (!user || !shareId) {
            throw new ShareServiceError('Missing required parameters', 'INVALID_PARAMS');
        }
        try {
            const SharedLink = mongoose.models.SharedLink;
            const Message = mongoose.models.Message;
            const share = (await SharedLink.findOne({ shareId, user })
                .select('-_id -__v -user')
                .lean());
            if (!share) {
                throw new ShareServiceError('Share not found', 'SHARE_NOT_FOUND');
            }
            const updatedMessages = await Message.find({ conversationId: share.conversationId, user })
                .sort({ createdAt: 1 })
                .lean();
            const newShareId = nanoid();
            const update = {
                messages: updatedMessages,
                user,
                shareId: newShareId,
            };
            const updatedShare = (await SharedLink.findOneAndUpdate({ shareId, user }, update, {
                new: true,
                upsert: false,
                runValidators: true,
            }).lean());
            if (!updatedShare) {
                throw new ShareServiceError('Share update failed', 'SHARE_UPDATE_ERROR');
            }
            anonymizeConvo(updatedShare);
            return { shareId: newShareId, conversationId: updatedShare.conversationId };
        }
        catch (error) {
            logger$1.error('[updateSharedLink] Error updating shared link', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
                shareId,
            });
            throw new ShareServiceError(error instanceof ShareServiceError ? error.message : 'Error updating shared link', error instanceof ShareServiceError ? error.code : 'SHARE_UPDATE_ERROR');
        }
    }
    /**
     * Delete a shared link
     */
    async function deleteSharedLink(user, shareId) {
        if (!user || !shareId) {
            throw new ShareServiceError('Missing required parameters', 'INVALID_PARAMS');
        }
        try {
            const SharedLink = mongoose.models.SharedLink;
            const result = await SharedLink.findOneAndDelete({ shareId, user }).lean();
            if (!result) {
                return null;
            }
            return {
                success: true,
                shareId,
                message: 'Share deleted successfully',
            };
        }
        catch (error) {
            logger$1.error('[deleteSharedLink] Error deleting shared link', {
                error: error instanceof Error ? error.message : 'Unknown error',
                user,
                shareId,
            });
            throw new ShareServiceError('Error deleting shared link', 'SHARE_DELETE_ERROR');
        }
    }
    // Return all methods
    return {
        getSharedLink,
        getSharedLinks,
        createSharedLink,
        updateSharedLink,
        deleteSharedLink,
        getSharedMessages,
        deleteAllSharedLinks,
        deleteConvoSharedLink,
    };
}

/**
 * Creates all database methods for all collections
 */
function createMethods(mongoose) {
    return {
        ...createUserMethods(mongoose),
        ...createSessionMethods(mongoose),
        ...createTokenMethods(mongoose),
        ...createRoleMethods(mongoose),
        ...createMemoryMethods(mongoose),
        ...createAgentCategoryMethods(mongoose),
        ...createAccessRoleMethods(mongoose),
        ...createUserGroupMethods(mongoose),
        ...createAclEntryMethods(mongoose),
        ...createShareMethods(mongoose),
        ...createPluginAuthMethods(mongoose),
    };
}

export { AppService, RoleBits, Action as actionSchema, agentCategorySchema, agentSchema, agentsConfigSetup, assistantSchema, balanceSchema, bannerSchema, categoriesSchema, conversationTag as conversationTagSchema, convoSchema, createMethods, createModels, file as fileSchema, getTransactionSupport, getWebSearchKeys, groupSchema, hashToken, keySchema, loadDefaultInterface, loadTurnstileConfig, loadWebSearchConfig, logger$1 as logger, logger as meiliLogger, MemoryEntrySchema as memorySchema, messageSchema, pluginAuthSchema, presetSchema, processModelSpecs, projectSchema, promptGroupSchema, promptSchema, roleSchema, sessionSchema, shareSchema, signPayload, supportsTransactions, tokenSchema, toolCallSchema, transactionSchema, userSchema, webSearchAuth, webSearchKeys };
//# sourceMappingURL=index.es.js.map
