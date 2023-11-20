import { Channel, Connection, connect } from "amqplib";
import { AsyncDisposable } from "using-statement";

export class RabbitSender implements AsyncDisposable {
  private connection: Connection;
  private channel: Channel;

  constructor(private hostname: string, private port: number, private user?: string, private password?: string, private vhost?: string) {}

  async connect() {
    const userStr = this.user && this.password ? `${this.user}:${this.password}@` : "";
    this.connection = await connect(`amqp://${userStr}${this.hostname}:${this.port}${this.vhost ? `/${this.vhost}` : ""}`);
    this.channel = await this.connection.createChannel();
  }

  async send(queue: string, message: string) {
    await this.channel.assertQueue(queue);
    this.channel.sendToQueue(queue, Buffer.from(message));
  }

  async close() {
    if (this.channel) await this.channel.close();
    if (this.connection) await this.connection.close();
  }

  async dispose() {
    await this.close();
  }
}
