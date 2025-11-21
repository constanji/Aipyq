import { Page, FullConfig, chromium } from '@playwright/test';
import type { User } from '../types';
import cleanupUser from './cleanupUser';
import dotenv from 'dotenv';
dotenv.config();

const timeout = 6000; 

async function register(page: Page, user: User) {
  // 检查当前是否已在注册页面
  const currentUrl = page.url();
  if (!currentUrl.includes('/register')) {
    // 等待 Sign up 链接出现，使用更灵活的选择器
    console.log('🤖: 🔍 正在查找 Sign up 链接...');
    const signUpLink = page.locator('a[href="/register"]').first();
    const signUpVisible = await signUpLink.waitFor({ state: 'visible', timeout: timeout }).catch(() => false);
    
    if (signUpVisible) {
      console.log('🤖: ✔️  找到 Sign up 链接，正在点击...');
      await signUpLink.click();
      console.log('🤖: ✔️  已点击 Sign up 链接');
    } else {
      // 如果找不到链接，直接导航到注册页面
      console.log('🤖: ⚠️  未找到 Sign up 链接，直接导航到注册页面...');
      await page.goto(page.url().split('/').slice(0, 3).join('/') + '/register', { waitUntil: 'load', timeout: 10000 });
    }
    
    // 等待页面导航到注册页面
    console.log('🤖: ⏳ 等待注册页面加载...');
    await page.waitForURL('**/register', { timeout: 10000 });
    console.log('🤖: ✔️  已导航到注册页面');
  } else {
    console.log('🤖: ✔️  已在注册页面');
  }
  
  // 等待注册表单加载完成（通过等待 Full name 输入框出现）
  console.log('🤖: ⏳ 等待注册表单加载...');
  // 只等待关键元素出现，不等待 networkidle（因为可能有持续的网络请求）
  await page.waitForSelector('[data-testid="name"]', { timeout: 10000 }).catch(() => {
    console.log('🤖: ⚠️  表单加载超时，继续执行...');
  });
  
  // 使用 data-testid 更可靠，因为表单字段都有这个属性
  console.log('🤖: ✔️  注册表单已加载');
  
  // 填写 Full name
  const fullNameInput = page.getByTestId('name');
  await fullNameInput.waitFor({ state: 'visible', timeout });
  await fullNameInput.fill(user.name);
  console.log('🤖: ✔️  已填写 Full name');
  
  // Username 是可选的，先检查是否存在
  const usernameInput = page.getByTestId('username');
  const usernameVisible = await usernameInput.isVisible().catch(() => false);
  if (usernameVisible) {
    await usernameInput.fill('test');
    console.log('🤖: ✔️  已填写 Username');
  }
  
  // 填写 Email
  const emailInput = page.getByTestId('email');
  await emailInput.waitFor({ state: 'visible', timeout });
  await emailInput.fill(user.email);
  console.log('🤖: ✔️  已填写 Email');
  
  // 填写 Password
  const passwordInput = page.getByTestId('password');
  await passwordInput.waitFor({ state: 'visible', timeout });
  await passwordInput.fill(user.password);
  console.log('🤖: ✔️  已填写 Password');
  
  // 填写 Confirm Password
  const confirmPasswordInput = page.getByTestId('confirm_password');
  await confirmPasswordInput.waitFor({ state: 'visible', timeout });
  await confirmPasswordInput.fill(user.password);
  console.log('🤖: ✔️  已填写 Confirm Password');
  
  // 提交表单 - 使用按钮的 aria-label 或文本
  const submitButton = page.getByRole('button', { name: /submit|continue|register/i });
  await submitButton.waitFor({ state: 'visible', timeout });
  
  // 等待 API 响应完成，确保 cookies 被设置
  // 注册 API 可能是 /api/auth/register 或其他路径
  const responsePromise = page.waitForResponse(
    (response) => {
      const url = response.url();
      return (url.includes('/api/auth/register') || url.includes('/api/register') || url.includes('/register')) 
        && (response.status() === 200 || response.status() === 201);
    },
    { timeout: 15000 }
  ).catch(() => {
    console.log('🤖: ⚠️  未检测到注册 API 响应，继续等待页面跳转...');
    return null;
  });
  
  await submitButton.click();
  console.log('🤖: ✔️  已提交注册表单');
  
  // 等待 API 响应（如果存在）
  const response = await responsePromise;
  if (response) {
    console.log('🤖: ✔️  注册 API 响应已收到，状态:', response.status());
  }
  
  // 等待页面开始跳转（给页面一些时间处理响应）
  // 检查页面是否仍然打开
  try {
    if (!page.isClosed()) {
      await page.waitForTimeout(1000);
    }
  } catch (e) {
    // 页面可能已经关闭或导航，忽略错误
    console.log('🤖: ⚠️  页面状态变化，继续执行...');
  }
}

async function logout(page: Page) {
  await page.getByTestId('nav-user').click();
  await page.getByRole('button', { name: 'Log out' }).click();
}

async function login(page: Page, user: User) {
  // 等待登录表单加载
  console.log('🤖: ⏳ 等待登录表单加载...');
  await page.waitForSelector('input[name="email"]', { timeout: 10000 });
  await page.waitForSelector('input[name="password"]', { timeout: 10000 });
  console.log('🤖: ✔️  登录表单已加载');
  
  // 填写登录信息
  await page.locator('input[name="email"]').fill(user.email);
  await page.locator('input[name="password"]').fill(user.password);
  
  // 等待 API 响应完成，检查登录是否成功
  const responsePromise = page.waitForResponse(
    (response) => {
      const url = response.url();
      return url.includes('/api/auth/login');
    },
    { timeout: 15000 }
  ).catch(() => null);
  
  // 点击登录按钮或按 Enter
  const loginButton = page.getByRole('button', { name: /continue|login|sign in/i });
  const buttonVisible = await loginButton.isVisible().catch(() => false);
  if (buttonVisible) {
    await loginButton.click();
  } else {
    await page.locator('input[name="password"]').press('Enter');
  }
  console.log('🤖: ✔️  已提交登录表单');
  
  // 等待 API 响应
  const loginResponse = await responsePromise;
  if (loginResponse) {
    const status = loginResponse.status();
    console.log('🤖: 📡 登录 API 响应状态:', status);
    
    // 如果登录失败（状态码不是 200），检查错误消息
    if (status !== 200) {
      // 等待一下让错误消息显示
      await page.waitForTimeout(1000);
      const errorVisible = await page.getByText(/无法登录|unable to login|invalid|error/i).isVisible().catch(() => false);
      if (errorVisible) {
        const errorText = await page.getByText(/无法登录|unable to login|invalid|error/i).textContent().catch(() => '');
        throw new Error(`登录失败: ${errorText || `HTTP ${status}`}`);
      }
      throw new Error(`登录失败: HTTP ${status}`);
    }
  } else {
    // 如果没有收到 API 响应，等待页面跳转或错误消息
    await page.waitForTimeout(2000);
    
    // 检查是否仍在登录页面
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      // 检查是否有错误消息
      const errorVisible = await page.getByText(/无法登录|unable to login|invalid|error|密码|password/i).isVisible().catch(() => false);
      if (errorVisible) {
        const errorText = await page.getByText(/无法登录|unable to login|invalid|error|密码|password/i).textContent().catch(() => '');
        throw new Error(`登录失败: ${errorText || '未知错误'}`);
      }
      // 如果仍在登录页面且没有错误消息，可能是用户不存在
      throw new Error('登录失败: 用户可能不存在或密码错误');
    }
  }
  
  // 等待页面跳转到 /c/new 或 /c/，确认登录成功
  try {
    await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 10000 });
  } catch (e) {
    // 如果超时，检查是否仍在登录页面
    const currentUrl = page.url();
    if (currentUrl.includes('/login')) {
      const errorVisible = await page.getByText(/无法登录|unable to login|invalid|error/i).isVisible().catch(() => false);
      if (errorVisible) {
        const errorText = await page.getByText(/无法登录|unable to login|invalid|error/i).textContent().catch(() => '');
        throw new Error(`登录失败: ${errorText || '未知错误'}`);
      }
      throw new Error('登录失败: 未能跳转到聊天页面');
    }
  }
}

async function authenticate(config: FullConfig, user: User) {
  console.log('🤖: 全局设置已启动');
  const { baseURL, storageState } = config.projects[0].use;
  console.log('🤖: 使用 baseURL', baseURL);
  console.dir(user, { depth: null });
  const browser = await chromium.launch({
    headless: false,
  });
  try {
    const page = await browser.newPage();
    console.log('🤖: 🗝  正在验证用户:', user.email);

    if (!baseURL) {
      throw new Error('🤖: baseURL 未定义');
    }

    // Set localStorage before navigating to the page
    await page.context().addInitScript(() => {
      localStorage.setItem('navVisible', 'true');
    });
    console.log('🤖: ✔️  localStorage: 设置导航为可见', storageState);

    // 使用 'load' 而不是 'networkidle'，因为应用可能有持续的网络请求（WebSocket等）
    console.log('🤖: 📍 正在导航到:', baseURL);
    await page.goto(baseURL, { waitUntil: 'load', timeout });
    console.log('🤖: ✔️  页面加载完成');
    
    // 等待页面 DOM 完全加载
    await page.waitForLoadState('domcontentloaded');
    console.log('🤖: ✔️  DOM 内容已加载');
    
    // 先尝试登录，如果用户已存在就直接登录（避免注册限制）
    console.log('🤖: 🔍 先尝试登录，检查用户是否已存在...');
    const currentUrl = page.url();
    
    // 如果不在登录页面，导航到登录页面
    if (!currentUrl.includes('/login')) {
      const signInLink = page.locator('a[href="/login"]').first();
      const signInVisible = await signInLink.isVisible().catch(() => false);
      if (signInVisible) {
        await signInLink.click();
        await page.waitForURL('**/login', { timeout: 10000 }).catch(() => {});
      } else {
        await page.goto(`${baseURL}/login`, { waitUntil: 'load', timeout: 10000 });
      }
    }
    
    // 尝试登录
    try {
      await login(page, user);
      await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 15000 });
      console.log('🤖: ✔️  用户已存在，登录成功');
    } catch (loginError) {
      // 登录失败，可能是用户不存在，尝试注册
      console.log('🤖: ⚠️  登录失败，用户可能不存在，尝试注册...');
      console.log('🤖: 📝 登录错误:', loginError instanceof Error ? loginError.message : String(loginError));
      
      // 导航到注册页面
      const currentUrlAfterLogin = page.url();
      console.log('🤖: 📍 登录失败后当前 URL:', currentUrlAfterLogin);
      
      if (!currentUrlAfterLogin.includes('/register')) {
        // 尝试找到注册链接
        const signUpLink = page.locator('a[href="/register"]').first();
        const signUpVisible = await signUpLink.isVisible({ timeout: 3000 }).catch(() => false);
        
        if (signUpVisible) {
          console.log('🤖: ✔️  找到注册链接，点击...');
          await signUpLink.click();
          await page.waitForURL('**/register', { timeout: 10000 }).catch(() => {});
        } else {
          // 如果找不到链接，直接导航到注册页面
          console.log('🤖: ⚠️  未找到注册链接，直接导航到注册页面...');
          await page.goto(`${baseURL}/register`, { waitUntil: 'load', timeout: 10000 });
          await page.waitForURL('**/register', { timeout: 5000 }).catch(() => {});
        }
      } else {
        console.log('🤖: ✔️  已在注册页面');
      }
      
      // 尝试注册
      try {
        await register(page, user);
        
        // 等待页面跳转（可能是 /c/new 或 /login）
        console.log('🤖: ⏳ 等待注册后跳转...');
        await page.waitForURL(/\/(c\/new|login)/, { timeout: 15000 });
        const registerUrl = page.url();
        console.log('🤖: 📍 注册后跳转到:', registerUrl);
        
        if (registerUrl.includes('/c/new') || registerUrl.includes('/c/')) {
          // 注册成功并自动登录
          console.log('🤖: ✔️  用户注册成功并已自动登录');
        } else if (registerUrl.includes('/login')) {
          // 注册成功但需要手动登录
          console.log('🤖: ⚠️  注册成功，但需要手动登录...');
          await login(page, user);
          await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 15000 });
          console.log('🤖: ✔️  登录成功');
        } else if (registerUrl.includes('/register')) {
          // 仍在注册页面，检查错误
          console.log('🤖: ⚠️  仍在注册页面，检查错误...');
          
          // 检查是否有注册限制错误
          const rateLimitError = await page.getByText(/too many|try again after/i).isVisible().catch(() => false);
          if (rateLimitError) {
            console.log('🤖: 🚨  遇到注册限制，尝试清理用户后直接登录...');
            // 清理用户并尝试登录
            await cleanupUser(user);
            await page.goto(`${baseURL}/login`, { waitUntil: 'load', timeout: 10000 });
            await login(page, user);
            await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 15000 });
            console.log('🤖: ✔️  清理后登录成功');
          } else {
            // 其他错误，尝试清理并重新注册
            const errorElement = await page.getByTestId('registration-error').isVisible().catch(() => false);
            const errorText = await page.getByText(/error|already|exists/i).isVisible().catch(() => false);
            
            if (errorElement || errorText) {
              console.log('🤖: 🚨  用户可能已存在，尝试清理并重新注册...');
              await cleanupUser(user);
              await page.goto(baseURL, { waitUntil: 'load', timeout: 10000 });
              await register(page, user);
              await page.waitForURL(/\/(c\/new|login)/, { timeout: 15000 });
              const newUrl = page.url();
              if (newUrl.includes('/login')) {
                await login(page, user);
                await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 15000 });
              }
            } else {
              throw new Error(`🤖: 🚨  注册失败，仍在注册页面，URL: ${registerUrl}`);
            }
          }
        }
      } catch (registerError) {
        // 注册也失败，检查是否是注册限制
        const currentUrl = page.url();
        if (currentUrl.includes('/register')) {
          const rateLimitError = await page.getByText(/too many|try again after/i).isVisible().catch(() => false);
          if (rateLimitError) {
            console.log('🤖: 🚨  遇到注册限制，尝试清理用户后直接登录...');
            await cleanupUser(user);
            await page.goto(`${baseURL}/login`, { waitUntil: 'load', timeout: 10000 });
            await login(page, user);
            await page.waitForURL(/\/(c\/new|c\/)/, { timeout: 15000 });
            console.log('🤖: ✔️  清理后登录成功');
          } else {
            throw registerError;
          }
        } else {
          throw registerError;
        }
      }
    }
    
    console.log('🤖: ✔️  用户验证成功');

    // 等待页面完全加载，确保所有 cookies 都已设置
    await page.waitForLoadState('domcontentloaded', { timeout: 10000 }).catch(() => {});
    
    // 等待用户按钮出现，确认页面已完全加载
    try {
      await page.waitForSelector('[data-testid="nav-user"]', { timeout: 15000 });
      console.log('🤖: ✔️  用户界面已加载');
    } catch (e) {
      console.log('🤖: ⚠️  用户按钮未找到，继续...');
    }
    
    // 等待一下，确保所有网络请求完成，cookies 被设置
    await page.waitForTimeout(3000);
    
    // 检查 cookies 是否存在
    const cookies = await page.context().cookies();
    console.log('🤖: 📦 当前 cookies 数量:', cookies.length);
    if (cookies.length > 0) {
      console.log('🤖: 📦 Cookies:', cookies.map(c => `${c.name} (domain: ${c.domain || 'default'})`).join(', '));
    } else {
      console.log('🤖: ⚠️  警告：没有检测到 cookies');
      // 尝试刷新页面，看看是否能获取 cookies
      console.log('🤖: 🔄 刷新页面以获取 cookies...');
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 10000 });
      await page.waitForTimeout(2000);
      const cookiesAfterReload = await page.context().cookies();
      console.log('🤖: 📦 刷新后 cookies 数量:', cookiesAfterReload.length);
      if (cookiesAfterReload.length > 0) {
        console.log('🤖: 📦 刷新后 Cookies:', cookiesAfterReload.map(c => `${c.name} (domain: ${c.domain || 'default'})`).join(', '));
      }
    }

    // 保存 storageState
    await page.context().storageState({ path: storageState as string });
    
    // 修复 cookies 的 secure 标志和 domain，使其在 HTTP 连接中可用
    const fs = require('fs');
    const storageStateContent = JSON.parse(fs.readFileSync(storageState as string, 'utf-8'));
    
    // 确保 cookies 数组存在
    if (!storageStateContent.cookies) {
      storageStateContent.cookies = [];
    }
    
    // 获取最新的 cookies（可能在刷新后才有）
    const finalCookies = await page.context().cookies();
    
    // 如果有 cookies，修复它们的设置
    if (finalCookies.length > 0) {
      storageStateContent.cookies = finalCookies.map((cookie: any) => ({
        ...cookie,
        secure: false, // 本地测试使用 HTTP，需要将 secure 设置为 false
        sameSite: 'Lax', // 将 sameSite 从 Strict 改为 Lax，更兼容
        domain: cookie.domain || 'localhost', // 使用 localhost（不带点）匹配 http://localhost:3080
        path: cookie.path || '/', // 确保 path 存在
      }));
      fs.writeFileSync(storageState as string, JSON.stringify(storageStateContent, null, 2));
      console.log('🤖: ✔️  已修复 cookies 的 secure、sameSite 和 domain 设置');
      console.log('🤖: 📦 保存的 cookies:', storageStateContent.cookies.map((c: any) => c.name).join(', '));
    } else if (storageStateContent.cookies && storageStateContent.cookies.length > 0) {
      // 如果 storageState 中已有 cookies，修复它们
      storageStateContent.cookies = storageStateContent.cookies.map((cookie: any) => ({
        ...cookie,
        secure: false,
        sameSite: 'Lax',
        domain: cookie.domain || 'localhost',
        path: cookie.path || '/',
      }));
      fs.writeFileSync(storageState as string, JSON.stringify(storageStateContent, null, 2));
      console.log('🤖: ✔️  已修复 storageState 中的 cookies');
    } else {
      console.log('🤖: ⚠️  没有 cookies，应用可能使用 sessionStorage 或需要重新登录');
      console.log('🤖: 💡 提示：如果测试仍然失败，可能需要检查应用的认证机制');
    }
    
    console.log('🤖: ✔️  认证状态已成功保存到', storageState);
    // await browser.close();
    // console.log('🤖: 全局设置已完成');
  } finally {
    await browser.close();
    console.log('🤖: 全局设置已完成');
  }
}

export default authenticate;
