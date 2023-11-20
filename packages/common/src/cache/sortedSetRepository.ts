import { RedisClient } from "./client";

export class SortedSetRepository {
  constructor(private readonly client: RedisClient, private readonly setKey: string) {}

  /**
   * Adds all the specified members with the specified scores to the sorted set stored at key.
   * @param value the element to be added
   * @param score score value of the element
   * @returns the number of elements added to the sorted sets, not including elements already existing for which the score was updated.
   */
  async add(...toBeAdded: { value: string; score: number }[]) {
    return await this.client.zAdd(this.setKey, toBeAdded);
  }

  /**
   * Increments a score of a value in the sorted set. If the value was not present in the set, then
   * is added as it was previously with 0.0 score
   * @param value the element to be incremented
   * @param increment the increment to be added to the actual score, 1 if not specified
   * @returns the new score of the member after the increment
   */
  async increment(value: string, increment: number = 1) {
    return await this.client.zIncrBy(this.setKey, increment, value);
  }

  /**
   * Decrement a score of a value in the sorted set. If the value was not present in the set, then
   * is added as it was previously with 0.0 score
   * @param value the element to be decremented
   * @param decrement the decrement to be subtracted to the actual score, 1 if not specified
   * @returns the new score of the member after the decrement
   */
  async decrement(value: string, decrement: number = 1) {
    return await this.client.zIncrBy(this.setKey, -decrement, value);
  }

  /**
   * Remove a member from a sorted set
   * @param value the value to be removed
   * @returns the number of members removed from the sorted set, not including non-exisisting members
   */
  async remove(value: string) {
    return await this.client.zRem(this.setKey, value);
  }

  /**
   * Return the actual score of a member present in the sorted set.
   * @param value the member of the set
   * @returns the actual score
   */
  async score(value: string) {
    return await this.client.zScore(this.setKey, value);
  }

  /**
   * Give the member count
   * @returns the number of element present in the set
   */
  async count() {
    return await this.client.zCard(this.setKey);
  }

  /**
   * Returns the specified range of elements in the sorted set stored
   * @param start start index
   * @param stop stop index
   * @returns the list of members from start to stop index
   */
  async range(start: number, stop: number) {
    return await this.client.zRange(this.setKey, start, stop);
  }

  /**
   * Returns all the elements in the sorted set at key with a score between min and max,
   * including elements with score equal to min or max.
   * The elements are considered to be ordered from low to high scores.
   * @param min min score to be included
   * @param max max score to be included
   * @returns an array of value with each score
   */
  async rangeByScore(min: number, max: number) {
    return await this.client.zRangeByScoreWithScores(this.setKey, min, max);
  }

  /**
   * incrementally iterate over the sorted set elements
   * @param pattern the pattern to be matched (default: '*')
   * @param cursor the actual cursor that keep track of the iteration (0 to start a new one)
   * @param count the number of elements to be returned per iteration (default: 30)
   * @returns an array of elements with each score and the new cursor
   */
  async scan(pattern: string = "*", cursor: number = 0, count: number = 30) {
    return await this.client.zScan(this.setKey, cursor, { MATCH: pattern, COUNT: count });
  }
}

export const SortedSetRepositoryFactory = (client: RedisClient) => (setKey: string) => new SortedSetRepository(client, setKey);
