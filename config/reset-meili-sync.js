const path = require('path');
const mongoose = require('mongoose');
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

(async () => {
  await connect();

  console.purple('---------------------------------------');
  console.purple('重置 MeiliSearch 同步标志');
  console.purple('---------------------------------------');
  console.yellow('\n此脚本将重置 MongoDB 中的 MeiliSearch 索引标志。');
  console.yellow('当 MeiliSearch 数据已被删除或损坏时使用此脚本，');
  console.yellow('您需要触发完全重新同步。\n');

  const confirm = await askQuestion(
    '确定要重置所有 MeiliSearch 同步标志吗？(y/N): ',
  );

  if (confirm.toLowerCase() !== 'y') {
    console.orange('操作已取消。');
    silentExit(0);
  }

  try {
    // Reset _meiliIndex flags for messages
    console.cyan('\n正在重置消息同步标志...');
    const messageResult = await mongoose.connection.db
      .collection('messages')
      .updateMany({ _meiliIndex: true }, { $set: { _meiliIndex: false } });

    console.green(`✓ 已重置 ${messageResult.modifiedCount} 个消息同步标志`);

    // Reset _meiliIndex flags for conversations
    console.cyan('\n正在重置对话同步标志...');
    const conversationResult = await mongoose.connection.db
      .collection('conversations')
      .updateMany({ _meiliIndex: true }, { $set: { _meiliIndex: false } });

    console.green(`✓ 已重置 ${conversationResult.modifiedCount} 个对话同步标志`);

    // Get current counts
    const totalMessages = await mongoose.connection.db.collection('messages').countDocuments();
    const totalConversations = await mongoose.connection.db
      .collection('conversations')
      .countDocuments();

    console.purple('\n---------------------------------------');
    console.green('MeiliSearch 同步标志已成功重置！');
    console.cyan(`\n待同步的消息总数: ${totalMessages}`);
    console.cyan(`待同步的对话总数: ${totalConversations}`);
    console.yellow('\n下次 LibreChat 启动或执行同步检查时，');
    console.yellow('所有数据将被重新索引到 MeiliSearch。');
    console.purple('---------------------------------------\n');

    // Ask if user wants to see advanced options
    const showAdvanced = await askQuestion('显示高级选项？(y/N): ');

    if (showAdvanced.toLowerCase() === 'y') {
      console.cyan('\n高级选项:');
      console.yellow('1. 要立即触发同步，请重启 LibreChat');
      console.yellow('2. 要禁用同步，请在 .env 中设置 MEILI_NO_SYNC=true');
      console.yellow(
        '3. 要调整同步批次大小，请在 .env 中设置 MEILI_SYNC_BATCH_SIZE (默认: 100)',
      );
      console.yellow('4. 要调整同步延迟，请在 .env 中设置 MEILI_SYNC_DELAY_MS (默认: 100ms)');
      console.yellow(
        '5. 要更改同步阈值，请在 .env 中设置 MEILI_SYNC_THRESHOLD (默认: 1000)\n',
      );
    }

    silentExit(0);
  } catch (error) {
    console.red('\n重置 MeiliSearch 同步标志时出错:');
    console.error(error);
    silentExit(1);
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
