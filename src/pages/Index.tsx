import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Phone, MapPin, Clock, Users, Star, ChevronDown, Flame, CalendarCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import {
  massageServices, saunaServices,
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

const spaPrograms = [
  { name: "Классик",      duration: "70 мин", price: "620 000", desc: "Классический 40мин + Голова 10мин + Скраб 10мин + Мойка 10мин" },
  { name: "Спорт",        duration: "60 мин", price: "600 000", desc: "Интенсив 40мин + Голова 10мин + Мойка 10мин" },
  { name: "Здоровье",     duration: "75 мин", price: "700 000", desc: "Оздоровительный 45мин + Голова 10мин + Скраб 10мин + Мойка 10мин" },
  { name: "Царь Соломон", duration: "90 мин", price: "870 000", desc: "Скраб 15мин + Голова 15мин + Оздоровительный 45мин + Мойка 15мин" },
  { name: "Медовый",      duration: "60 мин", price: "580 000", desc: "Медовый 35мин + Скраб 15мин + Мойка 10мин" },
];

const promos = [
  { tag: "Будние до 16:00", title: "Счастливые часы", discount: "−20%", desc: "На массаж 60 минут. Оплата до 16:00, только будние дни" },
  { tag: "11:00 – 14:00",   title: "Сауна утром",     discount: "−50%", desc: "При бронировании от 2х часов, на все типы саун. Будние дни" },
  { tag: "14:00 – 01:00",   title: "Сауна 2+1",       discount: "2+1",  desc: "3-й час в ПОДАРОК. Одна бронь = одна акция. Будние дни" },
  { tag: "Для компании",    title: "Компания девушек", discount: "+Сауна", desc: "От 3 девушек — каждая берёт массаж 60 мин — 1 час сауны в подарок" },
];

const whyUs = [
  { icon: Star,  title: "Профессиональные мастера", desc: "Опытные специалисты" },
  { icon: Flame, title: "Стерильность",             desc: "Строгие стандарты гигиены" },
  { icon: Users, title: "Индивидуальный подход",    desc: "Внимание к каждому гостю" },
  { icon: Clock, title: "Удобный график",           desc: "11:00 – 04:00 ежедневно" },
];

const serviceCategories = [
  {
    key: "massage",
    label: "Массажи тела",
    count: `${massageServices.length} услуг`,
    img: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#massage-list",
  },
  {
    key: "sauna",
    label: "Сауна и Хаммам",
    count: `${saunaServices.length} услуги`,
    img: "https://images.unsplash.com/photo-1712659604528-b179a3634560?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#sauna-list",
  },
  {
    key: "body-care",
    label: "Уход за телом",
    count: "3 услуги",
    img: "https://images.unsplash.com/photo-1597010804526-2fcb8a09865b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#body-care",
  },
  {
    key: "programs",
    label: "Spa программы",
    count: `${spaPrograms.length} программ`,
    img: "https://images.unsplash.com/photo-1700918232124-f64da19e73eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#programs",
  },
  {
    key: "promos",
    label: "Акции",
    count: `${promos.length} предложения`,
    img: "https://images.unsplash.com/photo-1623808222757-67fa5a397c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#promos",
  },
  {
    key: "pricing",
    label: "Цены на аренду",
    count: "3 филиала",
    img: "https://images.unsplash.com/photo-1585815157396-ad62043f721b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=900",
    href: "#pricing",
  },
];

function ActionButtons({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <a href={TEL_HREF} className={`flex items-center gap-2 border px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer font-sans tracking-wide ${light ? "border-white/40 text-white hover:bg-white/10" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}`}>
        <Phone className="w-4 h-4" /> Позвонить
      </a>
      <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all cursor-pointer font-sans tracking-wide ${light ? "bg-white text-foreground hover:bg-white/90" : "bg-primary text-primary-foreground hover:opacity-90"}`}>
        <CalendarCheck className="w-4 h-4" /> Записаться
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

  return (
    <div className="min-h-screen bg-background">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0 cursor-pointer">
            <img
              src={LOGO_URL}
              alt="Lotus Spa"
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div>
              <div className="font-sans text-xl font-medium text-primary leading-tight tracking-widest uppercase">Lotus</div>
              <div className="text-[8px] tracking-[0.3em] uppercase text-muted-foreground leading-tight font-sans">Spa &amp; Hammam</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8 text-sm font-light tracking-widest uppercase">
            {(["#services", "#sauna-list", "#pricing", "#programs", "#promos"] as const).map((href, i) => {
              const labels = ["Массаж", "Сауна", "Цены", "Программы", "Акции"];
              return (
                <a key={href} href={href} className="hover:text-primary transition-colors cursor-pointer text-foreground/55 text-[11px]">{labels[i]}</a>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a href={TEL_HREF} className="hidden sm:flex items-center gap-2 border border-primary/30 text-primary px-4 py-2 rounded-full text-xs font-medium hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer tracking-wider font-sans">
              <Phone className="w-3 h-3" />
              <span className="hidden md:inline">{PHONE}</span>
              <span className="md:hidden">Звонок</span>
            </a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer tracking-wider font-sans">
              <CalendarCheck className="w-3 h-3" /> Записаться
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1716467195935-2d798a043fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920"
            alt="Lotus Spa"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-[oklch(0.965_0.008_70)]/95" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.25, 0.1, 0.25, 1] as const }}
          >
            <motion.p
              initial={{ opacity: 0, letterSpacing: "0.15em" }}
              animate={{ opacity: 1, letterSpacing: "0.45em" }}
              transition={{ delay: 0.3, duration: 1.1 } as const}
              className="text-white/55 text-[10px] uppercase mb-6 font-sans font-light"
            >
              Премиум-спа в Ташкенте
            </motion.p>
            <h1 className="font-sans text-[4.5rem] md:text-[7.5rem] font-thin text-white leading-none tracking-widest mb-4">
              Lotus Spa
            </h1>
            <p className="text-white/55 text-sm font-light tracking-[0.3em] uppercase mb-12 font-sans">
              Сауна · Хаммам · Массаж
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="bg-white text-foreground px-10 py-3.5 rounded-full text-xs font-medium tracking-[0.2em] uppercase hover:bg-white/92 transition-all cursor-pointer font-sans">
                Записаться онлайн
              </a>
              <a href={TEL_HREF} className="border border-white/50 text-white px-10 py-3.5 rounded-full text-xs font-light tracking-[0.2em] uppercase hover:bg-white/10 transition-all cursor-pointer font-sans">
                {PHONE}
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 } as const}
        >
          <ChevronDown className="w-5 h-5 text-white/35" />
        </motion.div>
      </section>

      {/* WHY US */}
      <section className="py-14 px-4 bg-primary text-primary-foreground">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {whyUs.map((item, i) => (
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
            <Label>Все направления</Label>
            <h2 className="font-sans text-5xl md:text-6xl font-light">услуги</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {serviceCategories.map((cat, i) => (
              <motion.a
                key={cat.key}
                href={cat.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.5 } as const}
                viewport={{ once: true }}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer block"
              >
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
            <Label>Виды массажа</Label>
            <h2 className="font-sans text-5xl font-light">массажи тела</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {massageServices.map((card, i) => (
              <motion.div key={card.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.5 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/service/${card.key}`} className="block cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {card.tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-semibold bg-primary/90 text-primary-foreground px-3 py-1 rounded-full font-sans tracking-wider uppercase">{card.tag}</span>
                    )}
                  </div>
                </Link>
                <div className="p-5">
                  <Link to={`/service/${card.key}`} className="cursor-pointer">
                    <h3 className="font-sans text-xl font-normal mb-1.5 hover:text-primary transition-colors">{card.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed mb-4">{card.shortDesc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {card.prices.map((p) => (
                      <div key={p.label} className="text-xs font-sans text-muted-foreground">
                        {p.label} <span className="text-primary font-medium">// {p.price} сум</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={TEL_HREF} className="flex items-center gap-1.5 border border-border text-foreground/70 px-3.5 py-2 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-all cursor-pointer font-sans"><Phone className="w-3 h-3" /> Позвонить</a>
                    <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3.5 py-2 rounded-full text-xs font-medium hover:opacity-90 transition-opacity cursor-pointer font-sans"><CalendarCheck className="w-3 h-3" /> Записаться</a>
                    <Link to={`/service/${card.key}`} className="ml-auto text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer font-sans flex items-center gap-1">Подробнее <ArrowRight className="w-3 h-3" /></Link>
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
            <Label>Парение и тепло</Label>
            <h2 className="font-sans text-5xl font-light">сауна и хаммам</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {saunaServices.map((item, i) => (
              <motion.div key={item.key} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/service/${item.key}`} className="block cursor-pointer">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {item.tag && <span className="absolute top-3 left-3 text-[10px] font-semibold bg-primary/90 text-primary-foreground px-3 py-1 rounded-full font-sans tracking-wider uppercase">{item.tag}</span>}
                  </div>
                </Link>
                <div className="p-5">
                  <p className="text-[10px] text-accent tracking-widest uppercase font-sans mb-1">{item.subtitle}</p>
                  <Link to={`/service/${item.key}`} className="cursor-pointer">
                    <h3 className="font-sans text-xl font-normal mb-2 hover:text-primary transition-colors">{item.title}</h3>
                  </Link>
                  <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed mb-4">{item.shortDesc}</p>
                  <div className="flex items-center gap-2">
                    <a href={TEL_HREF} className="flex items-center gap-1.5 border border-border text-foreground/70 px-3.5 py-2 rounded-full text-xs font-medium hover:border-primary hover:text-primary transition-all cursor-pointer font-sans"><Phone className="w-3 h-3" /> Позвонить</a>
                    <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3.5 py-2 rounded-full text-xs font-medium hover:opacity-90 cursor-pointer font-sans"><CalendarCheck className="w-3 h-3" /> Записаться</a>
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
            <Label>Дополнительно</Label>
            <h2 className="font-sans text-5xl font-light">уход за телом</h2>
          </motion.div>
          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {[
              { name: "Скраб", duration: "20 мин", price: "230 000", img: "https://images.unsplash.com/photo-1597010804526-2fcb8a09865b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
              { name: "Пилинг кесе", duration: "20 мин", price: "200 000", img: "https://images.unsplash.com/photo-1623808222757-67fa5a397c34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
              { name: "Пенная мойка", duration: "20 мин", price: "180 000", img: "https://images.unsplash.com/photo-1700918232124-f64da19e73eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=600" },
            ].map((s, i) => (
              <motion.div key={s.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="group bg-card border border-border rounded-2xl overflow-hidden">
                <div className="aspect-[3/2] overflow-hidden"><img src={s.img} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-5">
                  <div className="font-sans text-lg mb-1">{s.name}</div>
                  <div className="flex items-center justify-between text-xs mb-4 font-sans">
                    <span className="text-muted-foreground">{s.duration}</span>
                    <span className="text-primary font-medium">{s.price} сум</span>
                  </div>
                  <ActionButtons />
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-8">
            <h3 className="font-sans text-2xl font-light mb-6">Парка</h3>
            <div className="grid grid-cols-3 gap-4 mb-7">
              {[
                { name: "Классическая парка", duration: "10 мин", price: "150 000" },
                { name: "Арома парка",        duration: "15 мин", price: "170 000" },
                { name: "Медовая парка",      duration: "30 мин", price: "280 000" },
              ].map((s) => (
                <div key={s.name} className="text-center">
                  <div className="font-sans text-sm font-medium mb-1">{s.name}</div>
                  <div className="text-xs text-muted-foreground mb-2 font-sans">{s.duration}</div>
                  <div className="font-sans text-xl text-primary">{s.price} <span className="text-xs font-sans font-normal">сум</span></div>
                </div>
              ))}
            </div>
            <ActionButtons />
          </motion.div>
        </div>
      </section>

      {/* SPA PROGRAMS */}
      <section id="programs" className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label light>Готовые сеты</Label>
            <h2 className="font-sans text-5xl font-light">spa программы</h2>
          </motion.div>
          <div className="space-y-2.5 mb-10">
            {spaPrograms.map((prog, i) => (
              <motion.div key={prog.name} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 } as const} viewport={{ once: true }} className="flex items-center justify-between bg-white/8 hover:bg-white/12 transition-colors rounded-xl p-5 gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-sans text-xl">{prog.name}</span>
                    <span className="text-white/40 text-xs font-sans tracking-wide">// {prog.duration}</span>
                  </div>
                  <p className="text-white/45 text-xs font-sans font-light">{prog.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="font-sans text-2xl">{prog.price}</div>
                  <div className="text-white/35 text-xs font-sans">сум</div>
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
            <Label>Аренда</Label>
            <h2 className="font-sans text-5xl font-light">цены на сауну</h2>
          </motion.div>
          <div className="flex flex-wrap gap-3 mb-7">
            {(Object.keys(pricingData) as Branch[]).map((key) => (
              <button key={key} onClick={() => setActiveBranch(key)} className={`px-5 py-2.5 rounded-full text-xs font-medium transition-all cursor-pointer font-sans tracking-wider uppercase ${activeBranch === key ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:border-primary/40"}`}>
                {pricingData[key].name}
              </button>
            ))}
          </div>
          <div className="flex gap-3 mb-10">
            {(["weekday", "weekend"] as DayType[]).map((dt) => (
              <button key={dt} onClick={() => setDayType(dt)} className={`px-6 py-2 rounded-full text-xs transition-all cursor-pointer font-sans tracking-wider uppercase ${dayType === dt ? "bg-accent text-accent-foreground" : "border border-border hover:border-accent/50"}`}>
                {dt === "weekday" ? "Будние" : "Выходные"}
              </button>
            ))}
          </div>
          <div className={`grid gap-6 ${branch.vip ? "md:grid-cols-2" : "max-w-sm"}`}>
            <motion.div key={`${activeBranch}-${dayType}-sauna`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="bg-primary text-primary-foreground p-5"><h3 className="font-sans text-xl">Сауна / Хаммам</h3><p className="text-white/45 text-xs mt-1 font-sans">до 4 человек</p></div>
              <div className="p-5">
                {branch.sauna[dayType].map((row) => (
                  <div key={row.time} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-sm font-sans">{row.time}</span></div>
                    <span className="font-sans text-primary text-base">{row.price} <span className="text-xs font-sans font-normal text-muted-foreground">сум</span></span>
                  </div>
                ))}
              </div>
            </motion.div>
            {branch.vip && (
              <motion.div key={`${activeBranch}-${dayType}-vip`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-card border border-accent/25 rounded-2xl overflow-hidden">
                <div className="bg-accent text-accent-foreground p-5"><h3 className="font-sans text-xl">Сауна VIP</h3><p className="text-white/50 text-xs mt-1 font-sans">до 4 человек</p></div>
                <div className="p-5">
                  {branch.vip[dayType].map((row) => (
                    <div key={row.time} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                      <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-muted-foreground" /><span className="text-sm font-sans">{row.time}</span></div>
                      <span className="font-sans text-accent text-base">{row.price} <span className="text-xs font-sans font-normal text-muted-foreground">сум</span></span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
          <div className="mt-5 bg-muted/60 border border-border rounded-xl p-4 flex items-center gap-3 text-sm font-sans">
            <Users className="w-4 h-4 text-accent shrink-0" />
            <span className="text-muted-foreground text-xs">Доплата за человека свыше 4-х: <strong className="text-foreground">{branch.extra} сум / 1 час</strong></span>
          </div>
          <div className="mt-8"><ActionButtons /></div>
        </div>
      </section>

      {/* PROMOS */}
      <section id="promos" className="py-20 px-4 bg-muted/40">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>Специальные предложения</Label>
            <h2 className="font-sans text-5xl font-light">акции</h2>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-5 mb-8">
            {promos.map((promo, i) => (
              <motion.div key={promo.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6">
                <span className="inline-block text-[10px] font-semibold bg-primary/8 text-primary px-3 py-1 rounded-full mb-4 font-sans tracking-widest uppercase">{promo.tag}</span>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-sans text-xl mb-1.5">{promo.title}</h3>
                    <p className="text-muted-foreground text-xs font-sans font-light leading-relaxed">{promo.desc}</p>
                  </div>
                  <div className="shrink-0 font-sans text-3xl text-accent">{promo.discount}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-xl p-5 text-xs text-muted-foreground font-sans mb-8">
            <p className="font-medium text-foreground mb-2 text-sm">Важно:</p>
            <ul className="space-y-1 list-disc list-inside leading-relaxed">
              <li>Акции действительны в будние дни. Не распространяются на праздники и выходные.</li>
              <li>Исключение: «Компания девушек» действует ежедневно</li>
              <li>Акции не суммируются. Обязательна запись. 1 визит = 1 акция</li>
            </ul>
          </div>
          <ActionButtons />
        </div>
      </section>

      {/* BRANCHES */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12">
            <Label>Мы рядом</Label>
            <h2 className="font-sans text-5xl font-light">наши филиалы</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5 mb-12">
            {[
              { name: "Карасарай",            address: "Филиал Карасарай" },
              { name: "Сергели / Авиасозлар", address: "Филиалы Сергели и Авиасозлар" },
              { name: "Ц1 / Паркент",         address: "Филиалы Ц1 и Паркент" },
            ].map((b, i) => (
              <motion.div key={b.name} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 } as const} viewport={{ once: true }} className="bg-card border border-border rounded-2xl p-6">
                <div className="w-10 h-10 bg-primary/8 rounded-full flex items-center justify-center mb-4"><MapPin className="w-4 h-4 text-primary" /></div>
                <h3 className="font-sans text-xl mb-1">{b.name}</h3>
                <p className="text-muted-foreground text-xs font-sans">{b.address}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-primary text-primary-foreground rounded-2xl p-10 md:p-14 text-center">
            <h3 className="font-sans text-4xl font-light mb-2">Готовы расслабиться?</h3>
            <p className="text-white/45 mb-8 font-sans font-light text-xs tracking-widest uppercase">Запишитесь прямо сейчас</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={TEL_HREF} className="flex items-center justify-center gap-2 border border-white/40 text-white px-8 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/10 transition-all cursor-pointer"><Phone className="w-3.5 h-3.5" /> {PHONE}</a>
              <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-white text-foreground px-8 py-3.5 rounded-full text-xs font-sans tracking-wider uppercase hover:bg-white/90 transition-all cursor-pointer"><CalendarCheck className="w-3.5 h-3.5" /> Telegram: @spalotus01</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 px-4">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src={LOGO_URL} alt="Lotus Spa" className="h-9 w-9 object-cover rounded-full" />
            <div>
              <div className="font-sans text-lg font-medium text-primary tracking-widest uppercase">Lotus Spa</div>
              <div className="text-[8px] tracking-[0.25em] uppercase text-muted-foreground font-sans">Сауна · Хаммам · Массаж</div>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-muted-foreground font-sans">
            <a href={TEL_HREF} className="flex items-center gap-2 hover:text-foreground transition-colors cursor-pointer"><Phone className="w-3.5 h-3.5" /> {PHONE}</a>
            <a href="https://instagram.com/lotus_spa.uz" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">Instagram: {INSTAGRAM}</a>
            <a href={TG_LINK} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors cursor-pointer">Telegram: @spalotus01</a>
          </div>
          <div className="text-[11px] text-muted-foreground font-sans">{`© ${new Date().getFullYear()} Lotus Spa`}</div>
        </div>
      </footer>
    </div>
  );
}
