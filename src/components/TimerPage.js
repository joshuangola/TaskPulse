import React, { useState, useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import CircularTimer from "./CircularTimer";
import Controls from "./Controls";
import TaskList from "./TaskList";
import SessionNotification from "./SessionNotification";
import { useAppContext } from "../App";
import { buttonStyles } from "../utils/styleHelpers";

const TimerPage = () => {
  const [workDuration, setWorkDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    addSession,
    clearSessionHistory,
  } = useAppContext();

  const {
    timeLeft,
    isRunning,
    isWorkSession,
    formatTime,
    toggleTimer,
    resetTimer,
    updateSettings,
    sessionCount,
    todayWorkTime,
    todayBreakTime,
    showNotification,
    notificationSessionType,
    handleNotificationConfirm,
    handleNotificationDismiss,
  } = useTimer(workDuration, breakDuration);

  const totalTime = isWorkSession ? workDuration * 60 : breakDuration * 60;

  // Save session data when session count changes (only for completed sessions)
  useEffect(() => {
    if (sessionCount > 0) {
      const today = new Date().toDateString();
      // Only add session data if we have actual work time
      if (todayWorkTime > 0) {
        addSession(today, todayWorkTime, todayBreakTime, sessionCount);
      }
    }
  }, [sessionCount, todayWorkTime, todayBreakTime, addSession]);

  const handleSettingsUpdate = (newWorkDuration, newBreakDuration) => {
    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);
    updateSettings(newWorkDuration, newBreakDuration);
    setShowSettings(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Task Pulse
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay focused and productive
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timer Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              {isWorkSession ? "Work Session" : "Break Time"}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Sessions completed: {sessionCount}
            </p>
          </div>

          <CircularTimer
            timeLeft={timeLeft}
            totalTime={totalTime}
            isWorkSession={isWorkSession}
            formatTime={formatTime}
          />

          <div className="mt-8">
            <Controls
              isRunning={isRunning}
              onToggle={toggleTimer}
              onReset={resetTimer}
              onSettings={() => setShowSettings(true)}
            />
          </div>
        </div>

        {/* Task List Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <TaskList
            tasks={tasks}
            onAddTask={addTask}
            onToggleTask={toggleTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Timer Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Work Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={workDuration}
                  onChange={(e) =>
                    setWorkDuration(parseInt(e.target.value) || 25)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Break Duration (minutes)
                </label>
                <input
                  type="number"
                  min="1"
                  max="60"
                  value={breakDuration}
                  onChange={(e) =>
                    setBreakDuration(parseInt(e.target.value) || 5)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4 mt-6">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to clear all session history? This cannot be undone."
                    )
                  ) {
                    clearSessionHistory();
                  }
                }}
                className={`w-full text-sm ${buttonStyles(
                  "dangerGhost",
                  "sm"
                )}`}
              >
                Clear Session History
              </button>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowSettings(false)}
                className={buttonStyles("ghost", "sm")}
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleSettingsUpdate(workDuration, breakDuration)
                }
                className={buttonStyles("settings", "sm")}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Notification */}
      <SessionNotification
        isVisible={showNotification}
        sessionType={notificationSessionType}
        onConfirm={handleNotificationConfirm}
        onClose={handleNotificationDismiss}
      />
    </div>
  );
};

export default TimerPage;
