const path = require('path');
const mongoose = require('mongoose');
const { User } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('--------------------------');
  console.purple('重置条款接受状态');
  console.purple('--------------------------');

  console.yellow('这将重置所有用户的条款接受状态。');
  const confirm = await askQuestion('确定要继续吗？(y/n): ');

  if (confirm.toLowerCase() !== 'y') {
    console.yellow('操作已取消。');
    silentExit(0);
  }

  try {
    const result = await User.updateMany({}, { $set: { termsAccepted: false } });
    console.green(`已更新 ${result.modifiedCount} 个用户。`);
  } catch (error) {
    console.red('重置条款接受状态时出错:', error);
    silentExit(1);
  }

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
