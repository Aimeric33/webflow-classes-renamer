export function parseWebflowClipboard(raw) {
  if (!raw?.trim()) return { error: "The clipboard is empty." };

  let data;
  try {
    data = JSON.parse(raw);
  } catch {
    return { error: "The pasted content isn't valid JSON." };
  }

  const ok =
    data?.type === "@webflow/XscpData" &&
    Array.isArray(data.payload?.nodes) &&
    Array.isArray(data.payload?.styles);

  if (!ok) {
    return { error: "The JSON doesn't match Webflow's clipboard format." };
  }
  return { data };
}

// Transforme la liste plate de nodes en arbre (en ignorant les nodes texte)
export function buildTree(nodes) {
  const byId = new Map(nodes.map((n) => [n._id, n]));
  const childIds = new Set(nodes.flatMap((n) => n.children ?? []));

  const toTree = (n) => ({
    id: n._id,
    type: n.type,
    tag: n.tag,
    classes: n.classes ?? [],
    children: (n.children ?? [])
      .map((id) => byId.get(id))
      .filter((c) => c && !c.text)
      .map(toTree),
  });

  return nodes.filter((n) => !n.text && !childIds.has(n._id)).map(toTree);
}

// Renvoie les ids des classes invalides (nom vide, ou doublon entre classes de base)
export function findInvalid(names, styles) {
  const invalid = new Set();
  const seen = new Map();

  for (const [id, name] of Object.entries(names)) {
    const key = name.trim().toLowerCase();
    if (!key) {
      invalid.add(id);
      continue;
    }
    if (styles[id]?.comb) continue;

    if (seen.has(key)) {
      invalid.add(id);
      invalid.add(seen.get(key));
    } else {
      seen.set(key, id);
    }
  }
  return invalid;
}

// Applique les nouveaux noms : seul style.name change, les ids restent identiques
export function applyNames(data, names) {
  const copy = structuredClone(data);
  copy.payload.styles.forEach((style) => {
    if (names[style._id] != null) style.name = names[style._id].trim();
  });
  return JSON.stringify(copy);
}

// Webflow ne lit que le type MIME "application/json".
// navigator.clipboard.writeText ne gère que text/plain, d'où l'événement copy.
export function copyToWebflow(json) {
  const onCopy = (e) => {
    e.clipboardData.setData("application/json", json);
    e.preventDefault();
  };
  document.addEventListener("copy", onCopy, { once: true });
  const ok = document.execCommand("copy");
  document.removeEventListener("copy", onCopy);
  return ok;
}