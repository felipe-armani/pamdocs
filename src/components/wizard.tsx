import { ReactNode, useState } from "react";

export type WizardStep = {
  title: string;
  summary: string;
  body: ReactNode;
  note?: string;
};

export function Wizard({
  module,
  title,
  intro,
  steps,
}: {
  module: string;
  title: string;
  intro: string;
  steps: WizardStep[];
}) {
  const [current, setCurrent] = useState(0);
  const step = steps[current];
  const progress = ((current + 1) / steps.length) * 100;

  return (
    <article className="space-y-10">
      <header className="space-y-4">
        <div className="flex items-center gap-3 text-xs">
          <span className="font-mono tabular-nums text-muted-foreground">MÓDULO {module}</span>
          <span className="h-px w-10 bg-border" />
          <span className="eyebrow text-violet">Procedimento operacional</span>
        </div>
        <h1 className="text-4xl font-semibold uppercase leading-[1.05] tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">{intro}</p>
      </header>

      <div className="border border-border bg-card">
        <div className="grid grid-cols-1 border-b border-border md:grid-cols-[1fr_auto]">
          <ol className="flex flex-wrap">
            {steps.map((s, i) => {
              const active = i === current;
              const done = i < current;
              return (
                <li key={s.title} className="flex-1 min-w-[140px]">
                  <button
                    onClick={() => setCurrent(i)}
                    className={`group relative w-full border-r border-border px-5 py-4 text-left transition-colors last:border-r-0 ${
                      active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-6 w-6 place-items-center border text-[11px] font-mono tabular-nums ${
                          active
                            ? "border-primary-foreground text-primary-foreground"
                            : done
                              ? "border-violet bg-violet text-white"
                              : "border-border text-muted-foreground"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-xs uppercase tracking-wider ${
                          active ? "text-primary-foreground" : "text-foreground"
                        }`}
                      >
                        Etapa
                      </span>
                    </div>
                    <div
                      className={`mt-2 text-sm leading-snug ${
                        active ? "text-primary-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {s.title}
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="h-[2px] bg-muted">
          <div
            className="h-full bg-violet transition-[width] duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid gap-10 p-8 md:grid-cols-12 md:p-12">
          <div className="md:col-span-4">
            <div className="eyebrow text-muted-foreground">
              Etapa {String(current + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
            </div>
            <h2 className="mt-3 text-2xl font-semibold uppercase leading-tight tracking-tight">
              {step.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.summary}</p>
            {step.note && (
              <div className="mt-8 border-l-2 border-blush bg-blush/10 px-4 py-3">
                <div className="eyebrow text-foreground/70">Atenção</div>
                <p className="mt-1 text-xs leading-relaxed text-foreground/90">{step.note}</p>
              </div>
            )}
          </div>
          <div className="md:col-span-8">
            <div className="space-y-6">{step.body}</div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border px-8 py-5 md:px-12">
          <button
            onClick={() => setCurrent((c) => Math.max(0, c - 1))}
            disabled={current === 0}
            className="text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground disabled:opacity-30"
          >
            ← Etapa anterior
          </button>
          <span className="font-mono text-[11px] tabular-nums text-muted-foreground">
            {String(current + 1).padStart(2, "0")} — {String(steps.length).padStart(2, "0")}
          </span>
          <button
            onClick={() => setCurrent((c) => Math.min(steps.length - 1, c + 1))}
            disabled={current === steps.length - 1}
            className="bg-primary px-5 py-2.5 text-xs uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-30"
          >
            Próxima etapa →
          </button>
        </div>
      </div>
    </article>
  );
}
