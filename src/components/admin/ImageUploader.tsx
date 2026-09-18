import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

const BUCKET = "equipment-images";

async function uploadFile(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
}

interface SingleImageUploaderProps {
  label: string;
  value: string | null;
  onChange: (url: string | null) => void;
}

export function SingleImageUploader({ label, value, onChange }: SingleImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadFile(file);
      onChange(url);
    } catch {
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-800">{label}</label>
      <div className="flex items-center gap-4">
        <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded border border-ink-200 bg-ink-50">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-cover" />
          ) : (
            <Upload aria-hidden="true" className="h-5 w-5 text-ink-300" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex h-9 items-center justify-center gap-2 rounded border border-ink-300 px-4 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:opacity-50"
          >
            {uploading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
            {value ? "Replace" : "Upload"}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange(null)}
              className="text-start text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
      </div>
      {error && <p className="mt-1.5 text-xs font-medium text-brand-600">{error}</p>}
    </div>
  );
}

interface GalleryUploaderProps {
  label: string;
  value: string[];
  onChange: (urls: string[]) => void;
}

export function GalleryUploader({ label, value, onChange }: GalleryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setError(null);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      onChange([...value, ...urls]);
    } catch {
      setError("One or more uploads failed. Please try again.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (index: number) => onChange(value.filter((_, i) => i !== index));
  const move = (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= value.length) return;
    const next = [...value];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-ink-800">{label}</label>

      {value.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {value.map((url, i) => (
            <div key={url + i} className="relative aspect-square overflow-hidden rounded border border-ink-200">
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => remove(i)}
                aria-label="Remove image"
                className="absolute end-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white"
              >
                <X aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
              <div className="absolute bottom-1 start-1 flex gap-1">
                <button
                  type="button"
                  onClick={() => move(i, -1)}
                  disabled={i === 0}
                  aria-label="Move earlier"
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white disabled:opacity-30",
                  )}
                >
                  <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => move(i, 1)}
                  disabled={i === value.length - 1}
                  aria-label="Move later"
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-900/70 text-white disabled:opacity-30"
                >
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="inline-flex h-9 items-center justify-center gap-2 rounded border border-ink-300 px-4 text-sm font-medium text-ink-900 hover:border-ink-900 disabled:opacity-50"
      >
        {uploading ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : null}
        Add photos
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      {error && <p className="mt-1.5 text-xs font-medium text-brand-600">{error}</p>}
    </div>
  );
}
