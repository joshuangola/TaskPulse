import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import TimerPage from "./components/TimerPage";
import Calendar from "./components/Calendar";
import TimeTracking from "./components/TimeTracking";
import "./index.css";

// Create context for global state
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : {};
  });

  const [sessionHistory, setSessionHistory] = useState(() => {
    const saved = localStorage.getItem("sessionHistory");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist dark mode
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Persist tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Persist session history
  useEffect(() => {
    localStorage.setItem("sessionHistory", JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  const addTask = (date, task) => {
    setTasks((prev) => ({
      ...prev,
      [date]: [
        ...(prev[date] || []),
        { id: Date.now(), text: task, completed: false },
      ],
    }));
  };

  const toggleTask = (date, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [date]: prev[date].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ),
    }));
  };

  const deleteTask = (date, taskId) => {
    setTasks((prev) => ({
      ...prev,
      [date]: prev[date].filter((task) => task.id !== taskId),
    }));
  };

  const addSession = (date, workTime, breakTime, sessions) => {
    const existingIndex = sessionHistory.findIndex(
      (entry) => entry.date === date
    );

    if (existingIndex >= 0) {
      setSessionHistory((prev) =>
        prev.map((entry, index) =>
          index === existingIndex
            ? {
                ...entry,
                workTime: workTime, // Use the new values instead of adding
                breakTime: breakTime,
                sessions: sessions,
              }
            : entry
        )
      );
    } else {
      setSessionHistory((prev) => [
        ...prev,
        { date, workTime, breakTime, sessions },
      ]);
    }
  };

  const clearSessionHistory = () => {
    setSessionHistory([]);
    localStorage.removeItem("sessionHistory");
  };

  const contextValue = {
    darkMode,
    setDarkMode,
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    sessionHistory,
    addSession,
    clearSessionHistory,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router>
        <div
          className={`min-h-screen transition-colors duration-200 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
          }`}
        >
          <NavBar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TimerPage />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/time-tracking" element={<TimeTracking />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
