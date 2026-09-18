import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Plus, X } from "lucide-react";
import { equipmentSchema, type EquipmentInput } from "@/lib/catalog-schemas";
import type { EquipmentRow } from "@/lib/database.types";
import { useEquipmentTypes } from "@/hooks/useEquipmentTypes";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { SingleImageUploader, GalleryUploader } from "@/components/admin/ImageUploader";

interface EquipmentFormProps {
  initialValues?: EquipmentRow;
  onSubmit: (values: EquipmentInput) => Promise<void>;
  submitLabel: string;
}

interface SpecRow {
  key: string;
  value: string;
}

function specsToRows(specs: EquipmentRow["specifications"] | undefined): SpecRow[] {
  if (!specs) return [];
  return Object.entries(specs).map(([key, value]) => ({ key, value: String(value) }));
}

function rowsToSpecs(rows: SpecRow[]): Record<string, string> {
  return Object.fromEntries(rows.filter((row) => row.key.trim()).map((row) => [row.key.trim(), row.value]));
}

export function EquipmentForm({ initialValues, onSubmit, submitLabel }: EquipmentFormProps) {
  const { types: categories, loading: categoriesLoading } = useEquipmentTypes();
  const [mainImage, setMainImage] = useState<string | null>(initialValues?.main_image ?? null);
  const [gallery, setGallery] = useState<string[]>(initialValues?.additional_images ?? []);
  const [specRows, setSpecRows] = useState<SpecRow[]>(specsToRows(initialValues?.specifications));

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
          description_en: initialValues.description_en,
          description_ar: initialValues.description_ar,
          best_suited_for_en: initialValues.best_suited_for_en,
          best_suited_for_ar: initialValues.best_suited_for_ar,
          featured: initialValues.featured,
          published: initialValues.published,
          status: initialValues.status,
        }
      : {
          featured: false,
          published: false,
          status: "draft",
          condition: "used",
          availability: "in_stock",
          price_mode: "on_request",
        },
  });

  const submit = handleSubmit((data) =>
    onSubmit({
      ...data,
      main_image: mainImage,
      additional_images: gallery,
      specifications: rowsToSpecs(specRows),
    }),
  );

  const addSpecRow = () => setSpecRows((prev) => [...prev, { key: "", value: "" }]);
  const updateSpecRow = (index: number, patch: Partial<SpecRow>) =>
    setSpecRows((prev) => prev.map((row, i) => (i === index ? { ...row, ...patch } : row)));
  const removeSpecRow = (index: number) => setSpecRows((prev) => prev.filter((_, i) => i !== index));

  return (
    <form onSubmit={submit} className="grid max-w-3xl gap-4 sm:grid-cols-2">
      <Field label="Slug" htmlFor="slug" required hint="Used in the public URL" error={errors.slug?.message}>
        <Input id="slug" {...register("slug")} />
      </Field>
      <Field label="Category" htmlFor="category" required error={errors.category?.message}>
        {categoriesLoading ? (
          <p className="text-sm text-ink-500">Loading categories…</p>
        ) : categories.length > 0 ? (
          <Select id="category" {...register("category")}>
            <option value="">Select a category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name_en}>
                {c.name_en}
              </option>
            ))}
          </Select>
        ) : (
          <p className="text-sm text-ink-500">
            No categories yet.{" "}
            <Link to="/admin/categories" className="font-semibold text-brand-600 hover:text-brand-700">
              Create one in Categories
            </Link>{" "}
            before adding equipment.
          </p>
        )}
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

      <div className="sm:col-span-2">
        <SingleImageUploader label="Main image" value={mainImage} onChange={setMainImage} />
      </div>
      <div className="sm:col-span-2">
        <GalleryUploader label="Additional photos" value={gallery} onChange={setGallery} />
      </div>

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

      <div className="sm:col-span-2">
        <Field label="Best suited for (English)" htmlFor="best_suited_for_en" hint="Optional — e.g. warehouse indoor use">
          <Textarea id="best_suited_for_en" rows={2} {...register("best_suited_for_en")} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Best suited for (Arabic)" htmlFor="best_suited_for_ar">
          <Textarea id="best_suited_for_ar" rows={2} dir="rtl" {...register("best_suited_for_ar")} />
        </Field>
      </div>

      <div className="sm:col-span-2">
        <label className="mb-1.5 block text-sm font-medium text-ink-800">Specifications</label>
        <p className="mb-2 text-xs text-ink-500">
          Flexible per equipment type — e.g. capacity/mast for a forklift, kVA/fuel for a
          generator, bucket capacity/operating weight for a loader.
        </p>
        <div className="flex flex-col gap-2">
          {specRows.map((row, i) => (
            <div key={i} className="flex gap-2">
              <Input
                placeholder="Spec name (e.g. Capacity)"
                value={row.key}
                onChange={(e) => updateSpecRow(i, { key: e.target.value })}
              />
              <Input
                placeholder="Value (e.g. 3 tons)"
                value={row.value}
                onChange={(e) => updateSpecRow(i, { value: e.target.value })}
              />
              <button
                type="button"
                onClick={() => removeSpecRow(i)}
                aria-label="Remove specification"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded border border-ink-200 text-ink-500 hover:border-brand-500 hover:text-brand-600"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addSpecRow}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
        >
          <Plus aria-hidden="true" className="h-4 w-4" />
          Add specification
        </button>
      </div>

      <Field label="Status" htmlFor="status" required>
        <Select id="status" {...register("status")}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="sold">Sold</option>
          <option value="archived">Archived</option>
        </Select>
      </Field>

      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" {...register("featured")} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" {...register("published")} />
          Published
        </label>
      </div>

      <div className="sm:col-span-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
