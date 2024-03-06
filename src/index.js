import { config } from "dotenv";
import start from "./core/utils/handlers/start.js";

config();

// Error handlers aka Anti-Crash system
process.on("unhandledRejection", (reason, promise) => {
  console.error("[antiCrash] :: [unhandledRejection]");
  console.log(promise, reason);
});

process.on("uncaughtException", (err, origin) => {
  console.error("[antiCrash] :: [uncaughtException]");
  console.log(err, origin);
});

process.on("uncaughtExceptionMonitor", (err, origin) => {
  console.error("[antiCrash] :: [uncaughtExceptionMonitor]");
  console.log(err, origin);
});

process.on("uncaughtMultipleResolves", (type, promise, reason) => {
  logger.info(`[antiCrash] :: [uncaughtMultipleResolves]`);
  console.log(type, promise, reason);
});

start();
