import { useMemo, useState } from "react";
import { parseWebflowClipboard, buildTree, findInvalid, applyNames, copyToWebflow } from "./utils/webflow";
import "./ClassRenamer.css";
import PasteZone from "./components/PasteZone";
import ClassesPanel from "./components/ClassesPanel";

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
    <div className="grid grid-cols-[0.5fr_1fr] gap-8">
      <div>
        <PasteZone data={data} error={error} onPaste={handlePaste} />
      </div>
  
      <ClassesPanel
        tree={tree}
        styles={styles}
        names={names}
        invalid={invalid}
        onRename={rename}
        onCopy={handleCopy}
        copied={copied}
      />
    </div>
  );
}