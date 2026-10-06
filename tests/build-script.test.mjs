/**
 * Automated Unit Test Suite for Multi-Brand Build Script & Selector
 */

import { execFileSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const CONFIG_FILE = path.resolve(ROOT_DIR, 'config.js');
const CONFIGS_DIR = path.resolve(ROOT_DIR, 'configs');
const SCRIPT_PATH = path.resolve(ROOT_DIR, 'scripts/build.js');

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

function runBuildCommand(args = []) {
  try {
    const stdout = execFileSync('node', [SCRIPT_PATH, ...args], {
      cwd: ROOT_DIR,
      encoding: 'utf-8',
      stdio: ['pipe', 'pipe', 'pipe']
    });
    return { status: 0, stdout, stderr: '' };
  } catch (err) {
    const errText = (err.stderr?.toString() || '') + (err.stdout?.toString() || '') + (err.message || '');
    return {
      status: err.status !== undefined ? err.status : 1,
      stdout: err.stdout?.toString() || '',
      stderr: errText
    };
  }
}

console.log('====================================================');
console.log('🧪 RUNNING BUILD SCRIPT & SELECTOR TEST SUITE');
console.log('====================================================\n');

// Test Suite 1: List Configurations
console.log('--- Test Suite 1: Config Discovery & Listing ---');
{
  const res = runBuildCommand(['--list']);
  assert(res.status === 0, '--list command exits with code 0');
  assert(res.stdout.includes('aura-cloud'), 'Listing includes aura-cloud');
  assert(res.stdout.includes('firstchoice-county'), 'Listing includes firstchoice-county');
  assert(res.stdout.includes('vanguard-atelier'), 'Listing includes vanguard-atelier');
  assert(res.stdout.includes('hyperion-dynamics'), 'Listing includes hyperion-dynamics');
  assert(res.stdout.includes('template'), 'Listing includes template');
}

// Test Suite 2: Valid Brand Selection (Firstchoice County)
console.log('\n--- Test Suite 2: Valid Brand Build (Firstchoice County) ---');
{
  const sourcePath = path.resolve(CONFIGS_DIR, 'firstchoice-county.js');
  const sourceBefore = fs.readFileSync(sourcePath, 'utf-8');

  const res = runBuildCommand(['firstchoice-county']);
  assert(res.status === 0, 'Build firstchoice-county succeeds with exit code 0');
  assert(res.stdout.includes('Firstchoice County'), 'Output confirms brand name');
  assert(res.stdout.includes('elegant-gradient'), 'Output confirms layout preset');

  // Verify target config.js content
  const activeConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
  assert(activeConfig.includes('Firstchoice County'), 'config.js now contains Firstchoice County');
  assert(activeConfig === sourceBefore, 'config.js exactly matches source configuration');

  // Verify source was not modified or deleted
  const sourceAfter = fs.readFileSync(sourcePath, 'utf-8');
  assert(sourceAfter === sourceBefore, 'Source configs/firstchoice-county.js is preserved unchanged');
}

// Test Suite 3: Valid Brand Selection (Vanguard Atelier)
console.log('\n--- Test Suite 3: Valid Brand Build (Vanguard Atelier) ---');
{
  const sourcePath = path.resolve(CONFIGS_DIR, 'vanguard-atelier.js');
  const sourceBefore = fs.readFileSync(sourcePath, 'utf-8');

  const res = runBuildCommand(['vanguard-atelier']);
  assert(res.status === 0, 'Build vanguard-atelier succeeds with exit code 0');
  assert(res.stdout.includes('Vanguard Atelier'), 'Output confirms brand name');
  assert(res.stdout.includes('centered-minimalist'), 'Output confirms layout preset');

  const activeConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
  assert(activeConfig.includes('Vanguard Atelier'), 'config.js now contains Vanguard Atelier');
  assert(activeConfig === sourceBefore, 'config.js exactly matches source configuration');
}

// Test Suite 4: Valid Brand Selection (Hyperion Dynamics)
console.log('\n--- Test Suite 4: Valid Brand Build (Hyperion Dynamics) ---');
{
  const sourcePath = path.resolve(CONFIGS_DIR, 'hyperion-dynamics.js');
  const sourceBefore = fs.readFileSync(sourcePath, 'utf-8');

  const res = runBuildCommand(['hyperion-dynamics']);
  assert(res.status === 0, 'Build hyperion-dynamics succeeds with exit code 0');
  assert(res.stdout.includes('Hyperion Dynamics'), 'Output confirms brand name');
  assert(res.stdout.includes('split-screen'), 'Output confirms split-screen preset');

  const activeConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
  assert(activeConfig.includes('Hyperion Dynamics'), 'config.js now contains Hyperion Dynamics');
  assert(activeConfig === sourceBefore, 'config.js exactly matches hyperion-dynamics.js');
}

// Test Suite 5: Valid Brand Selection (Aura Cloud)
console.log('\n--- Test Suite 5: Valid Brand Build (Aura Cloud) ---');
{
  const sourcePath = path.resolve(CONFIGS_DIR, 'aura-cloud.js');
  const sourceBefore = fs.readFileSync(sourcePath, 'utf-8');

  const res = runBuildCommand(['aura-cloud']);
  assert(res.status === 0, 'Build aura-cloud succeeds with exit code 0');
  assert(res.stdout.includes('Aura Cloud'), 'Output confirms brand name');

  const activeConfig = fs.readFileSync(CONFIG_FILE, 'utf-8');
  assert(activeConfig.includes('Aura Cloud'), 'config.js now contains Aura Cloud');
  assert(activeConfig === sourceBefore, 'config.js exactly matches aura-cloud.js');
}

// Test Suite 6: Path Traversal Attack Prevention
console.log('\n--- Test Suite 6: Security & Path Traversal Prevention ---');
{
  const maliciousInputs = [
    '../package',
    '../../etc/passwd',
    '../config',
    'aura/cloud',
    'aura\\cloud',
    'aura cloud',
    'aura;rm -rf /',
    'aura`touch hack`',
    'aura$(touch hack)',
    'aura.js'
  ];

  maliciousInputs.forEach(input => {
    const res = runBuildCommand([input]);
    assert(res.status !== 0, `Path traversal / malicious input "${input}" is safely rejected with non-zero exit code`);
    assert(res.stderr.includes('Invalid brand identifier') || res.stdout.includes('Invalid brand identifier'), `Error message mentions invalid identifier for "${input}"`);
  });
}

// Test Suite 7: Missing and Non-Existent Brand Identifiers
console.log('\n--- Test Suite 7: Missing & Unknown Brand Handling ---');
{
  // Non-existent brand
  const resUnknown = runBuildCommand(['non-existent-brand']);
  assert(resUnknown.status !== 0, 'Unknown brand identifier fails with non-zero exit code');
  assert(resUnknown.stderr.includes('Configuration file not found') || resUnknown.stdout.includes('Configuration file not found'), 'Error explains file not found');

  // No arguments provided
  const resNoArgs = runBuildCommand([]);
  assert(resNoArgs.status !== 0, 'Running without arguments exits with code 1');
  assert(resNoArgs.stdout.includes('Usage:'), 'Shows usage instructions when called without arguments');
}

console.log('\n====================================================');
console.log(`Test Results: ${passedTests}/${totalTests} tests passed (${failedTests} failures)`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
