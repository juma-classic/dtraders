# Vendored @deriv/deriv-charts assets (placeholder)

These files should contain the contents of `package/dist/chart/assets` from the published `@deriv/deriv-charts` package.

## To add/update the assets locally:

1. Run: `npm pack @deriv/deriv-charts@^2.5.1`
2. Extract the tarball: `tar -xzf deriv-deriv-charts-2.5.1.tgz`
3. Copy the assets: `cp -r package/dist/chart/assets/* public/deriv-charts-assets/`
4. Remove the tarball and extracted directory: `rm -rf deriv-deriv-charts-*.tgz package/`

## Purpose

This directory contains vendored chart assets to ensure consistent builds across environments and to avoid runtime dependencies on node_modules structure during deployment.

During CI builds, these assets are copied into `node_modules/@deriv/deriv-charts/dist/chart/assets/` before the build process runs.
