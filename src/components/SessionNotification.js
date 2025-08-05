import React from "react";

const SessionNotification = ({
  isVisible,
  sessionType,
  onConfirm,
  onClose,
}) => {
  if (!isVisible) return null;

  const isWorkComplete = sessionType === "work";

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700">
        {/* Icon */}
        <div className="text-center mb-6">
          <div
            className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
              isWorkComplete
                ? "bg-green-100 dark:bg-green-900/30"
                : "bg-blue-100 dark:bg-blue-900/30"
            }`}
          >
            {isWorkComplete ? (
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-8 h-8 text-blue-600 dark:text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4">
          {isWorkComplete ? "Work Session Complete!" : "Break Time Over!"}
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          {isWorkComplete
            ? "Great job! Time to take a well-deserved break. Click OK to start your break timer."
            : "Break time is over. Ready to get back to work? Click OK to start your next work session."}
        </p>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Dismiss
          </button>
          <button
            onClick={handleConfirm}
            className={`flex-1 px-4 py-3 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
              isWorkComplete
                ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            }`}
          >
            {isWorkComplete ? "Start Break" : "Start Work"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionNotification;
