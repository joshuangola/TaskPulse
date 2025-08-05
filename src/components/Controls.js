import React from "react";
import { buttonStyles } from "../utils/styleHelpers";

const Controls = ({ isRunning, onToggle, onReset, onSettings }) => {
  return (
    <div
      className="flex justify-center space-x-4"
      role="group"
      aria-label="Timer controls"
    >
      <button
        onClick={onToggle}
        aria-label={isRunning ? "Pause timer" : "Start timer"}
        aria-pressed={isRunning}
        className={buttonStyles(isRunning ? "pause" : "start", "control")}
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onReset}
        aria-label="Reset timer to initial state"
        className={buttonStyles("reset", "control")}
      >
        Reset
      </button>

      <button
        onClick={onSettings}
        aria-label="Open timer settings"
        className={buttonStyles("settings", "control")}
      >
        Settings
      </button>
    </div>
  );
};

export default Controls;
