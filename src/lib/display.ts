import type { EquipmentRow } from "@/lib/database.types";

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
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(equipment.price);
}

export function equipmentTitle(equipment: Pick<EquipmentRow, "brand" | "model">): string {
  return `${equipment.brand} ${equipment.model}`.trim();
}
