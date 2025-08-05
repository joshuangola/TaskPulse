/**
 * Shared utility functions for time formatting
 * Consolidates duplicate formatting logic across components
 */

/**
 * Format seconds as MM:SS for timer display
 * @param {number} seconds - Total seconds
 * @returns {string} Formatted time string (e.g., "25:30")
 */
export const formatTimerDisplay = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Format minutes as human-readable duration
 * @param {number} minutes - Total minutes
 * @returns {string} Formatted duration string (e.g., "2h 30m" or "45m")
 */
export const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

/**
 * Format date as readable string
 * @param {Date|string} date - Date object or date string
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const defaultOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", { ...defaultOptions, ...options });
};

/**
 * Get today's date string in consistent format
 * @returns {string} Today's date as string
 */
export const getTodayString = () => {
  return new Date().toDateString();
};

/**
 * Check if a date is today
 * @param {Date|string} date - Date to check
 * @returns {boolean} True if date is today
 */
export const isToday = (date) => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toDateString() === getTodayString();
};

/**
 * Calculate percentage with safe division
 * @param {number} value - Current value
 * @param {number} total - Total value
 * @returns {number} Percentage (0-100)
 */
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};
