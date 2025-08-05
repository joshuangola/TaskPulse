import React, { useState } from "react";

const TaskList = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [newTask, setNewTask] = useState("");
  const today = new Date().toDateString();
  const todayTasks = tasks[today] || [];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      onAddTask(today, newTask.trim());
      setNewTask("");
    }
  };

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
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                task.completed
                  ? "bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-700"
                  : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onToggleTask(today, task.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    task.completed
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
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
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <button
                onClick={() => onDeleteTask(today, task.id)}
                className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-colors"
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
            <span>
              Completed: {todayTasks.filter((task) => task.completed).length}
            </span>
            <span>Total: {todayTasks.length}</span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (todayTasks.filter((task) => task.completed).length /
                    todayTasks.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
