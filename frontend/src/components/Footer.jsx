import { Phone, MapPin } from "lucide-react";
import { BUSINESS } from "@/data";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="relative overflow-hidden border-t border-border"
    >
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-8 lg:px-16">
        <p
          className="text-stroke-ghost select-none whitespace-nowrap font-display text-[13vw] font-black uppercase leading-none tracking-tight lg:text-[10rem]"
          aria-hidden="true"
        >
          MP AUTO
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            <a
              data-testid="footer-call-link"
              href={BUSINESS.phoneHref}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <Phone className="h-3.5 w-3.5" />
              {BUSINESS.phone}
            </a>
            <a
              data-testid="footer-directions-link"
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-primary"
            >
              <MapPin className="h-3.5 w-3.5" />
              {BUSINESS.address}
            </a>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} MP Automotive Repair · North Little Rock, AR
          </p>
        </div>
      </div>
    </footer>
  );
}
