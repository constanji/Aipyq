const { Tool } = require('@langchain/core/tools');
const { z } = require('zod');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const { logger } = require('@aipyq/data-schemas');

const execAsync = promisify(exec);

/**
 * Speckit Tool - Spec-Driven Development commands for Aipyq
 * 
 * This tool allows agents to execute speckit commands like:
 * - /speckit.specify - Create feature specifications
 * - /speckit.plan - Generate implementation plans
 * - /speckit.tasks - Generate task lists
 * - /speckit.implement - Execute implementation
 * - /speckit.clarify - Clarify requirements
 * - /speckit.analyze - Analyze consistency
 * - /speckit.checklist - Generate checklists
 * - /speckit.constitution - Manage project constitution
 * - /speckit.write_file - Write content to files in specs or memory directory
 * - /speckit.read_file - Read content from files in specs or memory directory
 * - /speckit.generate_templates - Generate a complete template system based on user requirements
 */
class Speckit extends Tool {
  name = 'speckit';
  description =
    'Spec-Driven Development toolkit for creating specifications, plans, and tasks. ' +
    'Commands: specify (create feature spec), plan (create implementation plan), ' +
    'tasks (generate task list), implement (execute implementation), clarify (clarify requirements), ' +
    'analyze (consistency analysis), checklist (generate checklist), constitution (manage project principles), ' +
    'write_file (write content to a file in specs, memory, or .specoutput directory), ' +
    'read_file (read content from a file in specs, memory, or .specoutput directory), ' +
    'generate_templates (generate a complete template system in .specoutput directory). ' +
    'Use command name and provide arguments as needed.';

  schema = z.object({
    command: z.enum([
      'specify',
      'plan',
      'tasks',
      'implement',
      'clarify',
      'analyze',
      'checklist',
      'constitution',
      'write_file',
      'read_file',
      'generate_templates',
    ]),
    arguments: z.string().optional().describe('Command arguments (e.g., feature description for specify, or file path and content for write_file)'),
    short_name: z.string().optional().describe('Short name for branch (for specify command)'),
    number: z.number().optional().describe('Branch number (for specify command, auto-detected if not provided)'),
    file_path: z.string().optional().describe('File path relative to project root (for write_file and read_file commands)'),
    content: z.string().optional().describe('File content to write (for write_file command)'),
  });

  constructor(fields = {}) {
    super();
    this.projectRoot = fields.projectRoot || process.cwd();
    this.specifyDir = path.join(this.projectRoot, '.specify');
    this.scriptsDir = path.join(this.specifyDir, 'scripts', 'bash');
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
   * Execute a speckit script and return JSON result
   */
  async executeScript(scriptName, args = [], jsonMode = true) {
    const repoRoot = await this.findRepoRoot();
    // 使用repoRoot重新构建路径，避免路径重复
    const scriptPath = path.join(repoRoot, '.specify', 'scripts', 'bash', scriptName);

    try {
      await fs.access(scriptPath);
    } catch (err) {
      throw new Error(`Script not found: ${scriptPath}. Make sure speckit is properly initialized.`);
    }

    const cmd = [scriptPath];
    if (jsonMode) {
      cmd.push('--json');
    }
    cmd.push(...args);

    const command = cmd.map((arg) => {
      // Escape arguments with spaces or special characters
      if (arg.includes(' ') || arg.includes("'") || arg.includes('"')) {
        return `'${arg.replace(/'/g, "'\\''")}'`;
      }
      return arg;
    }).join(' ');

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd: repoRoot,
        maxBuffer: 10 * 1024 * 1024, // 10MB buffer
      });

      if (stderr && !stderr.includes('Warning:')) {
        logger.warn(`Speckit script stderr: ${stderr}`);
      }

      if (jsonMode) {
        try {
          // 尝试直接解析
          return JSON.parse(stdout.trim());
        } catch (parseErr) {
          // 如果直接解析失败，尝试提取JSON部分（可能脚本输出包含其他文本）
          const jsonMatch = stdout.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              return JSON.parse(jsonMatch[0]);
            } catch (secondParseErr) {
              logger.error(`Failed to parse JSON from script output: ${stdout}`);
              return { output: stdout, error: secondParseErr.message };
            }
          }
          logger.error(`Failed to parse JSON from script output: ${stdout}`);
          return { output: stdout, error: parseErr.message };
        }
      }

      return { output: stdout };
    } catch (err) {
      const errorMsg = err.stderr || err.message || 'Unknown error';
      throw new Error(`Script execution failed: ${errorMsg}`);
    }
  }

  /**
   * Load a template file
   */
  async loadTemplate(templateName, fromSpec4Spec = false) {
    const repoRoot = await this.findRepoRoot();
    // 使用repoRoot重新构建路径，避免路径重复
    const templatePath = fromSpec4Spec
      ? path.join(repoRoot, '.specify', 'spec4spec', 'templates', templateName)
      : path.join(repoRoot, '.specify', 'templates', templateName);

    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      throw new Error(`Template not found: ${templatePath}`);
    }
  }

  /**
   * Load command template
   */
  async loadCommandTemplate(commandName) {
    const repoRoot = await this.findRepoRoot();
    // 使用repoRoot重新构建路径，避免路径重复
    const templatePath = path.join(repoRoot, '.specify', 'templates', 'commands', `${commandName}.md`);

    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      throw new Error(`Command template not found: ${templatePath}`);
    }
  }

  /**
   * Load spec4spec command template
   */
  async loadSpec4SpecCommandTemplate(commandName) {
    const repoRoot = await this.findRepoRoot();
    const templatePath = path.join(repoRoot, '.specify', 'spec4spec', 'cmds', `${commandName}.md`);

    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      throw new Error(`Spec4Spec command template not found: ${templatePath}`);
    }
  }

  /**
   * Handle specify command
   */
  async handleSpecify(args) {
    const { arguments: description, short_name, number } = args;

    if (!description || !description.trim()) {
      return 'Error: Feature description is required for specify command.';
    }

    const scriptArgs = [];
    if (short_name) {
      scriptArgs.push('--short-name', short_name);
    }
    if (number) {
      scriptArgs.push('--number', number.toString());
    }
    scriptArgs.push(description);

    try {
      const result = await this.executeScript('create-new-feature.sh', scriptArgs);
      
      // Load templates for LLM context - FULL CONTENT, not just preview
      const specTemplate = await this.loadTemplate('spec-template.md');
      const commandTemplate = await this.loadCommandTemplate('specify');

      // Read the current spec file to see if it's still a template
      let currentSpecContent = '';
      try {
        currentSpecContent = await fs.readFile(result.SPEC_FILE, 'utf-8');
      } catch (err) {
        // File might not exist yet, that's okay
      }

      // Check if the file is still a template (contains placeholder markers)
      const isTemplate = currentSpecContent.includes('[功能名称]') || 
                         currentSpecContent.includes('[###-feature-name]') ||
                         currentSpecContent.includes('[日期]') ||
                         currentSpecContent.includes('[FEATURE NAME]');

      return JSON.stringify({
        success: true,
        message: isTemplate 
          ? 'Template file created. You MUST now fill in the template with actual content based on the user description.'
          : 'Feature specification file created',
        branch: result.BRANCH_NAME,
        spec_file: result.SPEC_FILE,
        feature_num: result.FEATURE_NUM,
        user_description: description,
        action_required: isTemplate ? 'FILL_TEMPLATE' : 'REVIEW',
        instructions: isTemplate ? [
          'The spec.md file has been created but contains only template placeholders.',
          'You MUST read the spec.md file, load the command template instructions,',
          'and fill in the template with actual content based on the user description: "' + description + '"',
          'Replace all placeholders like [功能名称], [###-feature-name], [日期] with real values.',
          'Follow the instructions in the command template to create a complete specification.',
          'After filling, use /speckit.write_file command to write the complete content back to the spec_file path.',
          'Example: /speckit.write_file with file_path="' + result.SPEC_FILE + '" and content="[filled content]"',
        ] : [
          'Review the spec.md file',
          'Run /speckit.plan to create an implementation plan',
        ],
        command_template: commandTemplate, // Full template, not preview
        spec_template_structure: specTemplate.substring(0, 500) + '...', // Structure preview
      }, null, 2);
    } catch (err) {
      return `Error executing specify command: ${err.message}`;
    }
  }

  /**
   * Handle plan command
   */
  async handlePlan(args) {
    try {
      const result = await this.executeScript('setup-plan.sh', []);
      
      const commandTemplate = await this.loadCommandTemplate('plan');
      const planTemplate = await this.loadTemplate('plan-template.md');

      return JSON.stringify({
        success: true,
        message: 'Implementation plan setup completed',
        feature_spec: result.FEATURE_SPEC,
        impl_plan: result.IMPL_PLAN,
        specs_dir: result.SPECS_DIR,
        branch: result.BRANCH,
        next_steps: [
          'Fill in the plan.md file with technical details',
          'Run /speckit.tasks to generate task list',
        ],
        templates_loaded: {
          plan_template: planTemplate.substring(0, 200) + '...',
          command_template: commandTemplate.substring(0, 200) + '...',
        },
      }, null, 2);
    } catch (err) {
      return `Error executing plan command: ${err.message}`;
    }
  }

  /**
   * Handle tasks command
   */
  async handleTasks(args) {
    try {
      const result = await this.executeScript('check-prerequisites.sh', []);
      
      const commandTemplate = await this.loadCommandTemplate('tasks');
      const tasksTemplate = await this.loadTemplate('tasks-template.md');

      return JSON.stringify({
        success: true,
        message: 'Prerequisites checked, ready to generate tasks',
        feature_dir: result.FEATURE_DIR,
        available_docs: result.AVAILABLE_DOCS || [],
        next_steps: [
          'Generate tasks.md based on available documents',
          'Run /speckit.implement to start implementation',
        ],
        templates_loaded: {
          tasks_template: tasksTemplate.substring(0, 200) + '...',
          command_template: commandTemplate.substring(0, 200) + '...',
        },
      }, null, 2);
    } catch (err) {
      return `Error executing tasks command: ${err.message}`;
    }
  }

  /**
   * Handle read_file command - Read content from a file in specs, memory, or .specoutput directory
   */
  async handleReadFile(args) {
    const { file_path, arguments: filePathFromArgs } = args;

    // Support both file_path parameter and arguments (for backward compatibility)
    const targetPath = file_path || filePathFromArgs;

    if (!targetPath) {
      return JSON.stringify({
        success: false,
        error: 'File path is required. Provide file_path parameter.',
      }, null, 2);
    }

    try {
      const repoRoot = await this.findRepoRoot();
      
      // Resolve the file path
      let resolvedPath;
      if (path.isAbsolute(targetPath)) {
        resolvedPath = targetPath;
      } else {
        resolvedPath = path.join(repoRoot, targetPath);
      }

      // Normalize the path to prevent directory traversal
      resolvedPath = path.normalize(resolvedPath);
      const normalizedRepoRoot = path.normalize(repoRoot);

      // Security check: Only allow reading from specs, memory, or .specoutput directory
      const specsDir = path.join(normalizedRepoRoot, 'specs');
      const memoryDir = path.join(normalizedRepoRoot, 'memory');
      const specOutputDir = path.join(normalizedRepoRoot, '.specoutput');
      
      const isInSpecsDir = resolvedPath.startsWith(specsDir + path.sep) || resolvedPath === specsDir;
      const isInMemoryDir = resolvedPath.startsWith(memoryDir + path.sep) || resolvedPath === memoryDir;
      const isInSpecOutputDir = resolvedPath.startsWith(specOutputDir + path.sep) || resolvedPath === specOutputDir;
      
      if (!isInSpecsDir && !isInMemoryDir && !isInSpecOutputDir) {
        return JSON.stringify({
          success: false,
          error: `Security: File path must be within 'specs', 'memory', or '.specoutput' directory. Attempted path: ${targetPath}`,
        }, null, 2);
      }

      // Check if file exists
      try {
        await fs.access(resolvedPath);
      } catch (accessErr) {
        return JSON.stringify({
          success: false,
          error: `File not found: ${targetPath}`,
          file_path: targetPath,
        }, null, 2);
      }

      // Read the file
      const fileContent = await fs.readFile(resolvedPath, 'utf-8');

      logger.info(`[Speckit工具调用] 文件读取成功: ${resolvedPath}`);

      return JSON.stringify({
        success: true,
        message: `File read successfully: ${targetPath}`,
        file_path: targetPath,
        absolute_path: resolvedPath,
        content: fileContent,
        content_length: fileContent.length,
      }, null, 2);
    } catch (err) {
      logger.error(`[Speckit工具调用] 文件读取失败: ${err.message}`);
      return JSON.stringify({
        success: false,
        error: `Failed to read file: ${err.message}`,
        file_path: targetPath,
      }, null, 2);
    }
  }

  /**
   * Handle write_file command - Write content to a file in specs, memory, or .specoutput directory
   */
  async handleWriteFile(args) {
    const { file_path, content, arguments: filePathFromArgs } = args;

    // Support both file_path parameter and arguments (for backward compatibility)
    const targetPath = file_path || filePathFromArgs;
    const fileContent = content;

    if (!targetPath) {
      return JSON.stringify({
        success: false,
        error: 'File path is required. Provide file_path parameter.',
      }, null, 2);
    }

    if (!fileContent) {
      return JSON.stringify({
        success: false,
        error: 'File content is required. Provide content parameter.',
      }, null, 2);
    }

    try {
      const repoRoot = await this.findRepoRoot();
      
      // Resolve the file path
      let resolvedPath;
      if (path.isAbsolute(targetPath)) {
        resolvedPath = targetPath;
      } else {
        resolvedPath = path.join(repoRoot, targetPath);
      }

      // Normalize the path to prevent directory traversal
      resolvedPath = path.normalize(resolvedPath);
      const normalizedRepoRoot = path.normalize(repoRoot);

      // Security check: Only allow writing to specs, memory, or .specoutput directory
      const specsDir = path.join(normalizedRepoRoot, 'specs');
      const memoryDir = path.join(normalizedRepoRoot, 'memory');
      const specOutputDir = path.join(normalizedRepoRoot, '.specoutput');
      
      const isInSpecsDir = resolvedPath.startsWith(specsDir + path.sep) || resolvedPath === specsDir;
      const isInMemoryDir = resolvedPath.startsWith(memoryDir + path.sep) || resolvedPath === memoryDir;
      const isInSpecOutputDir = resolvedPath.startsWith(specOutputDir + path.sep) || resolvedPath === specOutputDir;
      
      if (!isInSpecsDir && !isInMemoryDir && !isInSpecOutputDir) {
        return JSON.stringify({
          success: false,
          error: `Security: File path must be within 'specs', 'memory', or '.specoutput' directory. Attempted path: ${targetPath}`,
        }, null, 2);
      }

      // Ensure directory exists
      const dir = path.dirname(resolvedPath);
      await fs.mkdir(dir, { recursive: true });

      // Write the file
      await fs.writeFile(resolvedPath, fileContent, 'utf-8');

      logger.info(`[Speckit工具调用] 文件写入成功: ${resolvedPath}`);

      return JSON.stringify({
        success: true,
        message: `File written successfully: ${targetPath}`,
        file_path: targetPath,
        absolute_path: resolvedPath,
        content_length: fileContent.length,
      }, null, 2);
    } catch (err) {
      logger.error(`[Speckit工具调用] 文件写入失败: ${err.message}`);
      return JSON.stringify({
        success: false,
        error: `Failed to write file: ${err.message}`,
        file_path: targetPath,
      }, null, 2);
    }
  }

  /**
   * Handle generate_templates command
   */
  async handleGenerateTemplates(args) {
    const { arguments: userRequirements } = args;

    if (!userRequirements || !userRequirements.trim()) {
      return JSON.stringify({
        success: false,
        error: 'User requirements are required for generate_templates command. ' +
               'Please provide a description of the template system you want to create.',
      }, null, 2);
    }

    try {
      // Load the meta-template-generator command template
      const commandTemplate = await this.loadSpec4SpecCommandTemplate('meta-template-generator');
      
      // Load reference templates
      const documentTemplateTemplate = await this.loadTemplate('spec-template.md').catch(() => null);
      const commandTemplateTemplate = await this.loadTemplate('command-template-template.md', true).catch(() => null);
      const checklistTemplateTemplate = await this.loadTemplate('checklist-template-template.md', true).catch(() => null);
      const documentTemplateTemplateTemplate = await this.loadTemplate('document-template-template.md', true).catch(() => null);

      const repoRoot = await this.findRepoRoot();
      const specOutputDir = path.join(repoRoot, '.specoutput');

      // Ensure .specoutput directory exists
      try {
        await fs.mkdir(specOutputDir, { recursive: true });
      } catch (err) {
        // Directory might already exist, that's fine
      }

      return JSON.stringify({
        success: true,
        message: 'Template generation command recognized. The LLM should now follow the command template instructions to generate the template system.',
        user_requirements: userRequirements,
        output_directory: specOutputDir,
        note: 'This command requires LLM-based execution following the meta-template-generator command template. ' +
              'The LLM should read the command template and generate a complete template system in .specoutput directory.',
        command_template: commandTemplate, // Full template for LLM context
        reference_templates: {
          document_template_preview: documentTemplateTemplate ? documentTemplateTemplate.substring(0, 500) + '...' : null,
          document_template_template_preview: documentTemplateTemplateTemplate ? documentTemplateTemplateTemplate.substring(0, 500) + '...' : null,
          command_template_template_preview: commandTemplateTemplate ? commandTemplateTemplate.substring(0, 500) + '...' : null,
          checklist_template_template_preview: checklistTemplateTemplate ? checklistTemplateTemplate.substring(0, 500) + '...' : null,
        },
        instructions: [
          '1. Read and understand the meta-template-generator command template',
          '2. Analyze the user requirements: "' + userRequirements + '"',
          '3. Create a task folder in .specoutput directory',
          '4. Generate all necessary template files based on the requirements',
          '5. Follow the structure and patterns defined in the command template',
          '6. Use /speckit.write_file to create all generated template files',
        ],
      }, null, 2);
    } catch (err) {
      return JSON.stringify({
        success: false,
        error: `Error loading generate_templates command: ${err.message}`,
      }, null, 2);
    }
  }

  /**
   * Handle other commands (placeholder implementations)
   */
  async handleOtherCommand(command, args) {
    const commandTemplate = await this.loadCommandTemplate(command).catch(() => null);
    
    if (!commandTemplate) {
      return `Error: Command template for '${command}' not found.`;
    }

    return JSON.stringify({
      success: true,
      message: `Command '${command}' recognized`,
      command,
      arguments: args.arguments || '',
      note: 'This command requires manual execution or LLM-based template filling. ' +
            'The command template has been loaded for context.',
      template_preview: commandTemplate.substring(0, 500) + '...',
    }, null, 2);
  }

  async _call(args) {
    const startTime = Date.now();
    try {
      const { command, arguments: commandArgs, ...restArgs } = args;

      // 详细记录工具调用输入
      logger.info('[Speckit工具调用] ========== 开始调用 ==========');
      const inputParams = {
        command,
        arguments: commandArgs,
        restArgs,
        fullArgs: { arguments: commandArgs, ...restArgs },
        timestamp: new Date().toISOString(),
      };
      logger.info(`[Speckit工具调用] 输入参数: ${JSON.stringify(inputParams, null, 2)}`);

      const fullArgs = { arguments: commandArgs, ...restArgs };

      let result;
      switch (command) {
        case 'specify':
          result = await this.handleSpecify(fullArgs);
          break;
        case 'plan':
          result = await this.handlePlan(fullArgs);
          break;
        case 'tasks':
          result = await this.handleTasks(fullArgs);
          break;
        case 'write_file':
          result = await this.handleWriteFile(fullArgs);
          break;
        case 'read_file':
          result = await this.handleReadFile(fullArgs);
          break;
        case 'generate_templates':
          result = await this.handleGenerateTemplates(fullArgs);
          break;
        case 'implement':
        case 'clarify':
        case 'analyze':
        case 'checklist':
        case 'constitution':
          result = await this.handleOtherCommand(command, fullArgs);
          break;
        default:
          result = `Error: Unknown command: ${command}`;
      }

      const duration = Date.now() - startTime;
      
      // 详细记录工具调用输出
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
      logger.info(`[Speckit工具调用] 执行结果: ${JSON.stringify(resultInfo, null, 2)}`);
      logger.info('[Speckit工具调用] ========== 调用完成 ==========');

      return result;
    } catch (err) {
      const duration = Date.now() - startTime;
      const errorInfo = {
        error: err.message,
        stack: err.stack,
        duration: `${duration}ms`,
        timestamp: new Date().toISOString(),
      };
      logger.error(`[Speckit工具调用] 执行错误: ${JSON.stringify(errorInfo, null, 2)}`);
      logger.error('Speckit tool error:', err);
      return `Error: ${err.message}`;
    }
  }
}

module.exports = Speckit;

