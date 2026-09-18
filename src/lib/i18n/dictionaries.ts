export type Locale = "en" | "ar";

export interface Dictionary {
  nav: {
    home: string;
    equipment: string;
    services: string;
    about: string;
    contact: string;
    requestQuote: string;
    explore: string;
    getInTouch: string;
  };
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    whySantrac: string;
    featured: string;
    categories: string;
    services: string;
    aboutPreview: string;
    viewAll: string;
    servicesCta: string;
    aboutCta: string;
    assistanceTitle: string;
    assistanceBody: string;
  };
  equipment: {
    eyebrow: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    filters: string;
    category: string;
    brand: string;
    condition: string;
    location: string;
    availability: string;
    sortBy: string;
    sortNewest: string;
    sortFeatured: string;
    viewDetails: string;
    noResults: string;
    noInventory: string;
    notFound: string;
    all: string;
    clearFilters: string;
    showResults: string;
    featuredBadge: string;
    resultsCount: string;
  };
  equipmentDetail: {
    overview: string;
    year: string;
    condition: string;
    location: string;
    availability: string;
    specifications: string;
    description: string;
    bestSuitedFor: string;
    requestQuote: string;
    whatsapp: string;
    backToEquipment: string;
  };
  services: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
    eyebrow: string;
  };
  requestQuote: {
    title: string;
    subtitle: string;
    fullName: string;
    phone: string;
    equipmentNeed: string;
    location: string;
    company: string;
    email: string;
    brandModelPreference: string;
    additionalRequirements: string;
    submit: string;
    submitting: string;
    success: string;
    error: string;
    whatsappPrompt: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    whatsapp: string;
    address: string;
    ctaText: string;
  };
  footer: {
    rights: string;
  };
  enums: {
    condition: { new: string; used: string; refurbished: string };
    availability: { in_stock: string; incoming: string; sold: string };
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    nav: {
      home: "Home",
      equipment: "Equipment",
      services: "Services",
      about: "About",
      contact: "Contact",
      requestQuote: "Request a Quote",
      explore: "Explore",
      getInTouch: "Get in Touch",
    },
    home: {
      eyebrow: "HEAVY & INDUSTRIAL EQUIPMENT",
      title: "Equipment you can rely on.",
      subtitle:
        "Explore SANTRAC's available equipment and speak directly with our team to find the right machine for your operation.",
      ctaPrimary: "View Equipment",
      ctaSecondary: "Request a Quote",
      whySantrac: "Why SANTRAC",
      featured: "Featured Equipment",
      categories: "Browse by Category",
      services: "Services",
      aboutPreview: "About SANTRAC",
      viewAll: "View all equipment",
      servicesCta: "View services",
      aboutCta: "Learn more about us",
      assistanceTitle: "Need help choosing the right equipment?",
      assistanceBody: "Message our team directly on WhatsApp — we'll help you find the right machine.",
    },
    equipment: {
      eyebrow: "Catalogue",
      title: "Equipment",
      subtitle: "Browse SANTRAC's available heavy and industrial equipment.",
      searchPlaceholder: "Search by brand or model",
      filters: "Filters",
      category: "Category",
      brand: "Brand",
      condition: "Condition",
      location: "Location",
      availability: "Availability",
      sortBy: "Sort",
      sortNewest: "Newest",
      sortFeatured: "Featured first",
      viewDetails: "View Details",
      noResults: "No equipment matches your filters yet.",
      noInventory: "No equipment is listed yet. Check back soon.",
      notFound: "We couldn't find that equipment listing.",
      all: "All",
      clearFilters: "Clear filters",
      showResults: "Show results",
      featuredBadge: "Featured",
      resultsCount: "results",
    },
    equipmentDetail: {
      overview: "Overview",
      year: "Year",
      condition: "Condition",
      location: "Location",
      availability: "Availability",
      specifications: "Specifications",
      description: "Description",
      bestSuitedFor: "Best suited for",
      requestQuote: "Request a Quote",
      whatsapp: "WhatsApp",
      backToEquipment: "Back to Equipment",
    },
    services: {
      eyebrow: "What We Offer",
      title: "Services",
      subtitle: "What we offer alongside every sale.",
    },
    about: {
      title: "About SANTRAC",
      eyebrow: "ESTABLISHED & TRUSTED",
    },
    requestQuote: {
      title: "Request a Quote",
      subtitle: "Tell us what you need and our team will get back to you.",
      fullName: "Full Name",
      phone: "Phone / WhatsApp",
      equipmentNeed: "What equipment do you need?",
      location: "Location",
      company: "Company",
      email: "Email",
      brandModelPreference: "Brand / Model preference",
      additionalRequirements: "Additional requirements",
      submit: "Submit Request",
      submitting: "Submitting…",
      success: "Thank you — we received your request and will be in touch shortly.",
      error: "Something went wrong. Please try again or contact us on WhatsApp.",
      whatsappPrompt: "Prefer WhatsApp? Message us directly.",
    },
    contact: {
      title: "Contact",
      subtitle: "Reach our team directly — by phone, email, or WhatsApp.",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
      address: "Address",
      ctaText: "Request a Quote",
    },
    footer: {
      rights: "All rights reserved.",
    },
    enums: {
      condition: { new: "New", used: "Used", refurbished: "Refurbished" },
      availability: { in_stock: "In stock", incoming: "Incoming", sold: "Sold" },
    },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      equipment: "المعدات",
      services: "الخدمات",
      about: "من نحن",
      contact: "تواصل معنا",
      requestQuote: "اطلب عرض سعر",
      explore: "استكشف",
      getInTouch: "تواصل معنا",
    },
    home: {
      eyebrow: "معدات ثقيلة وصناعية",
      title: "معدات يمكنك الاعتماد عليها.",
      subtitle: "تصفح معدات سانتراك المتوفرة وتحدث مباشرة مع فريقنا لاختيار المعدة المناسبة لعملك.",
      ctaPrimary: "تصفح المعدات",
      ctaSecondary: "اطلب عرض سعر",
      whySantrac: "لماذا سانتراك",
      featured: "معدات مميزة",
      categories: "تصفح حسب الفئة",
      services: "الخدمات",
      aboutPreview: "عن سانتراك",
      viewAll: "عرض كل المعدات",
      servicesCta: "عرض الخدمات",
      aboutCta: "المزيد عنا",
      assistanceTitle: "تحتاج مساعدة في اختيار المعدة المناسبة؟",
      assistanceBody: "راسل فريقنا مباشرة عبر واتساب وسنساعدك في إيجاد المعدة المناسبة.",
    },
    equipment: {
      eyebrow: "الفهرس",
      title: "المعدات",
      subtitle: "تصفح معدات سانتراك الثقيلة والصناعية المتوفرة.",
      searchPlaceholder: "ابحث بالماركة أو الموديل",
      filters: "الفلاتر",
      category: "الفئة",
      brand: "الماركة",
      condition: "الحالة",
      location: "الموقع",
      availability: "التوفر",
      sortBy: "الترتيب",
      sortNewest: "الأحدث",
      sortFeatured: "المميز أولاً",
      viewDetails: "عرض التفاصيل",
      noResults: "لا توجد معدات مطابقة للفلاتر المحددة.",
      noInventory: "لا توجد معدات مدرجة حاليًا. تابعونا قريبًا.",
      notFound: "لم نتمكن من العثور على هذه المعدة.",
      all: "الكل",
      clearFilters: "مسح الفلاتر",
      showResults: "عرض النتائج",
      featuredBadge: "مميز",
      resultsCount: "نتيجة",
    },
    equipmentDetail: {
      overview: "نظرة عامة",
      year: "سنة الصنع",
      condition: "الحالة",
      location: "الموقع",
      availability: "التوفر",
      specifications: "المواصفات",
      description: "الوصف",
      bestSuitedFor: "مناسب لـ",
      requestQuote: "اطلب عرض سعر",
      whatsapp: "واتساب",
      backToEquipment: "العودة إلى المعدات",
    },
    services: {
      eyebrow: "ما نقدمه",
      title: "الخدمات",
      subtitle: "ما نقدمه مع كل عملية بيع.",
    },
    about: {
      title: "عن سانتراك",
      eyebrow: "شركة راسخة وموثوقة",
    },
    requestQuote: {
      title: "اطلب عرض سعر",
      subtitle: "أخبرنا بما تحتاجه وسيتواصل معك فريقنا.",
      fullName: "الاسم الكامل",
      phone: "الهاتف / واتساب",
      equipmentNeed: "ما هي المعدة التي تحتاجها؟",
      location: "الموقع",
      company: "الشركة",
      email: "البريد الإلكتروني",
      brandModelPreference: "الماركة / الموديل المفضل",
      additionalRequirements: "متطلبات إضافية",
      submit: "إرسال الطلب",
      submitting: "جارٍ الإرسال…",
      success: "شكرًا لك — تم استلام طلبك وسنتواصل معك قريبًا.",
      error: "حدث خطأ ما. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.",
      whatsappPrompt: "تفضل واتساب؟ راسلنا مباشرة.",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "تواصل مع فريقنا مباشرة — عبر الهاتف أو البريد الإلكتروني أو واتساب.",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
      address: "العنوان",
      ctaText: "اطلب عرض سعر",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },
    enums: {
      condition: { new: "جديد", used: "مستعمل", refurbished: "مجدد" },
      availability: { in_stock: "متوفر", incoming: "قادم", sold: "تم البيع" },
    },
  },
};
