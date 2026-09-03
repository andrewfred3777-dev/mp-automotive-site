import { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, CalendarCheck, Sun, Moon, UserRound } from "lucide-react";
import { BUSINESS } from "@/data";

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

export default function Navbar({ onBook }) {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <header
      data-testid="navbar"
      className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-16">
        <button
          data-testid="nav-logo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-3"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-primary font-display text-sm font-black text-white">
            MP
          </span>
          <span className="hidden font-display text-sm font-bold tracking-[0.2em] sm:block">
            MP AUTOMOTIVE
          </span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
          {[
            ["Standard", "manifesto"],
            ["Services", "services"],
            ["Reviews", "reviews"],
            ["Visit Us", "visit"],
          ].map(([label, id]) => (
            <button
              key={id}
              data-testid={`nav-link-${id}`}
              onClick={() => scrollTo(id)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            data-testid="staff-sign-in-btn"
            to="/staff"
            aria-label="Staff sign in"
            title="Staff sign in"
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <UserRound className="h-4 w-4" />
          </Link>
          <button
            data-testid="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            data-testid="nav-call-btn"
            href={BUSINESS.phoneHref}
            className="hidden h-9 items-center gap-2 border border-border px-4 font-mono text-xs tracking-wider transition-colors hover:border-primary hover:text-primary sm:flex"
          >
            <Phone className="h-3.5 w-3.5" />
            {BUSINESS.phone}
          </a>
          <button
            data-testid="nav-book-btn"
            onClick={onBook}
            className="flex h-9 items-center gap-2 bg-primary px-4 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            Book Service
          </button>
        </div>
      </div>
    </header>
  );
}
