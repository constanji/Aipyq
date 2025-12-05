const { Tool } = require('@langchain/core/tools');
const { z } = require('zod');
const path = require('path');
const fs = require('fs').promises;
const { logger } = require('@aipyq/data-schemas');

/**
 * SocialMedia Tool - 朋友圈内容生成工具
 * 
 * This tool allows agents to generate social media posts (朋友圈) using templates:
 * - /social.generate - Generate a social media post based on user input
 * - /social.templates - List available templates
 * - /social.format - Format existing content according to guidelines
 */
class SocialMedia extends Tool {
  name = 'social';
  description =
    '朋友圈内容生成工具，根据用户输入使用模板系统生成规范的朋友圈内容。' +
    'Commands: generate (根据用户输入生成朋友圈内容), templates (列出可用模板), ' +
    'format (根据格式规范格式化内容). ' +
    'Use command name and provide arguments as needed.';

  schema = z.object({
    command: z.enum([
      'generate',
      'templates',
      'format',
    ]),
    arguments: z.string().optional().describe('Command arguments (e.g., content description for generate command)'),
    scenario: z.string().optional().describe('Scenario type: food, travel, event, achievement, daily, or general'),
    style: z.string().optional().describe('Content style: casual, formal, enthusiastic, etc.'),
  });

  constructor(fields = {}) {
    super();
    this.projectRoot = fields.projectRoot || process.cwd();
    this.templatesDir = path.join(this.projectRoot, 'specs', 'social-media-templates');
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
  async loadCommandTemplate() {
    const repoRoot = await this.findRepoRoot();
    const templatePath = path.join(repoRoot, 'specs', 'social-media-templates', 'commands', 'generate-social-post.md');

    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      throw new Error(`Command template not found: ${templatePath}`);
    }
  }

  /**
   * Detect scenario type from user input
   */
  detectScenario(userInput) {
    const input = userInput.toLowerCase();
    
    // 美食相关关键词
    const foodKeywords = ['美食', '餐厅', '吃饭', '料理', '菜', '味道', '好吃', '推荐', '探店', '日料', '火锅', '烧烤', '甜品', '咖啡'];
    // 旅行相关关键词
    const travelKeywords = ['旅行', '旅游', '景点', '游玩', '打卡', '故宫', '公园', '博物馆', '爬山', '海边', '古镇', '城市'];
    // 活动相关关键词
    const eventKeywords = ['活动', '聚会', '会议', '演出', '展览', '比赛', '庆典', '派对', '聚餐', '团建'];
    // 成就相关关键词
    const achievementKeywords = ['完成', '达成', '获得', '成功', '获奖', '突破', '里程碑', '成就', '项目', '目标'];
    // 日常相关关键词
    const dailyKeywords = ['日常', '生活', '今天', '心情', '感受', '日常', '琐事', '小事', '日常分享'];

    if (foodKeywords.some(keyword => input.includes(keyword))) {
      return 'food';
    }
    if (travelKeywords.some(keyword => input.includes(keyword))) {
      return 'travel';
    }
    if (eventKeywords.some(keyword => input.includes(keyword))) {
      return 'event';
    }
    if (achievementKeywords.some(keyword => input.includes(keyword))) {
      return 'achievement';
    }
    if (dailyKeywords.some(keyword => input.includes(keyword))) {
      return 'daily';
    }

    return 'general';
  }

  /**
   * Get template path for scenario
   */
  getTemplatePath(scenario) {
    const templates = {
      food: 'specs/social-media-templates/templates/scenario-templates/food-post.md',
      travel: 'specs/social-media-templates/templates/scenario-templates/travel-post.md',
      event: 'specs/social-media-templates/templates/scenario-templates/event-post.md',
      achievement: 'specs/social-media-templates/templates/scenario-templates/achievement-post.md',
      daily: 'specs/social-media-templates/templates/scenario-templates/daily-life-post.md',
      general: 'specs/social-media-templates/templates/social-post-template.md',
    };

    return templates[scenario] || templates.general;
  }

  /**
   * Load format guides
   */
  async loadFormatGuides() {
    const repoRoot = await this.findRepoRoot();
    const guidesDir = path.join(repoRoot, 'specs', 'social-media-templates', 'templates', 'format-guides');

    try {
      const [textFormatting, imageGuidelines, hashtagRules] = await Promise.all([
        fs.readFile(path.join(guidesDir, 'text-formatting.md'), 'utf-8').catch(() => null),
        fs.readFile(path.join(guidesDir, 'image-guidelines.md'), 'utf-8').catch(() => null),
        fs.readFile(path.join(guidesDir, 'hashtag-rules.md'), 'utf-8').catch(() => null),
      ]);

      return {
        textFormatting: textFormatting ? textFormatting.substring(0, 1000) + '...' : null,
        imageGuidelines: imageGuidelines ? imageGuidelines.substring(0, 1000) + '...' : null,
        hashtagRules: hashtagRules ? hashtagRules.substring(0, 1000) + '...' : null,
      };
    } catch (err) {
      logger.warn('Failed to load format guides:', err.message);
      return {};
    }
  }

  /**
   * Handle generate command
   */
  async handleGenerate(args) {
    const { arguments: userInput, scenario: providedScenario, style } = args;

    if (!userInput || !userInput.trim()) {
      return JSON.stringify({
        success: false,
        error: '用户输入是必需的。请提供要生成朋友圈内容的描述。',
      }, null, 2);
    }

    try {
      // Detect or use provided scenario
      const scenario = providedScenario || this.detectScenario(userInput);
      const templatePath = this.getTemplatePath(scenario);

      // Load templates and guides
      const [template, commandTemplate, formatGuides] = await Promise.all([
        this.loadTemplate(templatePath).catch(() => null),
        this.loadCommandTemplate().catch(() => null),
        this.loadFormatGuides(),
      ]);

      if (!template) {
        return JSON.stringify({
          success: false,
          error: `无法加载模板: ${templatePath}`,
        }, null, 2);
      }

      // Get current date/time for dynamic variables
      const now = new Date();
      const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
      const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
      const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][now.getDay()];

      return JSON.stringify({
        success: true,
        message: '朋友圈内容生成命令已识别。LLM 应该根据命令模板和场景模板生成内容。',
        user_input: userInput,
        detected_scenario: scenario,
        template_path: templatePath,
        style: style || 'casual',
        dynamic_variables: {
          date: dateStr,
          time: timeStr,
          weekDay: weekDay,
        },
        note: 'LLM 应该：1. 读取命令模板了解生成流程 2. 读取场景模板了解内容结构 3. 从用户输入中提取信息 4. 替换所有占位符 5. 应用格式规范 6. 生成最终内容',
        templates: {
          command_template: commandTemplate ? commandTemplate.substring(0, 2000) + '...' : null,
          scenario_template: template.substring(0, 2000) + '...',
          format_guides: formatGuides,
        },
        instructions: [
          '1. 分析用户输入，提取关键信息（时间、地点、人物、事件、感受等）',
          '2. 根据场景模板的结构，组织内容',
          '3. 替换所有占位符（使用动态变量和从用户输入提取的信息）',
          '4. 应用格式规范（文本格式、表情符号、话题标签）',
          '5. 生成完整的朋友圈内容',
          '6. 提供可直接发布的内容',
        ],
      }, null, 2);
    } catch (err) {
      logger.error('SocialMedia generate error:', err);
      return JSON.stringify({
        success: false,
        error: `生成朋友圈内容时出错: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Handle templates command
   */
  async handleTemplates(args) {
    try {
      const repoRoot = await this.findRepoRoot();
      const templatesDir = path.join(repoRoot, 'specs', 'social-media-templates', 'templates');

      const templates = {
        general: {
          name: '通用模板',
          path: 'templates/social-post-template.md',
          description: '适用于所有类型的朋友圈内容',
        },
        food: {
          name: '美食场景模板',
          path: 'templates/scenario-templates/food-post.md',
          description: '适用于美食分享、餐厅推荐、烹饪成果',
        },
        travel: {
          name: '旅行场景模板',
          path: 'templates/scenario-templates/travel-post.md',
          description: '适用于旅行分享、景点打卡、出游记录',
        },
        event: {
          name: '活动场景模板',
          path: 'templates/scenario-templates/event-post.md',
          description: '适用于活动参与、聚会、会议、演出',
        },
        achievement: {
          name: '成就场景模板',
          path: 'templates/scenario-templates/achievement-post.md',
          description: '适用于成就展示、项目完成、获得奖项',
        },
        daily: {
          name: '日常生活模板',
          path: 'templates/scenario-templates/daily-life-post.md',
          description: '适用于日常琐事、心情分享、生活记录',
        },
      };

      return JSON.stringify({
        success: true,
        message: '可用模板列表',
        templates,
        format_guides: [
          'text-formatting.md - 文本格式规范',
          'image-guidelines.md - 图片使用指南',
          'hashtag-rules.md - 话题标签规则',
        ],
        usage: '使用 /social.generate 命令并指定 scenario 参数来选择特定模板，或让系统自动检测',
      }, null, 2);
    } catch (err) {
      return JSON.stringify({
        success: false,
        error: `获取模板列表时出错: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Handle format command
   */
  async handleFormat(args) {
    const { arguments: content } = args;

    if (!content || !content.trim()) {
      return JSON.stringify({
        success: false,
        error: '需要格式化的内容是必需的。',
      }, null, 2);
    }

    try {
      const formatGuides = await this.loadFormatGuides();

      return JSON.stringify({
        success: true,
        message: '内容格式化命令已识别。LLM 应该根据格式规范调整内容。',
        original_content: content.substring(0, 500) + (content.length > 500 ? '...' : ''),
        format_guides: formatGuides,
        instructions: [
          '1. 检查文本格式（段落长度、标点符号、空格）',
          '2. 检查表情符号使用是否恰当',
          '3. 检查话题标签是否相关且适量',
          '4. 检查图片建议是否合理',
          '5. 应用所有格式规范',
          '6. 返回格式化后的内容',
        ],
      }, null, 2);
    } catch (err) {
      return JSON.stringify({
        success: false,
        error: `格式化内容时出错: ${err.message}`,
      }, null, 2);
    }
  }

  async _call(args) {
    const startTime = Date.now();
    try {
      const { command, ...restArgs } = args;
      const fullArgs = { ...restArgs };

      logger.info('[SocialMedia工具调用] ========== 开始调用 ==========');
      const inputParams = {
        command,
        fullArgs,
        timestamp: new Date().toISOString(),
      };
      logger.info(`[SocialMedia工具调用] 输入参数: ${JSON.stringify(inputParams, null, 2)}`);

      let result;
      switch (command) {
        case 'generate':
          result = await this.handleGenerate(fullArgs);
          break;
        case 'templates':
          result = await this.handleTemplates(fullArgs);
          break;
        case 'format':
          result = await this.handleFormat(fullArgs);
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
      logger.info(`[SocialMedia工具调用] 执行结果: ${JSON.stringify(resultInfo, null, 2)}`);
      logger.info('[SocialMedia工具调用] ========== 调用完成 ==========');

      return result;
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorInfo = {
        error: err.message,
        stack: err.stack,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      };
      logger.error(`[SocialMedia工具调用] 执行错误: ${JSON.stringify(errorInfo, null, 2)}`);
      logger.error('SocialMedia tool error:', err);
      return JSON.stringify({
        success: false,
        error: err.message,
      }, null, 2);
    }
  }
}

module.exports = SocialMedia;

