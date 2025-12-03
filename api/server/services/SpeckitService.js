const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs').promises;
const { logger } = require('@aipyq/data-schemas');

const execAsync = promisify(exec);

/**
 * Speckit Service - Handles speckit command execution and file operations
 * 
 * This service provides a higher-level interface for executing speckit commands
 * and managing the spec-driven development workflow.
 */
class SpeckitService {
  constructor(projectRoot = process.cwd()) {
    this.projectRoot = projectRoot;
    this.specifyDir = path.join(projectRoot, '.specify');
    this.scriptsDir = path.join(this.specifyDir, 'scripts', 'bash');
    this.specsDir = path.join(projectRoot, 'specs');
    this.memoryDir = path.join(projectRoot, 'memory');
  }

  /**
   * Find repository root
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
   * Check if speckit is initialized
   */
  async isInitialized() {
    try {
      const repoRoot = await this.findRepoRoot();
      const specifyPath = path.join(repoRoot, '.specify');
      await fs.access(specifyPath);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Execute a script and return result
   */
  async executeScript(scriptName, args = [], options = {}) {
    const repoRoot = await this.findRepoRoot();
    const scriptPath = path.join(repoRoot, this.scriptsDir, scriptName);

    try {
      await fs.access(scriptPath);
    } catch (err) {
      throw new Error(`Script not found: ${scriptPath}`);
    }

    const { jsonMode = true, cwd = repoRoot } = options;
    const cmd = [scriptPath];
    
    if (jsonMode) {
      cmd.push('--json');
    }
    cmd.push(...args);

    const command = cmd.map((arg) => {
      if (arg.includes(' ') || arg.includes("'") || arg.includes('"')) {
        return `'${arg.replace(/'/g, "'\\''")}'`;
      }
      return arg;
    }).join(' ');

    try {
      const { stdout, stderr } = await execAsync(command, {
        cwd,
        maxBuffer: 10 * 1024 * 1024,
      });

      if (stderr && !stderr.includes('Warning:')) {
        logger.warn(`Speckit script stderr: ${stderr}`);
      }

      if (jsonMode) {
        try {
          return JSON.parse(stdout.trim());
        } catch (parseErr) {
          logger.error(`Failed to parse JSON: ${stdout}`);
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
   * Read a file from the project
   */
  async readFile(filePath) {
    const repoRoot = await this.findRepoRoot();
    const fullPath = path.isAbsolute(filePath) 
      ? filePath 
      : path.join(repoRoot, filePath);
    
    try {
      return await fs.readFile(fullPath, 'utf-8');
    } catch (err) {
      throw new Error(`File not found: ${fullPath}`);
    }
  }

  /**
   * Write a file to the project
   */
  async writeFile(filePath, content) {
    const repoRoot = await this.findRepoRoot();
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(repoRoot, filePath);
    
    // Ensure directory exists
    await fs.mkdir(path.dirname(fullPath), { recursive: true });
    
    return await fs.writeFile(fullPath, content, 'utf-8');
  }

  /**
   * Get current feature branch/directory
   */
  async getCurrentFeature() {
    try {
      const result = await this.executeScript('check-prerequisites.sh', []);
      return {
        featureDir: result.FEATURE_DIR,
        availableDocs: result.AVAILABLE_DOCS || [],
      };
    } catch (err) {
      logger.warn('Could not determine current feature:', err.message);
      return null;
    }
  }

  /**
   * List all features
   */
  async listFeatures() {
    const repoRoot = await this.findRepoRoot();
    const specsPath = path.join(repoRoot, 'specs');
    
    try {
      const entries = await fs.readdir(specsPath, { withFileTypes: true });
      return entries
        .filter(entry => entry.isDirectory() && /^\d{3}-/.test(entry.name))
        .map(entry => entry.name)
        .sort();
    } catch (err) {
      if (err.code === 'ENOENT') {
        return [];
      }
      throw err;
    }
  }
}

module.exports = SpeckitService;

