import React, { useState } from "react";

const Settings = ({
  workDuration,
  breakDuration,
  updateSettings,
  showSettings,
  setShowSettings,
}) => {
  const [localWorkDuration, setLocalWorkDuration] = useState(workDuration);
  const [localBreakDuration, setLocalBreakDuration] = useState(breakDuration);

  const handleSave = () => {
    updateSettings(localWorkDuration, localBreakDuration);
    setShowSettings(false);
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="space-y-3">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full py-3 px-4 rounded-lg font-medium transition-all bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {showSettings ? "Hide Settings" : "Settings"}
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Timer Settings
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Work Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="60"
                value={localWorkDuration}
                onChange={(e) =>
                  setLocalWorkDuration(parseInt(e.target.value) || 25)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Break Duration (minutes)
              </label>
              <input
                type="number"
                min="1"
                max="30"
                value={localBreakDuration}
                onChange={(e) =>
                  setLocalBreakDuration(parseInt(e.target.value) || 5)
                }
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Save Settings
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
