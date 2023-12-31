import { RedisClient } from "./client";
export declare class SortedSetRepository {
    private readonly client;
    private readonly setKey;
    constructor(client: RedisClient, setKey: string);
    add(...toBeAdded: {
        value: string;
        score: number;
    }[]): Promise<number>;
    increment(value: string, increment?: number): Promise<number>;
    decrement(value: string, decrement?: number): Promise<number>;
    remove(value: string): Promise<number>;
    score(value: string): Promise<number>;
    count(): Promise<number>;
    range(start: number, stop: number): Promise<string[]>;
    rangeByScore(min: number, max: number): Promise<{
        score: number;
        value: string;
    }[]>;
    scan(pattern?: string, cursor?: number, count?: number): Promise<{
        cursor: number;
        members: {
            score: number;
            value: string;
        }[];
    }>;
}
export declare const SortedSetRepositoryFactory: (client: RedisClient) => (setKey: string) => SortedSetRepository;
