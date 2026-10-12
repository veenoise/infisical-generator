"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
  text: string;
  label?: string;
  onCopied?: (message: string) => void;
  className?: string;
}

export function CopyButton({ text, label = "Copy", onCopied, className = "" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    onCopied?.(`${label} copied to clipboard!`);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button type="button" onClick={handleCopy} className={`copy-button ${className}`}>
      {copied ? <Check size={14} /> : <Copy size={14} />}
      {copied ? "Copied!" : label}
    </button>
  );
}
