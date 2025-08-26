"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "saturate(180%) blur(8px)",
    borderBottom: "1px solid #e5e7eb",
  },
  inner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "#111827",
  },
  title: { fontWeight: 800, fontSize: "1.125rem", letterSpacing: "-0.01em" },
  nav: { marginLeft: "auto" },
  list: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  link: {
    textDecoration: "none",
    color: "#374151",
    fontWeight: 600,
    padding: "0.4rem 0.6rem",
    borderRadius: 8,
    transition: "background 120ms ease, color 120ms ease",
  },
  linkHover: { background: "#f3f4f6", color: "#111827" },
  cta: {
    marginLeft: "0.5rem",
    padding: "0.45rem 0.8rem",
    borderRadius: 10,
    border: "1px solid #2563eb",
    background: "#2563eb",
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
    transition: "filter 120ms ease",
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
  },
};

function useHover() {
  const [hovered, setHovered] = useState(false);
  return {
    hovered,
    bind: {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
    },
  };
}

export default function Header() {
  const router = useRouter();
  const [hasToken, setHasToken] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Read token from cookies on client
  useEffect(() => {
    // Example cookie name; adjust to the app’s cookie key
    const tokenCookieName = "token";
    const cookieStr = typeof document !== "undefined" ? document.cookie : "";
    const present =
      cookieStr
        ?.split(";")
        .map((c) => c.trim())
        .some((c) => c.startsWith(`${tokenCookieName}=`)) ?? false;
    setHasToken(present);
  }, []);

  const handleLogout = async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }).catch(() => {});
      // Best: server clears httpOnly cookie. Fallback: client-expire a non-httpOnly cookie if used.
      document.cookie = `token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;
      setHasToken(false);
      // After logout, go to home and refresh cache
      router.replace("/");
      router.refresh();
    } finally {
      setLoggingOut(false);
    }
  };

  // Simple hover helpers for links (inline styles don’t support :hover)
  const homeH = useHover();
  const productsH = useHover();
  const aboutH = useHover();
  const contactH = useHover();

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link href="/" style={styles.brand}>
          {/* Use forward slashes in src path */}
          <Image src="/bird_2.jpg" alt="Store Logo" width={40} height={40} />
          <span style={styles.title}>My E-commerce Store</span>
        </Link>

        <nav style={styles.nav}>
          <ul style={styles.list}>
            <li>
              <Link
                href="/"
                style={{ ...styles.link, ...(homeH.hovered ? styles.linkHover : null) }}
                {...homeH.bind}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                style={{ ...styles.link, ...(productsH.hovered ? styles.linkHover : null) }}
                {...productsH.bind}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                style={{ ...styles.link, ...(aboutH.hovered ? styles.linkHover : null) }}
                {...aboutH.bind}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                style={{ ...styles.link, ...(contactH.hovered ? styles.linkHover : null) }}
                {...contactH.bind}
              >
                Contact
              </Link>
            </li>

            {!hasToken ? (
              <>
                <li>
                  <Link href="/login" style={styles.ctaSecondary}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" style={styles.cta}>
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  style={{
                    ...styles.ctaSecondary,
                    borderColor: "#ef4444",
                    color: "#ef4444",
                    cursor: loggingOut ? "not-allowed" : "pointer",
                  }}
                  aria-busy={loggingOut}
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}