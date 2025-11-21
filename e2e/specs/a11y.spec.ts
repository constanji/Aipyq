import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright'; // 1
import { ensureAuthenticated } from '../helpers/auth';

test('Landing page should not have any automatically detectable accessibility issues', async ({
  page,
}) => {
  // 确保认证状态正确加载（会自动导航和登录）
  await ensureAuthenticated(page);
  
  // 确保在正确的页面
  if (!page.url().includes('/c/')) {
    await page.goto('http://localhost:3080/c/new', { waitUntil: 'load', timeout: 15000 });
  }
  
  // 等待页面完全加载
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('Conversation page should be accessible', async ({ page }) => {
  // 确保认证状态正确加载（会自动导航和登录）
  await ensureAuthenticated(page);
  
  // 确保在正确的页面
  if (!page.url().includes('/c/')) {
    await page.goto('http://localhost:3080/c/new', { waitUntil: 'load', timeout: 15000 });
  }
  
  // 等待页面完全加载
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
  
  // 等待表单加载
  await page.waitForSelector('form', { timeout: 20000 });
  
  // 等待输入框加载 - 使用更具体的选择器
  await page.waitForSelector('form textarea, form input[type="text"]', { timeout: 15000 });
  
  // Create a conversation (you may need to adjust this based on your app's behavior)
  const input = page.locator('form').getByRole('textbox').first();
  await input.click();
  await input.fill('Hi!');
  await page.locator('form').getByRole('button').nth(1).click();
  await page.waitForTimeout(3500);

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toEqual([]);
});

test('Navigation elements should be accessible', async ({ page }) => {
  await page.goto('http://localhost:3080/', { timeout: 5000, waitUntil: 'load' });
  
  // 等待重定向完成
  await page.waitForURL(/\/(c\/new|login)/, { timeout: 10000 });
  
  // 如果还在登录页面，跳过导航测试
  if (page.url().includes('/login')) {
    test.skip();
    return;
  }
  
  // 等待导航栏加载 - 使用更具体的选择器
  await page.waitForSelector('[data-testid="nav-user"]', { timeout: 10000 });

  // 使用更具体的选择器来测试导航栏
  const navAccessibilityScanResults = await new AxeBuilder({ page })
    .include('[data-testid="nav-user"]')
    .analyze();

  expect(navAccessibilityScanResults.violations).toEqual([]);
});

test('Input form should be accessible', async ({ page }) => {
  await page.goto('http://localhost:3080/', { timeout: 5000, waitUntil: 'load' });
  
  // 等待重定向到 /c/new（如果已认证）
  await page.waitForURL(/\/(c\/new|login)/, { timeout: 10000 });
  
  // 等待表单加载
  await page.waitForSelector('form', { timeout: 10000 });

  const formAccessibilityScanResults = await new AxeBuilder({ page }).include('form').analyze();

  expect(formAccessibilityScanResults.violations).toEqual([]);
});
