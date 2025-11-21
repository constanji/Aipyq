const path = require('path');
const bcrypt = require('bcryptjs');
const readline = require('readline');
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const connect = require('./connect');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const resetPassword = async () => {
  try {
    await connect();

    const email = await question('请输入用户邮箱: ');
    const user = await User.findOne({ email });

    if (!user) {
      console.error('未找到用户！');
      process.exit(1);
    }

    let validPassword = false;
    let newPassword;

    while (!validPassword) {
      newPassword = await question('请输入新密码: ');
      if (newPassword.length < 8) {
        console.log('密码必须至少8个字符！请重试。');
        continue;
      }

      const confirmPassword = await question('确认新密码: ');
      if (newPassword !== confirmPassword) {
        console.log('密码不匹配！请重试。');
        continue;
      }

      validPassword = true;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.updateOne(
      { email },
      {
        password: hashedPassword,
        passwordVersion: Date.now(), // Invalidate old sessions
      },
    );

    console.log('密码重置成功！');
    process.exit(0);
  } catch (err) {
    console.error('重置密码时出错:', err);
    process.exit(1);
  } finally {
    rl.close();
  }
};

resetPassword();
