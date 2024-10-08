import { PrismaClient } from "@prisma/client";
import { logger } from "./logging";

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: [
    {
      emit: "event",
      level: "error",
    },
  ],
});

db.$on("error", (event) => {
  logger
    .log({ level: "error", message: event.message })
    .catch((e) => console.error("Logging failed", e));
});

export default db;