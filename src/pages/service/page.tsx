import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Phone, CalendarCheck, ArrowLeft, CheckCircle2, X } from "lucide-react";
import { massageServices, saunaServices, TEL_HREF, TG_LINK, LOGO_URL } from "@/lib/services-data";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const allServices = [...massageServices, ...saunaServices];

export default function ServicePage() {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation("common");

  const service = allServices.find((s) => s.key === key);
  const otherServices = allServices.filter((s) => s.key !== key);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [key]);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-muted-foreground font-sans">{t("service.page.not_found")}</p>
        <Link to="/" className="text-primary underline font-sans text-sm">{t("service.page.to_home")}</Link>
      </div>
    );
  }

  const sk = service.key;
  const title = t(`service.${sk}.title`);
  const subtitle = t(`service.${sk}.subtitle`);
  const fullDesc = t(`service.${sk}.fullDesc`);
  const detailKeys = service.details?.map((_, i) => t(`service.${sk}.detail.${i}`)) ?? [];
  const recommended = service.recommended ? t(`service.${sk}.recommended`) : undefined;

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer font-sans tracking-wider uppercase"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("service.page.back")}
          </button>
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer absolute left-1/2 -translate-x-1/2">
            <img src={LOGO_URL} alt="Lotus Spa" className="h-10 w-10 object-contain rounded-full shrink-0" />
            <span className="font-sans text-base font-medium text-primary tracking-widest uppercase">Lotus Spa</span>
          </Link>
          <button
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <div className="pt-14">
        <div className="max-w-6xl mx-auto px-5 py-14 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-start mb-16"
          >
            <div className="rounded-2xl overflow-hidden aspect-[3/4] md:aspect-[4/5]">
              <motion.img
                src={service.img}
                alt={title}
                className="w-full h-full object-cover"
                initial={{ scale: 1.06 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.4, ease: "easeOut" } as const}
              />
            </div>
            <div className="py-2">
              {service.tag && (
                <motion.span
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 } as const}
                  className="inline-block text-[10px] font-semibold bg-primary/8 text-primary px-4 py-1.5 rounded-full mb-5 font-sans tracking-widest uppercase"
                >
                  {service.tag}
                </motion.span>
              )}
              <h1 className="font-sans text-4xl md:text-5xl font-light mb-4 leading-tight">{title}</h1>
              <p className="text-muted-foreground font-sans font-light text-sm mb-4 italic">{subtitle}</p>
              {service.prices.length > 0 && (
                <p className="text-muted-foreground font-sans font-light text-sm mb-6 tracking-wide">
                  {service.prices.map((p) => p.label).join("-")} // {service.prices.map((p) => p.price).join("–")} UZS
                </p>
              )}
              <div className="space-y-4 mb-8">
                {fullDesc.split("\n\n").map((para, i) => (
                  <p key={i} className="text-foreground/70 font-sans font-light text-sm leading-relaxed">{para}</p>
                ))}
              </div>
              {detailKeys.length > 0 && (
                <div className="mb-8">
                  <p className="text-xs font-sans font-medium tracking-widest uppercase text-accent mb-3">{t("service.page.included")}</p>
                  <ul className="space-y-2">
                    {detailKeys.map((d, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.07 } as const}
                        className="flex items-start gap-2.5 text-sm font-sans text-foreground/70"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary mt-0.5 shrink-0" />
                        {d}
                      </motion.li>
                    ))}
                  </ul>
                  {recommended && (
                    <p className="mt-4 text-xs text-muted-foreground font-sans font-light">{recommended}</p>
                  )}
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                <a href={TEL_HREF} className="flex items-center gap-2 border border-primary text-primary px-7 py-3 rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer font-sans tracking-wider uppercase">
                  <Phone className="w-3.5 h-3.5" /> {t("call.btn")}
                </a>
                <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-full text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer font-sans tracking-wider uppercase">
                  <CalendarCheck className="w-3.5 h-3.5" /> {t("service.page.book_online")}
                </a>
              </div>
            </div>
          </motion.div>

          <div>
            <h2 className="font-sans text-3xl font-light mb-8">{t("service.page.other")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {otherServices.slice(0, 8).map((s, i) => (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 } as const}
                >
                  <Link to={`/service/${s.key}`} className="group block cursor-pointer">
                    <div className="rounded-2xl overflow-hidden aspect-[3/4] mb-3">
                      <img src={s.img} alt={t(`service.${s.key}.title`)} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <p className="font-sans text-base font-light mb-1 group-hover:text-primary transition-colors leading-snug">{t(`service.${s.key}.title`)}</p>
                    <p className="text-muted-foreground text-[11px] font-sans">
                      {s.prices.length > 0
                        ? s.prices.map((p) => `${p.label} // ${p.price}`).join(" · ")
                        : t(`service.${s.key}.subtitle`)}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 } as const}
            className="mt-16 bg-primary text-primary-foreground rounded-2xl p-10 text-center"
          >
            <h3 className="font-sans text-3xl font-light mb-2">{t("service.page.cta_title")}</h3>
            <p className="text-white/75 text-[10px] mb-7 font-sans tracking-widest uppercase">{t("service.page.cta_subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={TEL_HREF} className="flex items-center justify-center gap-2 border border-white/35 text-white px-7 py-3 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer">
                <Phone className="w-3.5 h-3.5" /> {t("call.btn")}
              </a>
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white text-neutral-900 px-7 py-3 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/90 transition-all cursor-pointer">
                <CalendarCheck className="w-3.5 h-3.5" /> {t("service.page.book_online")}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
