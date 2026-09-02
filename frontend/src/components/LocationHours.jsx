import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Navigation,
  Accessibility,
  CreditCard,
  Clock,
} from "lucide-react";
import { BUSINESS, HOURS } from "@/data";

export default function LocationHours() {
  const today = new Date().getDay();

  return (
    <section
      id="visit"
      data-testid="visit-section"
      className="relative border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary"
        >
          Find the Shop
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl lg:text-4xl"
        >
          Hours & directions
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="border border-border bg-card"
            data-testid="hours-table"
          >
            <div className="flex items-center gap-3 border-b border-border px-6 py-4">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                Shop Hours
              </span>
            </div>
            <ul>
              {HOURS.map((h) => {
                const isToday = h.jsDay === today;
                return (
                  <li
                    key={h.day}
                    data-testid={`hours-row-${h.day.toLowerCase()}`}
                    className={`flex items-center justify-between px-6 py-3.5 text-sm ${
                      isToday
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground"
                    } border-b border-border/50 last:border-0`}
                  >
                    <span className="flex items-center gap-2 font-medium">
                      {h.day}
                      {isToday && (
                        <span className="bg-primary px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-white">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-xs tracking-wider">
                      {h.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col border border-border bg-card"
            data-testid="location-card"
          >
            <div className="relative flex-1 overflow-hidden bg-tech-grid p-8">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-16 w-16 items-center justify-center">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/25" />
                  <MapPin className="relative h-8 w-8 text-primary" />
                </span>
              </div>
            </div>
            <div className="p-6 sm:p-8">
              <p className="font-display text-lg font-bold uppercase tracking-wide">
                {BUSINESS.name}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {BUSINESS.address}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  data-testid="location-call-btn"
                  href={BUSINESS.phoneHref}
                  className="flex h-11 items-center gap-2 bg-primary px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
                >
                  <Phone className="h-3.5 w-3.5" />
                  {BUSINESS.phone}
                </a>
                <a
                  data-testid="location-directions-btn"
                  href={BUSINESS.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 items-center gap-2 border border-border px-5 font-mono text-xs uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  Open in Google Maps
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  { icon: Accessibility, label: "Wheelchair accessible entrance & parking" },
                  { icon: CreditCard, label: "Credit & debit cards accepted" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  >
                    <Icon className="h-3.5 w-3.5 text-primary" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
