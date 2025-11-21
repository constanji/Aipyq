import { PlaywrightTestConfig } from '@playwright/test';
import mainConfig from './playwright.config';
import path from 'path';
const absolutePath = path.resolve(process.cwd(), 'api/server/index.js');
import dotenv from 'dotenv';
dotenv.config();

const config: PlaywrightTestConfig = {
  ...mainConfig,
  retries: 0,
  globalSetup: require.resolve('./setup/global-setup.local'),
  globalTeardown: require.resolve('./setup/global-teardown.local'),
  use: {
    ...mainConfig.use,
    // 确保 storageState 路径正确
    storageState: path.resolve(process.cwd(), 'e2e/storageState.json'),
  },
  webServer: {
    ...mainConfig.webServer,
    command: `node ${absolutePath}`,
    env: {
      ...process.env,
      SEARCH: 'false',
      NODE_ENV: 'CI',
      EMAIL_HOST: '',
      TITLE_CONVO: 'false',
      SESSION_EXPIRY: '60000',
      REFRESH_TOKEN_EXPIRY: '300000',
      LOGIN_VIOLATION_SCORE: '0',
      REGISTRATION_VIOLATION_SCORE: '0',
      CONCURRENT_VIOLATION_SCORE: '0',
      MESSAGE_VIOLATION_SCORE: '0',
      NON_BROWSER_VIOLATION_SCORE: '0',
      FORK_VIOLATION_SCORE: '0',
      IMPORT_VIOLATION_SCORE: '0',
      TTS_VIOLATION_SCORE: '0',
      STT_VIOLATION_SCORE: '0',
      FILE_UPLOAD_VIOLATION_SCORE: '0',
      RESET_PASSWORD_VIOLATION_SCORE: '0',
      VERIFY_EMAIL_VIOLATION_SCORE: '0',
      TOOL_CALL_VIOLATION_SCORE: '0',
      CONVO_ACCESS_VIOLATION_SCORE: '0',
      ILLEGAL_MODEL_REQ_SCORE: '0',
      LOGIN_MAX: '1000', // 大幅增加登录限制，避免测试时被锁定
      LOGIN_WINDOW: '1',
      REGISTER_MAX: '1000', // 大幅增加注册限制
      REGISTER_WINDOW: '1', // 1分钟窗口期
      LIMIT_CONCURRENT_MESSAGES: 'false',
      CONCURRENT_MESSAGE_MAX: '20',
      LIMIT_MESSAGE_IP: 'false',
      MESSAGE_IP_MAX: '100',
      MESSAGE_IP_WINDOW: '1',
      LIMIT_MESSAGE_USER: 'false',
      MESSAGE_USER_MAX: '100',
      MESSAGE_USER_WINDOW: '1',
    },
  },
  fullyParallel: false, // 禁用并行以避免多次登录
  workers: 1, // 只使用一个 worker，避免并发登录
  // testMatch: /messages/,
  // retries: 0,
};

export default config;
