import { Connection, connect } from "amqplib";
import { AsyncDisposable } from "using-statement";

export class RabbitReceiver implements AsyncDisposable {
  private connection: Connection;

  constructor(private hostname: string, private port: number) {}

  async connect() {
    this.connection = await connect(`amqp://${this.hostname}:${this.port}`);
  }

  async receive(queue: string, callback: (data: string) => void) {
    const channel = await this.connection.createChannel();
    await channel.assertQueue(queue);
    channel.consume(queue, (message) => {
      const content = message.content.toString();
      callback(content);
      channel.ack(message);
    });
  }

  async close() {
    if (this.connection) await this.connection.close();
  }

  async dispose() {
    await this.close();
  }
}
