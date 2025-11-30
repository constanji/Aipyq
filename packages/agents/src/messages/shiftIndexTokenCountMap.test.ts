import { shiftIndexTokenCountMap } from './format';

describe('shiftIndexTokenCountMap', () => {
  it('should add a system message token count at index 0 and shift all other indices', () => {
    const originalMap: Record<number, number> = {
      0: 10,
      1: 20,
      2: 30
    };

    const systemMessageTokenCount = 15;

    const result = shiftIndexTokenCountMap(originalMap, systemMessageTokenCount);

    // Check that the system message token count is at index 0
    expect(result[0]).toBe(15);

    // Check that all other indices are shifted by 1
    expect(result[1]).toBe(10);
    expect(result[2]).toBe(20);
    expect(result[3]).toBe(30);

    // Check that the original map is not modified
    expect(originalMap[0]).toBe(10);
    expect(originalMap[1]).toBe(20);
    expect(originalMap[2]).toBe(30);
  });

  it('should handle an empty map', () => {
    const emptyMap: Record<number, number> = {};
    const systemMessageTokenCount = 15;

    const result = shiftIndexTokenCountMap(emptyMap, systemMessageTokenCount);

    // Check that only the system message token count is in the result
    expect(Object.keys(result).length).toBe(1);
    expect(result[0]).toBe(15);
  });

  it('should handle non-sequential indices', () => {
    const nonSequentialMap: Record<number, number> = {
      0: 10,
      2: 20,
      5: 30
    };

    const systemMessageTokenCount = 15;

    const result = shiftIndexTokenCountMap(nonSequentialMap, systemMessageTokenCount);

    // Check that the system message token count is at index 0
    expect(result[0]).toBe(15);

    // Check that all other indices are shifted by 1
    expect(result[1]).toBe(10);
    expect(result[3]).toBe(20);
    expect(result[6]).toBe(30);
  });

  it('should handle string keys', () => {
    // TypeScript will convert string keys to numbers when accessing the object
    const mapWithStringKeys: Record<string, number> = {
      '0': 10,
      '1': 20,
      '2': 30
    };

    const systemMessageTokenCount = 15;

    // Cast to Record<number, number> to match the function signature
    const result = shiftIndexTokenCountMap(mapWithStringKeys as unknown as Record<number, number>, systemMessageTokenCount);

    // Check that the system message token count is at index 0
    expect(result[0]).toBe(15);

    // Check that all other indices are shifted by 1
    expect(result[1]).toBe(10);
    expect(result[2]).toBe(20);
    expect(result[3]).toBe(30);
  });
});
