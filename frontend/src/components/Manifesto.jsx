import { motion } from "framer-motion";
import { CHAPTERS } from "@/data";

export default function Manifesto() {
  return (
    <section
      id="manifesto"
      data-testid="manifesto-section"
      className="relative py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary"
        >
          The MP Standard
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="max-w-2xl font-display text-2xl font-extrabold uppercase tracking-tight sm:text-3xl lg:text-4xl"
        >
          Four promises. Every vehicle. Every visit.
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {CHAPTERS.map((c, i) => (
            <motion.div
              key={c.num}
              data-testid={`manifesto-chapter-${c.num}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group bg-background p-8 transition-colors hover:bg-card sm:p-10"
            >
              <span className="font-mono text-sm font-bold text-primary">
                {c.num}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-wide sm:text-2xl">
                {c.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                {c.text}
              </p>
              <div className="mt-6 h-px w-10 bg-primary transition-all duration-500 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
