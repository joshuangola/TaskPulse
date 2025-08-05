import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircularTimer = ({ timeLeft, totalTime, isWorkSession, formatTime }) => {
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  const color = isWorkSession ? "#3B82F6" : "#10B981"; // Blue for work, green for break

  return (
    <div className="flex justify-center items-center">
      <div className="relative w-64 h-64">
        <CircularProgressbar
          value={progress}
          text={formatTime(timeLeft)}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#E5E7EB",
            strokeLinecap: "round",
            textSize: "20px",
            fontWeight: "bold",
          })}
        />
        {/* Session type overlay - positioned outside the circle */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 text-center">
          <div
            className={`text-lg font-semibold ${
              isWorkSession ? "text-blue-600" : "text-green-600"
            }`}
          >
            {isWorkSession ? "Work" : "Break"}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {isWorkSession ? "Focus Time" : "Rest Time"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
