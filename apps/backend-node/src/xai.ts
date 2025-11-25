// apps/backend-node/src/xai.ts
import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function catalogFromImage(image_url: string) {
  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: "Write concise, Nigeria-market product metadata.",
    },
    {
      role: "user",
      content: [
        {
          type: "text",
          text: "Identify product type/color/material/brand. Suggest title, 1-2 line desc, rough NGN price, 5 hashtags.",
        },
        { type: "image_url", image_url: { url: image_url } },
      ] as any,
    },
  ];
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.5,
    messages,
  });
  return { raw: r.choices[0]?.message?.content ?? "" };
}

export async function captionPack(product: any) {
  const prompt = `Create 3 short WhatsApp status captions + 5 hashtags for: ${product?.title} - ${product?.description}. Salesy, clear, 1 CTA, few emojis.`;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.7,
    messages: [{ role: "user", content: prompt }],
  });
  return { captions: r.choices[0]?.message?.content ?? "" };
}

export async function aiReply(_phone: string, user_msg: string) {
  const prompt = `Customer asked: "${user_msg}". Reply friendly & concise for WhatsApp in Nigeria. If price asked but unknown, ask for product name.`;
  const r = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6,
    messages: [
      { role: "system", content: "You are a helpful seller assistant." },
      { role: "user", content: prompt },
    ],
  });
  return r.choices[0]?.message?.content ?? "Thanks! How can I help?";
}
