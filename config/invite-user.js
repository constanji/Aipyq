const path = require('path');
const mongoose = require('mongoose');
const { checkEmailConfig } = require('@librechat/api');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const { createInvite } = require('~/models/inviteUser');
const { sendEmail } = require('~/server/utils');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('--------------------------');
  console.purple('邀请新用户账户！');
  console.purple('--------------------------');

  if (process.argv.length < 5) {
    console.orange('用法: npm run invite-user <email>');
    console.orange('注意: 如果不传入参数，系统会提示您输入。');
    console.purple('--------------------------');
  }

  // Check if email service is enabled
  if (!checkEmailConfig()) {
    console.red('错误: 邮箱服务未启用！');
    silentExit(1);
  }

  // Get the email of the user to be invited
  let email = '';
  if (process.argv.length >= 3) {
    email = process.argv[2];
  }
  if (!email) {
    email = await askQuestion('邮箱:');
  }
  // Validate the email
  if (!email.includes('@')) {
    console.red('错误: 无效的邮箱地址！');
    silentExit(1);
  }

  // Check if the user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    console.red('错误: 该邮箱的用户已存在！');
    silentExit(1);
  }

  const token = await createInvite(email);
  const inviteLink = `${process.env.DOMAIN_CLIENT}/register?token=${token}`;

  const appName = process.env.APP_TITLE || 'LibreChat';

  if (!checkEmailConfig()) {
    console.green('请将此链接发送给用户:', inviteLink);
    silentExit(0);
  }

  try {
    await sendEmail({
      email: email,
      subject: `Invite to join ${appName}!`,
      payload: {
        appName: appName,
        inviteLink: inviteLink,
        year: new Date().getFullYear(),
      },
      template: 'inviteUser.handlebars',
    });
  } catch (error) {
    console.error('错误: ' + error.message);
    silentExit(1);
  }

  // Done!
  console.green('邀请发送成功！');
  silentExit(0);
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
