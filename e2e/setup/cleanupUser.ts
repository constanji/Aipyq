import { connectDb } from '@librechat/backend/db/connect';
import {
  findUser,
  deleteConvos,
  deleteMessages,
  deleteAllUserSessions,
} from '@librechat/backend/models';
// 使用相对路径，因为 ~/ 路径别名在 Playwright 测试环境中无法解析
const { User, Balance, Transaction } = require('../../api/db/models');

type TUser = { email: string; password: string };

export default async function cleanupUser(user: TUser) {
  const { email } = user;
  try {
    console.log('🤖: global teardown has been started');
    const db = await connectDb();
    console.log('🤖:  ✅  Connected to Database');

    const foundUser = await findUser({ email });
    if (!foundUser) {
      console.log('🤖:  ⚠️  User not found in Database');
      return;
    }

    const userId = foundUser._id;
    console.log('🤖:  ✅  Found user in Database');

    // Delete all conversations & associated messages
    try {
      const { deletedCount, messages } = await deleteConvos(userId, {});
      if (messages.deletedCount > 0 || deletedCount > 0) {
        console.log(`🤖:  ✅  Deleted ${deletedCount} convos & ${messages.deletedCount} messages`);
      }
    } catch (error: any) {
      // 如果会话不存在，这是正常的，忽略错误
      if (error.message?.includes('not found') || error.message?.includes('already deleted')) {
        console.log('🤖:  ℹ️  没有找到需要删除的会话');
      } else {
        console.error('🤖:  ⚠️  删除会话时出错:', error.message);
      }
    }

    // Ensure all user messages are deleted
    try {
      const { deletedCount: deletedMessages } = await deleteMessages({ user: userId });
      if (deletedMessages > 0) {
        console.log(`🤖:  ✅  Deleted ${deletedMessages} remaining message(s)`);
      }
    } catch (error: any) {
      console.error('🤖:  ⚠️  删除消息时出错:', error.message);
    }

    // Delete all user sessions
    try {
      await deleteAllUserSessions(userId.toString());
    } catch (error: any) {
      console.error('🤖:  ⚠️  删除用户会话时出错:', error.message);
    }

    // Delete user, balance, and transactions using the registered models
    try {
      await User.deleteMany({ _id: userId });
      await Balance.deleteMany({ user: userId });
      await Transaction.deleteMany({ user: userId });
      console.log('🤖:  ✅  Deleted user from Database');
    } catch (error: any) {
      console.error('🤖:  ⚠️  删除用户数据时出错:', error.message);
    }

    await db.connection.close();
  } catch (error: any) {
    console.error('🤖:  ❌  Error:', error.message || error);
  }
}

process.on('uncaughtException', (err) => console.error('Uncaught Exception:', err));
