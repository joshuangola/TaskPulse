/**
 * Style utility functions for better className readability
 * Provides cleaner alternatives to complex template literals
 */

/**
 * Conditionally join class names
 * @param {...string} classes - Class names to join
 * @returns {string} Joined class names
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Create conditional classes based on state
 * @param {Object} conditions - Object with condition -> className pairs
 * @returns {string} Conditional class names
 */
export const conditional = (conditions) => {
  return Object.entries(conditions)
    .filter(([condition]) => condition)
    .map(([, className]) => className)
    .join(" ");
};

/**
 * Button variant styles
 * @param {'primary'|'secondary'|'danger'|'ghost'} variant - Button variant
 * @param {'sm'|'md'|'lg'} size - Button size
 * @returns {string} Button class names
 */
export const buttonStyles = (variant = "primary", size = "md") => {
  const base =
    "transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 transform hover:scale-105";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl focus:ring-blue-500",
    secondary:
      "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 focus:ring-gray-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    ghost:
      "text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-500",
    success:
      "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl focus:ring-green-500",
    // Timer-specific variants
    start: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
    pause: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
    reset: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500",
    settings: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
    // Special variants
    dangerGhost:
      "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 focus:ring-red-500",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md font-medium",
    md: "px-4 py-3 rounded-lg font-medium",
    lg: "px-8 py-3 text-lg rounded-lg font-medium",
    // Timer controls use larger padding and semibold font
    control: "px-8 py-3 rounded-lg font-semibold",
  };

  return cn(base, variants[variant], sizes[size]);
};

/**
 * Calendar day cell styles
 * @param {boolean} isToday - Is current day
 * @param {boolean} isCurrentMonth - Is in current month
 * @param {boolean} hasEvents - Has events/tasks
 * @returns {string} Calendar day class names
 */
export const calendarDayStyles = (isToday, isCurrentMonth, hasEvents) => {
  const base =
    "group relative p-4 min-h-[100px] cursor-pointer rounded-xl transition-all duration-200 transform hover:scale-[1.02]";

  return cn(
    base,
    conditional({
      [isCurrentMonth]:
        "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700",
      [!isCurrentMonth]:
        "bg-gray-50 dark:bg-gray-900/50 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800",
      [isToday]:
        "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg",
      [hasEvents && isCurrentMonth]:
        "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10",
    })
  );
};

/**
 * Task item styles
 * @param {boolean} completed - Task completion state
 * @returns {string} Task item class names
 */
export const taskStyles = (completed) => {
  const base =
    "flex items-center justify-between p-4 rounded-lg border transition-all duration-200";

  return cn(
    base,
    conditional({
      [completed]:
        "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700",
      [!completed]:
        "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600",
    })
  );
};

/**
 * Task checkbox styles
 * @param {boolean} completed - Task completion state
 * @returns {string} Checkbox class names
 */
export const taskCheckboxStyles = (completed) => {
  return cn(
    "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
    conditional({
      [completed]: "bg-green-500 border-green-500 text-white",
      [!completed]: "border-gray-300 dark:border-gray-600",
    })
  );
};

/**
 * Task text styles
 * @param {boolean} completed - Task completion state
 * @returns {string} Text class names
 */
export const taskTextStyles = (completed) => {
  return conditional({
    [completed]: "line-through text-gray-500 dark:text-gray-400",
    [!completed]: "text-gray-900 dark:text-white",
  });
};

/**
 * Task delete button styles
 * @returns {string} Delete button class names
 */
export const taskDeleteButtonStyles = () => {
  return "text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors";
};

/**
 * Modal styles
 * @param {'sm'|'md'|'lg'} size - Modal size
 * @returns {Object} Modal class names object
 */
export const modalStyles = (size = "md") => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
  };

  return {
    overlay:
      "fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50",
    content: cn(
      "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full mx-4 border border-gray-200 dark:border-gray-700",
      sizes[size]
    ),
  };
};
