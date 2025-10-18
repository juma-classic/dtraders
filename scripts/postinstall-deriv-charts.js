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

// Assets are missing - this is a problem
console.error('ERROR: @deriv/deriv-charts assets are missing!');
console.error(`Expected assets at: ${assetsPath}`);
console.error('');
console.error('The @deriv/deriv-charts package should include prebuilt assets in the dist directory.');
console.error('This issue can occur due to:');
console.error('  1. Corrupted or incomplete npm installation');
console.error('  2. npm cache containing a bad copy of the package');
console.error('  3. Network issues during package download');
console.error('');
console.error('Recommended solutions:');
console.error('  1. Clear npm cache: npm cache clean --force');
console.error('  2. Delete node_modules and package-lock.json');
console.error('  3. Run: npm install');
console.error('  4. If problem persists, try: npm install @deriv/deriv-charts@latest --force');
console.error('');

// Check if source files exist that could be built
const hasAppDir = existsSync(path.join(pkgPath, 'app'));
const hasSrcDir = existsSync(path.join(pkgPath, 'src'));

if (hasAppDir || hasSrcDir) {
    console.log('Source files detected. Attempting to build @deriv/deriv-charts...');
    try {
        // Check if package-lock.json exists to decide between npm ci and npm install
        const lockfilePath = path.join(pkgPath, 'package-lock.json');
        const installCmd = existsSync(lockfilePath)
            ? 'npm ci --omit=optional --no-audit --no-fund --ignore-scripts'
            : 'npm install --omit=optional --no-audit --no-fund --ignore-scripts';

        console.log(`Running: ${installCmd}`);
        execSync(installCmd, { cwd: pkgPath, stdio: 'inherit' });

        // Run the package build. If the package uses a different build command (e.g. yarn build), this may need adjustment.
        execSync('npm run build', { cwd: pkgPath, stdio: 'inherit' });
        console.log('deriv-charts build complete.');
    } catch (err) {
        console.error('Failed to build @deriv/deriv-charts:', err.message);
        process.exit(1);
    }
} else {
    console.error('Source files not available - cannot build the package.');
    console.error('Please follow the recommended solutions above.');
    // Fail the install so CI shows the root cause rather than an obscure missing assets error later
    process.exit(1);
}
