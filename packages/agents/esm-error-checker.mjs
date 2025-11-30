import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { ESLint } from 'eslint';

const fileName = process.argv[2];
if (!fileName) {
  console.error('Please provide a file name');
  process.exit(1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read tsconfig.json
const tsconfigPath = path.resolve(__dirname, 'tsconfig.json');
const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf8'));

// Create compiler options
const compilerOptions = ts.convertCompilerOptionsFromJson(tsconfig.compilerOptions, './').options;

// Resolve path aliases
compilerOptions.baseUrl = path.resolve(__dirname, compilerOptions.baseUrl || '.');
if (compilerOptions.paths) {
  compilerOptions.paths = Object.fromEntries(
    Object.entries(compilerOptions.paths).map(([key, value]) => [
      key,
      value.map(p => path.resolve(compilerOptions.baseUrl, p))
    ])
  );
}

// Get all TypeScript files in the project
const getAllTypeScriptFiles = (dir) => {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  return files.flatMap(file => {
    const filePath = path.join(dir, file.name);
    if (file.isDirectory()) {
      return getAllTypeScriptFiles(filePath);
    } else if (file.name.endsWith('.ts')) {
      return filePath;
    }
    return [];
  });
};

const projectFiles = getAllTypeScriptFiles(path.resolve(__dirname, 'src'));

const fullPath = path.resolve(__dirname, fileName);
const program = ts.createProgram([fullPath, ...projectFiles], compilerOptions);

const sourceFile = program.getSourceFile(fullPath);
const diagnostics = ts.getPreEmitDiagnostics(program);

let output = '';

if (sourceFile) {
  output += '```ts\n' + sourceFile.getFullText() + '\n```\n\n// TypeScript Errors:\n';

  if (diagnostics.length === 0) {
    output += 'No TypeScript errors found.\n';
  } else {
    diagnostics.forEach((diagnostic) => {
      if (diagnostic.file === sourceFile) {
        const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
        const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        const lineContent = sourceFile.text.split('\n')[line];

        output += `Line ${line + 1}, Column ${character + 1}: ${message}\n`;
        output += '```ts\n' + lineContent + '\n```\n\n';
      }
    });
  }
}

// Run ESLint
const runESLint = async () => {
  const eslint = new ESLint();
  const results = await eslint.lintFiles([fullPath]);
  const formatter = await eslint.loadFormatter('stylish');
  return formatter.format(results);
};

runESLint().then(eslintOutput => {
  output += '\n// ESLint Results:\n' + eslintOutput;

  console.log(output);

  // Write the output file
  const outputFile = 'lint_output.txt';
  fs.writeFileSync(outputFile, output);
}).catch(error => {
  console.error('Error running ESLint:', error);
});
