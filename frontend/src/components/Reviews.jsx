import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import { REVIEWS } from "@/data";

const Stars = ({ size = "h-4 w-4" }) => (
  <div className="flex gap-1 text-amber-400">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`${size} fill-current`} />
    ))}
  </div>
);

export default function Reviews() {
  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="relative border-t border-border py-20 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-4"
          >
            <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary">
              Word on the Street
            </p>
            <div className="flex items-end gap-3">
              <span className="font-display text-7xl font-black leading-none sm:text-8xl">
                5.0
              </span>
              <div className="pb-2">
                <Stars size="h-5 w-5" />
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-muted-foreground">
                  Verified Google rating
                </p>
              </div>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <BadgeCheck className="h-4 w-4 text-primary" />
              Every review earned in the bay, not bought online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                data-testid={`review-card-${i}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                className="flex flex-col border border-border bg-card p-6 sm:p-8"
              >
                <Stars />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                  “{r.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <p className="font-display text-sm font-bold uppercase tracking-wide">
                    {r.name}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {r.when} · Google review
                  </p>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
