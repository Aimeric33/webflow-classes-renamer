import { useMemo, useState } from "react";
import { parseWebflowClipboard, buildTree, findInvalid, applyNames, copyToWebflow } from "./utils/webflow";
import Node from "./components/Node";
import "./ClassRenamer.css";

export default function ClassRenamer() {
  const [data, setData] = useState(null);
  const [names, setNames] = useState({});
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const tree = useMemo(() => (data ? buildTree(data.payload.nodes) : []), [data]);
  const styles = useMemo(
    () => Object.fromEntries((data?.payload.styles ?? []).map((s) => [s._id, s])),
    [data]
  );
  const invalid = useMemo(() => findInvalid(names, styles), [names, styles]);

  const handlePaste = (e) => {
    e.preventDefault();
    const raw = e.clipboardData.getData("application/json") || e.clipboardData.getData("text/plain");
    const result = parseWebflowClipboard(raw);

    if (result.error) {
      setError(result.error);
      setData(null);
      return;
    }
    setError("");
    setCopied(false);
    setData(result.data);
    setNames(Object.fromEntries(result.data.payload.styles.map((s) => [s._id, s.name])));
  };

  const rename = (id, value) => {
    setCopied(false);
    setNames((prev) => ({ ...prev, [id]: value }));
  };

  const handleCopy = () => {
    setCopied(copyToWebflow(applyNames(data, names)));
  };

  return (
    <div className="wcr">
      <div className="wcr-col">
        <textarea
          className="wcr-paste"
          value=""
          onChange={() => {}}
          onPaste={handlePaste}
          placeholder="Paste your Webflow element here (Cmd/Ctrl + V)"
        />
        {error && <p className="wcr-error">{error}</p>}
        <button className="wcr-copy" onClick={handleCopy} disabled={invalid.size > 0}>
              {copied ? "Copied" : "Copy for import in Webflow"}
            </button>
            {invalid.size > 0 && <p className="wcr-error">Certaines classes sont vides ou en doublon.</p>}
      </div>
  
      <div className="wcr-col">
        {data && (
            <ul className="wcr-tree">
                {tree.map((node) => (
                <Node key={node.id} node={node} styles={styles} names={names} invalid={invalid} onRename={rename} />
                ))}
            </ul>
        )}
      </div>
    </div>
  );
}