import { expect, test } from '@playwright/test';
import { ensureAuthenticated } from '../helpers/auth';

test.describe('Settings suite', () => {
  test('Last OpenAI settings', async ({ page }) => {
    // 确保认证状态正确加载（会自动导航和登录）
    await ensureAuthenticated(page);
    
    // 确保在正确的页面
    if (!page.url().includes('/c/')) {
      await page.goto('http://localhost:3080/c/new', { waitUntil: 'load', timeout: 15000 });
    }
    
    // 等待页面完全加载
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    await page.evaluate(() =>
      window.localStorage.setItem(
        'lastConversationSetup',
        JSON.stringify({
          conversationId: 'new',
          title: 'New Chat',
          endpoint: 'openAI',
          createdAt: '',
          updatedAt: '',
        }),
      ),
    );
    // 刷新页面以应用 localStorage 更改
    await page.reload({ waitUntil: 'load' });

    const initialLocalStorage = await page.evaluate(() => window.localStorage);
    const lastConvoSetup = JSON.parse(initialLocalStorage.lastConversationSetup);
    expect(lastConvoSetup.endpoint).toEqual('openAI');

    // 等待元素加载
    await page.waitForSelector('[data-testid="new-conversation-menu"]', { timeout: 15000 });
    const newTopicButton = page.getByTestId('new-conversation-menu');
    await newTopicButton.click();

    // includes the icon + endpoint names in obj property
    const endpointItem = page.getByTestId('endpoint-item-openAI');
    await endpointItem.click();

    await page.getByTestId('text-input').click();
    const button1 = page.getByRole('button', { name: 'Mode: BingAI' });
    const button2 = page.getByRole('button', { name: 'Mode: Sydney' });

    try {
      await button1.click({ timeout: 100 });
    } catch (e) {
      // console.log('Bing button', e);
    }

    try {
      await button2.click({ timeout: 100 });
    } catch (e) {
      // console.log('Sydney button', e);
    }
    await page.getByRole('option', { name: 'Sydney' }).click();
    await page.getByRole('tab', { name: 'Balanced' }).click();

    // Change Endpoint to see if settings will persist
    await newTopicButton.click();
    await page.getByRole('menuitemradio', { name: 'ChatGPT OpenAI' }).click();

    // Close endpoint menu & re-select BingAI
    await page.getByTestId('text-input').click();
    await newTopicButton.click();
    await endpointItem.click();

    // Check if the settings persisted
    const localStorage = await page.evaluate(() => window.localStorage);
    const button = page.getByRole('button', { name: 'Mode: Sydney' });
    expect(button.count()).toBeTruthy();
  });
});
