import rabbit from "../../common/lib/message-bus";
import utils from "../../common/lib/utils";
import { using } from "using-statement";
import dataLoader from "./data-loader";

const { delay } = utils;

const rabbitHost = "localhost";
console.log("I'm the client!");

if (process.argv.length < 3) {
  console.log("No file specified.");
  console.log(`Usage: node ${process.argv[1]} <FILENAME | URL>`);
  process.exit(0);
}

const input = process.argv[2];

async function main() {
  using(new rabbit.RabbitSender(rabbitHost, 5672, "guest", "guest", "USER_HOST"), async (sender) => {
    await sender.connect();
    console.log("Connected!");

    let finished = false;
    dataLoader(
      input,
      async (line) => {
        console.log("Sending:", line);
        await sender.send("test-queue", line);
      },
      async () => {
        console.log("Done!");
        finished = true;
      }
    );

    while (!finished) {
      console.log("processing...");
      await delay(1000);
    }
  });
}

main();
