const path = require('path');
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
const { ViolationTypes } = require('librechat-data-provider');
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const banViolation = require('~/cache/banViolation');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('---------------------');
  console.purple('封禁用户账户！');
  console.purple('---------------------');

  let email = '';
  let duration = '';

  if (process.argv.length >= 4) {
    // Check if there are enough command-line arguments.
    email = process.argv[2];
    duration = parseInt(process.argv[3]); // Parse the duration as an integer.
  } else {
    console.orange('用法: npm run ban-user <email> <duration>');
    console.orange('注意: 如果不传入参数，系统会提示您输入。');
    console.purple('--------------------------');
  }

  if (!email) {
    email = await askQuestion('邮箱:');
  }

  if (!duration) {
    const durationInMinutes = await askQuestion('时长（分钟）:');
    duration = parseInt(durationInMinutes) * 60000;
  }

  if (isNaN(duration) || duration <= 0) {
    console.red('错误: 无效的时长！');
    silentExit(1);
  }

  if (!email.includes('@')) {
    console.red('错误: 无效的邮箱地址！');
    silentExit(1);
  }

  const user = await User.findOne({ email }).lean();
  if (!user) {
    console.red('错误: 未找到该邮箱对应的用户！');
    silentExit(1);
  } else {
    console.purple(`找到用户: ${user.email}`);
  }

  const req = {};
  const res = {
    clearCookie: () => {},
    status: function () {
      return this;
    },
    json: function () {
      return this;
    },
  };

  const errorMessage = {
    type: ViolationTypes.CONCURRENT,
    violation_count: 20,
    user_id: user._id,
    prev_count: 0,
    duration: duration,
  };

  await banViolation(req, res, errorMessage);

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
