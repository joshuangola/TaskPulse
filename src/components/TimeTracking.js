import React, { useState, useMemo } from "react";
import { useAppContext } from "../App";

const TimeTracking = () => {
  const { sessionHistory } = useAppContext();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const filteredHistory = useMemo(() => {
    if (!startDate || !endDate) return sessionHistory;

    return sessionHistory.filter((entry) => {
      const entryDate = new Date(entry.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return entryDate >= start && entryDate <= end;
    });
  }, [sessionHistory, startDate, endDate]);

  const rangeTotals = useMemo(() => {
    return filteredHistory.reduce(
      (totals, entry) => {
        return {
          workTime: totals.workTime + entry.workTime,
          breakTime: totals.breakTime + entry.breakTime,
          sessions: totals.sessions + entry.sessions,
        };
      },
      { workTime: 0, breakTime: 0, sessions: 0 }
    );
  }, [filteredHistory]);

  const exportCSV = () => {
    const headers = ["Date", "Work Time (min)", "Break Time (min)", "Sessions"];
    const csvContent = [
      headers.join(","),
      ...filteredHistory.map((entry) =>
        [
          formatDate(entry.date),
          entry.workTime,
          entry.breakTime,
          entry.sessions,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `time-tracking-${startDate}-to-${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          Time Tracking
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track your productivity over time
        </p>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Date Range
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>
          <div>
            <button
              onClick={() => {
                setStartDate("");
                setEndDate("");
              }}
              className="w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            >
              Clear Filter
            </button>
          </div>
        </div>
      </div>

      {/* Range Totals */}
      {startDate && endDate && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Range Totals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatTime(rangeTotals.workTime)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Work Time
              </div>
            </div>
            <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatTime(rangeTotals.breakTime)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Break Time
              </div>
            </div>
            <div className="text-center p-4 bg-orange-50 dark:bg-orange-900 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {formatTime(rangeTotals.workTime + rangeTotals.breakTime)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Combined Total Time
              </div>
            </div>
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {rangeTotals.sessions}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Sessions
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              onClick={exportCSV}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Export CSV
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeTracking;
