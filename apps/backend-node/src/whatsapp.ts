// apps/backend-node/src/whatsapp.ts
import { FastifyInstance } from "fastify";
import { extractMessages, sendText } from "./wsend.js";
import { db } from "./xdb.js";
import { parseNote } from "./xparse.js";
import { aiReply } from "./xai.js";

export async function whatsappRoutes(f: FastifyInstance) {
  f.get("/", async (req, reply) => {
    const {
      ["hub.mode"]: mode,
      ["hub.challenge"]: challenge,
      ["hub.verify_token"]: token,
    } = (req.query as any) || {};
    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      return reply.type("text/plain").send(challenge ?? "");
    }
    return reply.status(403).send({ error: "verify failed" });
  });

  f.post("/", async (req, reply) => {
    const payload = req.body as any;
    const events = extractMessages(payload);
    for (const ev of events) {
      const userPhone = ev.from;
      const text = ev.text ?? "";
      await db.saveMessage(userPhone, text, ev);
      const parsed = parseNote(text);
      if (parsed) {
        if (parsed.type === "sale") {
          await db.insertSale(userPhone, parsed);
          await sendText(
            userPhone,
            `✅ Recorded sale: ${parsed.item} for ${parsed.amountN}`
          );
        } else {
          await db.insertExpense(userPhone, parsed);
          await sendText(
            userPhone,
            `🧾 Recorded expense: ${parsed.item} for ${parsed.amountN}`
          );
        }
        continue;
      }
      const suggestion = await aiReply(userPhone, text);
      await sendText(userPhone, suggestion);
    }
    return { received: true };
  });
}
