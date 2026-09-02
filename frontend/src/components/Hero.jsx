import { useEffect, useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MapPin, ArrowRight, Star } from "lucide-react";
import { BUSINESS, HERO_IMAGE } from "@/data";

const HEADLINE = [
  { text: "PRECISION AUTO CARE.", accent: false },
  { text: "DONE RIGHT.", accent: true },
  { text: "THE FIRST TIME.", accent: false },
];

const STATS = [
  { value: "5.0", label: "Google Rating" },
  { value: "Same-Day", label: "Most Repairs" },
  { value: "100%", label: "Honest Pricing" },
];

function useShopOpen() {
  return useMemo(() => {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    return day >= 1 && day <= 5 && hour >= 8 && hour < 17;
  }, []);
}

const HeroCanvas = () => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf;
    let t = 0;
    let dots = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      dots = Array.from({ length: 60 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        v: 0.1 + Math.random() * 0.35,
        r: 0.6 + Math.random() * 1.4,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    const rings = [
      { r: 120, s: 0.35, c: "rgba(255,59,48,0.35)" },
      { r: 210, s: -0.22, c: "rgba(148,163,184,0.22)" },
      { r: 310, s: 0.12, c: "rgba(148,163,184,0.13)" },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const cx = w * 0.82;
      const cy = h * 0.42;
      rings.forEach(({ r, s, c }) => {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(t * s);
        ctx.beginPath();
        ctx.setLineDash([3 * dpr, 16 * dpr]);
        ctx.lineWidth = dpr;
        ctx.strokeStyle = c;
        ctx.arc(0, 0, r * dpr, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      });
      ctx.fillStyle = "rgba(148,163,184,0.28)";
      dots.forEach((d) => {
        d.y -= d.v * dpr;
        if (d.y < -4) d.y = h + 4;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
      t += 0.008;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
};

export default function Hero({ onBook }) {
  const isOpen = useShopOpen();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden pt-16"
    >
      <motion.div style={{ y: bgY }} className="absolute inset-0">
        <img
          src={HERO_IMAGE}
          alt=""
          className="h-[115%] w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background" />
      </motion.div>
      <div className="absolute inset-0 bg-tech-grid opacity-70" />
      <HeroCanvas />
      <div className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-primary/20 blur-[140px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-24 sm:px-8 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 font-mono text-xs font-bold uppercase tracking-[0.3em] text-primary"
          data-testid="hero-overline"
        >
          North Little Rock, AR — Full-Service Repair Shop
        </motion.p>

        <h1 className="font-display font-black uppercase leading-[0.95] tracking-tight">
          {HEADLINE.map((line, i) => (
            <span key={line.text} className="block overflow-hidden pb-1">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: 0.25 + i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`block text-4xl sm:text-6xl lg:text-7xl ${
                  line.accent ? "text-primary" : ""
                }`}
                data-testid={`hero-headline-line-${i}`}
              >
                {line.text}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Brakes, tires, engine, transmission, A/C and everything in between.
          Photo-documented diagnostics, same-day turnaround on most repairs,
          and warranty work handled directly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            data-testid="hero-call-btn"
            href={BUSINESS.phoneHref}
            className="group relative flex h-12 items-center gap-3 bg-primary px-7 font-mono text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
          >
            <span className="absolute -inset-1 -z-10 animate-ping rounded-sm bg-primary/30" />
            <Phone className="h-4 w-4" />
            Call {BUSINESS.phone}
          </a>
          <a
            data-testid="hero-directions-btn"
            href={BUSINESS.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center gap-3 border border-border px-7 font-mono text-sm uppercase tracking-wider transition-colors hover:border-primary hover:text-primary"
          >
            <MapPin className="h-4 w-4" />
            Directions
          </a>
          <button
            data-testid="hero-book-btn"
            onClick={onBook}
            className="group flex h-12 items-center gap-2 font-mono text-sm uppercase tracking-wider text-muted-foreground transition-colors hover:text-primary"
          >
            Book a service
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <div
            data-testid="hero-shop-status"
            className="inline-flex items-center gap-3 border border-border bg-card/60 px-4 py-2 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${
                  isOpen ? "bg-emerald-400" : "bg-red-500"
                }`}
              />
              <span
                className={`relative inline-flex h-2 w-2 rounded-full ${
                  isOpen ? "bg-emerald-400" : "bg-red-500"
                }`}
              />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.2em]">
              {isOpen ? "Open now · until 5:00 PM" : "Closed · Mon–Fri 8AM–5PM"}
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-16 grid max-w-2xl grid-cols-3 divide-x divide-border border border-border bg-card/40 backdrop-blur"
          data-testid="hero-stats"
        >
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-5 sm:px-6">
              <div className="flex items-center gap-1 font-display text-xl font-extrabold sm:text-2xl">
                {s.value}
                {s.value === "5.0" && (
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                )}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
