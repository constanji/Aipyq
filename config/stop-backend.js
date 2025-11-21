const { promisify } = require('util');
const { exec } = require('child_process');

const isWindows = process.platform === 'win32';
const execAsync = promisify(exec);

async function main() {
  try {
    if (isWindows) {
      console.red('后端进程已终止');
      await execAsync('taskkill /F /IM node.exe /T');
    } else {
      await execAsync('pkill -f api/server/index.js');
      console.orange('后端进程已终止');
    }
  } catch (err) {
    console.red('后端进程已终止', err.message);
  }
}

main();
