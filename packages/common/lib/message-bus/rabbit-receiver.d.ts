import { AsyncDisposable } from "using-statement";
export declare class RabbitReceiver implements AsyncDisposable {
    private hostname;
    private port;
    private user?;
    private password?;
    private vhost?;
    private connection;
    constructor(hostname: string, port: number, user?: string, password?: string, vhost?: string);
    connect(): Promise<void>;
    receive(queue: string, callback: (data: string) => void): Promise<void>;
    close(): Promise<void>;
    dispose(): Promise<void>;
}
