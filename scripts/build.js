#!/usr/bin/env node

/**
 * Multi-Brand Configuration Selector & Build Script
 * 
 * Prepares the prelaunch website for Cloudflare Pages (or any static host)
 * by safely selecting, validating, and activating a brand configuration.
 * 
 * Usage:
 *   node scripts/build.js <brand-id>
 *   node scripts/build.js --list
 * 
 * Examples:
 *   node scripts/build.js aura-cloud
 *   node scripts/build.js vanguard-atelier
 *   node scripts/build.js hyperion-dynamics
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { validateConfig } from '../src/config-validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIGS_DIR = path.resolve(ROOT_DIR, 'configs');
const TARGET_CONFIG_FILE = path.resolve(ROOT_DIR, 'config.js');

/**
 * Discovers available brand configuration files in the configs/ directory.
 * @returns {string[]} List of valid configuration identifiers.
 */
function getAvailableConfigs() {
  if (!fs.existsSync(CONFIGS_DIR)) {
    return [];
  }
  return fs.readdirSync(CONFIGS_DIR)
    .filter(file => file.endsWith('.js'))
    .map(file => path.basename(file, '.js'))
    .sort();
}

/**
 * Validates brand identifier format to prevent path traversal and injection.
 * @param {string} brandId
 * @returns {boolean}
 */
function isValidBrandIdentifier(brandId) {
  if (!brandId || typeof brandId !== 'string') return false;
  // Strict alphanumeric, hyphens, and underscores only
  return /^[a-zA-Z0-9_-]+$/.test(brandId);
}

/**
 * Main execution function.
 */
async function run() {
  const args = process.argv.slice(2);
  const brandId = args[0]?.trim();
  const available = getAvailableConfigs();

  if (!brandId || brandId === '--help' || brandId === '-h') {
    console.log(`
Universal Prelaunch Website - Build & Brand Selector

Usage:
  node scripts/build.js <brand-id>
  node scripts/build.js --list

Available Brands in configs/:
${available.map(id => `  - ${id}`).join('\n')}

Example:
  node scripts/build.js aura-cloud
`);
    process.exit(brandId ? 0 : 1);
  }

  if (brandId === '--list' || brandId === '-l') {
    console.log('Available brand configurations:');
    available.forEach(id => console.log(`  - ${id}`));
    process.exit(0);
  }

  // 1. Security Check: Prevent path traversal
  if (!isValidBrandIdentifier(brandId)) {
    console.error(`\n❌ ERROR: Invalid brand identifier "${brandId}".`);
    console.error('Brand identifiers must contain only letters, numbers, hyphens, and underscores (e.g. "aura-cloud").');
    process.exit(1);
  }

  // 2. Existence Check
  const sourceConfigFile = path.resolve(CONFIGS_DIR, `${brandId}.js`);
  if (!fs.existsSync(sourceConfigFile)) {
    console.error(`\n❌ ERROR: Configuration file not found for brand "${brandId}".`);
    console.error(`Expected file at: ${sourceConfigFile}`);
    console.error(`\nAvailable brands in configs/:`);
    available.forEach(id => console.error(`  - ${id}`));
    process.exit(1);
  }

  console.log(`====================================================`);
  console.log(`🔨 PREPARING BUILD FOR BRAND: "${brandId}"`);
  console.log(`====================================================\n`);

  // 3. Import and Validate Configuration
  try {
    const fileUrl = pathToFileURL(sourceConfigFile).href;
    const module = await import(fileUrl);

    if (!module || !module.CONFIG) {
      console.error(`❌ ERROR: "${sourceConfigFile}" does not export a "CONFIG" constant.`);
      process.exit(1);
    }

    const validation = validateConfig(module.CONFIG);
    if (!validation.isValid) {
      console.error(`❌ ERROR: Configuration validation failed for "${brandId}":`);
      validation.errors.forEach(err => console.error(`  - ${err}`));
      process.exit(1);
    }

    if (validation.warnings.length > 0) {
      console.warn(`⚠️ Configuration Warnings:`);
      validation.warnings.forEach(warn => console.warn(`  - ${warn}`));
    }

    const { brand, theme, launch } = validation.config;
    console.log(`✓ Brand Name:    ${brand.name}`);
    console.log(`✓ Layout Preset: ${theme.preset}`);
    console.log(`✓ Theme Mode:    ${theme.mode}`);
    console.log(`✓ Launch Date:   ${launch.launchAt || launch.durationHours + ' hours'}`);

    // 4. Safely copy to config.js without modifying the source config file
    fs.copyFileSync(sourceConfigFile, TARGET_CONFIG_FILE);
    console.log(`\n✓ Active configuration updated -> ${path.relative(ROOT_DIR, TARGET_CONFIG_FILE)}`);
    console.log(`✓ Source configuration preserved -> ${path.relative(ROOT_DIR, sourceConfigFile)}`);
    console.log(`\n🎉 Ready for deployment! Output directory: "." (root)\n`);
    process.exit(0);

  } catch (err) {
    console.error(`❌ Unexpected error loading configuration for "${brandId}":`, err.message);
    process.exit(1);
  }
}

run();
