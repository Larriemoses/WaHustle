// apps/backend-node/src/wsend.ts
import { request } from "undici";

// Use v22.0 to match your Meta dashboard
const BASE = `https://graph.facebook.com/v22.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`;

export function extractMessages(payload: any) {
  const out: Array<{ from: string; text?: string; raw: any }> = [];
  for (const entry of payload?.entry ?? []) {
    for (const ch of entry?.changes ?? []) {
      const val = ch?.value ?? {};
      for (const msg of val?.messages ?? []) {
        out.push({ from: msg.from, text: msg?.text?.body, raw: msg });
      }
    }
  }
  return out;
}

export async function sendText(to: string, text: string) {
  const body = {
    messaging_product: "whatsapp",
    to,
    type: "text",
    text: { body: (text || "").slice(0, 4096) }, // why: WA limit safety
  };

  const res = await request(BASE, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.statusCode >= 300) {
    const err = await res.body.text();
    throw new Error(`WhatsApp send failed ${res.statusCode}: ${err}`);
  }
}
