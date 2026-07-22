"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError("Invalid password");
        return;
      }
      router.replace("/admin");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="admin-login">
      <form onSubmit={(e) => void submit(e)} className="overlay-panel">
        <h1>Admin Login</h1>
        <p className="muted">Resonance Archive content editor</p>
        <label className="admin-field">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </label>
        {error && <p className="admin-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={busy}>
          {busy ? "…" : "Enter"}
        </button>
      </form>
    </main>
  );
}
