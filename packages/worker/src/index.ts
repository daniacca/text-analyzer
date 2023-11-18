import connectToRedis from "../../common/lib/cache";
import { ModuleHeartbeat } from "@mangosteen/background-healthcheck";

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

process.on("SIGINT", () => {
  console.log("Stopping worker...");
  process.exit();
});

const appModule = new ModuleHeartbeat("app", 2000);

async function main() {
  const client = await connectToRedis("redis.io", 6379);
  const checkRedis = () => {
    return client.isOpen && client.isReady;
  };

  if (!checkRedis()) {
    console.log("Redis connection failed. Exiting...");
    process.exit();
  }

  await client.set("worker:heartbeat", 0);
  for (;;) {
    await delay(2000);
    console.log("The mighty worker is alive...");
    await appModule.signal();
    await client.incr("worker:heartbeat");
  }
}

main();
