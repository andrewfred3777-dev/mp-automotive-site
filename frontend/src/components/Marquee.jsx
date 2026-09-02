import { MARQUEE_ITEMS } from "@/data";

export default function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div
      data-testid="services-marquee"
      className="overflow-hidden border-y border-border bg-primary py-4"
    >
      <div className="animate-marquee flex w-max items-center gap-8">
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 font-display text-sm font-bold uppercase tracking-[0.25em] text-white"
          >
            {item}
            <span className="text-white/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
