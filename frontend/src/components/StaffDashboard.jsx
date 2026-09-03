import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, ArrowLeft, Lock, RefreshCw, Inbox } from "lucide-react";
import { BUSINESS, SERVICES } from "@/data";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const serviceName = (id) =>
  SERVICES.find((s) => s.id === id)?.name ||
  (id === "other" ? "Something else / not sure" : id);

const inputCls =
  "w-full border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary placeholder:text-muted-foreground/60";

export default function StaffDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [authState, setAuthState] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loadingList, setLoadingList] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let res = await fetch(`${API}/auth/me`, { credentials: "include" });
        if (res.status === 401) {
          const r = await fetch(`${API}/auth/refresh`, {
            method: "POST",
            credentials: "include",
          });
          if (r.ok)
            res = await fetch(`${API}/auth/me`, { credentials: "include" });
        }
        if (!res.ok) throw new Error("not authenticated");
        setUser(await res.json());
        setAuthState(true);
      } catch {
        setAuthState(false);
      }
    };
    checkAuth();
  }, []);

  const submitLogin = async (e) => {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(loginForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data.detail;
        throw new Error(
          typeof detail === "string"
            ? detail
            : Array.isArray(detail)
              ? detail.map((d) => d?.msg).filter(Boolean).join(" ")
              : "Login failed"
        );
      }
      setUser(data);
      setAuthState(true);
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setLoggingIn(false);
    }
  };

  const loadAppointments = async () => {
    setLoadingList(true);
    try {
      const res = await fetch(`${API}/appointments`, { credentials: "include" });
      if (res.ok) setAppointments(await res.json());
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    if (authState === true) loadAppointments();
  }, [authState]);

  const logout = async () => {
    await fetch(`${API}/auth/logout`, { method: "POST", credentials: "include" });
    navigate("/", { replace: true });
  };

  if (authState === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Checking access…
        </p>
      </div>
    );
  }

  if (authState === false) {
    return (
      <div
        data-testid="staff-login-form"
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4"
      >
        <span className="flex h-14 w-14 items-center justify-center bg-primary font-display text-lg font-black text-white">
          MP
        </span>
        <div className="text-center">
          <h1 className="font-display text-2xl font-extrabold uppercase">
            Staff sign in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the shop's staff credentials to view appointment requests.
          </p>
        </div>
        <form onSubmit={submitLogin} className="w-full max-w-sm space-y-4">
          <input
            data-testid="staff-email-input"
            type="email"
            required
            autoComplete="username"
            placeholder="Staff email"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
            className={inputCls}
          />
          <input
            data-testid="staff-password-input"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Password"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
            className={inputCls}
          />
          {loginError && (
            <p
              data-testid="staff-login-error"
              className="border border-primary/40 bg-primary/10 px-4 py-2 font-mono text-xs text-primary"
            >
              {loginError}
            </p>
          )}
          <button
            data-testid="staff-login-submit-btn"
            type="submit"
            disabled={loggingIn}
            className="flex h-12 w-full items-center justify-center gap-2 bg-primary font-mono text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 disabled:opacity-60"
          >
            <Lock className="h-4 w-4" />
            {loggingIn ? "Signing in…" : "Sign In"}
          </button>
        </form>
        <Link
          to="/"
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to site
        </Link>
      </div>
    );
  }

  return (
    <div data-testid="staff-dashboard" className="min-h-screen">
      <header className="border-b border-border bg-card/60 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center bg-primary font-display text-sm font-black text-white">
              MP
            </span>
            <div>
              <p className="font-display text-sm font-bold uppercase tracking-[0.15em]">
                Service Requests
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                {user?.name || user?.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              data-testid="staff-refresh-btn"
              onClick={loadAppointments}
              className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
              aria-label="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${loadingList ? "animate-spin" : ""}`} />
            </button>
            <Link
              data-testid="staff-back-link"
              to="/"
              className="flex h-9 items-center gap-2 border border-border px-4 font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <button
              data-testid="staff-logout-btn"
              onClick={logout}
              className="flex h-9 items-center gap-2 bg-primary px-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
        {appointments.length === 0 ? (
          <div
            data-testid="appointments-empty"
            className="flex flex-col items-center gap-4 border border-dashed border-border py-24 text-center"
          >
            <Inbox className="h-8 w-8 text-muted-foreground" />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              No appointment requests yet
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-border" data-testid="appointments-table">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-card font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <th className="px-4 py-3">Requested</th>
                  <th className="px-4 py-3">Customer</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Vehicle</th>
                  <th className="px-4 py-3">Slot</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr
                    key={a.id}
                    data-testid={`appointment-row-${a.id}`}
                    className="border-b border-border/50 last:border-0 hover:bg-card/60"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                      {new Date(a.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold">{a.client_name}</p>
                      <a
                        href={`tel:${a.phone}`}
                        className="font-mono text-xs text-primary hover:underline"
                      >
                        {a.phone}
                      </a>
                      {a.email && (
                        <p className="font-mono text-xs text-muted-foreground">{a.email}</p>
                      )}
                    </td>
                    <td className="px-4 py-3">{serviceName(a.service_id)}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.vehicle_info || "—"}</td>
                    <td className="px-4 py-3 font-mono text-xs">
                      {a.preferred_date} · {a.preferred_time}
                    </td>
                    <td className="max-w-[220px] px-4 py-3 text-xs text-muted-foreground">
                      {a.notes || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Confirm every request by phone · {BUSINESS.phone}
        </p>
      </main>
    </div>
  );
}
