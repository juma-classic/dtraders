#!/usr/bin/env node
const { existsSync } = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const pkgPath = path.join(process.cwd(), 'node_modules', '@deriv', 'deriv-charts');
const assetsPath = path.join(pkgPath, 'dist', 'chart', 'assets');

if (!existsSync(pkgPath)) {
  console.warn('@deriv/deriv-charts not found in node_modules; skipping postinstall build.');
  process.exit(0);
}

if (existsSync(assetsPath)) {
  console.log('deriv-charts assets already present; skipping build.');
  process.exit(0);
}

try {
  console.log('Building @deriv/deriv-charts inside node_modules...');
  // Install only production & build deps of that package to run its build (omit optional to speed up)
  execSync('npm ci --omit=optional --no-audit --no-fund', { cwd: pkgPath, stdio: 'inherit' });
  // Run the package build. If the package uses a different build command (e.g. yarn build), this may need adjustment.
  execSync('npm run build', { cwd: pkgPath, stdio: 'inherit' });
  console.log('deriv-charts build complete.');
} catch (err) {
  console.error('Failed to build @deriv/deriv-charts in postinstall:', err.message);
  // Fail the install so CI shows the root cause rather than an obscure missing assets error later
  process.exit(1);
}
