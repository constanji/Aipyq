const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { webcrypto } = require('node:crypto');
const { logger } = require('@librechat/data-schemas');
const { isEnabled, checkEmailConfig, isEmailDomainAllowed } = require('@librechat/api');
const { ErrorTypes, SystemRoles, errorsToString } = require('librechat-data-provider');
const {
  findUser,
  findToken,
  createUser,
  updateUser,
  countUsers,
  getUserById,
  findSession,
  createToken,
  deleteTokens,
  deleteSession,
  createSession,
  generateToken,
  deleteUserById,
  generateRefreshToken,
} = require('~/models');
const { registerSchema } = require('~/strategies/validators');
const { getAppConfig } = require('~/server/services/Config');
const { sendEmail } = require('~/server/utils');

const domains = {
  client: process.env.DOMAIN_CLIENT,
  server: process.env.DOMAIN_SERVER,
};

const isProduction = process.env.NODE_ENV === 'production';
const genericVerificationMessage = 'Please check your email to verify your email address.';

/**
 * Logout user
 *
 * @param {ServerRequest} req
 * @param {string} refreshToken
 * @returns
 */
const logoutUser = async (req, refreshToken) => {
  try {
    const userId = req.user._id;
    const session = await findSession({ userId: userId, refreshToken });

    if (session) {
      try {
        await deleteSession({ sessionId: session._id });
      } catch (deleteErr) {
        logger.error('[logoutUser] Failed to delete session.', deleteErr);
        return { status: 500, message: 'Failed to delete session.' };
      }
    }

    try {
      req.session.destroy();
    } catch (destroyErr) {
      logger.debug('[logoutUser] Failed to destroy session.', destroyErr);
    }

    return { status: 200, message: 'Logout successful' };
  } catch (err) {
    return { status: 500, message: err.message };
  }
};

/**
 * Creates Token and corresponding Hash for verification
 * @returns {[string, string]}
 */
const createTokenHash = () => {
  const token = Buffer.from(webcrypto.getRandomValues(new Uint8Array(32))).toString('hex');
  const hash = bcrypt.hashSync(token, 10);
  return [token, hash];
};

/**
 * Send Verification Email
 * @param {Partial<IUser>} user
 * @returns {Promise<void>}
 */
const sendVerificationEmail = async (user) => {
  const [verifyToken, hash] = createTokenHash();

  const verificationLink = `${
    domains.client
  }/verify?token=${verifyToken}&email=${encodeURIComponent(user.email)}`;
  await sendEmail({
    email: user.email,
    subject: 'Verify your email',
    payload: {
      appName: process.env.APP_TITLE || 'LibreChat',
      name: user.name || user.username || user.email,
      verificationLink: verificationLink,
      year: new Date().getFullYear(),
    },
    template: 'verifyEmail.handlebars',
  });

  await createToken({
    userId: user._id,
    email: user.email,
    token: hash,
    createdAt: Date.now(),
    expiresIn: 900,
  });

  logger.info(`[sendVerificationEmail] Verification link issued. [Email: ${user.email}]`);
};

/**
 * Verify Email
 * @param {ServerRequest} req
 */
const verifyEmail = async (req) => {
  const { email, token } = req.body;
  const decodedEmail = decodeURIComponent(email);

  const user = await findUser({ email: decodedEmail }, 'email _id emailVerified');

  if (!user) {
    logger.warn(`[verifyEmail] [User not found] [Email: ${decodedEmail}]`);
    return new Error('User not found');
  }

  if (user.emailVerified) {
    logger.info(`[verifyEmail] Email already verified [Email: ${decodedEmail}]`);
    return { message: 'Email already verified', status: 'success' };
  }

  let emailVerificationData = await findToken({ email: decodedEmail }, { sort: { createdAt: -1 } });

  if (!emailVerificationData) {
    logger.warn(`[verifyEmail] [No email verification data found] [Email: ${decodedEmail}]`);
    return new Error('Invalid or expired password reset token');
  }

  const isValid = bcrypt.compareSync(token, emailVerificationData.token);

  if (!isValid) {
    logger.warn(
      `[verifyEmail] [Invalid or expired email verification token] [Email: ${decodedEmail}]`,
    );
    return new Error('Invalid or expired email verification token');
  }

  const updatedUser = await updateUser(emailVerificationData.userId, { emailVerified: true });

  if (!updatedUser) {
    logger.warn(`[verifyEmail] [User update failed] [Email: ${decodedEmail}]`);
    return new Error('Failed to update user verification status');
  }

  await deleteTokens({ token: emailVerificationData.token });
  logger.info(`[verifyEmail] Email verification successful [Email: ${decodedEmail}]`);
  return { message: 'Email verification was successful', status: 'success' };
};


/**
 * 注册一个新用户
 * 处理用户注册流程，包括数据验证、邮箱域名检查、密码加密、用户创建和邮箱验证
 * @param {IUser} user <email, password, name, username> - 用户注册信息
 * @param {Partial<IUser>} [additionalData={}] - 额外的用户数据，可选
 * @returns {Promise<{status: number, message: string, user?: IUser}>} - 返回注册结果状态和消息
 */
const registerUser = async (user, additionalData = {}) => {
  // 使用注册模式验证用户输入数据
  const { error } = registerSchema.safeParse(user);
  if (error) {
    // 将验证错误转换为字符串
    const errorMessage = errorsToString(error.errors);
    logger.info(
      'Route: register - Validation Error',
      { name: 'Request params:', value: user },
      { name: 'Validation error:', value: errorMessage },
    );

    // 返回验证错误
    return { status: 404, message: errorMessage };
  }

  // 解构获取用户注册信息
  const { email, password, name, username } = user;

  // 用于错误处理时删除已创建的用户
  let newUserId;
  try {
    // 获取应用配置
    const appConfig = await getAppConfig();
    // 检查邮箱域名是否在允许的域名列表中
    if (!isEmailDomainAllowed(email, appConfig?.registration?.allowedDomains)) {
      const errorMessage =
        'The email address provided cannot be used. Please use a different email address.';
      logger.error(`[registerUser] [Registration not allowed] [Email: ${user.email}]`);
      return { status: 403, message: errorMessage };
    }

    // 检查邮箱是否已被注册
    const existingUser = await findUser({ email }, 'email _id');

    if (existingUser) {
      // 如果邮箱已存在，记录日志并延迟返回（防止邮箱枚举攻击）
      logger.info(
        'Register User - Email in use',
        { name: 'Request params:', value: user },
        { name: 'Existing user:', value: existingUser },
      );

      // 延迟1秒，防止通过响应时间推断邮箱是否存在
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // 返回通用验证消息，不暴露邮箱是否已注册
      return { status: 200, message: genericVerificationMessage };
    }

    // 判断是否为第一个注册用户（不计算匿名用户）
    // 第一个注册用户将被授予管理员角色
    const isFirstRegisteredUser = (await countUsers()) === 0;

    // 生成密码加密盐值
    const salt = bcrypt.genSaltSync(10);
    // 构建新用户数据对象
    const newUserData = {
      provider: 'local', // 本地注册方式
      email,
      username,
      name,
      avatar: null, // 默认无头像
      // 第一个用户为管理员，其他为普通用户
      role: isFirstRegisteredUser ? SystemRoles.ADMIN : SystemRoles.USER,
      // 使用bcrypt加密密码
      password: bcrypt.hashSync(password, salt),
      // 合并额外数据
      ...additionalData,
    };

    // 检查是否启用了邮箱功能
    const emailEnabled = checkEmailConfig();
    // 检查是否允许未验证邮箱的用户登录
    const disableTTL = isEnabled(process.env.ALLOW_UNVERIFIED_EMAIL_LOGIN);

    // 创建新用户，传入初始余额、TTL设置和验证标志
    const newUser = await createUser(newUserData, appConfig.balance, disableTTL, true);
    newUserId = newUser._id;
    // 如果启用了邮箱且用户邮箱未验证，发送验证邮件
    if (emailEnabled && !newUser.emailVerified) {
      await sendVerificationEmail({
        _id: newUserId,
        email,
        name,
      });
    } else {
      // 如果未启用邮箱功能，直接标记邮箱为已验证
      await updateUser(newUserId, { emailVerified: true });
    }

    // 返回成功消息（无论是否发送验证邮件，都返回通用消息）
    return { status: 200, message: genericVerificationMessage };
  } catch (err) {
    // 捕获注册过程中的任何错误
    logger.error('[registerUser] Error in registering user:', err);
    // 如果用户已创建但后续步骤失败，删除该用户（清理部分创建的数据）
    if (newUserId) {
      const result = await deleteUserById(newUserId);
      logger.warn(
        `[registerUser] [Email: ${email}] [Temporary User deleted: ${JSON.stringify(result)}]`,
      );
    }
    // 返回通用错误消息
    return { status: 500, message: 'Something went wrong' };
  }
};

/**
 * Request password reset
 * @param {ServerRequest} req
 */
const requestPasswordReset = async (req) => {
  const { email } = req.body;
  const appConfig = await getAppConfig();
  if (!isEmailDomainAllowed(email, appConfig?.registration?.allowedDomains)) {
    const error = new Error(ErrorTypes.AUTH_FAILED);
    error.code = ErrorTypes.AUTH_FAILED;
    error.message = 'Email domain not allowed';
    return error;
  }
  const user = await findUser({ email }, 'email _id');
  const emailEnabled = checkEmailConfig();

  logger.warn(`[requestPasswordReset] [Password reset request initiated] [Email: ${email}]`);

  if (!user) {
    logger.warn(`[requestPasswordReset] [No user found] [Email: ${email}] [IP: ${req.ip}]`);
    return {
      message: 'If an account with that email exists, a password reset link has been sent to it.',
    };
  }

  await deleteTokens({ userId: user._id });

  const [resetToken, hash] = createTokenHash();

  await createToken({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
    expiresIn: 900,
  });

  const link = `${domains.client}/reset-password?token=${resetToken}&userId=${user._id}`;

  if (emailEnabled) {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      payload: {
        appName: process.env.APP_TITLE || 'LibreChat',
        name: user.name || user.username || user.email,
        link: link,
        year: new Date().getFullYear(),
      },
      template: 'requestPasswordReset.handlebars',
    });
    logger.info(
      `[requestPasswordReset] Link emailed. [Email: ${email}] [ID: ${user._id}] [IP: ${req.ip}]`,
    );
  } else {
    logger.info(
      `[requestPasswordReset] Link issued. [Email: ${email}] [ID: ${user._id}] [IP: ${req.ip}]`,
    );
    return { link };
  }

  return {
    message: 'If an account with that email exists, a password reset link has been sent to it.',
  };
};

/**
 * Reset Password
 *
 * @param {*} userId
 * @param {String} token
 * @param {String} password
 * @returns
 */
const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await findToken(
    {
      userId,
    },
    { sort: { createdAt: -1 } },
  );

  if (!passwordResetToken) {
    return new Error('Invalid or expired password reset token');
  }

  const isValid = bcrypt.compareSync(token, passwordResetToken.token);

  if (!isValid) {
    return new Error('Invalid or expired password reset token');
  }

  const hash = bcrypt.hashSync(password, 10);
  const user = await updateUser(userId, { password: hash });

  if (checkEmailConfig()) {
    await sendEmail({
      email: user.email,
      subject: 'Password Reset Successfully',
      payload: {
        appName: process.env.APP_TITLE || 'LibreChat',
        name: user.name || user.username || user.email,
        year: new Date().getFullYear(),
      },
      template: 'passwordReset.handlebars',
    });
  }

  await deleteTokens({ token: passwordResetToken.token });
  logger.info(`[resetPassword] Password reset successful. [Email: ${user.email}]`);
  return { message: 'Password reset was successful' };
};

/**
 * Set Auth Tokens
 * @param {String | ObjectId} userId
 * @param {ServerResponse} res
 * @param {ISession | null} [session=null]
 * @returns
 */
const setAuthTokens = async (userId, res, _session = null) => {
  try {
    let session = _session;
    let refreshToken;
    let refreshTokenExpires;

    if (session && session._id && session.expiration != null) {
      refreshTokenExpires = session.expiration.getTime();
      refreshToken = await generateRefreshToken(session);
    } else {
      const result = await createSession(userId);
      session = result.session;
      refreshToken = result.refreshToken;
      refreshTokenExpires = session.expiration.getTime();
    }

    const user = await getUserById(userId);
    const token = await generateToken(user);

    res.cookie('refreshToken', refreshToken, {
      expires: new Date(refreshTokenExpires),
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });
    res.cookie('token_provider', 'librechat', {
      expires: new Date(refreshTokenExpires),
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });
    return token;
  } catch (error) {
    logger.error('[setAuthTokens] Error in setting authentication tokens:', error);
    throw error;
  }
};

/**
 * @function setOpenIDAuthTokens
 * Set OpenID Authentication Tokens
 * //type tokenset from openid-client
 * @param {import('openid-client').TokenEndpointResponse & import('openid-client').TokenEndpointResponseHelpers} tokenset
 * - The tokenset object containing access and refresh tokens
 * @param {Object} res - response object
 * @param {string} [userId] - Optional MongoDB user ID for image path validation
 * @returns {String} - access token
 */
const setOpenIDAuthTokens = (tokenset, res, userId) => {
  try {
    if (!tokenset) {
      logger.error('[setOpenIDAuthTokens] No tokenset found in request');
      return;
    }
    const { REFRESH_TOKEN_EXPIRY } = process.env ?? {};
    const expiryInMilliseconds = REFRESH_TOKEN_EXPIRY
      ? eval(REFRESH_TOKEN_EXPIRY)
      : 1000 * 60 * 60 * 24 * 7; // 7 days default
    const expirationDate = new Date(Date.now() + expiryInMilliseconds);
    if (tokenset == null) {
      logger.error('[setOpenIDAuthTokens] No tokenset found in request');
      return;
    }
    if (!tokenset.access_token || !tokenset.refresh_token) {
      logger.error('[setOpenIDAuthTokens] No access or refresh token found in tokenset');
      return;
    }
    res.cookie('refreshToken', tokenset.refresh_token, {
      expires: expirationDate,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });
    res.cookie('token_provider', 'openid', {
      expires: expirationDate,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
    });
    if (userId && isEnabled(process.env.OPENID_REUSE_TOKENS)) {
      /** JWT-signed user ID cookie for image path validation when OPENID_REUSE_TOKENS is enabled */
      const signedUserId = jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: expiryInMilliseconds / 1000,
      });
      res.cookie('openid_user_id', signedUserId, {
        expires: expirationDate,
        httpOnly: true,
        secure: isProduction,
        sameSite: 'strict',
      });
    }
    return tokenset.access_token;
  } catch (error) {
    logger.error('[setOpenIDAuthTokens] Error in setting authentication tokens:', error);
    throw error;
  }
};

/**
 * Resend Verification Email
 * @param {Object} req
 * @param {Object} req.body
 * @param {String} req.body.email
 * @returns {Promise<{status: number, message: string}>}
 */
const resendVerificationEmail = async (req) => {
  try {
    const { email } = req.body;
    await deleteTokens({ email });
    const user = await findUser({ email }, 'email _id name');

    if (!user) {
      logger.warn(`[resendVerificationEmail] [No user found] [Email: ${email}]`);
      return { status: 200, message: genericVerificationMessage };
    }

    const [verifyToken, hash] = createTokenHash();

    const verificationLink = `${
      domains.client
    }/verify?token=${verifyToken}&email=${encodeURIComponent(user.email)}`;

    await sendEmail({
      email: user.email,
      subject: 'Verify your email',
      payload: {
        appName: process.env.APP_TITLE || 'LibreChat',
        name: user.name || user.username || user.email,
        verificationLink: verificationLink,
        year: new Date().getFullYear(),
      },
      template: 'verifyEmail.handlebars',
    });

    await createToken({
      userId: user._id,
      email: user.email,
      token: hash,
      createdAt: Date.now(),
      expiresIn: 900,
    });

    logger.info(`[resendVerificationEmail] Verification link issued. [Email: ${user.email}]`);

    return {
      status: 200,
      message: genericVerificationMessage,
    };
  } catch (error) {
    logger.error(`[resendVerificationEmail] Error resending verification email: ${error.message}`);
    return {
      status: 500,
      message: 'Something went wrong.',
    };
  }
};

module.exports = {
  logoutUser,
  verifyEmail,
  registerUser,
  setAuthTokens,
  resetPassword,
  setOpenIDAuthTokens,
  requestPasswordReset,
  resendVerificationEmail,
};
