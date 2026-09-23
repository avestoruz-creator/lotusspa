import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import { ChevronLeft, ChevronRight, Download, Maximize2, ZoomIn } from "lucide-react";
import { useTranslation } from "react-i18next";

/**
 * Slider with the full service menu / price list image of every branch.
 * Images live in `public/images/price/` (see README → "Price list images").
 */
export type PriceBranch = "karasaray" | "sergeli" | "c1";
export type PriceLang = "ru" | "uz";

const PRICE_IMG_BASE = "/images/price";

export function priceMenuImage(branch: PriceBranch, lng: PriceLang) {
  return {
    /** 2000px WebP — shown inside the slider */
    preview: `${PRICE_IMG_BASE}/${branch}-${lng}.webp`,
    /** 4200px JPEG — opened in a new tab / downloaded */
    full: `${PRICE_IMG_BASE}/full/${branch}-${lng}.jpg`,
  };
}

// Source images are 6000 × 4243 px (A4 landscape) — keeps the layout stable while loading.
const MENU_ASPECT_RATIO = "6000 / 4243";
const PREVIEW_WIDTH = 2000;
const PREVIEW_HEIGHT = 1414;

const SWIPE_OFFSET_PX = 60;
const SWIPE_VELOCITY = 500;

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 160 : -160, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -160 : 160, opacity: 0 }),
};

interface PriceMenuSliderProps {
  branches: readonly PriceBranch[];
  active: PriceBranch;
  onChange: (branch: PriceBranch) => void;
  lng: PriceLang;
}

export default function PriceMenuSlider({ branches, active, onChange, lng }: PriceMenuSliderProps) {
  const { t } = useTranslation("common");

  const total = branches.length;
  const index = Math.max(0, branches.indexOf(active));
  const branchLabel = t(`pricing.branch.${active}`);
  const { preview, full } = priceMenuImage(active, lng);
  const slideKey = `${active}-${lng}`;

  // Direction of the last change — drives the enter / exit animation.
  // Arrows / swipes set it explicitly (so wrapping 3 → 1 still slides forward);
  // changes coming from outside (branch tabs) derive it from the index delta.
  const pendingDirection = useRef<1 | -1 | null>(null);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lastIndex, setLastIndex] = useState(index);
  if (index !== lastIndex) {
    setDirection(pendingDirection.current ?? (index > lastIndex ? 1 : -1));
    setLastIndex(index);
  }
  useEffect(() => {
    pendingDirection.current = null;
  }, [index]);

  const go = (step: 1 | -1) => {
    pendingDirection.current = step;
    onChange(branches[(index + step + total) % total]);
  };

  // ── Loading state (per image) ──────────────────────────────────────────────
  const [loaded, setLoaded] = useState<Record<string, boolean>>({});
  const markLoaded = useCallback((key: string) => {
    setLoaded((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);
  const isLoaded = !!loaded[slideKey];

  // Prefetch the previews of all branches once the slider scrolls into view,
  // so switching branches doesn't show an empty frame.
  const [inView, setInView] = useState(false);
  const branchesKey = branches.join("|");
  useEffect(() => {
    if (!inView) return;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    for (const branch of branchesKey.split("|") as PriceBranch[]) {
      const img = new Image();
      img.src = priceMenuImage(branch, lng).preview;
    }
  }, [inView, lng, branchesKey]);

  // ── Drag / swipe ───────────────────────────────────────────────────────────
  // A swipe must not be interpreted as a click on the image link.
  const dragging = useRef(false);
  const handleDragStart = () => {
    dragging.current = true;
  };
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const { offset, velocity } = info;
    if (offset.x < -SWIPE_OFFSET_PX || velocity.x < -SWIPE_VELOCITY) go(1);
    else if (offset.x > SWIPE_OFFSET_PX || velocity.x > SWIPE_VELOCITY) go(-1);
    window.setTimeout(() => {
      dragging.current = false;
    }, 150);
  };
  const guardClick = (e: React.MouseEvent) => {
    if (dragging.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  const navBtn =
    "w-9 h-9 rounded-full border border-white/25 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setInView(true)}
      className="mt-12"
    >
      {/* Heading */}
      <div className="mb-6">
        <p className="text-[11px] tracking-[0.35em] uppercase font-medium mb-3 font-sans text-accent">{t("pricing.menu.label")}</p>
        <h3 className="font-sans text-3xl font-light">{t("pricing.menu.title")}</h3>
        <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed mt-3 max-w-2xl">{t("pricing.menu.desc")}</p>
      </div>

      <div
        role="region"
        aria-roledescription="carousel"
        aria-label={t("pricing.menu.label")}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className="bg-card border border-border rounded-2xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        {/* Header: branch name + arrows */}
        <div className="bg-primary text-primary-foreground p-5 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-white/45 text-[10px] tracking-[0.25em] uppercase font-sans">
              {t("pricing.menu.caption")} · {index + 1} / {total}
            </p>
            <h4 className="font-sans text-lg sm:text-xl mt-1 truncate">{branchLabel}</h4>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button type="button" onClick={() => go(-1)} aria-label={t("pricing.menu.prev")} className={navBtn}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => go(1)} aria-label={t("pricing.menu.next")} className={navBtn}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Slide viewport */}
        <div className="relative overflow-hidden bg-muted/40" style={{ aspectRatio: MENU_ASPECT_RATIO }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={slideKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ x: { type: "spring", stiffness: 320, damping: 34 }, opacity: { duration: 0.22 } }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              className="absolute inset-0"
            >
              <a
                href={full}
                target="_blank"
                rel="noopener noreferrer"
                title={t("pricing.menu.hint")}
                onClick={guardClick}
                draggable={false}
                onDragStart={(e) => e.preventDefault()}
                className="group block relative w-full h-full"
              >
                {!isLoaded && <div className="absolute inset-0 animate-pulse bg-muted" aria-hidden="true" />}
                <img
                  src={preview}
                  alt={t("pricing.menu.alt", { branch: branchLabel })}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                  onLoad={() => markLoaded(slideKey)}
                  ref={(el) => {
                    if (el?.complete && el.naturalWidth > 0) markLoaded(slideKey);
                  }}
                  className={`w-full h-full object-contain select-none transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                />
                <span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/55 text-white text-[10px] font-sans tracking-wider uppercase px-3 py-1.5 rounded-full backdrop-blur-sm opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none"
                >
                  <ZoomIn className="w-3.5 h-3.5" /> {t("pricing.menu.open")}
                </span>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer: dots + actions */}
        <div className="px-5 py-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            {branches.map((b, i) => (
              <button
                key={b}
                type="button"
                onClick={() => onChange(b)}
                aria-label={t("pricing.menu.goto", { branch: t(`pricing.branch.${b}`) })}
                aria-current={i === index ? "true" : undefined}
                className={`h-2 rounded-full transition-all cursor-pointer ${i === index ? "w-6 bg-primary" : "w-2 bg-border hover:bg-primary/40"}`}
              />
            ))}
            <span className="ml-3 text-[11px] text-muted-foreground font-sans truncate">{t("pricing.menu.hint")}</span>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <a
              href={full}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-xs font-medium font-sans tracking-wide hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" /> {t("pricing.menu.open")}
            </a>
            <a
              href={full}
              download={`Lotus-Spa-${active}-${lng}.jpg`}
              className="flex items-center gap-2 bg-card border border-border px-4 py-2 rounded-full text-xs font-medium font-sans tracking-wide hover:border-primary/40 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> {t("pricing.menu.download")}
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
