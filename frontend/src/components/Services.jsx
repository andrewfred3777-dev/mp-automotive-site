import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Disc,
  CircleDot,
  Activity,
  Compass,
  Cpu,
  Cog,
  Wind,
  Zap,
  ShieldCheck,
  Filter,
  Wrench,
  ArrowUpRight,
} from "lucide-react";
import { SERVICES, CATEGORIES, ENGINE_IMAGE } from "@/data";

const ICONS = {
  Disc,
  CircleDot,
  Activity,
  Compass,
  Cpu,
  Cog,
  Wind,
  Zap,
  ShieldCheck,
  Filter,
};

export default function Services({ onBook }) {
  const [category, setCategory] = useState("All");
  const visible =
    category === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === category);

  return (
    <section
      id="services"
      data-testid="services-section"
      className="relative border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute right-0 top-24 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary"
        >
          What We Fix
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl lg:text-4xl"
        >
          Bumper to bumper, under one roof
        </motion.h2>

        <div
          className="mt-10 flex flex-wrap gap-2"
          data-testid="services-filter-tabs"
        >
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`filter-tab-${c.toLowerCase().replace(/[^a-z]/g, "-")}`}
              onClick={() => setCategory(c)}
              className={`border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-colors ${
                category === c
                  ? "border-primary bg-primary text-white"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((s, i) => {
              const Icon = ICONS[s.icon] || Wrench;
              return (
                <motion.article
                  layout
                  key={s.id}
                  data-testid={`service-card-${s.id}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                  whileHover={{ y: -4 }}
                  className="group flex flex-col border border-border bg-card p-6 transition-colors hover:border-primary/60 hover:shadow-glow-red sm:p-8"
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-11 w-11 items-center justify-center border border-border text-primary transition-colors group-hover:border-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {s.category}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wide">
                    {s.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {s.description}
                  </p>
                  <button
                    data-testid={`service-book-btn-${s.id}`}
                    onClick={() => onBook(s.id)}
                    className="mt-6 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.15em] text-primary"
                  >
                    Request this service
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </motion.article>
              );
            })}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="group relative min-h-[280px] overflow-hidden border border-border"
            data-testid="services-spotlight-card"
          >
            <img
              src={ENGINE_IMAGE}
              alt="Engine bay under service"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute inset-3 border border-white/15" />
            <div className="absolute bottom-0 p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-400">
                On the lift
              </p>
              <p className="mt-2 font-display text-xl font-bold uppercase text-white">
                Photo-documented inspections, every job
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
