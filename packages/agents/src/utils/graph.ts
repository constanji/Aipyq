export const resetIfNotEmpty = <T>(value: T, resetValue: T): T => {
  if (Array.isArray(value)) {
    return value.length > 0 ? resetValue : value;
  }
  if (value instanceof Set || value instanceof Map) {
    return value.size > 0 ? resetValue : value;
  }
  return value !== undefined ? resetValue : value;
};

export const joinKeys = (args: (string | number | undefined)[]): string => args.join('_');