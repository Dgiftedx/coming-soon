/**
 * Automated Unit Test Suite for Countdown Engine & Timezone Calculations
 */

import { parseIsoTimestamp, calculateTimeRemaining, padZero, formatAccessibleCountdown } from '../src/countdown.js';
import { resolveLaunchTimestamp } from '../src/config-validator.js';
import { CONFIG } from '../config.js';

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
console.log('🧪 RUNNING COUNTDOWN ENGINE TEST SUITE');
console.log('====================================================\n');

// Test Suite 1: Exact 73-Hour Launch Requirement Calculation
console.log('--- Test Suite 1: 73-Hour Launch Calculation ---');
{
  const refStartIso = '2026-10-06T08:47:50+01:00';
  const configuredLaunchAt = CONFIG.launch.launchAt;
  const startMs = parseIsoTimestamp(refStartIso);
  const targetMs = parseIsoTimestamp(configuredLaunchAt);

  const durationMs = targetMs - startMs;
  const expected73HoursMs = 73 * 60 * 60 * 1000; // 262,800,000 ms

  assertEqual(durationMs, expected73HoursMs, 'Configured launchAt must be exactly 73 hours from reference start');

  const result = calculateTimeRemaining(configuredLaunchAt, startMs);
  assertEqual(result.days, 3, 'Days must be 3 (3 * 24 = 72h)');
  assertEqual(result.hours, 1, 'Hours must be 1 (72 + 1 = 73h)');
  assertEqual(result.minutes, 0, 'Minutes must be 0');
  assertEqual(result.seconds, 0, 'Seconds must be 0');
  assertEqual(result.totalHours, 73, 'totalHours must be 73');
  assertEqual(result.isExpired, false, 'Should not be marked expired at start');
  assertEqual(result.isValid, true, 'Result should be marked valid');
}

// Test Suite 2: Timezone Offsets & ISO 8601 Consistency
console.log('\n--- Test Suite 2: Timezone Offsets & Equivalency ---');
{
  const isoUtc = '2026-10-09T08:47:50Z';
  const isoPlusOne = '2026-10-09T09:47:50+01:00';
  const isoMinusFour = '2026-10-09T04:47:50-04:00';
  const isoTokyo = '2026-10-09T17:47:50+09:00';

  const msUtc = parseIsoTimestamp(isoUtc);
  const msPlusOne = parseIsoTimestamp(isoPlusOne);
  const msMinusFour = parseIsoTimestamp(isoMinusFour);
  const msTokyo = parseIsoTimestamp(isoTokyo);

  assertEqual(msPlusOne, msUtc, 'UTC+01:00 offset resolves to identical UTC epoch as Z');
  assertEqual(msMinusFour, msUtc, 'UTC-04:00 offset resolves to identical UTC epoch as Z');
  assertEqual(msTokyo, msUtc, 'UTC+09:00 (Tokyo) offset resolves to identical UTC epoch as Z');
}

// Test Suite 3: Duration-Based Configuration Resolution
console.log('\n--- Test Suite 3: Authoritative Duration Resolution ---');
{
  const baseTime = 1700000000000;
  const launchConfig = {
    mode: 'duration',
    durationHours: 48
  };

  const resolvedLaunch = resolveLaunchTimestamp(launchConfig, baseTime);
  const expectedLaunch = baseTime + (48 * 3600 * 1000);
  assertEqual(resolvedLaunch, expectedLaunch, 'Duration mode calculates exact future epoch timestamp once');

  const calc = calculateTimeRemaining(resolvedLaunch, baseTime);
  assertEqual(calc.days, 2, '2 days remaining for 48h duration');
  assertEqual(calc.hours, 0, '0 extra hours for 48h duration');
  assertEqual(calc.totalHours, 48, '48 totalHours');
}

// Test Suite 4: Boundary Transitions & Unit Calculations
console.log('\n--- Test Suite 4: Boundary Ticks & Unit Calculations ---');
{
  const baseTime = 1700000000000;
  // 1 day, 2 hours, 3 minutes, 4 seconds = 93784000 ms
  const targetTime = baseTime + (1 * 86400 + 2 * 3600 + 3 * 60 + 4) * 1000;
  const result = calculateTimeRemaining(targetTime, baseTime);

  assertEqual(result.days, 1, 'Days unit calculated correctly');
  assertEqual(result.hours, 2, 'Hours unit calculated correctly');
  assertEqual(result.minutes, 3, 'Minutes unit calculated correctly');
  assertEqual(result.seconds, 4, 'Seconds unit calculated correctly');
  assertEqual(result.totalHours, 26, '26 totalHours calculated correctly');

  // Exactly 59 seconds remaining
  const sec59Target = baseTime + 59000;
  const sec59Result = calculateTimeRemaining(sec59Target, baseTime);
  assertEqual(sec59Result.days, 0, '0 days for 59s');
  assertEqual(sec59Result.hours, 0, '0 hours for 59s');
  assertEqual(sec59Result.minutes, 0, '0 minutes for 59s');
  assertEqual(sec59Result.seconds, 59, '59 seconds');
}

// Test Suite 5: Non-Negative Clamping & Expiration Freeze
console.log('\n--- Test Suite 5: Non-Negative Clamping & Expiration ---');
{
  const targetTime = 1700000000000;

  // Exact expiration moment
  const exactResult = calculateTimeRemaining(targetTime, targetTime);
  assertEqual(exactResult.totalMs, 0, 'Total ms is 0 at exact launch time');
  assertEqual(exactResult.isExpired, true, 'isExpired is true at exact launch time');
  assertEqual(exactResult.days, 0, 'Days clamped to 0');
  assertEqual(exactResult.hours, 0, 'Hours clamped to 0');
  assertEqual(exactResult.minutes, 0, 'Minutes clamped to 0');
  assertEqual(exactResult.seconds, 0, 'Seconds clamped to 0');
  assertEqual(exactResult.totalHours, 0, 'totalHours clamped to 0');

  // Past launch time (e.g., 2 hours later)
  const pastTime = targetTime + 2 * 3600 * 1000;
  const pastResult = calculateTimeRemaining(targetTime, pastTime);
  assertEqual(pastResult.totalMs, 0, 'Total ms does not become negative when past launch');
  assertEqual(pastResult.isExpired, true, 'isExpired remains true when past launch');
  assertEqual(pastResult.days, 0, 'Days remains 0');
  assertEqual(pastResult.hours, 0, 'Hours remains 0');
  assertEqual(pastResult.minutes, 0, 'Minutes remains 0');
  assertEqual(pastResult.seconds, 0, 'Seconds remains 0');
}

// Test Suite 6: Padding and String Formatting
console.log('\n--- Test Suite 6: String Padding & Zero Formatting ---');
{
  assertEqual(padZero(0), '00', '0 padded to 00');
  assertEqual(padZero(7), '07', '7 padded to 07');
  assertEqual(padZero(12), '12', '12 stays 12');
  assertEqual(padZero(105, 3), '105', '3-digit padding works');
  assertEqual(padZero(-5), '00', 'Negative values clamped safely to 00');
}

// Test Suite 7: Invalid Configurations Handling
console.log('\n--- Test Suite 7: Graceful Handling of Malformed Configurations ---');
{
  const invalidResult1 = calculateTimeRemaining('invalid-date-format');
  assertEqual(invalidResult1.isValid, false, 'Invalid string returns isValid: false');
  assertEqual(invalidResult1.totalMs, 0, 'Invalid string returns totalMs: 0');

  const invalidResult2 = calculateTimeRemaining(null);
  assertEqual(invalidResult2.isValid, false, 'Null target returns isValid: false');

  const invalidResult3 = calculateTimeRemaining(undefined);
  assertEqual(invalidResult3.isValid, false, 'Undefined target returns isValid: false');

  const invalidResult4 = calculateTimeRemaining('');
  assertEqual(invalidResult4.isValid, false, 'Empty string returns isValid: false');
}

// Test Suite 8: Screen Reader Accessibility Formatting
console.log('\n--- Test Suite 8: Screen Reader Text Formatting ---');
{
  const activeState = { isValid: true, isExpired: false, days: 3, hours: 1, minutes: 0, seconds: 0 };
  const spokenText = formatAccessibleCountdown(activeState);
  assertEqual(spokenText, 'Launching in 3 days, 1 hour, 0 minutes, and 0 seconds.', 'Accessible string formatted correctly');

  const expiredState = { isValid: true, isExpired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  assertEqual(formatAccessibleCountdown(expiredState), 'The countdown has finished. The site is now live.', 'Expired announcement formatted correctly');
}

console.log('\n====================================================');
console.log(`Test Results: ${passedTests}/${totalTests} tests passed (${failedTests} failures)`);
console.log('====================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
