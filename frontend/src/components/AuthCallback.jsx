import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (hasProcessed.current) return;
    hasProcessed.current = true;
    const sessionId = location.hash.split("session_id=")[1]?.split("&")[0];
    const exchange = async () => {
      try {
        const res = await fetch(`${API}/auth/session`, {
          headers: { "X-Session-ID": sessionId },
          credentials: "include",
        });
        if (!res.ok) throw new Error("auth failed");
        const user = await res.json();
        navigate("/staff", { state: { user }, replace: true });
      } catch {
        toast.error("Sign-in failed. Please try again.");
        navigate("/", { replace: true });
      }
    };
    exchange();
  }, [location.hash, navigate]);

  return (
    <div
      data-testid="auth-callback"
      className="flex min-h-screen items-center justify-center"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
        Signing you in…
      </p>
    </div>
  );
}
