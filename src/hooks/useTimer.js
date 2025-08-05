import { useState, useEffect, useCallback, useRef } from "react";
import { formatTimerDisplay } from "../utils/formatTime";

export const useTimer = (
  initialWorkDuration = 25,
  initialBreakDuration = 5
) => {
  const [timeLeft, setTimeLeft] = useState(initialWorkDuration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkSession, setIsWorkSession] = useState(true);
  const [workDuration, setWorkDuration] = useState(initialWorkDuration);
  const [breakDuration, setBreakDuration] = useState(initialBreakDuration);
  const [sessionCount, setSessionCount] = useState(0);
  const [audioContext, setAudioContext] = useState(null);
  const [todayWorkTime, setTodayWorkTime] = useState(0);
  const [todayBreakTime, setTodayBreakTime] = useState(0);
  const [currentDate, setCurrentDate] = useState(new Date().toDateString());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationSessionType, setNotificationSessionType] = useState(null);

  // Initialize audio context with proper cleanup
  useEffect(() => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    setAudioContext(audioCtx);

    // Cleanup function to prevent memory leaks
    return () => {
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close().catch(console.error);
      }
    };
  }, []);

  // Reset counters if it's a new day
  useEffect(() => {
    const today = new Date().toDateString();
    if (today !== currentDate) {
      setCurrentDate(today);
      setSessionCount(0);
      setTodayWorkTime(0);
      setTodayBreakTime(0);
    }
  }, [currentDate]);

  // Play notification sound with error handling
  const playNotification = useCallback(() => {
    if (audioContext && audioContext.state === "running") {
      try {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(
          600,
          audioContext.currentTime + 0.1
        );
        oscillator.frequency.setValueAtTime(
          800,
          audioContext.currentTime + 0.2
        );

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(
          0.01,
          audioContext.currentTime + 0.3
        );

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);

        // Clean up oscillator after it finishes
        setTimeout(() => {
          try {
            oscillator.disconnect();
            gainNode.disconnect();
          } catch (error) {
            // Oscillator may already be cleaned up
          }
        }, 350);
      } catch (error) {
        console.warn("Audio notification failed:", error);
      }
    }
  }, [audioContext]);

  // Handle session completion
  const handleSessionComplete = useCallback(() => {
    setIsRunning(false);
    playNotification();

    if (isWorkSession) {
      setSessionCount((prev) => prev + 1);
      setTodayWorkTime((prev) => prev + workDuration);

      setIsWorkSession(false);
      setTimeLeft(breakDuration * 60);
      setNotificationSessionType("work");
      setShowNotification(true);
    } else {
      setTodayBreakTime((prev) => prev + breakDuration);

      setIsWorkSession(true);
      setTimeLeft(workDuration * 60);
      setNotificationSessionType("break");
      setShowNotification(true);
    }
  }, [isWorkSession, breakDuration, workDuration, playNotification]);

  // Use ref to store the latest callback to avoid interval recreation
  const handleSessionCompleteRef = useRef(handleSessionComplete);
  handleSessionCompleteRef.current = handleSessionComplete;

  // Optimized timer effect - reduced dependencies to prevent unnecessary recreations
  useEffect(() => {
    let interval = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            // Use ref to get latest callback without causing effect recreation
            handleSessionCompleteRef.current();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]); // Removed handleSessionComplete from dependencies

  // Timer controls
  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setIsWorkSession(true);
    setTimeLeft(workDuration * 60);
  };

  // Use shared formatTime utility
  const formatTime = formatTimerDisplay;

  // Update settings
  const updateSettings = (newWorkDuration, newBreakDuration) => {
    setWorkDuration(newWorkDuration);
    setBreakDuration(newBreakDuration);
    setTimeLeft(newWorkDuration * 60);
    localStorage.setItem("workDuration", newWorkDuration.toString());
    localStorage.setItem("breakDuration", newBreakDuration.toString());
  };

  // Handle notification confirmation - starts the timer automatically
  const handleNotificationConfirm = () => {
    setIsRunning(true);
    setShowNotification(false);
    setNotificationSessionType(null);
  };

  // Handle notification dismissal - just closes the notification
  const handleNotificationDismiss = () => {
    setShowNotification(false);
    setNotificationSessionType(null);
  };

  // Calculate progress percentage
  const totalTime = isWorkSession ? workDuration * 60 : breakDuration * 60;
  const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;

  return {
    timeLeft,
    isRunning,
    isWorkSession,
    workDuration,
    breakDuration,
    sessionCount,
    formatTime,
    toggleTimer,
    resetTimer,
    updateSettings,
    progressPercentage,
    setSessionCount,
    todayWorkTime,
    todayBreakTime,
    showNotification,
    notificationSessionType,
    handleNotificationConfirm,
    handleNotificationDismiss,
  };
};
