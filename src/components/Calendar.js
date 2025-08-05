import React, { useState } from "react";
import { useAppContext } from "../App";

const Calendar = () => {
  const { tasks, sessionHistory } = useAppContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDayModal, setShowDayModal] = useState(false);

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const getViewTitle = () => {
    return currentDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Get events for a specific date
  const getDateEvents = (date) => {
    const dateString = date.toDateString();
    const dayTasks = tasks[dateString] || [];
    const dayHistory = sessionHistory.find(
      (entry) => entry.date === dateString
    );

    const events = [];

    // Add work sessions
    if (dayHistory?.workTime > 0) {
      events.push({
        type: "work",
        title: "Work Session",
        time: formatTime(dayHistory.workTime),
        color: "bg-blue-500",
        textColor: "text-blue-700 dark:text-blue-300",
        bgColor: "bg-blue-100 dark:bg-blue-900",
      });
    }

    // Add break sessions
    if (dayHistory?.breakTime > 0) {
      events.push({
        type: "break",
        title: "Break Time",
        time: formatTime(dayHistory.breakTime),
        color: "bg-green-500",
        textColor: "text-green-700 dark:text-green-300",
        bgColor: "bg-green-100 dark:bg-green-900",
      });
    }

    // Add tasks
    dayTasks.forEach((task) => {
      events.push({
        type: "task",
        title: task.text,
        completed: task.completed,
        color: task.completed ? "bg-green-500" : "bg-orange-500",
        textColor: task.completed
          ? "text-green-700 dark:text-green-300"
          : "text-orange-700 dark:text-orange-300",
        bgColor: task.completed
          ? "bg-green-100 dark:bg-green-900"
          : "bg-orange-100 dark:bg-orange-900",
      });
    });

    return events;
  };

  const handleDayClick = (day) => {
    setSelectedDate(day);
    setShowDayModal(true);
  };

  const closeModal = () => {
    setShowDayModal(false);
    setSelectedDate(null);
  };

  // Generate calendar data for month view
  const generateCalendarData = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const days = [];
    let current = new Date(startDate);
    let count = 0;
    const maxDays = 42; // 6 weeks max

    while (count < maxDays) {
      days.push(new Date(current));
      current.setDate(current.getDate() + 1);
      count++;
    }
    return days;
  };

  const calendarDays = generateCalendarData();
  const today = new Date();
  const todayEvents = getDateEvents(today);

  const renderMonthView = () => (
    <div className="space-y-4">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-3 text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const isToday = day.toDateString() === today.toDateString();
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const dayEvents = getDateEvents(day);
          const hasEvents = dayEvents.length > 0;

          return (
            <div
              key={index}
              onClick={() => handleDayClick(day)}
              className={`group relative p-4 min-h-[100px] cursor-pointer rounded-xl transition-all duration-200 transform hover:scale-[1.02] ${
                isCurrentMonth
                  ? "bg-white dark:bg-gray-800 shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700"
                  : "bg-gray-50 dark:bg-gray-900/50 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              } ${
                isToday
                  ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg"
                  : ""
              } ${
                hasEvents && isCurrentMonth
                  ? "bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10"
                  : ""
              }`}
            >
              {/* Date Number */}
              <div
                className={`text-base font-semibold mb-2 ${
                  isToday
                    ? "text-blue-600 dark:text-blue-400"
                    : isCurrentMonth
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-400"
                }`}
              >
                {day.getDate()}
              </div>

              {/* Event indicators */}
              <div className="space-y-1">
                {dayEvents.slice(0, 2).map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className={`w-full h-1.5 rounded-full ${event.color} shadow-sm`}
                  ></div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    +{dayEvents.length - 2} more
                  </div>
                )}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-8 py-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={goToPrevious}
                className="group p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                {getViewTitle()}
              </h1>
              <button
                onClick={goToNext}
                className="group p-3 hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <svg
                  className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-8">{renderMonthView()}</div>
      </div>

      {/* Today's Events Summary */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800 px-8 py-6 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Today's Events
            </h2>
          </div>
        </div>

        <div className="p-8">
          {todayEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No events scheduled for today
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                Start a timer session or add tasks to see them here
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {todayEvents.map((event, index) => (
                <div
                  key={index}
                  className={`group p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${event.bgColor} border-gray-200 dark:border-gray-600`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-4 h-4 rounded-full ${event.color} shadow-sm`}
                    ></div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-lg ${event.textColor}`}
                      >
                        {event.title}
                      </h4>
                      {event.time && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                          {event.time}
                        </p>
                      )}
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Day Details Modal */}
      {showDayModal && selectedDate && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full border border-gray-200 dark:border-gray-700 overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 px-6 py-5 border-b border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedDate.getFullYear()}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {getDateEvents(selectedDate).length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    No events for this day
                  </p>
                  <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                    This day is free from scheduled activities
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {getDateEvents(selectedDate).map((event, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border transition-all duration-200 hover:shadow-sm ${event.bgColor} border-gray-200 dark:border-gray-600`}
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-4 h-4 rounded-full ${event.color} shadow-sm`}
                        ></div>
                        <div className="flex-1">
                          <h4
                            className={`font-semibold text-base ${event.textColor}`}
                          >
                            {event.title}
                          </h4>
                          {event.time && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 font-medium">
                              {event.time}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
