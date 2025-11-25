// apps/backend-node/src/webapi.ts
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { db } from "./xdb.js";
import { captionPack, catalogFromImage } from "./xai.js";

export async function apiRoutes(f: FastifyInstance) {
  f.get("/products", async () => db.listProducts());

  f.post("/products", async (req, reply) => {
    const body = z
      .object({
        title: z.string().min(1),
        description: z.string().optional(),
        price: z.number().optional(),
        category: z.string().optional(),
        image_url: z.string().url().optional(),
        hashtags: z.array(z.string()).optional(),
      })
      .parse(req.body);
    const p = await db.insertProduct(body);
    return reply.code(201).send(p);
  });

  f.post("/catalog/ai", async (req) => {
    const { image_url } = z
      .object({ image_url: z.string().url() })
      .parse(req.body);
    return catalogFromImage(image_url);
  });

  f.post("/captions/ai", async (req) => {
    const { product_id } = z
      .object({ product_id: z.string().min(1) })
      .parse(req.body);
    const product = await db.getProduct(product_id);
    return captionPack(product);
  });

  f.get("/analytics/summary", async () => db.sumCards());

  f.post("/sales/parse", async (req) => {
    const { text } = z.object({ text: z.string() }).parse(req.body);
    const { parseNote } = await import("./xparse.js");
    return parseNote(text);
  });
}
