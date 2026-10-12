"use client";

import { useEffect, useState } from "react";
import { Moon, RotateCcw, ShieldCheck, Sun } from "lucide-react";

export function Header({ onReset }: { onReset: () => void }) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const dark = savedTheme ? savedTheme === "dark" : true;
    document.documentElement.classList.toggle("dark", dark);
    window.setTimeout(() => setIsDark(dark), 0);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={20} /></div>
          <div>
            <h1>Infisical Generator <span>Auto-Persisted</span></h1>
            <p>Construct, Base64 encode, and export Infisical Agent runtime env vars</p>
          </div>
        </div>
        <div className="header-actions">
          <button type="button" onClick={toggleTheme} className="theme-button" aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}>
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            {isDark ? "Light" : "Dark"}
          </button>
          <button type="button" onClick={onReset} className="reset-button">
            <RotateCcw size={14} /> Reset Defaults
          </button>
        </div>
      </div>
    </header>
  );
}
