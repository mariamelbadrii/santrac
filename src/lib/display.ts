import type { EquipmentRow, EquipmentTypeRow } from "@/lib/database.types";

const EMPTY = "—";

export function displayOrDash(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") return EMPTY;
  return String(value);
}

export function formatPrice(
  equipment: Pick<EquipmentRow, "price_mode" | "price">,
  locale: "en" | "ar",
): string {
  if (equipment.price_mode === "on_request" || equipment.price === null) {
    return locale === "ar" ? "السعر عند الطلب" : "Price on request";
  }
  // SANTRAC prices in Egyptian Pounds — force Latin digits even in the
  // Arabic locale (natural Arabic business usage: "700,000 ج.م.", not
  // Eastern Arabic-Indic numerals).
  const amount = new Intl.NumberFormat(locale === "ar" ? "ar-EG-u-nu-latn" : "en-US", {
    maximumFractionDigits: 0,
  }).format(equipment.price);
  return locale === "ar" ? `${amount} ج.م.` : `${amount} EGP`;
}

export function equipmentTitle(equipment: Pick<EquipmentRow, "brand" | "model">): string {
  return `${equipment.brand} ${equipment.model}`.trim();
}

// equipment.category is stored as free text matching an equipment_types
// row's name_en (see EquipmentForm's category <Select>). In Arabic, show
// that type's admin-configured name_ar instead of leaking the English
// category text — falling back to the raw value if no match is configured.
export function localizeCategory(
  category: string,
  types: Pick<EquipmentTypeRow, "name_en" | "name_ar">[],
  locale: "en" | "ar",
): string {
  if (locale !== "ar") return category;
  const match = types.find((type) => type.name_en === category);
  return match?.name_ar || category;
}

// `location` is free text (no location_ar column), so only well-known
// Egyptian locations can be translated; anything else is shown as-is.
const KNOWN_LOCATIONS_AR: Record<string, string> = {
  "10th of ramadan": "العاشر من رمضان",
  "10th of ramadan city": "مدينة العاشر من رمضان",
  "6th of october": "السادس من أكتوبر",
  "6th of october city": "مدينة السادس من أكتوبر",
  cairo: "القاهرة",
  giza: "الجيزة",
  alexandria: "الإسكندرية",
  "new cairo": "القاهرة الجديدة",
  "nasr city": "مدينة نصر",
  "obour city": "مدينة العبور",
  "sadat city": "مدينة السادات",
  ismailia: "الإسماعيلية",
  suez: "السويس",
  "port said": "بورسعيد",
  mansoura: "المنصورة",
  tanta: "طنطا",
};

export function localizeLocation(
  location: string | null | undefined,
  locale: "en" | "ar",
): string | null | undefined {
  if (locale !== "ar" || !location) return location;
  return KNOWN_LOCATIONS_AR[location.trim().toLowerCase()] ?? location;
}
