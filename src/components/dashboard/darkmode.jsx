"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function Darkmode() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure component only renders after mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing on first server render

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <div className="flex items-center justify-center bg-white dark:bg-gray-900 transition-color duration-700 m-5">
      <Button
        onClick={toggleTheme}
        className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-lg transition-all duration-500 hover:scale-110"
      >
        {isDark ? (
          <Sun className="text-yellow-400 w-6 h-6 transition-opacity duration-500" />
        ) : (
          <Moon className="text-blue-600 w-6 h-6 transition-opacity duration-500" />
        )}
      </Button>
    </div>
  );
}
