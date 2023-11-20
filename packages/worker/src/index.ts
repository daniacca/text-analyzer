import connectToRedis, { SortedSetRepositoryFactory } from "../../common/lib/cache";
import utils from "../../common/lib/utils";
import { ModuleHeartbeat } from "@mangosteen/background-healthcheck";
import rabbit from "../../common/lib/message-bus";
import { using } from "using-statement";
import analyzer, { analyzeText } from "./text-analyzer";

const { delay } = utils;
const { getWords } = analyzer;

process.on("SIGINT", () => {
  console.log("Stopping worker...");
  process.exit();
});

const appModule = new ModuleHeartbeat("app", 2000);

const rabbitHost = "rabbit-mq.io";
const redisHost = "redis.io";
const wordSetKey = "word:set";

async function main() {
  using(new rabbit.RabbitReceiver(rabbitHost, 5672, "guest", "guest", "USER_HOST"), async (receiver) => {
    const client = await connectToRedis(redisHost, 6379);
    const wordSetRepository = SortedSetRepositoryFactory(client)(wordSetKey);

    await receiver.connect();
    const checkRedis = () => {
      return client.isOpen && client.isReady;
    };

    if (!checkRedis()) {
      console.log("Redis connection failed. Exiting...");
      process.exit();
    }

    const initCounter = async () => {
      await client.set("worker:done", 0);
      await client.set("letters", 0);
      await client.set("words", 0);
      await client.set("spaces", 0);
      await client.del(wordSetKey);
    };

    initCounter();
    await receiver.receive("test-queue", async (data) => {
      if (data === "PROCESS:SENDER:START") {
        await initCounter();
        return;
      }

      if (data === "PROCESS:SENDER:DONE") {
        await client.set("worker:done", 1);
        return;
      }

      console.log("Received message:", data);
      const { letters, spaces, words } = analyzeText(data);
      await client.incrBy("letters", letters);
      await client.incrBy("spaces", spaces);
      await client.incrBy("words", words);
      const wordsArray = getWords(data);
      for (const word of wordsArray) {
        await wordSetRepository.increment(word);
      }
    });

    for (;;) {
      await delay(2000);
      console.log("The mighty worker is alive...");
      await appModule.signal();
    }
  });
}

main();
