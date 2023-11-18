import { createClient } from "redis";

export default async function connectToRedis(hostname: string, port: number) {
  const client = createClient({ url: `redis://${hostname}:${port}` });

  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("ready", () => console.log("Redis Client Ready"));

  await client.connect();
  console.log("Redis Client Connected");
  return client;
}

export type RedisClient = ReturnType<typeof createClient>;
