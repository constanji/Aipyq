jest.mock('@librechat/data-schemas', () => ({
  ...jest.requireActual('@librechat/data-schemas'),
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}));

import { AppService } from '@librechat/data-schemas';

describe('AppService interface configuration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should set prompts to true when config specifies prompts as true', async () => {
    const config = {
      interface: {
        prompts: true,
      },
    };

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.objectContaining({
          prompts: true,
        }),
      }),
    );
  });

  it('should set prompts to false when config specifies them as false', async () => {
    const config = {
      interface: {
        prompts: false,
      },
    };

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.objectContaining({
          prompts: false,
        }),
      }),
    );
  });

  it('should not set prompts when not provided in config', async () => {
    const config = {};

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.anything(),
      }),
    );

    // Verify that prompts is undefined when not provided
    expect(result.interfaceConfig?.prompts).toBeUndefined();
  });

  it('should correctly configure peoplePicker permissions including roles', async () => {
    const config = {
      interface: {
        peoplePicker: {
          users: true,
          groups: true,
          roles: true,
        },
      },
    };

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.objectContaining({
          peoplePicker: expect.objectContaining({
            users: true,
            groups: true,
            roles: true,
          }),
        }),
      }),
    );
  });

  it('should handle mixed peoplePicker permissions', async () => {
    const config = {
      interface: {
        peoplePicker: {
          users: true,
          groups: false,
          roles: true,
        },
      },
    };

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.objectContaining({
          peoplePicker: expect.objectContaining({
            users: true,
            groups: false,
            roles: true,
          }),
        }),
      }),
    );
  });

  it('should not set peoplePicker when not provided in config', async () => {
    const config = {};

    const result = await AppService({ config });

    expect(result).toEqual(
      expect.objectContaining({
        interfaceConfig: expect.anything(),
      }),
    );

    // Verify that peoplePicker is undefined when not provided
    expect(result.interfaceConfig?.peoplePicker).toBeUndefined();
  });
});
