import { z } from "zod";

export const equipmentConditionSchema = z.enum(["new", "used", "refurbished"]);
export const equipmentAvailabilitySchema = z.enum([
  "in_stock",
  "incoming",
  "sold",
]);
export const equipmentPriceModeSchema = z.enum(["fixed", "on_request"]);
export const equipmentStatusSchema = z.enum([
  "draft",
  "published",
  "sold",
  "archived",
]);

export const equipmentSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model is required"),
  year: z.number().int().gte(1950).lte(2100).nullable().default(null),
  condition: equipmentConditionSchema,
  location: z.string().nullable().default(null),
  availability: equipmentAvailabilitySchema,
  price_mode: equipmentPriceModeSchema,
  price: z.number().nonnegative().nullable().default(null),
  main_image: z.string().url().nullable().default(null),
  additional_images: z.array(z.string().url()).default([]),
  description_en: z.string().nullable().default(null),
  description_ar: z.string().nullable().default(null),
  best_suited_for_en: z.string().nullable().default(null),
  best_suited_for_ar: z.string().nullable().default(null),
  specifications: z.record(z.union([z.string(), z.number(), z.boolean()])).default({}),
  featured: z.boolean().default(false),
  published: z.boolean().default(false),
  status: equipmentStatusSchema.default("draft"),
});

export type EquipmentInput = z.infer<typeof equipmentSchema>;

export const equipmentTypeSchema = z.object({
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and hyphens"),
  name_en: z.string().min(1, "English name is required"),
  name_ar: z.string().min(1, "Arabic name is required"),
  enabled: z.boolean().default(true),
});

export type EquipmentTypeInput = z.infer<typeof equipmentTypeSchema>;

// Public lead / quote request form. Honeypot field ("website") is included
// and must stay empty — a filled value marks the submission as spam.
export const leadSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name"),
  phone: z.string().trim().min(6, "Please enter a valid phone/WhatsApp number"),
  equipment_need: z.string().trim().min(2, "Please tell us what equipment you need"),
  location: z.string().trim().min(2, "Please enter your location"),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Please enter a valid email").optional().or(z.literal("")),
  brand_model_preference: z.string().trim().optional().or(z.literal("")),
  additional_requirements: z.string().trim().optional().or(z.literal("")),
  equipment_id: z.string().uuid().optional(),
  website: z.string().max(0, "").optional().or(z.literal("")),
});

export type LeadInput = z.infer<typeof leadSchema>;
