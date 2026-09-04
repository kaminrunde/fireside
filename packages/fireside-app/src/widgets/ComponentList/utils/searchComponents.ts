import { Component } from "@kaminrunde/fireside-utils";

export type Match = {
  /** where the hit sits, e.g. "label" or "slides[0].headline" */
  path: string;
  /** the matching value, cut down to something that fits in a card */
  snippet: string;
  /** offset of the query inside snippet */
  start: number;
  length: number;
};

/** characters of surrounding value kept on each side of a hit */
const CONTEXT = 28;

/**
 * the card headline already shows the grid area, and __version and friends
 * are bookkeeping the editor should not surface as content
 */
const skipKey = (key: string) => key === "gridArea" || key.startsWith("__");

function toMatch(text: string, index: number, query: string, path: string): Match {
  const from = Math.max(0, index - CONTEXT);
  const to = Math.min(text.length, index + query.length + CONTEXT);
  let snippet = text.slice(from, to);
  let start = index - from;
  if (from > 0) {
    snippet = "…" + snippet;
    start += 1;
  }
  if (to < text.length) snippet += "…";
  return { path, snippet, start, length: query.length };
}

function walk(value: any, path: string, query: string, out: Match[]): void {
  if (value === null || value === undefined) return;

  if (Array.isArray(value)) {
    value.forEach((entry, i) => walk(entry, `${path}[${i}]`, query, out));
    return;
  }

  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      if (skipKey(key)) continue;
      walk(value[key], path ? `${path}.${key}` : key, query, out);
    }
    return;
  }

  // booleans are left out, they would match far more than anyone means
  if (typeof value !== "string" && typeof value !== "number") return;

  const text = String(value);
  const index = text.toLowerCase().indexOf(query);
  if (index === -1) return;
  out.push(toMatch(text, index, query, path));
}

/**
 * every hit inside a component, over its type name and every string or
 * number anywhere in its props, however deeply nested
 */
export function findMatches(component: Component, query: string): Match[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  let out: Match[] = [];

  const typeIndex = component.name.toLowerCase().indexOf(q);
  if (typeIndex !== -1) {
    out.push(toMatch(component.name, typeIndex, q, "type"));
  }

  walk(component.props, "", q, out);
  return out;
}

/**
 * whether the component should stay in the list. The grid area is excluded
 * from the previews but still has to be searchable, it is the name people
 * look for first
 */
export function matchesQuery(component: Component, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  if (component.props.gridArea.toLowerCase().includes(q)) return true;
  return findMatches(component, q).length > 0;
}
