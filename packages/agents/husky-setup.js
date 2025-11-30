// Skip husky setup in CI environments
if (process.env.CI === 'true' || process.env.CI === '1') {
  console.log('CI environment detected, skipping husky setup');
  process.exit(0);
}

// Otherwise, install husky
import { execSync } from 'child_process';
console.log('Setting up husky...');
execSync('npx husky', { stdio: 'inherit' });
