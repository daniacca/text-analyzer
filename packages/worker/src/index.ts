import client from "../../common/lib";
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
  for (;;) {
    await delay(2000);
    console.log("The mighty worker is alive...");
    await appModule.signal();
    await client.set("worker", "alive");
  }
}

main();
