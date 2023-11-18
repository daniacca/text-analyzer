import { AsyncDisposable } from "using-statement";
export declare class RabbitReceiver implements AsyncDisposable {
    private hostname;
    private port;
    private connection;
    constructor(hostname: string, port: number);
    connect(): Promise<void>;
    receive(queue: string, callback: (data: string) => void): Promise<void>;
    close(): Promise<void>;
    dispose(): Promise<void>;
}
