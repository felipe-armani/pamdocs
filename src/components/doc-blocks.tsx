import { ReactNode } from "react";

export function StepList({ items }: { items: { label: string; detail?: string }[] }) {
  return (
    <ol className="divide-y divide-border border-y border-border">
      {items.map((it, i) => (
        <li key={i} className="grid grid-cols-[auto_1fr] gap-5 py-4">
          <span className="font-mono text-[11px] tabular-nums text-violet">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="text-sm font-medium text-foreground">{it.label}</div>
            {it.detail && (
              <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{it.detail}</div>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function FieldGrid({ fields }: { fields: { k: string; v: string }[] }) {
  return (
    <dl className="grid grid-cols-1 gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.k} className="bg-card p-4">
          <dt className="eyebrow text-muted-foreground">{f.k}</dt>
          <dd className="mt-1 text-sm text-foreground">{f.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border border-border bg-muted/40 p-5">
      <div className="eyebrow text-muted-foreground">{title}</div>
      <div className="mt-2 text-sm leading-relaxed text-foreground">{children}</div>
    </div>
  );
}

export function Figure({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="border border-border bg-card">
      <img src={src} alt={alt} className="w-full" />
      {caption && (
        <figcaption className="border-t border-border px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
