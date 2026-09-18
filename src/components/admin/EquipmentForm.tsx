import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { equipmentSchema, type EquipmentInput } from "@/lib/catalog-schemas";
import type { EquipmentRow } from "@/lib/database.types";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

interface EquipmentFormProps {
  initialValues?: EquipmentRow;
  onSubmit: (values: EquipmentInput) => Promise<void>;
  submitLabel: string;
}

export function EquipmentForm({ initialValues, onSubmit, submitLabel }: EquipmentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EquipmentInput>({
    resolver: zodResolver(equipmentSchema),
    defaultValues: initialValues
      ? {
          slug: initialValues.slug,
          category: initialValues.category,
          brand: initialValues.brand,
          model: initialValues.model,
          year: initialValues.year,
          condition: initialValues.condition,
          location: initialValues.location,
          availability: initialValues.availability,
          price_mode: initialValues.price_mode,
          price: initialValues.price,
          main_image: initialValues.main_image,
          additional_images: initialValues.additional_images,
          description_en: initialValues.description_en,
          description_ar: initialValues.description_ar,
          specifications: initialValues.specifications,
          featured: initialValues.featured,
          published: initialValues.published,
          status: initialValues.status,
        }
      : {
          additional_images: [],
          specifications: {},
          featured: false,
          published: false,
          status: "draft",
          condition: "used",
          availability: "in_stock",
          price_mode: "on_request",
        },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Field label="Slug" htmlFor="slug" required error={errors.slug?.message}>
        <Input id="slug" {...register("slug")} />
      </Field>
      <Field label="Category" htmlFor="category" required error={errors.category?.message}>
        <Input id="category" {...register("category")} />
      </Field>
      <Field label="Brand" htmlFor="brand" required error={errors.brand?.message}>
        <Input id="brand" {...register("brand")} />
      </Field>
      <Field label="Model" htmlFor="model" required error={errors.model?.message}>
        <Input id="model" {...register("model")} />
      </Field>
      <Field label="Year" htmlFor="year">
        <Input id="year" type="number" {...register("year", { valueAsNumber: true })} />
      </Field>
      <Field label="Condition" htmlFor="condition" required>
        <Select id="condition" {...register("condition")}>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </Select>
      </Field>
      <Field label="Location" htmlFor="location">
        <Input id="location" {...register("location")} />
      </Field>
      <Field label="Availability" htmlFor="availability" required>
        <Select id="availability" {...register("availability")}>
          <option value="in_stock">In stock</option>
          <option value="incoming">Incoming</option>
          <option value="sold">Sold</option>
        </Select>
      </Field>
      <Field label="Price mode" htmlFor="price_mode" required>
        <Select id="price_mode" {...register("price_mode")}>
          <option value="fixed">Fixed</option>
          <option value="on_request">On request</option>
        </Select>
      </Field>
      <Field label="Price" htmlFor="price">
        <Input id="price" type="number" {...register("price", { valueAsNumber: true })} />
      </Field>
      <Field label="Main image URL" htmlFor="main_image" error={errors.main_image?.message}>
        <Input id="main_image" {...register("main_image")} />
      </Field>
      <Field label="Status" htmlFor="status" required>
        <Select id="status" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="sold">Sold</option>
          <option value="archived">Archived</option>
        </Select>
      </Field>

      <div className="sm:col-span-2">
        <Field label="Description (English)" htmlFor="description_en">
          <Textarea id="description_en" rows={3} {...register("description_en")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Description (Arabic)" htmlFor="description_ar">
          <Textarea id="description_ar" rows={3} dir="rtl" {...register("description_ar")} />
        </Field>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" {...register("featured")} />
        Featured
      </label>
      <label className="flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" {...register("published")} />
        Published
      </label>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
