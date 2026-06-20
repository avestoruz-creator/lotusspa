// ── Shared service/massage data ──────────────────────────────────────────────

export const PHONE      = "+998 71 205 95 65";
export const TEL_HREF   = "tel:+998712059565";
export const TG_LINK    = "https://t.me/spalotus01";
export const LOGO_URL   = "https://hercules-cdn.com/file_fy8O5ShjsbsxHlV2zjafjcq3";
export const INSTAGRAM  = "@lotus_spa.uz";

export const IMG = {
  hero:        "https://images.unsplash.com/photo-1716467195935-2d798a043fef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=1400",
  klassik:     "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
  aroma:       "https://hercules-cdn.com/file_1gD2h5Ny2HjGM83yecBJ87Q7",
  ozdor:       "https://images.unsplash.com/photo-1639162906614-0603b0ae95fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
  silovoy:     "https://images.unsplash.com/photo-1745327883508-b6cd32e5dde5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
  akvamuylny:  "https://hercules-cdn.com/file_IZZLHeqzpZ9H0KVD2OGdQD8v",
  sauna:       "https://hercules-cdn.com/file_BY7zaTrcX6sXhWt74rdo6eGU",
  saunaVip:    "https://images.unsplash.com/photo-1585815157396-ad62043f721b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=75&w=600",
  hammam:      "https://hercules-cdn.com/file_u6pPawZhMo0akIm9iPpZSpME",
  scrub:       "https://hercules-cdn.com/file_2M7TuEyTZ1r66M3xfR6jDel0",
  piling:      "https://hercules-cdn.com/file_9OAJyNDN86zM9CALz3bLMIUR",
  foam:        "https://hercules-cdn.com/file_nrBh0WbzAM4ixhASfnBBNK33",
};

export type ServicePrice = { label: string; price: string };

export type ServiceItem = {
  key: string;
  title: string;
  subtitle: string;
  img: string;
  tag?: string;
  shortDesc: string;
  fullDesc: string;
  prices: ServicePrice[];
  details?: string[];
  recommended?: string;
};

export const massageServices: ServiceItem[] = [
  {
    key: "klassik",
    title: "Классический массаж",
    subtitle: "Расслабление и восстановление",
    img: IMG.klassik,
    tag: "ТОП",
    shortDesc: "Проверенная техника глубокого расслабления мышц.",
    fullDesc: "Классический массаж — это фундаментальная техника работы с телом.",
    prices: [{ label: "60 мин", price: "530 000" }, { label: "90 мин", price: "770 000" }],
    details: ["Работа со всем телом", "Нормализует кровообращение", "Снижает стресс", "Профессиональные масла"],
    recommended: "5–10 посещений",
  },
  {
    key: "aroma",
    title: "Арома массаж",
    subtitle: "Ароматерапия и нега",
    img: IMG.aroma,
    shortDesc: "Сочетание массажных техник и эфирных масел.",
    fullDesc: "Арома массаж соединяет силу прикосновения и целебные свойства эфирных масел.",
    prices: [{ label: "60 мин", price: "560 000" }, { label: "90 мин", price: "815 000" }],
    details: ["Индивидуальный подбор масел", "Расслабление нервной системы", "Питание кожи", "Снятие напряжения"],
    recommended: "4–8 посещений",
  },
  {
    key: "ozdor",
    title: "Оздоровительный массаж",
    subtitle: "Терапия и здоровье",
    img: IMG.ozdor,
    shortDesc: "Направлен на укрепление организма и зарядку энергией.",
    fullDesc: "Оздоровительный массаж — комплексная работа с организмом.",
    prices: [{ label: "60 мин", price: "600 000" }, { label: "90 мин", price: "875 000" }],
    details: ["Комплексное воздействие", "Стимуляция иммунитета", "Нормализация сна", "Восстановление тонуса"],
    recommended: "5–10 посещений",
  },
  {
    key: "silovoy",
    title: "Силовой массаж",
    subtitle: "Интенсивная проработка",
    img: IMG.silovoy,
    shortDesc: "Глубокая проработка мышц с интенсивным давлением.",
    fullDesc: "Силовой массаж — интенсивная работа с глубокими мышечными слоями.",
    prices: [{ label: "60 мин", price: "750 000" }, { label: "90 мин", price: "1 100 000" }],
    details: ["Глубокая работа с мышцами", "Устранение зажимов", "Ускоренное восстановление", "Профилактика травм"],
    recommended: "4–8 посещений",
  },
  {
    key: "akvamuylny",
    title: "Аквамыльный массаж",
    subtitle: "Пена и нежность",
    img: IMG.akvamuylny,
    shortDesc: "Уникальный массаж с обильной пеной.",
    fullDesc: "Аквамыльный массаж — уникальная процедура с ароматной пеной.",
    prices: [{ label: "60 мин", price: "390 000" }],
    details: ["Массаж с пеной", "Очищение кожи", "Ощущение невесомости", "Увлажнение кожи"],
    recommended: "Еженедельно",
  },
];

export const saunaServices: ServiceItem[] = [
  {
    key: "sauna",
    title: "Классическая сауна",
    subtitle: "Финская баня",
    img: IMG.sauna,
    shortDesc: "Сухой жар до 90°C и полное восстановление организма.",
    fullDesc: "Финская сауна — искусство оздоровления через жар.",
    prices: [],
    details: ["80–90°C, низкая влажность", "Глубокое очищение", "Укрепление иммунитета", "До 4 человек"],
  },
  {
    key: "sauna-vip",
    title: "Сауна VIP",
    subtitle: "Премиум-формат",
    img: IMG.saunaVip,
    tag: "VIP",
    shortDesc: "Просторный VIP-зал с дополнительными удобствами.",
    fullDesc: "Сауна VIP — приватное пространство для максимального комфорта.",
    prices: [],
    details: ["Просторный зал", "Премиальные принадлежности", "Зона отдыха", "До 4 человек"],
  },
  {
    key: "hammam",
    title: "Хаммам",
    subtitle: "Турецкая баня",
    img: IMG.hammam,
    shortDesc: "Влажный пар и традиционный восточный ритуал.",
    fullDesc: "Хаммам — тысячелетняя восточная традиция очищения.",
    prices: [],
    details: ["Влажный пар 40–50°C", "Мраморный помост", "Восточный ритуал", "Доступно для всех"],
  },
];
