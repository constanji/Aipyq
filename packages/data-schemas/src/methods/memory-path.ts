import path from 'path';

/**
 * Global memory path configuration
 */
let globalMemoryPath: string | (() => string) | undefined;

/**
 * Set the global memory path
 */
export function setMemoryPath(memoryPath: string | (() => string)) {
  globalMemoryPath = memoryPath;
}

/**
 * Get the memory path, with fallback to default
 */
export function getMemoryPath(): string {
  if (typeof globalMemoryPath === 'function') {
    return globalMemoryPath();
  }
  if (globalMemoryPath) {
    return globalMemoryPath;
  }
  // Default fallback
  return path.join(process.cwd(), 'memoryentries');
}
