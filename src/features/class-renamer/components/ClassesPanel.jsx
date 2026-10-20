import { useMemo, useState } from "react";
import Node from "./Node";

// Garde un nœud s'il correspond, ou si l'un de ses descendants correspond
function filterTree(nodes, keep) {
  return nodes.flatMap((node) => {
    const children = filterTree(node.children, keep);
    return keep(node) || children.length ? [{ ...node, children }] : [];
  });
}

export default function ClassesPanel({ tree, styles, names, invalid, onRename, onCopy, copied }) {
  const [query, setQuery] = useState("");
  const [onlyModified, setOnlyModified] = useState(false);

  const classIds = Object.keys(styles);
  const modifiedCount = classIds.filter((id) => (names[id] ?? "").trim() !== styles[id].name).length;

  const visibleTree = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q && !onlyModified) return tree;

    const matches = (id) => {
      const style = styles[id];
      if (!style) return false;
      const current = (names[id] ?? "").trim();
      if (onlyModified && current === style.name) return false;
      if (!q) return true;
      return current.toLowerCase().includes(q) || style.name.toLowerCase().includes(q);
    };

    return filterTree(tree, (node) => node.classes.some(matches));
  }, [tree, styles, names, query, onlyModified]);

  const tab = (active) =>
    `h-7 rounded-[5px] px-2.5 text-xs transition-colors ${active ? "bg-surface-2 text-heading" : "text-muted hover:text-text"}`;

  return (
    <section className="flex min-w-0 flex-col rounded-lg border border-border bg-surface">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <h2 className="font-sans text-base font-medium text-heading">Classes</h2>
          <span className="rounded-full bg-surface-2 px-2 py-px text-[11px] text-muted">{classIds.length}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <label className="flex h-9 items-center gap-2 rounded-sm border border-border bg-bg px-3 focus-within:border-primary/50">
            <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <span className="sr-only">Filter classes</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter…"
              className="w-36 bg-transparent font-mono text-[13px] text-heading outline-none placeholder:text-muted"
            />
          </label>

          <div className="flex rounded-sm border border-border bg-bg p-[3px]">
            <button type="button" aria-pressed={!onlyModified} onClick={() => setOnlyModified(false)} className={tab(!onlyModified)}>
              All
            </button>
            <button type="button" aria-pressed={onlyModified} onClick={() => setOnlyModified(true)} className={tab(onlyModified)}>
              Modified · {modifiedCount}
            </button>
          </div>
        </div>
      </div>

      {/* Tree */}
      <div className="p-4 text-[13px]">
        {visibleTree.length > 0 ? (
          <ul>
            {visibleTree.map((node) => (
              <Node key={node.id} node={node} styles={styles} names={names} invalid={invalid} onRename={onRename} />
            ))}
          </ul>
        ) : (
          <p className="py-10 text-center text-muted">
            {onlyModified && !query ? "No class renamed yet." : "No class matches your filter."}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto flex flex-wrap items-center justify-end gap-4 border-t border-border px-4 py-3.5">
        <div className="flex flex-wrap items-center gap-3">
          {invalid.size > 0 ? (
            <span role="alert" className="text-xs text-red-400">Some classes are empty or duplicated.</span>
          ) : (
            <span className="text-xs text-muted">then ⌘ V in the Designer</span>
          )}

          <button
            type="button"
            onClick={onCopy}
            disabled={invalid.size > 0}
            className="flex min-h-11 items-center gap-2 rounded-sm bg-primary px-[18px] font-sans text-sm font-medium text-primary-fg transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h9" />
            </svg>
            {copied ? "Copied!" : "Copy for Webflow"}
          </button>
        </div>
      </div>
    </section>
  );
}