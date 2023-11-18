import { Connection, connect } from "amqplib";
import { AsyncDisposable } from "using-statement";

export class RabbitSender implements AsyncDisposable {
  private connection: Connection;

  constructor(private hostname: string, private port: number, private user?: string, private password?: string, private vhost?: string) {}

  async connect() {
    const userStr = this.user && this.password ? `${this.user}:${this.password}@` : "";
    this.connection = await connect(`amqp://${userStr}${this.hostname}:${this.port}${this.vhost ? `/${this.vhost}` : ""}`);
  }

  async send(queue: string, message: string) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));
    await channel.close();
  }

  async close() {
    if (this.connection) await this.connection.close();
  }

  async dispose() {
    await this.close();
  }
}
