import connectToRedis from "../../common/lib/cache";
import { ModuleHeartbeat } from "@mangosteen/background-healthcheck";
import rabbit from "../../common/lib/message-bus";
import { using } from "using-statement";

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

process.on("SIGINT", () => {
  console.log("Stopping worker...");
  process.exit();
});

const appModule = new ModuleHeartbeat("app", 2000);

const rabbitHost = "rabbit-mq.io";
const redisHost = "redis.io";

async function main() {
  using(new rabbit.RabbitReceiver(rabbitHost, 5672, "guest", "guest", "USER_HOST"), async (receiver) => {
    const client = await connectToRedis(redisHost, 6379);
    await receiver.connect();
    const checkRedis = () => {
      return client.isOpen && client.isReady;
    };

    if (!checkRedis()) {
      console.log("Redis connection failed. Exiting...");
      process.exit();
    }

    await receiver.receive("test-queue", async (data) => {
      console.log("Received message:", data);
    });

    await client.set("worker:heartbeat", 0);
    for (;;) {
      await delay(2000);
      console.log("The mighty worker is alive...");
      await appModule.signal();
      await client.incr("worker:heartbeat");
    }
  });
}

main();
