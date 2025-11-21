const path = require('path');
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { registerUser } = require('~/server/services/AuthService');
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('--------------------------');
  console.purple('创建新用户账户！');
  console.purple('--------------------------');

  if (process.argv.length < 5) {
    console.orange('用法: npm run create-user <email> <name> <username> [--email-verified=false]');
    console.orange('注意: 如果不传入参数，系统会提示您输入。');
    console.orange(
      '如果您确实需要传入密码，可以作为第4个参数（出于安全考虑，不推荐）。',
    );
    console.orange('使用 --email-verified=false 将 emailVerified 设置为 false。默认为 true。');
    console.purple('--------------------------');
  }

  let email = '';
  let password = '';
  let name = '';
  let username = '';
  let emailVerified = true;

  // Parse command line arguments
  for (let i = 2; i < process.argv.length; i++) {
    if (process.argv[i].startsWith('--email-verified=')) {
      emailVerified = process.argv[i].split('=')[1].toLowerCase() !== 'false';
      continue;
    }

    if (!email) {
      email = process.argv[i];
    } else if (!name) {
      name = process.argv[i];
    } else if (!username) {
      username = process.argv[i];
    } else if (!password) {
      console.red('警告: 密码作为参数传入，这不安全！');
      password = process.argv[i];
    }
  }

  if (!email) {
    email = await askQuestion('邮箱:');
  }
  if (!email.includes('@')) {
    console.red('错误: 无效的邮箱地址！');
    silentExit(1);
  }

  const defaultName = email.split('@')[0];
  if (!name) {
    name = await askQuestion('姓名: (默认: ' + defaultName + ')');
    if (!name) {
      name = defaultName;
    }
  }
  if (!username) {
    username = await askQuestion('用户名: (默认: ' + defaultName + ')');
    if (!username) {
      username = defaultName;
    }
  }
  if (!password) {
    password = await askQuestion('密码: (留空以自动生成)');
    if (!password) {
      password = Math.random().toString(36).slice(-18);
      console.orange('您的密码是: ' + password);
    }
  }

  // Only prompt for emailVerified if it wasn't set via CLI
  if (!process.argv.some((arg) => arg.startsWith('--email-verified='))) {
    const emailVerifiedInput = await askQuestion(`邮箱已验证？(Y/n, 默认为 Y):

如果输入 \`y\`，用户的邮箱将被视为已验证。
      
如果输入 \`n\`，且已配置邮箱服务，将向用户发送验证邮件。

如果输入 \`n\`，且未配置邮箱服务，您必须将 \`ALLOW_UNVERIFIED_EMAIL_LOGIN\` 环境变量设置为 true，
否则用户需要尝试登录才能收到验证链接。`);

    if (emailVerifiedInput.toLowerCase() === 'n') {
      emailVerified = false;
    }
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    console.red('错误: 该邮箱或用户名已存在！');
    silentExit(1);
  }

  const user = { email, password, name, username, confirm_password: password };
  let result;
  try {
    result = await registerUser(user, { emailVerified });
  } catch (error) {
    console.red('错误: ' + error.message);
    silentExit(1);
  }

  if (result.status !== 200) {
    console.red('错误: ' + result.message);
    silentExit(1);
  }

  const userCreated = await User.findOne({ $or: [{ email }, { username }] });
  if (userCreated) {
    console.green('用户创建成功！');
    console.green(`邮箱已验证: ${userCreated.emailVerified}`);
    silentExit(0);
  }
})();

process.on('uncaughtException', (err) => {
  if (!err.message.includes('fetch failed')) {
    console.error('发生未捕获的错误:');
    console.error(err);
  }

  if (err.message.includes('fetch failed')) {
    return;
  } else {
    process.exit(1);
  }
});
