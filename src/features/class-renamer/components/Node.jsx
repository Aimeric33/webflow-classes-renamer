const ICONS = {
  Section: "▭",
  Block: "▢",
  Container: "▤",
  BlockContainer: "▤",
  Heading: "H",
  Paragraph: "¶",
  Link: "↗",
  LinkBlock: "↗",
  Image: "▣",
  List: "≡",
  ListItem: "•",
  FormWrapper: "✎",
};

export default function Node({ node, styles, names, invalid, onRename }) {
  return (
    <li>
      <div className="wcr-node">
        <span className="wcr-icon" title={node.type}>{ICONS[node.type] ?? "▢"}</span>

        {node.classes.filter((id) => styles[id]).map((id) => (
          <input
            key={id}
            className={`wcr-class ${styles[id].comb ? "is-combo" : ""} ${invalid.has(id) ? "is-invalid" : ""}`}
            value={names[id] ?? ""}
            onChange={(e) => onRename(id, e.target.value)}
            size={Math.max((names[id] ?? "").length, 4)}
          />
        ))}

        {node.classes.length === 0 && <span className="wcr-empty">{node.type}</span>}
      </div>

      {node.children.length > 0 && (
        <ul>
          {node.children.map((child) => (
            <Node key={child.id} node={child} styles={styles} names={names} invalid={invalid} onRename={onRename} />
          ))}
        </ul>
      )}
    </li>
  );
}