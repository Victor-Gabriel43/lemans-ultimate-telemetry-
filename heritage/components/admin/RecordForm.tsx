"use client";

import { useActionState } from "react";
import type { Field } from "@/lib/admin-schema";
import type { ActionState } from "@/lib/admin-actions";

export type Option = { value: string; label: string };

const input = "w-full border rule bg-pit px-3 py-2 text-sm focus:border-fog focus:outline-none";

export default function RecordForm({
  fields, values, options, action, submitLabel,
}: {
  fields: Field[];
  values: Record<string, unknown>;
  options: Record<string, Option[]>;
  action: (prev: ActionState, form: FormData) => Promise<ActionState>;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form action={formAction} className="space-y-5">
      {fields.map((f) => {
        const v = values[f.name];
        const id = `f-${f.name}`;
        return (
          <div key={f.name} className={f.type === "boolean" ? "flex items-center gap-3" : "grid gap-1.5"}>
            {f.type === "boolean" ? (
              <>
                <input id={id} name={f.name} type="checkbox" defaultChecked={Boolean(v)} className="h-4 w-4 accent-[#d0021b]" />
                <label htmlFor={id} className="text-sm">{f.label}</label>
              </>
            ) : (
              <>
                <label htmlFor={id} className="text-sm text-fog">{f.label}{f.required ? " *" : ""}</label>
                {f.type === "textarea" ? (
                  <textarea id={id} name={f.name} defaultValue={String(v ?? "")} rows={5} className={input} />
                ) : f.type === "json" ? (
                  <textarea id={id} name={f.name} defaultValue={String(v ?? "{}")} rows={3} className={`${input} text-xs`} />
                ) : f.type === "select" ? (
                  <select id={id} name={f.name} defaultValue={String(v ?? "")} className={input}>
                    {!f.required ? <option value="">—</option> : null}
                    {Object.entries(f.options ?? {}).map(([k, label]) => <option key={k} value={k}>{label}</option>)}
                  </select>
                ) : f.type === "relation" ? (
                  <select id={id} name={f.name} defaultValue={String(v ?? "")} className={input}>
                    <option value="">{f.required ? "Select…" : "— none —"}</option>
                    {(options[f.name] ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : f.type === "multi" ? (
                  <select id={id} name={f.name} multiple defaultValue={(v as string[]) ?? []} size={8} className={input}>
                    {(options[f.name] ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input
                    id={id}
                    name={f.name}
                    type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                    defaultValue={f.type === "date" && v ? new Date(v as string).toISOString().slice(0, 10) : String(v ?? "")}
                    className={input}
                  />
                )}
                {f.help ? <p className="text-xs text-fog">{f.help}</p> : null}
                {f.type === "multi" ? <p className="text-xs text-fog">Hold Ctrl/⌘ to select several.</p> : null}
              </>
            )}
          </div>
        );
      })}
      {state.error ? <p role="alert" className="border border-flag/50 bg-flag/10 px-3 py-2 text-sm">{state.error}</p> : null}
      {state.ok ? <p role="status" className="text-sm text-green">Saved.</p> : null}
      <button disabled={pending} className="rounded-full bg-paper px-6 py-2.5 text-sm text-ink hover:bg-white disabled:opacity-50">
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
