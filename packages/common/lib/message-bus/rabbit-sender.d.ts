import { AsyncDisposable } from "using-statement";
export declare class RabbitSender implements AsyncDisposable {
    private hostname;
    private port;
    private user?;
    private password?;
    private vhost?;
    private connection;
    constructor(hostname: string, port: number, user?: string, password?: string, vhost?: string);
    connect(): Promise<void>;
    send(queue: string, message: string): Promise<void>;
    close(): Promise<void>;
    dispose(): Promise<void>;
}
