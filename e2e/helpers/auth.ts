import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * 确保页面已认证，如果未认证则自动登录
 * 优化版本：先检查当前状态，避免不必要的导航
 */
export async function ensureAuthenticated(page: Page): Promise<void> {
  const currentUrl = page.url();
  
  // 检查 storageState 文件是否存在以及是否包含 cookies
  const storageStatePath = path.resolve(process.cwd(), 'e2e/storageState.json');
  let hasValidStorageState = false;
  try {
    if (fs.existsSync(storageStatePath)) {
      const storageStateContent = JSON.parse(fs.readFileSync(storageStatePath, 'utf-8'));
      const hasCookies = storageStateContent.cookies && storageStateContent.cookies.length > 0;
      const hasLocalStorage = storageStateContent.origins && storageStateContent.origins.length > 0;
      if (hasCookies || hasLocalStorage) {
        hasValidStorageState = true;
        console.log('🤖: 📦 storageState 存在，cookies:', storageStateContent.cookies?.length || 0);
      }
    }
  } catch (e) {
    // 忽略错误，继续执行
  }
  
  // 如果当前已经在 /c/new 或 /c/ 路径下，检查是否真的已认证
  if (currentUrl.includes('/c/') && !currentUrl.includes('/login')) {
    // 等待页面加载
    await page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
    // 检查是否有认证标识（如用户按钮）
    const isAuthenticated = await page.getByTestId('nav-user').isVisible().catch(() => false);
    if (isAuthenticated) {
      console.log('🤖: ✔️  已通过 storageState 认证（当前页面）');
      return;
    }
  }
  
  // 如果当前在登录页面，直接登录
  if (currentUrl.includes('/login')) {
    console.log('🤖: ⚠️  检测到未认证，正在自动登录...');
    await performLogin(page);
    return;
  }
  
  // 如果当前不在登录页面也不在聊天页面，导航到首页检查状态
  if (!currentUrl.includes('localhost:3080') || currentUrl === 'http://localhost:3080/' || currentUrl === 'http://localhost:3080') {
    try {
      await page.goto('http://localhost:3080/', { waitUntil: 'load', timeout: 10000 });
      await page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
      
      // 等待一下，让页面决定重定向
      await page.waitForTimeout(2000);
      
      const newUrl = page.url();
      if (newUrl.includes('/c/new') || newUrl.includes('/c/')) {
        // 等待页面加载
        await page.waitForLoadState('domcontentloaded', { timeout: 5000 }).catch(() => {});
        // 检查是否真的已认证
        const isAuthenticated = await page.getByTestId('nav-user').isVisible({ timeout: 5000 }).catch(() => false);
        if (isAuthenticated) {
          console.log('🤖: ✔️  已通过 storageState 认证');
          return;
        }
      }
      
      if (newUrl.includes('/login')) {
        console.log('🤖: ⚠️  检测到未认证，正在自动登录...');
        await performLogin(page);
        return;
      }
    } catch (e) {
      console.log('🤖: ⚠️  导航失败，尝试登录流程');
    }
  }
  
  // 如果到这里还没返回，尝试登录
  console.log('🤖: ⚠️  检测到未认证，正在自动登录...');
  await performLogin(page);
}

/**
 * 执行登录流程
 */
async function performLogin(page: Page): Promise<void> {
  // 确保在登录页面
  if (!page.url().includes('/login')) {
    await page.goto('http://localhost:3080/login', { waitUntil: 'load', timeout: 10000 });
  }
  
  // 从配置文件获取用户信息
  const configPath = path.resolve(process.cwd(), 'e2e/config.local.ts');
  let userEmail = 'testuser@example.com';
  let userPassword = 'securepassword123';
  
  try {
    // 动态导入配置文件
    const config = require(configPath).default;
    if (config.email) userEmail = config.email;
    if (config.password) userPassword = config.password;
  } catch (e) {
    // 如果无法加载配置，使用默认值
    console.log('🤖: ⚠️  无法加载配置文件，使用默认用户信息');
  }
  
  // 等待登录表单加载
  await page.waitForSelector('input[name="email"]', { timeout: 15000 });
  await page.waitForSelector('input[name="password"]', { timeout: 15000 });
  
  // 填写登录表单
  await page.locator('input[name="email"]').fill(userEmail);
  await page.locator('input[name="password"]').fill(userPassword);
  
  // 点击登录按钮或按 Enter
  const loginButton = page.getByRole('button', { name: /continue|login|sign in/i });
  const buttonVisible = await loginButton.isVisible().catch(() => false);
  if (buttonVisible) {
    await loginButton.click();
  } else {
    await page.locator('input[name="password"]').press('Enter');
  }
  
  // 等待登录成功 - 使用更宽松的条件
  try {
    await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 20000 });
    // 等待页面完全加载
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    // 等待用户按钮出现，确认登录成功
    await page.waitForSelector('[data-testid="nav-user"]', { timeout: 15000 });
    // 额外等待一下，确保页面完全渲染
    await page.waitForTimeout(1000);
    console.log('🤖: ✔️  自动登录成功');
  } catch (e) {
    // 如果超时，检查是否仍在登录页面
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      // 检查是否有错误消息
      const errorVisible = await page.getByText(/error|failed|invalid/i).isVisible().catch(() => false);
      if (errorVisible) {
        const errorText = await page.getByText(/error|failed|invalid/i).textContent().catch(() => '');
        throw new Error(`登录失败: ${errorText}`);
      }
      throw new Error('登录超时，可能登录失败');
    }
    // 如果不在登录页面，说明可能已经登录成功
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    // 尝试等待用户按钮
    await page.waitForSelector('[data-testid="nav-user"]', { timeout: 10000 }).catch(() => {});
    console.log('🤖: ✔️  自动登录成功（URL:', currentUrl, ')');
  }
}

