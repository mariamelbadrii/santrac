import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import type { EquipmentRow } from "@/lib/database.types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

interface EquipmentActionsPanelProps {
  equipment: EquipmentRow;
  onChange: (next: EquipmentRow) => void;
}

export function EquipmentActionsPanel({ equipment, onChange }: EquipmentActionsPanelProps) {
  const navigate = useNavigate();
  const [busy, setBusy] = useState<string | null>(null);

  const apply = async (label: string, patch: Partial<EquipmentRow>) => {
    setBusy(label);
    const { data, error } = await supabase
      .from("equipment")
      .update(patch)
      .eq("id", equipment.id)
      .select()
      .single();
    setBusy(null);
    if (!error && data) onChange(data);
  };

  const remove = async () => {
    if (!window.confirm(`Delete ${equipment.brand} ${equipment.model}? This cannot be undone.`)) return;
    setBusy("delete");
    const { error } = await supabase.from("equipment").delete().eq("id", equipment.id);
    setBusy(null);
    if (!error) navigate("/admin/inventory");
  };

  return (
    <div className="rounded-lg border border-ink-200 bg-white p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={equipment.published ? "success" : "neutral"}>
          {equipment.published ? "Published" : "Not published"}
        </Badge>
        <Badge tone="neutral">{equipment.status}</Badge>
        {equipment.featured && <Badge tone="brand">Featured</Badge>}
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {!equipment.published ? (
          <Button
            size="sm"
            disabled={busy !== null}
            onClick={() => apply("publish", { published: true, status: "published" })}
          >
            {busy === "publish" ? "Publishing…" : "Publish"}
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            disabled={busy !== null}
            onClick={() => apply("unpublish", { published: false, status: "draft" })}
          >
            {busy === "unpublish" ? "Unpublishing…" : "Unpublish"}
          </Button>
        )}

        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={() => apply("sold", { status: "sold", availability: "sold" })}
        >
          {busy === "sold" ? "Saving…" : "Mark sold"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={() => apply("archive", { status: "archived", published: false })}
        >
          {busy === "archive" ? "Archiving…" : "Archive"}
        </Button>

        <Button
          size="sm"
          variant="outline"
          disabled={busy !== null}
          onClick={() => apply("feature", { featured: !equipment.featured })}
        >
          {busy === "feature" ? "Saving…" : equipment.featured ? "Unfeature" : "Feature"}
        </Button>

        <Button size="sm" variant="ghost" disabled={busy !== null} onClick={remove} className="text-brand-600">
          {busy === "delete" ? "Deleting…" : "Delete"}
        </Button>
      </div>
    </div>
  );
}
