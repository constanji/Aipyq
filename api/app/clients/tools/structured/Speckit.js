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
 */
class Speckit extends Tool {
  name = 'speckit';
  description =
    'Spec-Driven Development toolkit for creating specifications, plans, and tasks. ' +
    'Commands: specify (create feature spec), plan (create implementation plan), ' +
    'tasks (generate task list), implement (execute implementation), clarify (clarify requirements), ' +
    'analyze (consistency analysis), checklist (generate checklist), constitution (manage project principles). ' +
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
    ]),
    arguments: z.string().optional().describe('Command arguments (e.g., feature description for specify)'),
    short_name: z.string().optional().describe('Short name for branch (for specify command)'),
    number: z.number().optional().describe('Branch number (for specify command, auto-detected if not provided)'),
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
    const scriptPath = path.join(repoRoot, this.scriptsDir, scriptName);

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
          return JSON.parse(stdout.trim());
        } catch (parseErr) {
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
  async loadTemplate(templateName) {
    const repoRoot = await this.findRepoRoot();
    const templatePath = path.join(repoRoot, this.specifyDir, 'templates', templateName);

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
    const templatePath = path.join(repoRoot, this.specifyDir, 'templates', 'commands', `${commandName}.md`);

    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      throw new Error(`Command template not found: ${templatePath}`);
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
      
      // Load templates for LLM context
      const specTemplate = await this.loadTemplate('spec-template.md');
      const commandTemplate = await this.loadCommandTemplate('specify');

      return JSON.stringify({
        success: true,
        message: 'Feature specification created successfully',
        branch: result.BRANCH_NAME,
        spec_file: result.SPEC_FILE,
        feature_num: result.FEATURE_NUM,
        next_steps: [
          'Review and fill in the spec.md file',
          'Run /speckit.plan to create an implementation plan',
        ],
        templates_loaded: {
          spec_template: specTemplate.substring(0, 200) + '...',
          command_template: commandTemplate.substring(0, 200) + '...',
        },
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
    try {
      const { command, arguments: commandArgs, ...restArgs } = args;

      const fullArgs = { arguments: commandArgs, ...restArgs };

      switch (command) {
        case 'specify':
          return await this.handleSpecify(fullArgs);
        case 'plan':
          return await this.handlePlan(fullArgs);
        case 'tasks':
          return await this.handleTasks(fullArgs);
        case 'implement':
        case 'clarify':
        case 'analyze':
        case 'checklist':
        case 'constitution':
          return await this.handleOtherCommand(command, fullArgs);
        default:
          return `Error: Unknown command: ${command}`;
      }
    } catch (err) {
      logger.error('Speckit tool error:', err);
      return `Error: ${err.message}`;
    }
  }
}

module.exports = Speckit;

