#!/usr/bin/env node
/**
 * HSP SQL 查询 MCP 服务器
 * 使用 Model Context Protocol 协议
 */

require('dotenv').config();
const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const mysql = require('mysql2/promise');

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'hsp'
};

// 创建连接池
let pool;

async function initPool() {
  pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
}

// 创建 MCP 服务器
const server = new Server(
  {
    name: 'hsp-sql-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 列出可用工具
server.setRequestHandler('tools/list', async () => {
  return {
    tools: [
      {
        name: 'sql_query',
        description: '在 HSP 医院预约挂号系统数据库上执行 SQL SELECT 查询',
        inputSchema: {
          type: 'object',
          properties: {
            sql: {
              type: 'string',
              description: '要执行的 MySQL SELECT 查询语句',
            },
          },
          required: ['sql'],
        },
      },
    ],
  };
});

// 处理工具调用
server.setRequestHandler('tools/call', async (request) => {
  const { name, arguments: args } = request.params;

  if (name !== 'sql_query') {
    throw new Error(`Unknown tool: ${name}`);
  }

  const sql = args.sql;

  if (!sql) {
    return {
      content: [{ type: 'text', text: '错误: SQL 查询语句不能为空' }],
      isError: true,
    };
  }

  // 安全检查
  const trimmedSql = sql.trim().toUpperCase();
  if (!trimmedSql.startsWith('SELECT')) {
    return {
      content: [{ type: 'text', text: '错误: 只允许执行 SELECT 查询' }],
      isError: true,
    };
  }

  const dangerousKeywords = ['DROP', 'DELETE', 'UPDATE', 'INSERT', 'ALTER', 'TRUNCATE', 'CREATE'];
  for (const keyword of dangerousKeywords) {
    if (trimmedSql.includes(keyword)) {
      return {
        content: [{ type: 'text', text: `错误: 检测到危险关键词 "${keyword}"` }],
        isError: true,
      };
    }
  }

  try {
    const [rows] = await pool.execute(sql);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, result: rows, rowCount: rows.length }, null, 2),
        },
      ],
    };
  } catch (error) {
    return {
      content: [{ type: 'text', text: `SQL 执行错误: ${error.message}` }],
      isError: true,
    };
  }
});

// 启动服务器
async function main() {
  await initPool();
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('HSP SQL MCP 服务器已启动');
}

main().catch(console.error);

