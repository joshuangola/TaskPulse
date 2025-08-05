import React from "react";
import {
  buttonStyles,
  modalStyles,
  cn,
  conditional,
} from "../utils/styleHelpers";

const SessionNotification = ({
  isVisible,
  sessionType,
  onConfirm,
  onClose,
}) => {
  if (!isVisible) return null;

  const isWorkComplete = sessionType === "work";
  const modal = modalStyles("md");

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  // Clean, readable icon styles
  const iconContainerStyle = cn(
    "mx-auto w-16 h-16 rounded-full flex items-center justify-center",
    conditional({
      [isWorkComplete]: "bg-green-100 dark:bg-green-900/30",
      [!isWorkComplete]: "bg-blue-100 dark:bg-blue-900/30",
    })
  );

  const iconStyle = cn(
    "w-8 h-8",
    conditional({
      [isWorkComplete]: "text-green-600 dark:text-green-400",
      [!isWorkComplete]: "text-blue-600 dark:text-blue-400",
    })
  );

  return (
    <div
      className={modal.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="notification-title"
      onClick={onClose}
    >
      <div
        className={cn(modal.content, "p-8")}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="text-center mb-6">
          <div className={iconContainerStyle}>
            {isWorkComplete ? (
              <svg
                className={iconStyle}
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
                className={iconStyle}
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
        <h3
          id="notification-title"
          className="text-xl font-bold text-gray-900 dark:text-white text-center mb-4"
        >
          {isWorkComplete ? "Work Session Complete!" : "Break Time Over!"}
        </h3>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          {isWorkComplete
            ? "Great job! Time to take a well-deserved break. Click OK to start your break timer."
            : "Break time is over. Ready to get back to work? Click OK to start your next work session."}
        </p>

        {/* Buttons - Much cleaner! */}
        <div
          className="flex space-x-3"
          role="group"
          aria-label="Session notification actions"
        >
          <button
            onClick={onClose}
            aria-label="Dismiss notification without starting timer"
            className={buttonStyles("ghost", "md")}
          >
            Dismiss
          </button>
          <button
            onClick={handleConfirm}
            aria-label={
              isWorkComplete
                ? "Start break timer automatically"
                : "Start work timer automatically"
            }
            className={buttonStyles(
              isWorkComplete ? "success" : "primary",
              "md"
            )}
          >
            {isWorkComplete ? "Start Break" : "Start Work"}
          </button>
        </div>
      </div>
    </div>
  );
};

SessionNotification.displayName = "SessionNotification";

export default SessionNotification;
