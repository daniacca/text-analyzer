import rabbit from "../../common/lib/message-bus";
import utils from "../../common/lib/utils";
import connectToRedis from "../../common/lib/cache";
import { using } from "using-statement";
import dataLoader from "./data-loader";

const { delay } = utils;

const rabbitHost = "localhost";
const redisHost = "localhost";

console.log("***************************");
console.log("* The Mighty Word Counter *");
console.log("***************************");

process.on("SIGINT", () => {
  process.exit();
});

if (process.argv.length < 3) {
  console.log("No file specified.");
  console.log(`Usage: node ${process.argv[1]} <FILENAME | URL>`);
  process.exit(0);
}

const input = process.argv[2];

async function main() {
  using(new rabbit.RabbitSender(rabbitHost, 5672, "guest", "guest", "USER_HOST"), async (sender) => {
    await sender.connect();
    console.log("RabbitMQ Connected");
    const client = await connectToRedis(redisHost, 6379);

    await sender.send("test-queue", "PROCESS:SENDER:START");

    let finished = false;
    dataLoader(
      input,
      async (line) => {
        console.log("Sending:", line);
        await sender.send("test-queue", line);
      },
      async () => {
        console.log("Sending Done!");
        await sender.send("test-queue", "PROCESS:SENDER:DONE");
      }
    );

    while (!finished) {
      await delay(500);

      const workerDone = await client.get("worker:done");
      if (workerDone === "1") {
        console.log("Worker done!");
        finished = true;
      }
    }

    const letters = await client.get("letters");
    const words = await client.get("words");
    const spaces = await client.get("spaces");

    console.log("Word Counter finished!");
    console.log("Results:");
    console.log("Letters:", letters);
    console.log("Words:", words);
    console.log("Spaces:", spaces);
  });
}

main();
