"use client";

import { useState } from "react";
import styles from "./propertyDetail.module.css";

export default function PropertyActions() {
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [reported, setReported] = useState(false);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard is blocked
    }
  };

  const handleReport = () => {
    if (!reported) {
      setReported(true);
      // Later: open a modal or POST to /api/reports
    }
  };

  return (
    <div className={styles.actionPillGroup}>
      <button
        type="button"
        onClick={() => setSaved(!saved)}
        className={`${styles.actionPill} ${saved ? styles.actionPillSaved : ""}`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
        <span>{saved ? "Saved" : "Save"}</span>
      </button>

      <button type="button" onClick={handleShare} className={styles.actionPill}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{copied ? "Link copied!" : "Share"}</span>
      </button>

      <button
        type="button"
        onClick={handleReport}
        disabled={reported}
        className={styles.actionPill}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
          <line x1="4" y1="22" x2="4" y2="15" />
        </svg>
        <span>{reported ? "Reported" : "Report"}</span>
      </button>
    </div>
  );
}