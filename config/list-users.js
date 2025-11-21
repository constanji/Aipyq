const path = require('path');
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
const connect = require('./connect');

const listUsers = async () => {
  try {
    await connect();
    const users = await User.find({}, 'email provider avatar username name createdAt');

    console.log('\n用户列表:');
    console.log('----------------------------------------');
    users.forEach((user) => {
      console.log(`ID: ${user._id.toString()}`);
      console.log(`邮箱: ${user.email}`);
      console.log(`用户名: ${user.username || 'N/A'}`);
      console.log(`姓名: ${user.name || 'N/A'}`);
      console.log(`提供商: ${user.provider || 'email'}`);
      console.log(`创建时间: ${user.createdAt}`);
      console.log('----------------------------------------');
    });

    console.log(`\n总用户数: ${users.length}`);
    process.exit(0);
  } catch (err) {
    console.error('列出用户时出错:', err);
    process.exit(1);
  }
};

listUsers();
