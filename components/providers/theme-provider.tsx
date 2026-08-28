"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Reads the theme that was already applied to <html>
 * by the pre-hydration initialization script.
 */
function getInitialTheme(): Theme {
  if (typeof document === "undefined") {
    return "dark";
  }

  const storedTheme = getStoredTheme();

  if (storedTheme) {
    return storedTheme;
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = useCallback(() => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";

      applyTheme(nextTheme);

      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // Theme still works for the current session.
      }

      return nextTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

/**
 * Runs before React hydration/paint.
 *
 * Dark is the default.
 * An explicit "light" preference is respected.
 */
export const themeInitScript = `
(function () {
	try {
		var storedTheme = localStorage.getItem("${STORAGE_KEY}");

		if (storedTheme === "light") {
			document.documentElement.classList.remove("dark");
		} else {
			document.documentElement.classList.add("dark");
		}
	} catch {
		document.documentElement.classList.add("dark");
	}
})();
`;
