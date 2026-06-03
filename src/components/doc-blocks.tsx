import { ReactNode, useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

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
  const [zoomed, setZoomed] = useState(false);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    },
    [],
  );

  useEffect(() => {
    if (zoomed) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [zoomed, onKeyDown]);

  return (
    <>
      <figure className="group relative border border-border bg-card">
        <img
          src={src}
          alt={alt}
          className="w-full cursor-zoom-in transition-opacity group-hover:opacity-95"
          onClick={() => setZoomed(true)}
        />
        {/* Lupa no canto ao hover */}
        <div className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 bg-background/80 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          Ampliar
        </div>
        {caption && (
          <figcaption className="border-t border-border px-4 py-2 text-[11px] uppercase tracking-widest text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>

      {/* Lightbox overlay via Portal */}
      {zoomed &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 p-6 backdrop-blur-sm animate-in fade-in-0"
            onClick={() => setZoomed(false)}
          >
            {/* Botão fechar */}
            <button
              className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              onClick={() => setZoomed(false)}
              aria-label="Fechar zoom"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Container da imagem */}
            <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              />
              {caption && (
                <p className="mt-4 text-center text-xs uppercase tracking-widest text-white/60">
                  {caption}
                </p>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
