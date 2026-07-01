import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "dark" ? "dark" : "light";
}

export default function ThemeToggle() {
  // Start from "light" so the first client render matches the server-rendered
  // markup (the server has no access to data-theme), then resolve the real
  // theme after mount. This avoids a React hydration mismatch.
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch {
      /* ignore storage errors (private mode) */
    }
  }, [theme, mounted]);

  const next = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="border-border text-text hover:bg-surface inline-flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border transition-colors"
    >
      {theme === "light" ? (
        <Moon size={18} aria-hidden />
      ) : (
        <Sun size={18} aria-hidden />
      )}
    </button>
  );
}
