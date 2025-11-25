// apps/backend-node/src/worker.ts
import cron from "node-cron";
import { db } from "./xdb.js";
// import { sendText } from './wsend.js'; // enable when you broadcast summaries

export function startCron(log: any) {
  // why: Lagos users are most active around 9am & 8pm; adjust later from DB settings
  cron.schedule(
    "0 20 * * *",
    async () => {
      log.info("[cron] daily summaries 20:00");
      // TODO: query users and send summaries
    },
    { timezone: process.env.TZ || "Africa/Lagos" }
  );

  cron.schedule(
    "0 9 * * *",
    async () => {
      log.info("[cron] posting reminders 09:00");
      // TODO: query schedules and send reminders
    },
    { timezone: process.env.TZ || "Africa/Lagos" }
  );
}
