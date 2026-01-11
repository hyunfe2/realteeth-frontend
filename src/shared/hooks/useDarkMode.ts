import { useState, useEffect } from "react";

const DARK_MODE_KEY = "weather_dark_mode";

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 다크 모드 설정 불러오기
    const stored = localStorage.getItem(DARK_MODE_KEY);
    if (stored !== null) {
      const darkMode = stored === "true";
      setIsDarkMode(darkMode);
      updateDarkModeClass(darkMode);
    } else {
      // 시스템 테마 감지
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
      updateDarkModeClass(prefersDark);
    }
  }, []);

  const updateDarkModeClass = (darkMode: boolean) => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newValue = !prev;
      localStorage.setItem(DARK_MODE_KEY, String(newValue));
      updateDarkModeClass(newValue);
      return newValue;
    });
  };

  return {
    isDarkMode,
    toggleDarkMode,
  };
};
