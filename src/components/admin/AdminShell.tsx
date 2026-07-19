"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [ready, setReady] = useState(pathname.includes("/login"));
  const isLogin = pathname.includes("/login");

  useEffect(() => {
    if (isLogin) {
      setReady(true);
      return;
    }
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/me");
      const data = (await res.json()) as { authenticated?: boolean };
      if (cancelled) return;
      if (!data.authenticated) {
        router.replace("/admin/login");
      } else {
        setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isLogin, router]);

  if (!ready && !isLogin) {
    return <main className="admin-root"><p className="muted">Checking session…</p></main>;
  }

  if (isLogin) return <>{children}</>;

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  };

  return (
    <div className="admin-root">
      <header className="admin-topnav">
        <Link href="/admin" className="admin-brand">
          Resonance Admin
        </Link>
        <nav>
          <Link href="/admin">Overview</Link>
          <Link href="/admin/frames">Frames</Link>
          <Link href="/admin/projects">Projects</Link>
          <Link href="/admin/import-export">Import / Export</Link>
          <Link href="/" target="_blank">
            Open site
          </Link>
        </nav>
        <button type="button" className="btn-ghost" onClick={() => void logout()}>
          Log out
        </button>
      </header>
      <div className="admin-main">{children}</div>
    </div>
  );
}
