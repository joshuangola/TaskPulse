import React, { useState, useMemo, useCallback } from "react";
import {
  taskStyles,
  taskCheckboxStyles,
  taskTextStyles,
  taskDeleteButtonStyles,
} from "../utils/styleHelpers";

const TaskList = React.memo(
  ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
    const [newTask, setNewTask] = useState("");

    // Memoize today calculation - only recalculates if date changes
    const today = useMemo(() => new Date().toDateString(), []);

    // Memoize today's tasks - only recalculates when tasks or today changes
    const todayTasks = useMemo(() => tasks[today] || [], [tasks, today]);

    // Memoize completed tasks count - expensive calculation
    const completedCount = useMemo(
      () => todayTasks.filter((task) => task.completed).length,
      [todayTasks]
    );

    // Memoize completion percentage
    const completionPercentage = useMemo(
      () =>
        todayTasks.length > 0 ? (completedCount / todayTasks.length) * 100 : 0,
      [completedCount, todayTasks.length]
    );

    const handleAddTask = useCallback(
      (e) => {
        e.preventDefault();
        if (newTask.trim()) {
          onAddTask(today, newTask.trim());
          setNewTask("");
        }
      },
      [newTask, onAddTask, today]
    );

    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Today's Tasks
        </h2>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} className="mb-6">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
          </div>
        </form>

        {/* Task List */}
        <div className="space-y-3">
          {todayTasks.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No tasks for today. Add one above!
            </p>
          ) : (
            todayTasks.map((task) => (
              <div key={task.id} className={taskStyles(task.completed)}>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onToggleTask(today, task.id)}
                    className={taskCheckboxStyles(task.completed)}
                  >
                    {task.completed && (
                      <svg
                        className="w-3 h-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                  <span className={taskTextStyles(task.completed)}>
                    {task.text}
                  </span>
                </div>
                <button
                  onClick={() => onDeleteTask(today, task.id)}
                  className={taskDeleteButtonStyles()}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Task Summary */}
        {todayTasks.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>Completed: {completedCount}</span>
              <span>Total: {todayTasks.length}</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    );
  }
);

TaskList.displayName = "TaskList";

export default TaskList;
