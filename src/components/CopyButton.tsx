"use client";

import { useState } from "react";
import { FiCheck, FiCopy } from "react-icons/fi";

export default function CopyButton({ text, label = "Copy", className = "btn" }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard blocked: the text is visible on the page, so nothing is lost. */
    }
  };
  return (
    <button type="button" className={className} onClick={copy} aria-live="polite">
      {copied ? <FiCheck aria-hidden /> : <FiCopy aria-hidden />}
      {copied ? "Copied" : label}
    </button>
  );
}
