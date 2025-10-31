export async function readClipboardText(): Promise<string | null> {
  try {
    return await navigator.clipboard.readText();
  } catch {
    return null;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error("Copy failed:", err);
    return false;
  }
}

export function downloadFile(url: string, filename: string): void {
  const aEl = document.createElement("a");
  aEl.href = url;
  aEl.download = filename;
  document.body.appendChild(aEl);
  aEl.click();
  document.body.removeChild(aEl);
}

export function cn(...args: any[]): string {
  let str = "";
  for (const arg of args) {
    if (!arg) continue;
    const t = typeof arg;
    if (t === "string" || t === "number") {
      str += (str && " ") + arg;
    } else if (Array.isArray(arg)) {
      const inner = cn(...arg);
      if (inner) str += (str && " ") + inner;
    } else if (t === "object") {
      for (const key in arg) {
        if (arg[key]) str += (str && " ") + key;
      }
    }
  }
  return str;
}
