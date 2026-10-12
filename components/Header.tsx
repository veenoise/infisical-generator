"use client";

import { RotateCcw, ShieldCheck } from "lucide-react";

export function Header({ onReset }: { onReset: () => void }) {
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
        <button type="button" onClick={onReset} className="reset-button">
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>
    </header>
  );
}
