"use client";

import React from "react";
import Link from "next/link";

const styles = {
  footer: {
    marginTop: "3rem",
    borderTop: "1px solid #e5e7eb",
    background: "#0f172a", // slate-900
    color: "#cbd5e1",      // slate-300
  },
  container: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "2rem 1rem",
  },
  top: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gap: "1.25rem",
  },
  brandCol: {
    gridColumn: "span 12",
    display: "flex",
    flexDirection: "column",
    gap: "0.375rem",
  },
  brand: { fontWeight: 800, fontSize: "1.125rem", color: "#ffffff" },
  tagline: { margin: 0, color: "#94a3b8" },
  // For wider screens, split links into columns
  linkCol: { gridColumn: "span 6" },
  linkTitle: {
    fontWeight: 700,
    fontSize: "0.95rem",
    color: "#e2e8f0",
    marginBottom: "0.5rem",
  },
  list: { listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.375rem" },
  link: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontWeight: 500,
    padding: "0.25rem 0",
    display: "inline-block",
    borderRadius: 8,
    transition: "color 120ms ease, background 120ms ease",
  },
  linkHover: { color: "#ffffff", background: "rgba(255,255,255,0.04)" },
  bottom: {
    marginTop: "1.25rem",
    paddingTop: "1rem",
    borderTop: "1px solid rgba(148, 163, 184, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  copyright: { margin: 0, color: "#94a3b8", fontSize: "0.9rem" },
  social: { display: "flex", gap: "0.5rem" },
  socialLink: {
    width: 36,
    height: 36,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    color: "#e2e8f0",
    textDecoration: "none",
    background: "rgba(255,255,255,0.04)",
    transition: "background 120ms ease, color 120ms ease",
  },
  socialHover: { background: "rgba(255,255,255,0.08)", color: "#ffffff" },
};

function useHover() {
  const [hovered, setHovered] = React.useState(false);
  return {
    hovered,
    bind: { onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) },
  };
}

const Footer = () => {
  const year = new Date().getFullYear();

  // Hovers for each nav/social link (inline styles don’t support :hover)
  const homeH = useHover();
  const productsH = useHover();
  const aboutH = useHover();
  const contactH = useHover();

  const xH = useHover();
  const igH = useHover();
  const ghH = useHover();
  const liH = useHover();

  return (
    <footer style={styles.footer} aria-label="Footer">
      <div style={styles.container}>
        <div style={styles.top}>
          <div style={styles.brandCol}>
            <span style={styles.brand}>My E-commerce Store</span>
            <p style={styles.tagline}>Quality products, great prices, fast delivery.</p>
          </div>

          <div style={{ ...styles.linkCol, gridColumn: "span 6" }}>
            <h4 style={styles.linkTitle}>Shop</h4>
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
            </ul>
          </div>

          <div style={{ ...styles.linkCol, gridColumn: "span 6" }}>
            <h4 style={styles.linkTitle}>Company</h4>
            <ul style={styles.list}>
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
            </ul>
          </div>
        </div>

        <div style={styles.bottom}>
          <p style={styles.copyright}>
            © {year} My E-commerce Store. All rights reserved.
          </p>

          <div style={styles.social} aria-label="Social links">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              style={{ ...styles.socialLink, ...(xH.hovered ? styles.socialHover : null) }}
              {...xH.bind}
            >
              𝕏
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              style={{ ...styles.socialLink, ...(igH.hovered ? styles.socialHover : null) }}
              {...igH.bind}
            >
              ⌀
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              style={{ ...styles.socialLink, ...(ghH.hovered ? styles.socialHover : null) }}
              {...ghH.bind}
            >
              GH
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              style={{ ...styles.socialLink, ...(liH.hovered ? styles.socialHover : null) }}
              {...liH.bind}
            >
              in
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
