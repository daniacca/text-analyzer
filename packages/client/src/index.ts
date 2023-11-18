import rabbit from "../../common/lib/message-bus";
import { using } from "using-statement";

// const rabbitHost = "rabbit-mq.io";
const rabbitHost = "localhost";
console.log("I'm a client!");

async function main() {
  using(new rabbit.RabbitSender(rabbitHost, 5672, "guest", "guest", "USER_HOST"), async (sender) => {
    await sender.connect();
    console.log("Connected!");
    await sender.send("test-queue", "Hello World!");
    console.log("Message sent!");
  });
}

main();
