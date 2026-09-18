export type Locale = "en" | "ar";

export interface Dictionary {
  nav: {
    home: string;
    equipment: string;
    services: string;
    about: string;
    contact: string;
    requestQuote: string;
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
  };
  equipment: {
    title: string;
    searchPlaceholder: string;
    filters: string;
    category: string;
    brand: string;
    condition: string;
    location: string;
    availability: string;
    sortBy: string;
    viewDetails: string;
    noResults: string;
    noInventory: string;
  };
  equipmentDetail: {
    year: string;
    condition: string;
    location: string;
    availability: string;
    specifications: string;
    description: string;
    requestQuote: string;
    whatsapp: string;
    backToEquipment: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  about: {
    title: string;
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
  };
  contact: {
    title: string;
    phone: string;
    email: string;
    whatsapp: string;
  };
  footer: {
    rights: string;
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
      categories: "Equipment Categories",
      services: "Services",
      aboutPreview: "About SANTRAC",
    },
    equipment: {
      title: "Equipment",
      searchPlaceholder: "Search by brand or model",
      filters: "Filters",
      category: "Category",
      brand: "Brand",
      condition: "Condition",
      location: "Location",
      availability: "Availability",
      sortBy: "Sort by",
      viewDetails: "View Details",
      noResults: "No equipment matches your filters yet.",
      noInventory: "No equipment is listed yet. Check back soon.",
    },
    equipmentDetail: {
      year: "Year",
      condition: "Condition",
      location: "Location",
      availability: "Availability",
      specifications: "Specifications",
      description: "Description",
      requestQuote: "Request a Quote",
      whatsapp: "WhatsApp",
      backToEquipment: "Back to Equipment",
    },
    services: {
      title: "Services",
      subtitle: "What we offer alongside every sale.",
    },
    about: {
      title: "About SANTRAC",
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
    },
    contact: {
      title: "Contact",
      phone: "Phone",
      email: "Email",
      whatsapp: "WhatsApp",
    },
    footer: {
      rights: "All rights reserved.",
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
    },
    home: {
      eyebrow: "معدات ثقيلة وصناعية",
      title: "معدات يمكنك الاعتماد عليها.",
      subtitle: "تصفح معدات سانتراك المتوفرة وتحدث مباشرة مع فريقنا لاختيار المعدة المناسبة لعملك.",
      ctaPrimary: "تصفح المعدات",
      ctaSecondary: "اطلب عرض سعر",
      whySantrac: "لماذا سانتراك",
      featured: "معدات مميزة",
      categories: "فئات المعدات",
      services: "الخدمات",
      aboutPreview: "عن سانتراك",
    },
    equipment: {
      title: "المعدات",
      searchPlaceholder: "ابحث بالماركة أو الموديل",
      filters: "الفلاتر",
      category: "الفئة",
      brand: "الماركة",
      condition: "الحالة",
      location: "الموقع",
      availability: "التوفر",
      sortBy: "الترتيب حسب",
      viewDetails: "عرض التفاصيل",
      noResults: "لا توجد معدات مطابقة للفلاتر المحددة.",
      noInventory: "لا توجد معدات مدرجة حاليًا. تابعونا قريبًا.",
    },
    equipmentDetail: {
      year: "سنة الصنع",
      condition: "الحالة",
      location: "الموقع",
      availability: "التوفر",
      specifications: "المواصفات",
      description: "الوصف",
      requestQuote: "اطلب عرض سعر",
      whatsapp: "واتساب",
      backToEquipment: "العودة إلى المعدات",
    },
    services: {
      title: "الخدمات",
      subtitle: "ما نقدمه مع كل عملية بيع.",
    },
    about: {
      title: "عن سانتراك",
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
    },
    contact: {
      title: "تواصل معنا",
      phone: "الهاتف",
      email: "البريد الإلكتروني",
      whatsapp: "واتساب",
    },
    footer: {
      rights: "جميع الحقوق محفوظة.",
    },
  },
};
