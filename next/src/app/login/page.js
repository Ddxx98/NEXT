"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation"; // App Router

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
    // clear field-level error as user types
    setErrors((s) => ({ ...s, [name]: undefined }));
    setServerError("");
  };

  const validate = (data) => {
    const err = {};
    if (!data.email) {
      err.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      err.email = "Enter a valid email";
    }
    if (!data.password) {
      err.password = "Password is required";
    } else if (data.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }
    return err;
  };

  const isValid = useMemo(() => Object.keys(validate(formData)).length === 0, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure cookies (if using httpOnly session)
        body: JSON.stringify(formData),
      });

      // If API returns JSON with { error } on failure, handle accordingly
      if (!res.ok) {
        let message = "Login failed";
        try {
          const text = await res.text();
          // attempt to parse JSON; fallback to raw text
          const parsed = JSON.parse(text);
          message = parsed?.error || message;
        } catch {
          // ignore JSON parse errors
        }
        setServerError(message);
        return;
      }

      // success
      // Optionally read tokens from headers/cookies here
      // redirect to protected page
      router.replace("/products");
    } catch (err) {
      setServerError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // minimal inline styling per earlier preference
  const styles = {
    page: { maxWidth: 420, margin: "4rem auto", padding: "2rem 1.5rem", border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff" },
    title: { margin: 0, marginBottom: "0.5rem", fontSize: "1.5rem", fontWeight: 700 },
    subtitle: { margin: 0, marginBottom: "1rem", color: "#6b7280", fontSize: "0.95rem" },
    form: { display: "grid", gap: "0.85rem" },
    label: { display: "grid", gap: "0.375rem", fontWeight: 600, color: "#111827" },
    input: (hasError) => ({
      padding: "0.65rem 0.75rem",
      borderRadius: 8,
      border: `1px solid ${hasError ? "#ef4444" : "#d1d5db"}`,
      outline: "none",
      fontSize: "0.95rem",
      transition: "border-color 150ms ease, box-shadow 150ms ease",
    }),
    error: { color: "#b91c1c", fontSize: "0.85rem", marginTop: "-0.25rem" },
    serverError: { color: "#b91c1c", background: "#fee2e2", border: "1px solid #fecaca", padding: "0.5rem 0.75rem", borderRadius: 8, fontSize: "0.9rem" },
    button: (disabled) => ({
      marginTop: "0.5rem",
      padding: "0.7rem 0.9rem",
      borderRadius: 8,
      border: "1px solid #2563eb",
      background: disabled ? "#93c5fd" : "#2563eb",
      color: "#fff",
      fontWeight: 700,
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "filter 120ms ease",
    }),
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Login</h1>
      <p style={styles.subtitle}>Access the dashboard and manage products.</p>

      {serverError ? <div role="alert" aria-live="assertive" style={styles.serverError}>{serverError}</div> : null}

      <form onSubmit={handleSubmit} style={styles.form} noValidate>
        <label style={styles.label}>
          <span>Email</span>
          <input
            type="email"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            style={styles.input(Boolean(errors.email))}
            required
          />
          {errors.email ? (
            <span id="email-error" style={styles.error}>
              {errors.email}
            </span>
          ) : null}
        </label>

        <label style={styles.label}>
          <span>Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••"
            aria-invalid={Boolean(errors.password)}
            aria-describedby={errors.password ? "password-error" : undefined}
            style={styles.input(Boolean(errors.password))}
            required
          />
          {errors.password ? (
            <span id="password-error" style={styles.error}>
              {errors.password}
            </span>
          ) : null}
        </label>

        <button type="submit" disabled={submitting || !isValid} style={styles.button(submitting || !isValid)}>
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
