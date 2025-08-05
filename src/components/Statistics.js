import React, { useMemo } from "react";
import { formatDuration } from "../utils/formatTime";
import { buttonStyles } from "../utils/styleHelpers";

const Statistics = React.memo(
  ({ stats, sessionCount, showStats, setShowStats }) => {
    // Memoize today calculation - only recalculates if date changes
    const today = useMemo(() => new Date().toDateString(), []);

    // Memoize today's stats calculation
    const todayStats = useMemo(
      () => stats[today] || { sessions: 0, workTime: 0, breakTime: 0 },
      [stats, today]
    );

    return (
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <button
            onClick={() => setShowStats(!showStats)}
            className={`w-full ${buttonStyles(
              "primary",
              "md"
            )} bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700`}
          >
            {showStats ? "Hide Stats" : "Statistics"}
          </button>
        </div>

        {/* Statistics Panel */}
        {showStats && (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Statistics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                      Today's Sessions
                    </span>
                    <span className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                      {todayStats.sessions}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-green-700 dark:text-green-300">
                      Today's Work Time
                    </span>
                    <span className="text-2xl font-bold text-green-900 dark:text-green-100">
                      {formatDuration(todayStats.workTime)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg border border-yellow-200 dark:border-yellow-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                      Today's Break Time
                    </span>
                    <span className="text-2xl font-bold text-yellow-900 dark:text-yellow-100">
                      {formatDuration(todayStats.breakTime)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-700">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      Total Sessions
                    </span>
                    <span className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                      {sessionCount}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Statistics.displayName = "Statistics";

export default Statistics;
