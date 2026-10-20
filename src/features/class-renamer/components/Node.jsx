const TYPES = {
  Section: { label: "Section", icon: "S" },
  Block: { label: "Div Block", icon: "D" },
  BlockContainer: { label: "Container", icon: "C" },
  Container: { label: "Container", icon: "C" },
  Heading: { label: "Heading", icon: "H" },
  Paragraph: { label: "Paragraph", icon: "P" },
  Link: { label: "Link", icon: "A" },
  LinkBlock: { label: "Link Block", icon: "A" },
  Image: { label: "Image", icon: "I" },
  List: { label: "List", icon: "L" },
  ListItem: { label: "List Item", icon: "•" },
  FormWrapper: { label: "Form", icon: "F" },
};

function ClassInput({ id, style, value, invalid, onRename }) {
  const combo = Boolean(style.comb);
  const changed = value.trim() !== style.name;

  const tone = invalid
    ? "border-red-400 bg-red-400/10 text-red-400"
    : `bg-primary/10 text-primary ${changed ? "border-primary/40" : "border-border"}`;

  return (
    <input
      aria-label={`${combo ? "Combo class" : "Class"} ${style.name}`}
      value={value}
      onChange={(e) => onRename(id, e.target.value)}
      size={Math.max(value.length, 4)}
      spellCheck={false}
      className={`rounded-sm border px-2 py-1 font-mono outline-none transition focus:border-primary focus:bg-bg focus:text-heading ${tone}`}
    />
  );
}

export default function Node({ node, styles, names, invalid, onRename }) {
  const type = TYPES[node.type] ?? { label: node.type, icon: node.type?.[0] ?? "?" };
  const classIds = node.classes.filter((id) => styles[id]);
  const changedIds = classIds.filter((id) => (names[id] ?? "").trim() !== styles[id].name);

  return (
    <li>
      <div className="flex min-h-10 flex-wrap items-center gap-2.5">
        <span title={node.type} className="grid size-6 shrink-0 place-items-center rounded-sm bg-surface-2 text-[11px] text-muted">
          {type.icon}
        </span>
        <span className="w-[84px] truncate text-xs text-muted">{type.label}</span>

        {classIds.map((id) => (
          <ClassInput key={id} id={id} style={styles[id]} value={names[id] ?? ""} invalid={invalid.has(id)} onRename={onRename} />
        ))}

        {classIds.length === 0 && <span className="text-xs text-muted/60">No class</span>}

        {changedIds.map((id) => (
          <s key={id} className="text-xs text-muted">{styles[id].name}</s>
        ))}
      </div>

      {node.children.length > 0 && (
        <ul className="ml-[11px] border-l border-border pl-[21px]">
          {node.children.map((child) => (
            <Node key={child.id} node={child} styles={styles} names={names} invalid={invalid} onRename={onRename} />
          ))}
        </ul>
      )}
    </li>
  );
}