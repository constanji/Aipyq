const path = require('path');
const mongoose = require('mongoose');
const { User, Balance } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  /**
   * Show the welcome / help menu
   */
  console.purple('-----------------------------');
  console.purple('显示所有用户的余额');
  console.purple('-----------------------------');

  let users = await User.find({});
  for (const user of users) {
    let balance = await Balance.findOne({ user: user._id });
    if (balance !== null) {
      console.green(`用户 ${user.name} (${user.email}) 的余额为 ${balance.tokenCredits}`);
    } else {
      console.yellow(`用户 ${user.name} (${user.email}) 没有余额`);
    }
  }

  silentExit(0);
})();

process.on('uncaughtException', (err) => {
  if (!err.message.includes('fetch failed')) {
    console.error('发生未捕获的错误:');
    console.error(err);
  }

  if (!err.message.includes('fetch failed')) {
    process.exit(1);
  }
});
