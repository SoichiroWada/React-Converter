// CRA 3 uses Webpack 4's MD4 hashes. Modern Node/OpenSSL disables MD4 by
// default; enable it only in the development/build subprocess, not the app.
const { spawnSync } = require('child_process');
const command = process.argv[2];
if (!['start', 'build'].includes(command)) {
  throw new Error('Expected start or build.');
}
const nodeMajor = Number(process.versions.node.split('.')[0]);
const flags = nodeMajor >= 17 ? ['--openssl-legacy-provider'] : [];
const result = spawnSync(process.execPath, [
  ...flags,
  require.resolve(`react-scripts/scripts/${command}`),
  ...process.argv.slice(3),
], { stdio: 'inherit' });
if (result.error) throw result.error;
process.exit(result.status === null ? 1 : result.status);
