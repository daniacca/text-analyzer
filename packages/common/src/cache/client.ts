import { createClient } from "redis";

const client = createClient();

client.on("error", (err) => console.log("Redis Client Error", err));
client.on("ready", () => console.log("Redis Client Ready"));

client.connect().then(() => console.log("Redis Client Connected"));

export type RedisClient = typeof client;
export default client;
