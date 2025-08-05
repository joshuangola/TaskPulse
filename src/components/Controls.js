import React from "react";

const Controls = ({ isRunning, onToggle, onReset, onSettings }) => {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onToggle}
        className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 ${
          isRunning
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-green-500 hover:bg-green-600 text-white"
        }`}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onReset}
        className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        Reset
      </button>

      <button
        onClick={onSettings}
        className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
      >
        Settings
      </button>
    </div>
  );
};

export default Controls;
