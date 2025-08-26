// app/components/Header.js
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import HeaderClient from "./HeaderClient";

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
};

export default async function Header() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  const isAuthenticated = Boolean(token?.value);

  return (
    <header style={styles.header}>
      <div style={styles.inner}>
        <Link href="/" style={styles.brand}>
          <Image src="/bird_2.jpg" alt="Store Logo" width={40} height={40} />
          <span style={styles.title}>My E-commerce Store</span>
        </Link>

        <nav style={styles.nav}>
          <ul style={styles.list}>
            <li><Link href="/" style={styles.link}>Home</Link></li>
            <li><Link href="/products" style={styles.link}>Products</Link></li>
            <li><Link href="/about" style={styles.link}>About</Link></li>
            <li><Link href="/contact" style={styles.link}>Contact</Link></li>

            <HeaderClient isAuthenticated={isAuthenticated} />
          </ul>
        </nav>
      </div>
    </header>
  );
}
