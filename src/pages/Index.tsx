import { motion } from "motion/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Phone, MapPin, Clock, Users, Star, ChevronDown, CalendarCheck, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SUPPORTED_LOCALES, type SupportedLocale, setLocaleInPath } from "@/i18n";
import {
  massageServices, saunaServices, IMG,
  LOGO_URL, PHONE, TEL_HREF, TG_LINK, INSTAGRAM,
} from "@/lib/services-data.ts";

type Branch  = "karasaray" | "sergeli" | "c1";
type DayType = "weekday" | "weekend";

const pricingData = {
  karasaray: {
    name: "Карасарай",
    sauna: {
      weekday: [
        { time: "11:00 – 14:00", price: "180 000" }, { time: "14:00 – 19:00", price: "220 000" },
        { time: "19:00 – 00:00", price: "280 000" }, { time: "00:00 – 04:00", price: "380 000" },
      ],
      weekend: [
        { time: "11:00 – 14:00", price: "250 000" }, { time: "14:00 – 19:00", price: "300 000" },
        { time: "19:00 – 00:00", price: "350 000" }, { time: "00:00 – 04:00", price: "400 000" },
      ],
    },
    vip: {
      weekday: [
        { time: "11:00 – 14:00", price: "250 000" }, { time: "14:00 – 19:00", price: "300 000" },
        { time: "19:00 – 00:00", price: "400 000" }, { time: "00:00 – 04:00", price: "450 000" },
      ],
      weekend: [
        { time: "11:00 – 14:00", price: "330 000" }, { time: "14:00 – 19:00", price: "380 000" },
        { time: "19:00 – 00:00", price: "430 000" }, { time: "00:00 – 04:00", price: "480 000" },
      ],
    },
    extra: "70 000",
  },
  sergeli: {
    name: "Сергели / Авиасозлар",
    sauna: {
      weekday: [
        { time: "11:00 – 14:00", price: "180 000" }, { time: "14:00 – 19:00", price: "240 000" },
        { time: "19:00 – 00:00", price: "280 000" }, { time: "00:00 – 04:00", price: "300 000" },
      ],
      weekend: [
        { time: "11:00 – 14:00", price: "250 000" }, { time: "14:00 – 19:00", price: "290 000" },
        { time: "19:00 – 00:00", price: "340 000" }, { time: "00:00 – 04:00", price: "400 000" },
      ],
    },
    vip: {
      weekday: [
        { time: "11:00 – 14:00", price: "250 000" }, { time: "14:00 – 19:00", price: "300 000" },
        { time: "19:00 – 00:00", price: "350 000" }, { time: "00:00 – 04:00", price: "400 000" },
      ],
      weekend: [
        { time: "11:00 – 14:00", price: "300 000" }, { time: "14:00 – 19:00", price: "350 000" },
        { time: "19:00 – 00:00", price: "400 000" }, { time: "00:00 – 04:00", price: "450 000" },
      ],
    },
    extra: "60 000",
  },
  c1: {
    name: "Ц1 / Паркент",
    sauna: {
      weekday: [
        { time: "11:00 – 14:00", price: "200 000" }, { time: "14:00 – 19:00", price: "250 000" },
        { time: "19:00 – 00:00", price: "300 000" }, { time: "00:00 – 04:00", price: "350 000" },
      ],
      weekend: [
        { time: "11:00 – 14:00", price: "250 000" }, { time: "14:00 – 19:00", price: "300 000" },
        { time: "19:00 – 00:00", price: "350 000" }, { time: "00:00 – 04:00", price: "400 000" },
      ],
    },
    vip: null,
    extra: "70 000",
  },
} satisfies Record<Branch, {
  name: string;
  sauna: { weekday: { time: string; price: string }[]; weekend: { time: string; price: string }[] };
  vip: { weekday: { time: string; price: string }[]; weekend: { time: string; price: string }[] } | null;
  extra: string;
}>;

const spaProgramsBase = [
  { duration: "70", price: "620 000" },
  { duration: "60", price: "600 000" },
  { duration: "75", price: "700 000" },
  { duration: "90", price: "870 000" },
  { duration: "60", price: "580 000" },
];

const promosDiscounts = ["−20%", "−50%", "2+1", "+Sauna"];

const branchMaps = [
  "https://yandex.ru/maps/org/spa_salon_lotus/142852799852?si=1xkw6vc9febqeq652mmtczg4g0",
  "https://yandex.ru/maps?text=41.214138,69.250587&si=1xkw6vc9febqeq652mmtczg4g0",
  "https://yandex.ru/maps/org/lotus/200576364332?si=1xkw6vc9febqeq652mmtczg4g0",
  "https://yandex.ru/maps/org/lotus_spa/160305475985?si=1xkw6vc9febqeq652mmtczg4g0",
  "https://yandex.ru/maps/org/lotus/208608820890?si=1xkw6vc9febqeq652mmtczg4g0",
];

const bodyCarePrices = [
  { duration: "20 min", price: "230 000", img: IMG.scrub },
  { duration: "20 min", price: "200 000", img: IMG.piling },
  { duration: "20 min", price: "180 000", img: IMG.foam },
];

const parkaPrices = [
  { duration: "10 min", price: "150 000" },
  { duration: "15 min", price: "170 000" },
  { duration: "30 min", price: "280 000" },
];

const whyUs = (t: (k: string) => string) => [
  { icon: Star,  title: t("why.masters"),  desc: t("why.masters_desc") },
  { icon: Users, title: t("why.approach"), desc: t("why.approach_desc") },
  { icon: Clock, title: t("why.schedule"), desc: t("why.schedule_desc") },
];

const serviceCategories = (t: (k: string) => string) => [
  {
    key: "massage",
    label: t("services.massage_label"),
    count: `${massageServices.length} ${t("nav.massage").toLowerCase()}`,
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
    href: "#massage-list",
  },
  {
    key: "sauna",
    label: t("services.sauna_label"),
    count: `${saunaServices.length} ${t("nav.sauna").toLowerCase()}`,
    img: "https://images.unsplash.com/photo-1712659604528-b179a3634560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
    href: "#sauna-list",
  },
  {
    key: "body-care",
    label: t("services.bodycare_label"),
    count: t("services.bodycare_count"),
    img: "https://images.unsplash.com/photo-1597010804526-2fcb8a09865b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
    href: "#body-care",
  },
  {
    key: "programs",
    label: t("services.programs_label"),
    count: `${spaProgramsBase.length} ${t("nav.programs").toLowerCase()}`,
    img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
    href: "#programs",
  },
  {
    key: "promos",
    label: t("services.promos_label"),
    count: `${promosDiscounts.length} ${t("nav.promos").toLowerCase()}`,
    img: "https://images.unsplash.com/photo-1781736363509-a2327b675a03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
    href: "#promos",
  },
  {
    key: "pricing",
    label: t("services.pricing_label"),
    count: t("services.sauna_count"),
    img: "https://hercules-cdn.com/file_BY7zaTrcX6sXhWt74rdo6eGU",
    href: "#pricing",
  },
];

function VideoCard({ videoId }: { videoId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const src = isVisible
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=1&rel=0&playsinline=1`
    : "";

  return (
    <div ref={containerRef} className="rounded-2xl overflow-hidden aspect-[9/16] bg-muted">
      {src && (
        <iframe
          src={src}
          className="w-full h-full"
          allow="autoplay; fullscreen"
          allowFullScreen
          loading="lazy"
          title={`Lotus Spa video ${videoId}`}
        />
      )}
    </div>
  );
}

function ActionButtons({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const { t } = useTranslation("common");
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={TEL_HREF} className={`flex items-center gap-2 border px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer font-sans tracking-wide ${light ? "border-white/40 text-white hover:bg-white/10" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
        <Phone className="w-4 h-4" /> {t("call.btn")}
      </a>
      <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer font-sans tracking-wide ${light ? "bg-white text-neutral-900 hover:bg-white/90" : "bg-primary text-white hover:opacity-90"}`}>
        <CalendarCheck className="w-4 h-4" /> {t("book.btn")}
      </a>
    </div>
  );
}

function Label({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className={`text-[11px] tracking-[0.35em] uppercase font-medium mb-3 font-sans ${light ? "text-white/45" : "text-accent"}`}>
      {children}
    </p>
  );
}

export default function Index() {
  const [activeBranch, setActiveBranch] = useState<Branch>("karasaray");
  const [dayType, setDayType]           = useState<DayType>("weekday");
  const branch = pricingData[activeBranch];
  const { t } = useTranslation("common");
  const { lng } = useParams<{ lng: string }>();
  const navigate = useNavigate();

  const handleLangSwitch = (newLng: SupportedLocale) => {
    const newPath = setLocaleInPath(newLng, `/${lng ?? "ru"}`);
    navigate(newPath);
  };

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer">
            <img src={LOGO_URL} alt="Lotus Spa" className="w-10 h-10 rounded-full object-contain bg-white/5 shrink-0" />
            <div>
              <div className="font-sans text-xl font-medium text-primary leading-tight tracking-widest uppercase">Lotus</div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground leading-tight font-sans">Spa & Hammam</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-light tracking-widest uppercase">
            {(["#services", "#sauna-list", "#pricing", "#programs", "#promos"] as const).map((href, i) => {
              const labels = [t("nav.massage"), t("nav.sauna"), t("pricing.label"), t("nav.programs"), t("nav.promos")];
              return (
                <a key={href} href={href} className="hover:text-primary transition-colors cursor-pointer text-foreground/55 text-[11px]">{labels[i]}</a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1 border border-border rounded-full p-0.5 mr-1">
              {(Object.keys(SUPPORTED_LOCALES) as SupportedLocale[]).map((code) => {
                const meta = SUPPORTED_LOCALES[code];
                const isActive = lng === code;
                return (
                  <button
                    key={code}
                    onClick={() => handleLangSwitch(code)}
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium transition-all cursor-pointer font-sans ${isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <span>{meta.flag}</span>
                    <span className="hidden sm:inline tracking-wider uppercase">{meta.code}</span>
                  </button>
                );
              })}
            </div>
            <a href={TEL_HREF} className="hidden sm:flex items-center gap-2 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer tracking-wider font-sans">
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">{PHONE}</span>
              <span className="md:hidden">{t("nav.call")}</span>
            </a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer tracking-wider font-sans">
              <CalendarCheck className="w-3 h-3" /> {t("nav.book")}
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1716467195935-2d798a043fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920" alt="Lotus Spa" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[oklch(0.965_0.008_70)]/95" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] as const }}>
            <motion.p initial={{ opacity: 0, letterSpacing: "0.15em" }} animate={{ opacity: 1, letterSpacing: "0.45em" }} transition={{ delay: 0.3, duration: 1.1 } as const} className="text-white/55 text-[10px] uppercase mb-6 font-sans font-light">
              {t("hero.subtitle")}
            </motion.p>
            <h1 className="font-sans text-[4.5rem] md:text-[7.5rem] font-thin text-white leading-none tracking-widest mb-4">Lotus Spa</h1>
            <p className="text-white/55 text-sm font-light tracking-[0.3em] uppercase mb-12 font-sans">{t("hero.tagline")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-neutral-900 px-10 py-3.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/92 transition-all cursor-pointer font-sans">{t("hero.cta_book")}</a>
              <a href={TEL_HREF} className="border border-white/50 text-white px-10 py-3.5 rounded-full text-xs font-light tracking-[0.2em] uppercase hover:bg-white/10 transition-all cursor-pointer font-sans">{PHONE}</a>
            </div>
          </motion.div>
        </div>
        <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2.5 } as const}>
          <ChevronDown className="w-5 h-5 text-white/35" />
        </motion.div>
      </section>

      {/* WHY US */}
      <section className="py-14 px-4 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {whyUs(t).map((item, i) => (
            <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 } as const} viewport={{ once: true }} className="text-center">
              <item.icon className="w-5 h-5 mx-auto mb-3 opacity-60" />
              <div className="font-sans font-medium text-xs tracking-widest uppercase mb-1 opacity-90">{item.title}</div>
              <div className="text-xs opacity-45 font-light font-sans">{item.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SERVICES GRID */}
      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("services.label")}</Label>
            <h2 className="font-sans text-5xl md:text-6xl font-light">{t("services.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories(t).map((cat, i) => (
              <motion.a key={cat.key} href={cat.href} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.5 } as const} viewport={{ once: true }} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer block">
                <img src={cat.img} alt={cat.label} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-500" />
                <div className="absolute top-5 left-5 right-10">
                  <p className="font-sans text-white text-xl md:text-2xl font-light leading-tight">{cat.label}</p>
                  {cat.count && <p className="text-white/55 text-xs font-sans mt-1.5 tracking-wide">{cat.count}</p>}
                </div>
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white/15 transition-all">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* MASSAGE LIST */}
      <section id="massage-list" className="py-20 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("massage.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("massage.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {massageServices.map((card, i) => (
              <motion.div key={card.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.5 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/service/${card.key}`} className="block cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={card.img} alt={card.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {card.tag && <span className="absolute top-3 left-3 text-[10px] font-semibold bg-primary/90 text-primary-foreground px-3 py-1 rounded-full font-sans tracking-wider uppercase">{card.tag}</span>}
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/service/${card.key}`} className="cursor-pointer">
                    <h3 className="font-sans text-xl font-normal mb-1.5 hover:text-primary transition-colors">{t(`service.${card.key}.title`)}</h3>
                  </Link>
                  <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed mb-4">{t(`service.${card.key}.shortDesc`)}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.prices.map((p) => (
                      <div key={p.label} className="text-xs font-sans text-muted-foreground">
                        {p.label} <span className="text-primary font-medium">// {p.price} so'm</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={TEL_HREF} className="flex items-center gap-1.5 border border-border text-foreground/70 px-3.5 py-2 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-all cursor-pointer font-sans"><Phone className="w-3 h-3" /> {t("massage.call")}</a>
                    <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3.5 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer font-sans"><CalendarCheck className="w-3 h-3" /> {t("massage.book")}</a>
                    <Link to={`/service/${card.key}`} className="ml-auto text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer font-sans flex items-center gap-1">{t("massage.more")} <ArrowRight className="w-3 h-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SAUNA LIST */}
      <section id="sauna-list" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("sauna.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("sauna.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {saunaServices.map((item, i) => (
              <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/service/${item.key}`} className="block cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {item.tag && <span className="absolute top-3 left-3 text-[10px] font-semibold bg-primary/90 text-primary-foreground px-3 py-1 rounded-full font-sans tracking-wider uppercase">{item.tag}</span>}
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[10px] text-accent tracking-widest uppercase font-sans mb-1">{t(`service.${item.key}.subtitle`)}</p>
                  <Link to={`/service/${item.key}`} className="cursor-pointer">
                    <h3 className="font-sans text-xl font-normal mb-2 hover:text-primary transition-colors">{t(`service.${item.key}.title`)}</h3>
                  </Link>
                  <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed mb-4">{t(`service.${item.key}.shortDesc`)}</p>
                  <div className="flex items-center gap-2">
                    <a href={TEL_HREF} className="flex items-center gap-1.5 border border-border text-foreground/70 px-3.5 py-2 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-all cursor-pointer font-sans"><Phone className="w-3 h-3" /> {t("massage.call")}</a>
                    <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3.5 py-2 rounded-full text-xs font-medium hover:opacity-90 cursor-pointer font-sans"><CalendarCheck className="w-3 h-3" /> {t("massage.book")}</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BODY CARE */}
      <section id="body-care" className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("bodycare.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("bodycare.title")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {bodyCarePrices.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden">
                  <img src={s.img} alt={t(`bodycare.item.${i}.name`)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="font-sans text-lg mb-1">{t(`bodycare.item.${i}.name`)}</div>
                  <div className="flex items-center justify-between text-xs mb-4 font-sans">
                    <span className="text-muted-foreground">{s.duration}</span>
                    <span className="text-primary font-medium">{s.price} {t("bodycare.sum")}</span>
                  </div>
                  <ActionButtons />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-sans text-2xl font-light mb-6">{t("bodycare.parka")}</h3>
            <div className="grid grid-cols-3 gap-4 mb-7">
              {parkaPrices.map((s, i) => (
                <div key={i} className="text-center">
                  <div className="font-sans text-sm font-medium mb-1">{t(`parka.item.${i}.name`)}</div>
                  <div className="text-xs text-muted-foreground mb-2 font-sans">{s.duration}</div>
                  <div className="font-sans text-xl text-primary">{s.price} <span className="text-xs font-normal">{t("bodycare.sum")}</span></div>
                </div>
              ))}
            </div>
            <ActionButtons />
          </motion.div>
        </div>
      </section>

      {/* VIDEOS */}
      <section id="videos" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("videos.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("videos.title")}</h2>
          </motion.div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {["pbDTTB9Ak5k","546VaaxzeaY","SrdaUn3UT5g","BVd0wcvTMFo","hy-WCsinigM","PVI4APYTLBU","4T1DqLx5s0Y","kTwdForAI1k"].map((id, i) => (
              <motion.div key={id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 } as const} viewport={{ once: true }}>
                <VideoCard videoId={id} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SPA PROGRAMS */}
      <section id="programs" className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label light>{t("programs.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("programs.title")}</h2>
          </motion.div>
          <div className="space-y-2.5 mb-10">
            {spaProgramsBase.map((prog, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 } as const} viewport={{ once: true }} className="flex items-center justify-between bg-white/8 hover:bg-white/12 transition-colors rounded-xl p-5 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-sans text-xl">{t(`program.${i}.name`)}</span>
                    <span className="text-white/40 text-xs font-sans tracking-wide">// {prog.duration}</span>
                  </div>
                  <p className="text-white/45 text-xs font-sans font-light">{t(`program.${i}.desc`)}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-sans text-2xl">{prog.price}</div>
                  <div className="text-white/35 text-xs font-sans">{t("bodycare.sum")}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <ActionButtons light />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("pricing.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("pricing.title")}</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3 mb-7">
            {(Object.keys(pricingData) as Branch[]).map((key) => (
              <button key={key} onClick={() => setActiveBranch(key)} className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer font-sans tracking-wider uppercase ${activeBranch === key ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/40"}`}>
                {t(`pricing.branch.${key}`)}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mb-10">
            {(["weekday", "weekend"] as DayType[]).map((dt) => (
              <button key={dt} onClick={() => setDayType(dt)} className={`px-6 py-2 rounded-full text-xs transition-all cursor-pointer font-sans tracking-wider uppercase ${dayType === dt ? "bg-accent text-accent-foreground" : "border border-border hover:border-accent/50"}`}>
                {dt === "weekday" ? t("pricing.weekday") : t("pricing.weekend")}
              </button>
            ))}
          </div>
          <div className={`grid gap-6 ${branch.vip ? "md:grid-cols-2" : "max-w-sm"}`}>
            <motion.div key={`${activeBranch}-${dayType}-sauna`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="bg-primary text-primary-foreground p-5">
                <h3 className="font-sans text-xl">{t("pricing.sauna_title")}</h3>
                <p className="text-white/45 text-xs mt-1 font-sans">{t("pricing.sauna_desc")}</p>
              </div>
              <div className="p-5">
                {branch.sauna[dayType].map((row) => (
                  <div key={row.time} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-sm font-sans">{row.time}</span></div>
                    <span className="font-sans text-primary text-base">{row.price} <span className="text-xs font-normal text-muted-foreground">{t("bodycare.sum")}</span></span>
                  </div>
                ))}
              </div>
            </motion.div>
            {branch.vip && (
              <motion.div key={`${activeBranch}-${dayType}-vip`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-accent/25 rounded-2xl overflow-hidden">
                <div className="bg-accent text-accent-foreground p-5">
                  <h3 className="font-sans text-xl">{t("pricing.vip_title")}</h3>
                  <p className="text-white/50 text-xs mt-1 font-sans">{t("pricing.vip_desc")}</p>
                </div>
                <div className="p-5">
                  {branch.vip[dayType].map((row) => (
                    <div key={row.time} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-sm font-sans">{row.time}</span></div>
                      <span className="font-sans text-accent text-base">{row.price} <span className="text-xs font-normal text-muted-foreground">{t("bodycare.sum")}</span></span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          <div className="mt-5 bg-muted/60 border border-border rounded-xl p-4 flex items-center gap-3 text-sm font-sans">
            <Users className="w-4 h-4 text-accent shrink-0" />
            <span className="text-muted-foreground text-xs">{t("pricing.extra")} <strong className="text-foreground">{branch.extra} {t("bodycare.sum")} / 1 {t("pricing.per_hour").split(" / 1 ")[1]}</strong></span>
          </div>
          <div className="mt-8"><ActionButtons /></div>
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("promos.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("promos.title")}</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {promosDiscounts.map((discount, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6">
                <span className="inline-block text-[10px] font-semibold bg-primary/8 text-primary px-3 py-1 rounded-full mb-4 font-sans tracking-widest uppercase">{t(`promo.${i}.tag`)}</span>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-xl mb-1.5">{t(`promo.${i}.title`)}</h3>
                    <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed">{t(`promo.${i}.desc`)}</p>
                  </div>
                  <div className="shrink-0 font-sans text-3xl text-accent">{discount}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-xs text-muted-foreground font-sans mb-8">
            <p className="font-medium text-foreground mb-2 text-sm">{t("promos.note_title")}</p>
            <ul className="space-y-1 list-disc list-inside leading-relaxed">
              <li>{t("promos.note1")}</li>
              <li>{t("promos.note2")}</li>
              <li>{t("promos.note3")}</li>
            </ul>
          </div>
          <ActionButtons />
        </div>
      </section>

      {/* BRANCHES */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>{t("branches.label")}</Label>
            <h2 className="font-sans text-5xl font-light">{t("branches.title")}</h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {branchMaps.map((maps, i) => (
              <motion.a key={i} href={maps} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer block">
                <div className="w-10 h-10 bg-primary/8 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <h3 className="font-sans text-xl mb-1 group-hover:text-primary transition-colors">{t(`branches.${i}.name`)}</h3>
                <p className="text-muted-foreground text-xs font-sans mb-3">{t(`branches.${i}.address`)}</p>
                <span className="text-[10px] font-sans text-primary/70 tracking-widest uppercase group-hover:text-primary transition-colors">{t("branches.open_map")}</span>
              </motion.a>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-14 text-center">
            <h3 className="font-sans text-4xl font-light mb-2">{t("cta.title")}</h3>
            <p className="text-white/80 mb-8 font-sans font-light text-xs tracking-widest uppercase">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={TEL_HREF} className="flex items-center justify-center gap-2 bg-transparent border border-white/40 text-white px-8 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer"><Phone className="w-3.5 h-3.5" /> {PHONE}</a>
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white text-neutral-900 px-8 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/90 transition-all cursor-pointer"><CalendarCheck className="w-3.5 h-3.5" /> {t("cta.telegram")}</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Lotus Spa" className="h-9 w-9 object-contain rounded-full" />
            <div>
              <div className="font-sans text-lg font-medium text-primary tracking-widest uppercase">Lotus Spa</div>
              <div className="text-[8px] tracking-[0.25em] uppercase text-muted-foreground font-sans">{t("footer.tagline")}</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground font-sans">
            <a href={TEL_HREF} className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"><Phone className="w-3.5 h-3.5" /> {PHONE}</a>
            <a href="https://instagram.com/lotus_spa.uz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">Instagram: {INSTAGRAM}</a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">Telegram: @spalotus01</a>
          </div>
          <div className="text-[11px] text-muted-foreground font-sans">{t("footer.rights", { year: new Date().getFullYear() })}</div>
        </div>
      </footer>
    </div>
  );
}
