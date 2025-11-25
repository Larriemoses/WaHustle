// apps/backend-node/src/xparse.ts
const cur = "NGN";
const amtRe = /(₦|NGN|N)?\s?([0-9][0-9,\.]*)/i;

function parseAmount(text: string) {
  const m = amtRe.exec(text.replace(/,/g, ""));
  if (!m) return { amount: undefined as number | undefined, currency: cur };
  const n = Number(m[2]);
  return Number.isFinite(n)
    ? { amount: n, currency: cur }
    : { amount: undefined, currency: cur };
}

export function parseNote(text: string) {
  const t = (text || "").trim();
  if (!t) return null;
  const { amount, currency } = parseAmount(t);
  if (t.toLowerCase().startsWith("sold:") && amount) {
    let item = t.split(":", 2)[1]?.trim() ?? "";
    item = item
      .replace(amtRe, "")
      .replace(/[ -—]+$/g, "")
      .trim();
    return {
      type: "sale" as const,
      item,
      amount,
      currency,
      amountN: `₦${amount.toLocaleString()}`,
    };
  }
  if (t.toLowerCase().startsWith("expense:") && amount) {
    let item = t.split(":", 2)[1]?.trim() ?? "";
    item = item
      .replace(amtRe, "")
      .replace(/[ -—]+$/g, "")
      .trim();
    return {
      type: "expense" as const,
      item,
      amount,
      currency,
      amountN: `₦${amount.toLocaleString()}`,
    };
  }
  return null;
}
