/**
 * Automated Unit Test Suite for Configuration Validation & Normalization
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL, fileURLToPath } from 'url';
import { validateConfig, resolveLaunchTimestamp, DEFAULT_CONFIG } from '../src/config-validator.js';
import { CONFIG as defaultBrandConfig } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIGS_DIR = path.resolve(ROOT_DIR, 'configs');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failedTests++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

function assertEqual(actual, expected, message) {
  const isMatch = JSON.stringify(actual) === JSON.stringify(expected);
  assert(isMatch, `${message} (Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)})`);
}

console.log('====================================================');
console.log('🧪 RUNNING CONFIG VALIDATOR TEST SUITE');
console.log('====================================================\n');

// Test Suite 1: Default Active Config Validation
console.log('--- Test Suite 1: Default Active Config Validation ---');
{
  const result = validateConfig(defaultBrandConfig);
  assert(result.isValid, 'Default config.js must pass validation with zero fatal errors');
  assertEqual(result.errors.length, 0, 'No errors in default config');
  assert(Boolean(result.config.brand.name), 'Brand name properly extracted');
  assert(Boolean(result.config.theme.preset), 'Layout preset recognized');
}

// Test Suite 2: Validate All Configurations in configs/
console.log('\n--- Test Suite 2: Dynamic Validation of All Files in configs/ ---');
{
  const configFiles = fs.readdirSync(CONFIGS_DIR).filter(f => f.endsWith('.js'));
  assert(configFiles.length >= 4, `Found ${configFiles.length} config files in configs/ directory`);

  for (const file of configFiles) {
    const filePath = path.resolve(CONFIGS_DIR, file);
    const mod = await import(pathToFileURL(filePath).href);
    assert(Boolean(mod.CONFIG), `${file} exports a valid CONFIG object`);

    const result = validateConfig(mod.CONFIG);
    assert(result.isValid, `${file} passes full schema validation with 0 errors`);
    assertEqual(result.errors.length, 0, `Zero errors in ${file}`);
    assert(result.config.brand.name.length > 0, `${file} contains non-empty brand name "${result.config.brand.name}"`);
    assert(Boolean(result.config.launch.launchAt), `${file} contains explicit launch timestamp "${result.config.launch.launchAt}"`);
  }
}

// Test Suite 3: Missing Required Fields Handling
console.log('\n--- Test Suite 3: Detection of Missing Required Fields ---');
{
  // Missing brand name
  const invalidBrand = {
    brand: {},
    content: { headline: 'Valid Headline' },
    launch: { launchAt: '2026-10-09T09:47:50+01:00' }
  };
  const result1 = validateConfig(invalidBrand);
  assert(!result1.isValid, 'Missing brand.name must fail validation');
  assert(result1.errors.some(e => e.includes('brand.name')), 'Error mentions brand.name');

  // Missing content headline
  const invalidHeadline = {
    brand: { name: 'Acme' },
    content: {},
    launch: { launchAt: '2026-10-09T09:47:50+01:00' }
  };
  const result2 = validateConfig(invalidHeadline);
  assert(!result2.isValid, 'Missing content.headline must fail validation');
  assert(result2.errors.some(e => e.includes('content.headline')), 'Error mentions content.headline');

  // Missing launch
  const invalidLaunch = {
    brand: { name: 'Acme' },
    content: { headline: 'Headline' }
  };
  const result3 = validateConfig(invalidLaunch);
  assert(!result3.isValid, 'Missing launch section must fail validation');
  assert(result3.errors.some(e => e.includes('launch')), 'Error mentions launch');
}

// Test Suite 4: Fallbacks and Graceful Normalization
console.log('\n--- Test Suite 4: Graceful Fallback for Invalid Presets & Modes ---');
{
  const weirdConfig = {
    brand: { name: 'Fallback Test' },
    theme: {
      preset: 'non-existent-preset',
      mode: 'invalid-mode'
    },
    content: { headline: 'Headline' },
    launch: { launchAt: '2026-10-09T09:47:50+01:00' }
  };

  const result = validateConfig(weirdConfig);
  assert(result.isValid, 'Non-fatal invalid preset falls back gracefully and remains valid');
  assert(result.warnings.length > 0, 'Warnings logged for invalid preset and mode');
  assertEqual(result.config.theme.preset, 'centered-minimalist', 'Preset falls back to centered-minimalist');
  assertEqual(result.config.theme.mode, 'dark', 'Theme mode falls back to dark');
}

// Test Suite 5: Duration vs Fixed Launch Mode
console.log('\n--- Test Suite 5: Launch Mode Validation & Epoch Resolution ---');
{
  // Valid duration mode
  const durationConfig = {
    brand: { name: 'Duration Brand' },
    content: { headline: 'Coming in 72h' },
    launch: {
      mode: 'duration',
      durationHours: 72
    }
  };
  const resultDuration = validateConfig(durationConfig);
  assert(resultDuration.isValid, 'Valid duration mode passes');

  const refTime = 1700000000000;
  const resolved = resolveLaunchTimestamp(resultDuration.config.launch, refTime);
  assertEqual(resolved, refTime + 72 * 3600 * 1000, 'Authoritative duration timestamp calculated accurately');

  // Invalid duration (negative or zero)
  const invalidDurationConfig = {
    brand: { name: 'Bad Duration' },
    content: { headline: 'Coming' },
    launch: {
      mode: 'duration',
      durationHours: -5
    }
  };
  const resultInvalidDuration = validateConfig(invalidDurationConfig);
  assert(!resultInvalidDuration.isValid, 'Negative duration is rejected');
}

console.log('\n====================================================');
console.log(`Test Results: ${passedTests}/${totalTests} tests passed (${failedTests} failures)`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
