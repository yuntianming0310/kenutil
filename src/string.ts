export function normalizeWhitespace(str: string): string {
  return str.trim().replace(/\\s+/g, ' ');
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(
  dateStr: string | number | Date,
  locale: string = "en-US"
): string {
  return new Date(dateStr).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
