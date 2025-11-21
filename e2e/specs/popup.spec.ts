import { expect, test } from '@playwright/test';
import { ensureAuthenticated } from '../helpers/auth';

test.describe('Endpoints Presets suite', () => {
  test('Endpoints Suite', async ({ page }) => {
    // 确保认证状态正确加载（会自动导航和登录）
    await ensureAuthenticated(page);
    
    // 确保在正确的页面
    if (!page.url().includes('/c/')) {
      await page.goto('http://localhost:3080/c/new', { waitUntil: 'load', timeout: 15000 });
    }
    
    // 等待页面完全加载
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    
    // 等待元素加载
    await page.waitForSelector('[data-testid="new-conversation-menu"]', { timeout: 20000 });
    await page.getByTestId('new-conversation-menu').click();

    // includes the icon + endpoint names in obj property
    const endpointItem = page.getByRole('menuitemradio', { name: 'ChatGPT OpenAI' });
    await endpointItem.click();

    await page.getByTestId('new-conversation-menu').click();
    // Check if the active class is set on the selected endpoint
    expect(await endpointItem.getAttribute('class')).toContain('active');
  });
});
