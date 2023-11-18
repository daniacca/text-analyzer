import redisConnection, { RedisClient } from "./cache/client";
import { SortedSetRepository } from "./cache/sortedSetRepository";

export { RedisClient, SortedSetRepository };
export default redisConnection;
