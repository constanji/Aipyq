const { Tool } = require('@langchain/core/tools');
const { z } = require('zod');
const path = require('path');
const fs = require('fs').promises;
const { logger } = require('@aipyq/data-schemas');

/**
 * BaziAstrology Tool - 生辰八字/星座分析工具
 * 
 * This tool allows agents to generate bazi (八字) and astrology analysis reports using templates:
 * - /bazi_astrology.generate - Generate bazi chart or astrology report based on user input
 * - /bazi_astrology.analyze - Perform detailed bazi analysis or forecast
 * - /bazi_astrology.templates - List available templates
 */
class BaziAstrology extends Tool {
  name = 'bazi_astrology';
  description =
    '生辰八字/星座分析工具，根据用户输入使用模板系统生成规范的八字命盘、命理分析和星座分析报告。' +
    'Commands: generate (生成八字命盘或星座分析报告), analyze (进行八字分析或运势预测), ' +
    'templates (列出可用模板). ' +
    'Use command name and provide arguments as needed.';

  schema = z.object({
    command: z.enum([
      'generate',
      'analyze',
      'templates',
    ]),
    arguments: z.string().optional().describe('Command arguments (e.g., birth information for generate command)'),
    analysis_type: z.string().optional().describe('Analysis type: bazi_chart (八字命盘), bazi_analysis (八字分析), forecast (运势预测), astrology (星座分析), combined (综合分析)'),
    birth_time: z.string().optional().describe('Birth time (format: YYYY-MM-DD HH:mm or YYYY年MM月DD日 HH:mm)'),
    gender: z.string().optional().describe('Gender: male/female or 男/女'),
    birth_location: z.string().optional().describe('Birth location (city name)'),
  });

  constructor(fields = {}) {
    super();
    this.projectRoot = fields.projectRoot || process.cwd();
    this.templatesDir = path.join(this.projectRoot, 'specs', 'bazi-astrology-templates');
  }

  /**
   * Find repository root by looking for .git or .specify directory
   */
  async findRepoRoot(startPath = this.projectRoot) {
    let currentPath = path.resolve(startPath);
    const root = path.parse(currentPath).root;

    while (currentPath !== root) {
      const gitPath = path.join(currentPath, '.git');
      const specifyPath = path.join(currentPath, '.specify');
      
      try {
        const [gitExists, specifyExists] = await Promise.all([
          fs.access(gitPath).then(() => true).catch(() => false),
          fs.access(specifyPath).then(() => true).catch(() => false),
        ]);

        if (gitExists || specifyExists) {
          return currentPath;
        }
      } catch (err) {
        // Continue searching
      }

      currentPath = path.dirname(currentPath);
    }

    return this.projectRoot;
  }

  /**
   * Load a template file
   */
  async loadTemplate(templatePath) {
    const repoRoot = await this.findRepoRoot();
    const fullPath = path.join(repoRoot, templatePath);

    try {
      return await fs.readFile(fullPath, 'utf-8');
    } catch (err) {
      throw new Error(`Template not found: ${fullPath}`);
    }
  }

  /**
   * Load command template
   */
  async loadCommandTemplate(commandType) {
    const repoRoot = await this.findRepoRoot();
    const commandTemplates = {
      bazi_generate: 'specs/bazi-astrology-templates/templates/commands/bazi-generate-command.md',
      bazi_analyze: 'specs/bazi-astrology-templates/templates/commands/bazi-analyze-command.md',
      astrology: 'specs/bazi-astrology-templates/templates/commands/astrology-command.md',
    };

    const templatePath = commandTemplates[commandType];
    if (!templatePath) {
      return null;
    }

    const fullPath = path.join(repoRoot, templatePath);
    try {
      return await fs.readFile(fullPath, 'utf-8');
    } catch (err) {
      logger.warn(`Command template not found: ${fullPath}`);
      return null;
    }
  }

  /**
   * Detect analysis type from user input
   */
  detectAnalysisType(userInput) {
    if (!userInput) {
      return 'bazi_chart';
    }

    const input = userInput.toLowerCase();
    
    // 八字命盘相关关键词
    const chartKeywords = ['八字', '命盘', '排盘', '四柱', '生辰八字', '生成八字', '八字查询'];
    // 八字分析相关关键词
    const analysisKeywords = ['分析', '命理分析', '性格', '事业', '财运', '感情', '婚姻', '健康', '八字分析'];
    // 运势预测相关关键词
    const forecastKeywords = ['运势', '预测', '大运', '流年', '未来', '运程', '运势预测', '大运流年'];
    // 星座相关关键词
    const astrologyKeywords = ['星座', '星盘', '占星', '星座分析', '星座运势', '十二星座'];
    // 综合分析相关关键词
    const combinedKeywords = ['综合', '对比', '结合', '综合分析', '八字星座', '命理星座'];

    if (chartKeywords.some(keyword => input.includes(keyword))) {
      return 'bazi_chart';
    }
    if (forecastKeywords.some(keyword => input.includes(keyword))) {
      return 'forecast';
    }
    if (analysisKeywords.some(keyword => input.includes(keyword))) {
      return 'bazi_analysis';
    }
    if (combinedKeywords.some(keyword => input.includes(keyword))) {
      return 'combined';
    }
    if (astrologyKeywords.some(keyword => input.includes(keyword))) {
      return 'astrology';
    }

    // 默认返回八字命盘
    return 'bazi_chart';
  }

  /**
   * Get template path for analysis type
   */
  getTemplatePath(analysisType) {
    const templates = {
      bazi_chart: 'specs/bazi-astrology-templates/templates/bazi-chart-template.md',
      bazi_analysis: 'specs/bazi-astrology-templates/templates/bazi-analysis-template.md',
      forecast: 'specs/bazi-astrology-templates/templates/bazi-forecast-template.md',
      astrology: 'specs/bazi-astrology-templates/templates/astrology-report-template.md',
      combined: 'specs/bazi-astrology-templates/templates/combined-analysis-template.md',
    };

    return templates[analysisType] || templates.bazi_chart;
  }

  /**
   * Get command template type for analysis type
   */
  getCommandTemplateType(analysisType) {
    const commandTypes = {
      bazi_chart: 'bazi_generate',
      bazi_analysis: 'bazi_analyze',
      forecast: 'bazi_analyze',
      astrology: 'astrology',
      combined: 'bazi_analyze',
    };

    return commandTypes[analysisType] || 'bazi_generate';
  }

  /**
   * Handle generate command
   */
  async handleGenerate(args) {
    const { 
      arguments: userInput, 
      analysis_type: providedType,
      birth_time,
      gender,
      birth_location,
    } = args;

    // Note: userInput is optional for generate command, as user might want to generate a template
    // with only parameters provided

    try {
      // Detect or use provided analysis type
      const analysisType = providedType || this.detectAnalysisType(userInput);
      const templatePath = this.getTemplatePath(analysisType);
      const commandTemplateType = this.getCommandTemplateType(analysisType);

      // Load templates
      const [template, commandTemplate] = await Promise.all([
        this.loadTemplate(templatePath).catch(() => null),
        this.loadCommandTemplate(commandTemplateType).catch(() => null),
      ]);

      if (!template) {
        return JSON.stringify({
          success: false,
          error: `无法加载模板: ${templatePath}`,
        }, null, 2);
      }

      // Get current date/time for dynamic variables
      const now = new Date();
      const dateStr = now.toLocaleDateString('zh-CN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];

      // Extract birth information from user input or parameters
      const birthInfo = {
        birth_time: birth_time || this.extractBirthTime(userInput),
        gender: gender || this.extractGender(userInput),
        birth_location: birth_location || this.extractBirthLocation(userInput),
      };

      return JSON.stringify({
        success: true,
        message: '生辰八字/星座分析生成命令已识别。LLM 应该根据命令模板和结果模板生成分析报告。',
        user_input: userInput || '',
        detected_analysis_type: analysisType,
        template_path: templatePath,
        birth_info: birthInfo,
        dynamic_variables: {
          analysis_date: dateStr,
          analysis_time: timeStr,
          week_day: weekDay,
          current_year: now.getFullYear(),
          current_month: now.getMonth() + 1,
          current_day: now.getDate(),
        },
        note: 'LLM 应该：1. 读取命令模板了解生成流程 2. 读取结果模板了解输出结构 3. 从用户输入中提取信息 4. 使用MCP工具计算八字或星座数据 5. 替换所有占位符 6. 生成最终分析报告',
        templates: {
          command_template: commandTemplate ? commandTemplate.substring(0, 2000) + '...' : null,
          result_template: template.substring(0, 2000) + '...',
        },
        instructions: [
          '1. 分析用户输入，提取关键信息（出生时间、性别、出生地点、分析需求等）',
          '2. 如果信息不完整，向用户询问缺失信息',
          '3. 根据分析类型，使用相应的MCP工具（八字命理工具或易经分析工具）进行计算',
          '4. 根据结果模板的结构，组织分析内容',
          '5. 替换所有占位符（使用计算数据和从用户输入提取的信息）',
          '6. 确保所有必需部分都已填写',
          '7. 生成完整的分析报告',
        ],
      }, null, 2);
    } catch (err) {
      logger.error('BaziAstrology generate error:', err);
      return JSON.stringify({
        success: false,
        error: `生成分析报告时出错: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Handle analyze command
   */
  async handleAnalyze(args) {
    const { 
      arguments: userInput, 
      analysis_type: providedType,
    } = args;

    if (!userInput || !userInput.trim()) {
      return JSON.stringify({
        success: false,
        error: '用户输入是必需的。请提供要分析的内容或问题。',
      }, null, 2);
    }

    try {
      // Detect or use provided analysis type
      const analysisType = providedType || this.detectAnalysisType(userInput);
      
      // For analyze command, prefer analysis or forecast types
      const finalType = analysisType === 'bazi_chart' ? 'bazi_analysis' : analysisType;
      const templatePath = this.getTemplatePath(finalType);
      const commandTemplateType = this.getCommandTemplateType(finalType);

      // Load templates
      const [template, commandTemplate] = await Promise.all([
        this.loadTemplate(templatePath).catch(() => null),
        this.loadCommandTemplate(commandTemplateType).catch(() => null),
      ]);

      if (!template) {
        return JSON.stringify({
          success: false,
          error: `无法加载模板: ${templatePath}`,
        }, null, 2);
      }

      return JSON.stringify({
        success: true,
        message: '生辰八字/星座分析命令已识别。LLM 应该根据命令模板和结果模板进行深入分析。',
        user_input: userInput,
        analysis_type: finalType,
        template_path: templatePath,
        note: 'LLM 应该：1. 读取命令模板了解分析流程 2. 读取结果模板了解分析结构 3. 基于已有的八字命盘或星座信息进行深入分析 4. 替换所有占位符 5. 生成详细的分析报告',
        templates: {
          command_template: commandTemplate ? commandTemplate.substring(0, 2000) + '...' : null,
          result_template: template.substring(0, 2000) + '...',
        },
        instructions: [
          '1. 分析用户的问题和需求',
          '2. 如果已有八字命盘或星座信息，基于这些信息进行分析',
          '3. 如果没有基础信息，需要先生成八字命盘或星座信息',
          '4. 根据分析类型，进行相应的深入分析（性格、事业、财运、感情、健康、运势等）',
          '5. 按照结果模板的结构组织分析内容',
          '6. 替换所有占位符',
          '7. 提供具体、实用的建议',
          '8. 生成完整的分析报告',
        ],
      }, null, 2);
    } catch (err) {
      logger.error('BaziAstrology analyze error:', err);
      return JSON.stringify({
        success: false,
        error: `分析时出错: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Handle templates command
   */
  async handleTemplates(args) {
    try {
      const templates = {
        bazi_chart: {
          name: '八字命盘结果模板',
          path: 'templates/bazi-chart-template.md',
          description: '用于生成标准的八字命盘结果，包含八字四柱、十神配置、大运排盘、命宫身宫等基本信息',
          usage: '适用于：生成八字命盘、排盘查询',
        },
        bazi_analysis: {
          name: '八字分析结果模板',
          path: 'templates/bazi-analysis-template.md',
          description: '用于生成八字命理分析报告，包含性格特征、事业财运、感情婚姻、健康运势分析',
          usage: '适用于：八字命理分析、性格分析、事业分析',
        },
        forecast: {
          name: '八字运势预测模板',
          path: 'templates/bazi-forecast-template.md',
          description: '用于生成未来运势预测报告，包含大运流年分析、重要年份提醒、运势趋势预测',
          usage: '适用于：运势预测、大运流年分析、未来趋势预测',
        },
        astrology: {
          name: '星座分析报告模板',
          path: 'templates/astrology-report-template.md',
          description: '用于生成星座分析报告，包含星座基本信息、性格特点、运势周期、兼容性分析',
          usage: '适用于：星座分析、星盘解读、星座运势',
        },
        combined: {
          name: '综合命理分析模板',
          path: 'templates/combined-analysis-template.md',
          description: '用于生成八字与星座的综合分析报告，包含对比分析、命理一致性评估、综合运势预测',
          usage: '适用于：八字与星座综合对比分析',
        },
      };

      return JSON.stringify({
        success: true,
        message: '可用模板列表',
        templates,
        command_templates: [
          'commands/bazi-generate-command.md - 八字生成命令模板',
          'commands/bazi-analyze-command.md - 八字分析命令模板',
          'commands/astrology-command.md - 星座分析命令模板',
        ],
        usage: '使用 /bazi_astrology.generate 命令并指定 analysis_type 参数来选择特定模板，或让系统自动检测',
        auto_detection: '系统会根据用户输入自动检测分析类型，支持的关键词：八字、命盘、分析、运势、星座、综合等',
      }, null, 2);
    } catch (err) {
      return JSON.stringify({
        success: false,
        error: `获取模板列表时出错: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Extract birth time from user input
   */
  extractBirthTime(userInput) {
    if (!userInput) {
      return null;
    }

    // Try to match various date formats
    const datePatterns = [
      /(\d{4})[年\-/](\d{1,2})[月\-/](\d{1,2})[日\s]*(\d{1,2})[:：]?(\d{2})?/,
      /(\d{4})[年\-/](\d{1,2})[月\-/](\d{1,2})[日]/,
      /(\d{4})[\-/](\d{1,2})[\-/](\d{1,2})/,
    ];

    for (const pattern of datePatterns) {
      const match = userInput.match(pattern);
      if (match) {
        return match[0];
      }
    }

    return null;
  }

  /**
   * Extract gender from user input
   */
  extractGender(userInput) {
    if (!userInput) {
      return null;
    }

    const input = userInput.toLowerCase();
    if (input.includes('男') || input.includes('male') || input.includes('m')) {
      return 'male';
    }
    if (input.includes('女') || input.includes('female') || input.includes('f')) {
      return 'female';
    }

    return null;
  }

  /**
   * Extract birth location from user input
   */
  extractBirthLocation(userInput) {
    if (!userInput) {
      return null;
    }

    // Try to match location patterns (city names, etc.)
    // This is a simple implementation, can be enhanced
    const locationKeywords = ['北京', '上海', '广州', '深圳', '杭州', '成都', '武汉', '西安', '南京', '重庆'];
    for (const keyword of locationKeywords) {
      if (userInput.includes(keyword)) {
        return keyword;
      }
    }

    return null;
  }

  async _call(args) {
    const startTime = Date.now();
    try {
      const { command, ...restArgs } = args;
      const fullArgs = { ...restArgs };

      logger.info('[BaziAstrology工具调用] ========== 开始调用 ==========');
      const inputParams = {
        command,
        fullArgs,
        timestamp: new Date().toISOString(),
      };
      logger.info(`[BaziAstrology工具调用] 输入参数: ${JSON.stringify(inputParams, null, 2)}`);

      let result;
      switch (command) {
        case 'generate':
          result = await this.handleGenerate(fullArgs);
          break;
        case 'analyze':
          result = await this.handleAnalyze(fullArgs);
          break;
        case 'templates':
          result = await this.handleTemplates(fullArgs);
          break;
        default:
          result = JSON.stringify({
            success: false,
            error: `未知命令: ${command}`,
          }, null, 2);
      }

      const duration = Date.now() - startTime;
      
      const resultPreview = typeof result === 'string' 
        ? (result.length > 1000 ? result.substring(0, 1000) + '...' : result)
        : JSON.stringify(result).substring(0, 1000);
      const resultInfo = {
        command,
        resultPreview,
        resultLength: typeof result === 'string' ? result.length : JSON.stringify(result).length,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      };
      logger.info(`[BaziAstrology工具调用] 执行结果: ${JSON.stringify(resultInfo, null, 2)}`);
      logger.info('[BaziAstrology工具调用] ========== 调用完成 ==========');

      return result;
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorInfo = {
        error: err.message,
        stack: err.stack,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      };
      logger.error(`[BaziAstrology工具调用] 执行错误: ${JSON.stringify(errorInfo, null, 2)}`);
      logger.error('BaziAstrology tool error:', err);
      return JSON.stringify({
        success: false,
        error: err.message,
      }, null, 2);
    }
  }
}

module.exports = BaziAstrology;

