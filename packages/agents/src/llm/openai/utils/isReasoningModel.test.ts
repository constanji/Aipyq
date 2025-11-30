import { isReasoningModel } from './index';

describe('isReasoningModel', () => {
  describe('should return true for reasoning models', () => {
    test('basic o-series models', () => {
      expect(isReasoningModel('o1')).toBe(true);
      expect(isReasoningModel('o2')).toBe(true);
      expect(isReasoningModel('o9')).toBe(true);
      expect(isReasoningModel('o1-preview')).toBe(true);
      expect(isReasoningModel('o1-mini')).toBe(true);
    });

    test('gpt-5+ models', () => {
      expect(isReasoningModel('gpt-5')).toBe(true);
      expect(isReasoningModel('gpt-6')).toBe(true);
      expect(isReasoningModel('gpt-7')).toBe(true);
      expect(isReasoningModel('gpt-8')).toBe(true);
      expect(isReasoningModel('gpt-9')).toBe(true);
    });

    test('with provider prefixes', () => {
      expect(isReasoningModel('azure/o1')).toBe(true);
      expect(isReasoningModel('azure/gpt-5')).toBe(true);
      expect(isReasoningModel('openai/o1')).toBe(true);
      expect(isReasoningModel('openai/gpt-5')).toBe(true);
    });

    test('with custom prefixes', () => {
      expect(isReasoningModel('custom-provider/o1')).toBe(true);
      expect(isReasoningModel('my-deployment/gpt-5')).toBe(true);
      expect(isReasoningModel('company/azure/gpt-5')).toBe(true);
    });

    test('case insensitive', () => {
      expect(isReasoningModel('O1')).toBe(true);
      expect(isReasoningModel('GPT-5')).toBe(true);
      expect(isReasoningModel('gPt-6')).toBe(true);
      expect(isReasoningModel('Azure/O1')).toBe(true);
    });
  });

  describe('should return false for non-reasoning models', () => {
    test('older GPT models', () => {
      expect(isReasoningModel('gpt-3.5-turbo')).toBe(false);
      expect(isReasoningModel('gpt-4')).toBe(false);
      expect(isReasoningModel('gpt-4-turbo')).toBe(false);
      expect(isReasoningModel('gpt-4o')).toBe(false);
      expect(isReasoningModel('gpt-4o-mini')).toBe(false);
    });

    test('other model families', () => {
      expect(isReasoningModel('claude-3')).toBe(false);
      expect(isReasoningModel('claude-3-opus')).toBe(false);
      expect(isReasoningModel('llama-2')).toBe(false);
      expect(isReasoningModel('gemini-pro')).toBe(false);
    });

    test('partial matches that should not match', () => {
      expect(isReasoningModel('proto1')).toBe(false);
      expect(isReasoningModel('version-o1')).toBe(true);
      expect(isReasoningModel('gpt-40')).toBe(false);
      expect(isReasoningModel('gpt-3.5')).toBe(false);
    });

    test('empty, null, and undefined', () => {
      expect(isReasoningModel('')).toBe(false);
      expect(isReasoningModel()).toBe(false);
      expect(isReasoningModel(undefined)).toBe(false);
    });
  });

  describe('edge cases', () => {
    test('with special characters', () => {
      expect(isReasoningModel('deployment_o1_model')).toBe(false);
      expect(isReasoningModel('gpt-5-deployment')).toBe(true);
      expect(isReasoningModel('o1@latest')).toBe(true);
      expect(isReasoningModel('gpt-5.0')).toBe(true);
    });

    test('word boundary behavior', () => {
      // These should match because o1 and gpt-5 are whole words
      expect(isReasoningModel('use-o1-model')).toBe(true);
      expect(isReasoningModel('model-gpt-5-latest')).toBe(true);

      // These should not match because o1/gpt-5 are not whole words
      expect(isReasoningModel('proto1model')).toBe(false);
      expect(isReasoningModel('supergpt-50')).toBe(false);
    });
  });
});
