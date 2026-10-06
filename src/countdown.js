/**
 * Countdown Engine - Pure Logic & Timezone-Aware Calculations
 * 
 * Provides deterministic, zero-drift calculation of remaining time
 * from an authoritative launch timestamp or resolved duration.
 * Completely independent of UI components and client localStorage.
 */

/**
 * @typedef {Object} CountdownResult
 * @property {number} totalMs - Total remaining milliseconds (clamped to >= 0)
 * @property {number} days - Remaining whole days
 * @property {number} hours - Remaining hours (0-23)
 * @property {number} minutes - Remaining minutes (0-59)
 * @property {number} seconds - Remaining seconds (0-59)
 * @property {number} totalHours - Total remaining hours including days (e.g. 73h)
 * @property {boolean} isExpired - True if current time is at or past the launch timestamp
 * @property {boolean} isValid - True if the launch timestamp was parsed successfully
 */

/**
 * Parses an ISO 8601 timestamp string into milliseconds since Unix epoch (UTC).
 * Supports full ISO formats (e.g., '2026-10-09T09:47:50+01:00', '2026-10-09T08:47:50Z').
 * 
 * @param {string} isoString - The ISO 8601 formatted timestamp.
 * @returns {number|null} Milliseconds timestamp, or null if invalid.
 */
export function parseIsoTimestamp(isoString) {
  if (!isoString || typeof isoString !== 'string') {
    return null;
  }
  const trimmed = isoString.trim();
  if (!trimmed) return null;

  const parsed = Date.parse(trimmed);
  if (Number.isNaN(parsed)) {
    return null;
  }
  return parsed;
}

/**
 * Calculates the exact remaining time until the target timestamp.
 * 
 * @param {number|string} target - Launch timestamp as ISO string or Unix ms.
 * @param {number} [currentTimestamp=Date.now()] - Current reference time in Unix ms.
 * @returns {CountdownResult}
 */
export function calculateTimeRemaining(target, currentTimestamp = Date.now()) {
  const targetMs = typeof target === 'number' ? target : parseIsoTimestamp(target);

  if (targetMs === null || Number.isNaN(targetMs)) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalHours: 0,
      isExpired: false,
      isValid: false
    };
  }

  // Calculate difference and enforce non-negative constraint
  const difference = Math.max(0, targetMs - currentTimestamp);
  const isExpired = difference === 0;

  const MS_PER_SECOND = 1000;
  const MS_PER_MINUTE = MS_PER_SECOND * 60;
  const MS_PER_HOUR = MS_PER_MINUTE * 60;
  const MS_PER_DAY = MS_PER_HOUR * 24;

  const days = Math.floor(difference / MS_PER_DAY);
  const hours = Math.floor((difference % MS_PER_DAY) / MS_PER_HOUR);
  const minutes = Math.floor((difference % MS_PER_HOUR) / MS_PER_MINUTE);
  const seconds = Math.floor((difference % MS_PER_MINUTE) / MS_PER_SECOND);
  const totalHours = Math.floor(difference / MS_PER_HOUR);

  return {
    totalMs: difference,
    days,
    hours,
    minutes,
    seconds,
    totalHours,
    isExpired,
    isValid: true
  };
}

/**
 * Formats a number with leading zeros.
 * 
 * @param {number} num - The number to format.
 * @param {number} [length=2] - Minimum digits.
 * @returns {string}
 */
export function padZero(num, length = 2) {
  return String(Math.max(0, Math.floor(num))).padStart(length, '0');
}

/**
 * Formats countdown state into a human-readable string suitable for screen readers.
 * 
 * @param {CountdownResult} state
 * @param {string[]} [displayUnits=['days', 'hours', 'minutes', 'seconds']]
 * @returns {string}
 */
export function formatAccessibleCountdown(state, displayUnits = ['days', 'hours', 'minutes', 'seconds']) {
  if (!state.isValid) {
    return 'Launch date is not configured properly.';
  }
  if (state.isExpired) {
    return 'The countdown has finished. The site is now live.';
  }

  const parts = [];
  if (displayUnits.includes('days') && (state.days > 0 || displayUnits.length === 1)) {
    parts.push(`${state.days} ${state.days === 1 ? 'day' : 'days'}`);
  }
  if (displayUnits.includes('hours')) {
    parts.push(`${state.hours} ${state.hours === 1 ? 'hour' : 'hours'}`);
  }
  if (displayUnits.includes('minutes')) {
    parts.push(`${state.minutes} ${state.minutes === 1 ? 'minute' : 'minutes'}`);
  }
  if (displayUnits.includes('seconds')) {
    parts.push(`${state.seconds} ${state.seconds === 1 ? 'second' : 'seconds'}`);
  }

  if (parts.length === 0) {
    return 'Launching soon.';
  }
  if (parts.length === 1) {
    return `Launching in ${parts[0]}.`;
  }
  if (parts.length === 2) {
    return `Launching in ${parts[0]} and ${parts[1]}.`;
  }

  const last = parts.pop();
  return `Launching in ${parts.join(', ')}, and ${last}.`;
}
