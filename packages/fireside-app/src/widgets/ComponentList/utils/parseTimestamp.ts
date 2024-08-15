export default function parseTimestamp(t: number): string {
  const now = Date.now();
  const d = new Date(t);

  if (now - 1000 * 60 * 60 < t) return "less than one hour ago";
  if (now - 1000 * 60 * 60 * 24 < t) return "today";
  if (now - 1000 * 60 * 60 * 24 * 2 < t) return "yesterday";
  if (now - 1000 * 60 * 60 * 24 * 3 < t) return "2 days ago";
  if (now - 1000 * 60 * 60 * 24 * 4 < t) return "3 days ago";
  if (now - 1000 * 60 * 60 * 24 * 5 < t) return "4 days ago";
  if (now - 1000 * 60 * 60 * 24 * 6 < t) return "5 days ago";
  if (now - 1000 * 60 * 60 * 24 * 14 < t) return "last week";
  return `${d.getFullYear()} / ${d.getMonth() + 1} / ${d.getUTCDate()}`;
}
