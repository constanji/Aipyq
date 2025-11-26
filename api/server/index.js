/**
 *AI朋友圈后端服务器入口文件
 * 
 * 该文件负责：
 * 1. 初始化 Express 服务器
 * 2. 配置中间件和路由
 * 3. 连接数据库和搜索引擎
 * 4. 设置认证策略（JWT、LDAP、社交登录等）
 * 5. 启动服务器并处理错误
 */

// ==================== 环境配置和依赖导入 ====================

// 加载环境变量配置
require('dotenv').config();
const fs = require('fs');
const path = require('path');
// 配置模块别名，允许使用 ~/ 作为 api 目录的别名
require('module-alias')({ base: path.resolve(__dirname, '..') });

// Express 相关依赖
const cors = require('cors'); // 跨域资源共享
const axios = require('axios'); // HTTP 客户端
const express = require('express'); // Web 框架
const passport = require('passport'); // 认证中间件
const compression = require('compression'); // 响应压缩
const cookieParser = require('cookie-parser'); // Cookie 解析

// 项目内部依赖
const { logger } = require('@aipyq/data-schemas'); // 日志工具
const mongoSanitize = require('express-mongo-sanitize'); // MongoDB 注入防护
const {
  isEnabled,
  ErrorController,
  performStartupChecks,
  initializeFileStorage,
} = require('@aipyq/api');

// 数据库和搜索引擎
const { connectDb, indexSync } = require('~/db'); // MongoDB 连接和 Meilisearch 同步

// 服务初始化
const initializeOAuthReconnectManager = require('./services/initializeOAuthReconnectManager'); // OAuth 重连管理器
const createValidateImageRequest = require('./middleware/validateImageRequest'); // 图片请求验证中间件
const { checkMigrations } = require('./services/start/migration'); // 数据库迁移检查
const initializeMCPs = require('./services/initializeMCPs'); // MCP (Model Context Protocol) 初始化

// 认证策略
const { jwtLogin, ldapLogin, passportLogin } = require('~/strategies'); // JWT、LDAP、本地登录策略
const configureSocialLogins = require('./socialLogins'); // 社交登录配置（Google、GitHub、Discord 等）

// 配置和工具
const { getAppConfig } = require('./services/Config'); // 应用配置获取
const staticCache = require('./utils/staticCache'); // 静态资源缓存
const noIndex = require('./middleware/noIndex'); // 防止搜索引擎索引中间件
const { updateInterfacePermissions } = require('~/models/interface'); // 更新界面权限
const { seedDatabase } = require('~/models'); // 数据库种子数据

// 路由
const routes = require('./routes'); // 所有 API 路由

// ==================== 环境变量配置 ====================

const { PORT, HOST, ALLOW_SOCIAL_LOGIN, DISABLE_COMPRESSION, TRUST_PROXY } = process.env ?? {};

// 端口配置：允许 PORT=0 用于自动分配空闲端口
const port = isNaN(Number(PORT)) ? 3080 : Number(PORT);
const host = HOST || 'localhost';
// 代理信任配置：默认信任第一个代理（用于获取真实客户端 IP）
const trusted_proxy = Number(TRUST_PROXY) || 1;

// ==================== Express 应用实例 ====================

const app = express();

/**
 * 服务器启动函数
 * 按顺序执行：数据库连接 → 配置加载 → 中间件设置 → 路由注册 → 服务器监听
 */
const startServer = async () => {
  // ==================== Bun 运行时特殊配置 ====================
  // 如果使用 Bun 运行时，设置 gzip 编码头
  if (typeof Bun !== 'undefined') {
    axios.defaults.headers.common['Accept-Encoding'] = 'gzip';
  }

  // ==================== 数据库连接 ====================
  await connectDb(); // 连接 MongoDB
  logger.info('Connected to MongoDB');
  
  // 启动 Meilisearch 后台同步（异步执行，不阻塞启动）
  // 同步 MongoDB 的消息和对话数据到 Meilisearch 搜索引擎
  indexSync().catch((err) => {
    logger.error('[indexSync] Background sync failed:', err);
  });

  // ==================== Express 基础配置 ====================
  app.disable('x-powered-by'); // 移除 X-Powered-By 响应头（安全考虑）
  app.set('trust proxy', trusted_proxy); // 配置代理信任（用于获取真实客户端 IP）

  // ==================== 应用初始化 ====================
  await seedDatabase(); // 初始化数据库种子数据（如果数据库为空）
  const appConfig = await getAppConfig(); // 获取应用配置
  initializeFileStorage(appConfig); // 初始化文件存储系统
  await performStartupChecks(appConfig); // 执行启动检查（验证配置、环境等）
  await updateInterfacePermissions(appConfig); // 更新界面权限配置

  // ==================== 前端 HTML 文件处理 ====================
  // 读取前端入口 HTML 文件
  const indexPath = path.join(appConfig.paths.dist, 'index.html');
  let indexHTML = fs.readFileSync(indexPath, 'utf8');

  // 支持在子目录中部署应用
  // 如果 DOMAIN_CLIENT 指定了非根路径，需要更新 base href
  if (process.env.DOMAIN_CLIENT) {
    const clientUrl = new URL(process.env.DOMAIN_CLIENT);
    const baseHref = clientUrl.pathname.endsWith('/')
      ? clientUrl.pathname
      : `${clientUrl.pathname}/`;
    if (baseHref !== '/') {
      logger.info(`Setting base href to ${baseHref}`);
      indexHTML = indexHTML.replace(/base href="\/"/, `base href="${baseHref}"`);
    }
  }

  // ==================== 健康检查端点 ====================
  // 用于负载均衡器和监控系统检查服务器状态
  app.get('/health', (_req, res) => res.status(200).send('OK'));

  // ==================== 中间件配置 ====================
  
  // 安全相关中间件
  app.use(noIndex); // 防止搜索引擎索引（添加 noindex 响应头）
  app.use(express.json({ limit: '3mb' })); // JSON 请求体解析，限制 3MB
  app.use(express.urlencoded({ extended: true, limit: '3mb' })); // URL 编码请求体解析，限制 3MB
  app.use(mongoSanitize()); // MongoDB 注入攻击防护（清理请求中的危险字符）
  app.use(cors()); // 跨域资源共享（允许前端跨域请求）
  app.use(cookieParser()); // Cookie 解析中间件

  // 响应压缩中间件（可选）
  // 压缩响应内容以减少带宽使用，提升传输速度
  if (!isEnabled(DISABLE_COMPRESSION)) {
    app.use(compression());
  } else {
    console.warn('Response compression has been disabled via DISABLE_COMPRESSION.');
  }

  // 静态资源缓存中间件
  // 为前端资源、字体和资源文件设置缓存策略
  app.use(staticCache(appConfig.paths.dist)); // 前端构建文件
  app.use(staticCache(appConfig.paths.fonts)); // 字体文件
  app.use(staticCache(appConfig.paths.assets)); // 资源文件

  // ==================== 认证策略配置 ====================
  
  // 社交登录警告提示
  if (!ALLOW_SOCIAL_LOGIN) {
    console.warn('Social logins are disabled. Set ALLOW_SOCIAL_LOGIN=true to enable them.');
  }

  // Passport.js 认证初始化
  app.use(passport.initialize()); // 初始化 Passport 认证中间件
  
  // 基础认证策略（始终启用）
  passport.use(jwtLogin()); // JWT Token 认证策略
  passport.use(passportLogin()); // 本地用户名密码认证策略

  // LDAP 认证策略（可选，需要配置环境变量）
  // 如果配置了 LDAP_URL 和 LDAP_USER_SEARCH_BASE，则启用 LDAP 认证
  if (process.env.LDAP_URL && process.env.LDAP_USER_SEARCH_BASE) {
    passport.use(ldapLogin);
  }

  // 社交登录策略配置（可选）
  // 包括：Google、GitHub、Discord、Facebook、Apple、OpenID Connect、SAML
  if (isEnabled(ALLOW_SOCIAL_LOGIN)) {
    await configureSocialLogins(app);
  }

  // ==================== 路由注册 ====================
  
  // OAuth 认证路由（社交登录回调）
  app.use('/oauth', routes.oauth);
  
  // ==================== API 端点路由 ====================
  
  // 认证相关
  app.use('/api/auth', routes.auth); // 用户认证（登录、注册、登出等）
  
  // 核心功能
  app.use('/api/actions', routes.actions); // Agent Actions（动作/工具）管理
  app.use('/api/messages', routes.messages); // 消息管理（发送、获取、搜索、更新、删除）
  app.use('/api/convos', routes.convos); // 对话管理（创建、获取、更新、删除、导入、分叉）
  app.use('/api/edit', routes.edit); // 消息编辑功能
  
  // 用户和配置
  app.use('/api/user', routes.user); // 用户信息管理
  app.use('/api/keys', routes.keys); // API 密钥管理
  app.use('/api/config', routes.config); // 应用配置获取
  
  // 搜索和内容
  app.use('/api/search', routes.search); // 全文搜索（使用 Meilisearch）
  
  // 预设和提示词
  app.use('/api/presets', routes.presets); // 预设管理（对话预设配置）
  app.use('/api/prompts', routes.prompts); // 提示词管理
  app.use('/api/categories', routes.categories); // 分类管理
  
  // AI 模型和端点
  app.use('/api/models', routes.models); // 模型列表和配置
  app.use('/api/endpoints', routes.endpoints); // AI 端点配置（OpenAI、Anthropic、Google 等）
  app.use('/api/tokenizer', routes.tokenizer); // Token 计数工具
  
  // 文件管理
  app.use('/api/files', await routes.files.initialize()); // 文件上传、下载、管理
  app.use('/images/', createValidateImageRequest(appConfig.secureImageLinks), routes.staticRoute); // 图片静态资源（带安全验证）
  
  // 高级功能
  app.use('/api/assistants', routes.assistants); // OpenAI Assistants 管理
  app.use('/api/agents', routes.agents); // Agent（智能代理）管理
  app.use('/api/plugins', routes.plugins); // 插件管理
  app.use('/api/mcp', routes.mcp); // MCP (Model Context Protocol) 管理
  
  // 权限和角色
  app.use('/api/roles', routes.roles); // 角色管理
  app.use('/api/permissions', routes.accessPermissions); // 权限管理
  
  // 其他功能
  app.use('/api/balance', routes.balance); // 余额查询（Token 使用量）
  app.use('/api/share', routes.share); // 对话分享功能
  app.use('/api/banner', routes.banner); // 横幅管理
  app.use('/api/memories', routes.memories); // 记忆功能（长期记忆存储）

  // ==================== 错误处理中间件 ====================
  // 统一处理所有路由中的错误，返回标准化的错误响应
  app.use(ErrorController);

  // ==================== 前端路由回退处理 ====================
  // 当请求不匹配任何 API 路由时，返回前端 HTML 文件（用于 SPA 路由）
  app.use((req, res) => {
    // 设置 HTML 文件的缓存控制头（默认不缓存，确保总是获取最新版本）
    res.set({
      'Cache-Control': process.env.INDEX_CACHE_CONTROL || 'no-cache, no-store, must-revalidate',
      Pragma: process.env.INDEX_PRAGMA || 'no-cache',
      Expires: process.env.INDEX_EXPIRES || '0',
    });

    // 根据 Cookie 或 Accept-Language 头设置语言
    // 优先使用 Cookie 中的语言设置，其次使用浏览器 Accept-Language 头
    const lang = req.cookies.lang || req.headers['accept-language']?.split(',')[0] || 'en-US';
    const saneLang = lang.replace(/"/g, '&quot;'); // 转义引号防止 XSS
    let updatedIndexHtml = indexHTML.replace(/lang="en-US"/g, `lang="${saneLang}"`);

    res.type('html');
    res.send(updatedIndexHtml);
  });

  // ==================== 启动服务器监听 ====================
  app.listen(port, host, async () => {
    // 记录服务器启动信息
    if (host === '0.0.0.0') {
      logger.info(
        `Server listening on all interfaces at port ${port}. Use http://localhost:${port} to access it`,
      );
    } else {
      logger.info(`Server listening at http://${host == '0.0.0.0' ? 'localhost' : host}:${port}`);
    }

    // 服务器启动后的初始化任务
    await initializeMCPs(); // 初始化 MCP (Model Context Protocol) 服务
    await initializeOAuthReconnectManager(); // 初始化 OAuth 重连管理器
    await checkMigrations(); // 检查并执行数据库迁移
  });
};

// ==================== 启动服务器 ====================
startServer();

// ==================== 全局错误处理 ====================
// 捕获未处理的异常，防止服务器崩溃

let messageCount = 0; // 用于限制重复错误日志

process.on('uncaughtException', (err) => {
  // 记录非 fetch 失败的错误
  if (!err.message.includes('fetch failed')) {
    logger.error('There was an uncaught error:', err);
  }

  // AbortController 错误（请求取消）不需要处理
  if (err.message.includes('abort')) {
    logger.warn('There was an uncatchable AbortController error.');
    return;
  }

  // Google GenerativeAI 库的已知问题，无法捕获
  if (err.message.includes('GoogleGenerativeAI')) {
    logger.warn(
      '\n\n`GoogleGenerativeAI` errors cannot be caught due to an upstream issue, see: https://github.com/google-gemini/generative-ai-js/issues/303',
    );
    return;
  }

  // Meilisearch 连接失败（搜索引擎不可用）
  // 只记录一次警告，避免日志刷屏
  if (err.message.includes('fetch failed')) {
    if (messageCount === 0) {
      logger.warn('Meilisearch error, search will be disabled');
      messageCount++;
    }
    return;
  }

  // OpenAI API 错误（可能是反向代理配置或流式配置问题）
  if (err.message.includes('OpenAIError') || err.message.includes('ChatCompletionMessage')) {
    logger.error(
      '\n\nAn Uncaught `OpenAIError` error may be due to your reverse-proxy setup or stream configuration, or a bug in the `openai` node package.',
    );
    return;
  }

  // 其他未处理的错误，退出进程
  process.exit(1);
});

// ==================== 导出应用实例 ====================
// 导出 Express 应用实例，便于测试时使用
module.exports = app;
