const path = require('path');
const mongoose = require('mongoose');
const { Banner } = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('--------------------------');
  console.purple('删除横幅！');
  console.purple('--------------------------');

  const now = new Date();

  try {
    const banner = await Banner.findOne({
      displayFrom: { $lte: now },
      $or: [{ displayTo: { $gte: now } }, { displayTo: null }],
    });

    if (!banner) {
      console.yellow('未找到要删除的横幅。');
      silentExit(0);
    }

    console.purple('当前横幅:');
    console.log(`消息: ${banner.message}`);
    console.log(`开始显示时间: ${banner.displayFrom}`);
    console.log(`结束显示时间: ${banner.displayTo || '未指定'}`);
    console.log(`是否公开: ${banner.isPublic}`);

    const confirmDelete = await askQuestion('确定要删除此横幅吗？(y/N): ');

    if (confirmDelete.toLowerCase() === 'y') {
      await Banner.findByIdAndDelete(banner._id);
      console.green('横幅删除成功！');
    } else {
      console.yellow('横幅删除已取消。');
    }
  } catch (error) {
    console.red('错误: ' + error.message);
    console.error(error);
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
