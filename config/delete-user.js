#!/usr/bin/env node
const path = require('path');
const mongoose = require('mongoose');
const {
  User,
  Agent,
  Assistant,
  Balance,
  Transaction,
  ConversationTag,
  Conversation,
  Message,
  File,
  Key,
  MemoryEntry,
  PluginAuth,
  Prompt,
  PromptGroup,
  Preset,
  Session,
  SharedLink,
  ToolCall,
  Token,
} = require('@librechat/data-schemas').createModels(mongoose);
require('module-alias')({ base: path.resolve(__dirname, '..', 'api') });
const { askQuestion, silentExit } = require('./helpers');
const connect = require('./connect');

async function gracefulExit(code = 0) {
  try {
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error disconnecting from MongoDB:', err);
  }
  silentExit(code);
}

(async () => {
  await connect();

  console.purple('---------------');
  console.purple('删除用户及其所有相关数据');
  console.purple('---------------');

  // 1) Get email
  let email = process.argv[2]?.trim();
  if (!email) {
    email = (await askQuestion('邮箱:')).trim();
  }

  // 2) Find user
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    console.yellow(`未找到邮箱为 "${email}" 的用户`);
    return gracefulExit(0);
  }

  // 3) Confirm full deletion
  const confirmAll = await askQuestion(
    `确定要删除用户 ${user.email} (${user._id}) 及其所有数据吗？(y/N)`,
  );
  if (confirmAll.toLowerCase() !== 'y') {
    console.yellow('已取消。');
    return gracefulExit(0);
  }

  // 4) Ask specifically about transactions
  const confirmTx = await askQuestion('是否同时删除该用户的所有交易记录？(y/N)');
  const deleteTx = confirmTx.toLowerCase() === 'y';

  const uid = user._id.toString();

  // 5) Build and run deletion tasks
  const tasks = [
    Agent.deleteMany({ author: uid }),
    Assistant.deleteMany({ user: uid }),
    Balance.deleteMany({ user: uid }),
    ConversationTag.deleteMany({ user: uid }),
    Conversation.deleteMany({ user: uid }),
    Message.deleteMany({ user: uid }),
    File.deleteMany({ user: uid }),
    Key.deleteMany({ userId: uid }),
    MemoryEntry.deleteMany({ userId: uid }),
    PluginAuth.deleteMany({ userId: uid }),
    Prompt.deleteMany({ author: uid }),
    PromptGroup.deleteMany({ author: uid }),
    Preset.deleteMany({ user: uid }),
    Session.deleteMany({ user: uid }),
    SharedLink.deleteMany({ user: uid }),
    ToolCall.deleteMany({ user: uid }),
    Token.deleteMany({ userId: uid }),
  ];

  if (deleteTx) {
    tasks.push(Transaction.deleteMany({ user: uid }));
  }

  await Promise.all(tasks);

  // 6) Finally delete the user document itself
  await User.deleteOne({ _id: uid });

  console.green(`✔ 成功删除用户 ${email} 及其所有关联数据。`);
  if (!deleteTx) {
    console.yellow('⚠️ 交易记录已保留。');
  }

  return gracefulExit(0);
})().catch(async (err) => {
  if (!err.message.includes('fetch failed')) {
    console.error('发生未捕获的错误:');
    console.error(err);
    await mongoose.disconnect();
    process.exit(1);
  }
});
