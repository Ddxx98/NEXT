// app/components/HeaderClient.js
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const styles = {
  cta: {
    marginLeft: "0.5rem",
    padding: "0.45rem 0.8rem",
    borderRadius: 10,
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
  },
  ctaSecondary: {
    marginLeft: "0.5rem",
    padding: "0.45rem 0.8rem",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    background: "#fff",
    color: "#111827",
    fontWeight: 700,
    cursor: "pointer",
    textDecoration: "none",
  },
};

export default function HeaderClient({ isAuthenticated }) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      signOut();
      router.replace("/login");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <li><Link href="/login" style={styles.ctaSecondary}>Login</Link></li>
        <li><Link href="/signup" style={styles.cta}>Sign up</Link></li>
      </>
    );
  }

  return (
    <li>
      <button
        type="button"
        onClick={handleLogout}
        disabled={loggingOut}
        aria-busy={loggingOut}
        style={{
          ...styles.ctaSecondary,
          borderColor: "#ef4444",
          color: "#ef4444",
          cursor: loggingOut ? "not-allowed" : "pointer",
        }}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </button>
    </li>
  );
}
