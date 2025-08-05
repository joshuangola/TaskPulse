import React from "react";

const Timer = ({
  timeLeft,
  isWorkSession,
  formatTime,
  progressPercentage,
  sessionCount,
}) => {
  return (
    <div className="text-center">
      {/* Session Status */}
      <div className="mb-6">
        <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200">
          <div
            className={`w-2 h-2 rounded-full mr-2 ${
              isWorkSession ? "bg-red-500 animate-pulse" : "bg-green-500"
            }`}
          ></div>
          {isWorkSession ? "Work Session" : "Break Session"}
        </div>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Sessions completed: {sessionCount}
        </div>
      </div>

      {/* Timer Display */}
      <div className="mb-8">
        <div className="text-8xl font-mono font-bold text-gray-900 dark:text-white mb-6 tracking-wider">
          {formatTime(timeLeft)}
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="relative">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 relative"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 px-2 py-1 rounded">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Circular Progress */}
      <div className="relative w-32 h-32 mx-auto mb-8">
        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="rgb(229 231 235)"
            strokeWidth="8"
            className="dark:stroke-gray-700"
          />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="8"
            strokeDasharray={`${2 * Math.PI * 54}`}
            strokeDashoffset={`${
              2 * Math.PI * 54 * (1 - progressPercentage / 100)
            }`}
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">
            {Math.round(progressPercentage)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timer;
