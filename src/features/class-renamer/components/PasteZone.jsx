function PasteTarget({ onPaste }) {
  return (
    <textarea
      aria-label="Paste area"
      value=""
      onChange={() => {}}
      onPaste={onPaste}
      className="absolute inset-0 size-full cursor-text resize-none border-0 opacity-0"
    />
  );
}

function Kbd({ children }) {
  return <kbd className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-muted">{children}</kbd>;
}

export default function PasteZone({ data, error, onPaste }) {
  if (data) {
    const nodes = data.payload.nodes.filter((n) => !n.text);
    const childIds = new Set(nodes.flatMap((n) => n.children ?? []));
    const root = nodes.find((n) => !childIds.has(n._id));

    const stats = [
      { label: "Root", value: root?.tag ?? "—" },
      { label: "Elements", value: nodes.length },
      { label: "Classes", value: data.payload.styles.length },
    ];

    return (
      <section className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-5">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
          <div>
            <p className="font-sans font-medium text-heading">Webflow element detected</p>
            <p className="text-xs text-muted">Pasted just now</p>
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="min-w-0 rounded-md bg-surface-2 px-3 py-2.5">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-0.5 truncate text-heading">{s.value}</dd>
            </div>
          ))}
        </dl>

        <label className="relative flex min-h-11 items-center justify-between rounded-md border border-dashed border-white/15 px-3.5 transition-colors hover:border-primary/40">
          Paste another element
          <Kbd>⌘ V</Kbd>
          <PasteTarget onPaste={onPaste} />
        </label>
      </section>
    );
  }

  return (
    <label
      className={`relative flex min-h-100 min-w-0 cursor-text flex-col items-center justify-center gap-4 rounded-lg border border-dashed bg-surface p-8 text-center transition-colors ${
        error ? "border-red-400/60" : "border-primary/35"
      }`}
    >
      <span className={`grid size-14 place-items-center rounded-[14px] ${error ? "bg-red-400/10 text-red-400" : "bg-primary/10 text-primary"}`}>
        {error ? (
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        ) : (
          <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="6" y="4" width="12" height="17" rx="2" />
            <path d="M9 4V3h6v1" />
            <path d="M9 11h6" />
            <path d="M9 15h4" />
          </svg>
        )}
      </span>

      <span className="font-sans text-lg font-medium text-heading">
        {error ? "This isn't a Webflow element" : "Paste your Webflow element here"}
      </span>

      {error ? (
        <span role="alert" className="max-w-70 text-xs text-red-400">
          {error}
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs text-muted">
          <Kbd>⌘ V</Kbd> or <Kbd>Ctrl V</Kbd>
        </span>
      )}
      <PasteTarget onPaste={onPaste} />
    </label>
  );
}