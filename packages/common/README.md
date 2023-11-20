# `common`

Common code shared by repo applications

## Usage

The package is composed by three section

### Cache

```typescript
import connectToRedis, { SortedSetRepositoryFactory } from "../../common/lib/cache";

const client = await connectToRedis("redisHost", 6379);

// Write a key on Redis
await client.set("my-key", "my-value");

// Read a key on Redis
await client.get("my-key", "my-value");

// Create a sorted set repository
const sortedSetRepository = SortedSetRepositoryFactory(client)("sorted-set-key");

// Add element to the set
await sortedSetRepository.add({ value: "set element 1", score: 10 });
await sortedSetRepository.add({ value: "set element 2", score: 5 });
await sortedSetRepository.add({ value: "set element 3", score: 30 });

// Increment the score of an element
await sortedSetRepository.increment("set element 1");

// Read element which have a score greater or equal to 10:
const elements = await sortedSetRepository.rangeByScore(10, Infinity);
```

### Message Bus

Contains basic implementation for sender and receiver to interact with Rabbit MQ

```typescript
import rabbit from "../../common/lib/message-bus";

// Sender
using(new rabbit.RabbitSender("rabbit-host", 5672, "user", "password", "v-host"), async (sender) => {
  // Assert connection and create communication channel
  await sender.connect();

  // Send messages
  await sender.send("your-queue", "your string message data");
});

// Receiver
using(new rabbit.RabbitReceiver("rabbit-host", 5672, "user", "password", "v-host"), async (receiver) => {
  // Assert connection and create communication channel
  await receiver.connect();

  // register callback for receiving data
  await receiver.receive("your-queue", async (data) => {
    console.log(data);
  });
});
```

### Utils

```typescript
import utils from "../../common/lib/utils";

const { delay } = utils;

await delay(2000);
```
