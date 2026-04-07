"use client";

export default function IconButton({ onClick, label, children, className = "" }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`p-2 rounded-full transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
