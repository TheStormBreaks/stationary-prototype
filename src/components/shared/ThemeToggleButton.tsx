
"use client";

import { Moon, Sun } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";

export function ThemeToggleButton() {
  const [currentTheme, setCurrentTheme] = useState<string | undefined>(undefined);

  const applyThemePreference = useCallback((themeToApply: string) => {
    if (themeToApply === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", themeToApply);
    setCurrentTheme(themeToApply);
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      applyThemePreference(storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      applyThemePreference(systemPrefersDark ? "dark" : "light");
    }
  }, [applyThemePreference]);

  const toggleTheme = () => {
    if (currentTheme) {
      applyThemePreference(currentTheme === "light" ? "dark" : "light");
    }
  };

  // Render a placeholder button or null until the theme is determined to avoid flash or hydration issues
  if (currentTheme === undefined) {
    return (
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle theme"
        disabled
        className="h-9 w-9 opacity-0" // Maintain layout space but keep invisible until theme is known
      />
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
      aria-pressed={currentTheme === 'dark'}
      title={`Switch to ${currentTheme === "light" ? "dark" : "light"} mode`}
    >
      {currentTheme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
}
