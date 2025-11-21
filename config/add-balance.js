const path = require('path');
const mongoose = require('mongoose');
const { isEnabled, getBalanceConfig } = require('@librechat/api');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { createTransaction } = require('~/models/Transaction');
const { getAppConfig } = require('~/server/services/Config');
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  /**
   * Show the welcome / help menu
   */
  console.purple('--------------------------');
  console.purple('为用户账户添加余额！');
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
    console.orange('用法: npm run add-balance <email> <amount>');
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

  if (!amount) {
    amount = await askQuestion('金额: (如果为空或0，默认为1000代币)');
  }
  // Validate the amount
  if (!amount) {
    amount = 1000;
  }

  // Validate the user
  const user = await User.findOne({ email }).lean();
  if (!user) {
    console.red('错误: 未找到该邮箱对应的用户！');
    silentExit(1);
  } else {
    console.purple(`找到用户: ${user.email}`);
  }

  /**
   * Now that we have all the variables we need, lets create the transaction and update the balance
   */
  let result;
  try {
    const appConfig = await getAppConfig();
    const balanceConfig = getBalanceConfig(appConfig);
    result = await createTransaction({
      user: user._id,
      tokenType: 'credits',
      context: 'admin',
      rawAmount: +amount,
      balance: balanceConfig,
    });
  } catch (error) {
    console.red('错误: ' + error.message);
    console.error(error);
    silentExit(1);
  }

  // Check the result
  if (!result?.balance) {
    console.red('错误: 更新余额时出现问题！');
    console.error(result);
    silentExit(1);
  }

  // Done!
  console.green('交易创建成功！');
  console.purple(`金额: ${amount}
新余额: ${result.balance}`);
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
