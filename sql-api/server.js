/**
 * SQL API Server - 医院预约挂号系统 (hsp)
 * 用于 Aipyq 智能体查询 MySQL 数据库
 */

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 从环境变量读取数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'hsp'
};

// 检查必需的配置
if (!dbConfig.password) {
  console.error('错误: 请在 .env 文件中设置 DB_PASSWORD');
  console.error('可以复制 .env.example 为 .env 并填入实际密码');
  process.exit(1);
}

// 创建连接池
const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// SQL 查询端点
app.post('/sql_query', async (req, res) => {
  let { sql, input } = req.body;
  
  // 处理嵌套的 input 格式（LibreChat Actions 可能发送这种格式）
  if (!sql && input) {
    try {
      const parsedInput = typeof input === 'string' ? JSON.parse(input) : input;
      sql = parsedInput.sql;
    } catch (e) {
      console.error('解析 input 失败:', e.message);
    }
  }
  
  console.log('收到查询请求:', sql);
  
  if (!sql) {
    return res.status(400).json({ error: 'SQL query is required' });
  }
  
  // 安全检查：只允许 SELECT 查询
  const trimmedSql = sql.trim().toUpperCase();
  if (!trimmedSql.startsWith('SELECT')) {
    return res.status(403).json({ 
      error: 'Only SELECT queries are allowed for security reasons',
      message: '出于安全考虑，只允许执行 SELECT 查询'
    });
  }
  
  // 额外安全检查：禁止危险关键词
  const dangerousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'CREATE'];
  for (const keyword of dangerousKeywords) {
    if (trimmedSql.includes(keyword)) {
      return res.status(403).json({ 
        error: `Dangerous keyword "${keyword}" detected`,
        message: `检测到危险关键词 "${keyword}"，查询被拒绝`
      });
    }
  }
  
  try {
    const [rows] = await pool.execute(sql);
    console.log('查询成功，返回', rows.length, '条记录');
    res.json({ 
      success: true,
      result: rows,
      rowCount: rows.length
    });
  } catch (error) {
    console.error('查询错误:', error.message);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: 'SQL 执行错误，请检查查询语句'
    });
  }
});

// 健康检查端点
app.get('/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(500).json({ status: 'error', database: 'disconnected', error: error.message });
  }
});

// 获取数据库表结构端点（可选，用于调试）
app.get('/tables', async (req, res) => {
  try {
    const [tables] = await pool.query('SHOW TABLES');
    res.json({ tables });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.SQL_API_PORT || 3001;
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║     SQL API Server for HSP (医院预约挂号系统)              ║
╠═══════════════════════════════════════════════════════════╣
║  服务地址: http://localhost:${PORT}                         ║
║  数据库:   ${dbConfig.database.padEnd(46)}║
║  端点:     POST /sql_query                                 ║
║  健康检查: GET /health                                     ║
╚═══════════════════════════════════════════════════════════╝
  `);
});
