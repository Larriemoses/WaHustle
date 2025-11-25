// apps/backend-node/src/server.ts
import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { whatsappRoutes } from "./whatsapp.js";
import { apiRoutes } from "./webapi.js";
import { startCron } from "./worker.js";

const app = Fastify({ logger: true });

app.register(cors, { origin: true });
app.get("/healthz", async () => ({ ok: true, ts: Date.now() }));
app.register(whatsappRoutes, { prefix: "/webhook/whatsapp" });
app.register(apiRoutes, { prefix: "/api" });

const port = Number(process.env.PORT || 8000);
app.listen({ port, host: "0.0.0.0" }).then(() => {
  startCron(app.log); // why: ensure jobs start only after server is ready
});
