const path = require('path');
const mongoose = require('mongoose');
const { isEnabled } = require('@librechat/api');
const { User, Balance } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  /**
   * Show the welcome / help menu
   */
  console.purple('--------------------------');
  console.purple('设置用户账户余额！');
  console.purple('--------------------------');
  /**
   * Set up the variables we need and get the arguments if they were passed in
   */
  let email = '';
  let amount = '';
  // If we have the right number of arguments, lets use them
  if (process.argv.length >= 3) {
    email = process.argv[2];
    amount = process.argv[3];
  } else {
    console.orange('用法: npm run set-balance <email> <amount>');
    console.orange('注意: 如果不传入参数，系统会提示您输入。');
    console.purple('--------------------------');
    // console.purple(`[DEBUG] Args Length: ${process.argv.length}`);
  }

  if (!process.env.CHECK_BALANCE) {
    console.red(
      '错误: CHECK_BALANCE 环境变量未设置！请配置: `CHECK_BALANCE=true`',
    );
    silentExit(1);
  }
  if (isEnabled(process.env.CHECK_BALANCE) === false) {
    console.red(
      '错误: CHECK_BALANCE 环境变量设置为 `false`！请配置: `CHECK_BALANCE=true`',
    );
    silentExit(1);
  }

  /**
   * If we don't have the right number of arguments, lets prompt the user for them
   */
  if (!email) {
    email = await askQuestion('邮箱:');
  }
  // Validate the email
  if (!email.includes('@')) {
    console.red('错误: 无效的邮箱地址！');
    silentExit(1);
  }

  // Validate the user
  const user = await User.findOne({ email }).lean();
  if (!user) {
    console.red('错误: 未找到该邮箱对应的用户！');
    silentExit(1);
  } else {
    console.purple(`找到用户: ${user.email}`);
  }

  let balance = await Balance.findOne({ user: user._id }).lean();
  if (!balance) {
    console.purple('用户没有余额！');
  } else {
    console.purple(`当前余额: ${balance.tokenCredits}`);
  }

  if (!amount) {
    amount = await askQuestion('金额:');
  }
  // Validate the amount
  if (!amount) {
    console.red('错误: 请指定金额！');
    silentExit(1);
  }

  /**
   * Now that we have all the variables we need, lets set the balance
   */
  let result;
  try {
    result = await Balance.findOneAndUpdate(
      { user: user._id },
      { tokenCredits: amount },
      { upsert: true, new: true },
    ).lean();
  } catch (error) {
    console.red('错误: ' + error.message);
    console.error(error);
    silentExit(1);
  }

  // Check the result
  if (result?.tokenCredits == null) {
    console.red('错误: 更新余额时出现问题！');
    console.error(result);
    silentExit(1);
  }

  // Done!
  console.green('余额设置成功！');
  console.purple(`新余额: ${result.tokenCredits}`);
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
