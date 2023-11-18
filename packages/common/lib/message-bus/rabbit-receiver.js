"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitReceiver = void 0;
const amqplib_1 = require("amqplib");
class RabbitReceiver {
    constructor(hostname, port) {
        this.hostname = hostname;
        this.port = port;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield (0, amqplib_1.connect)(`amqp://${this.hostname}:${this.port}`);
        });
    }
    receive(queue, callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.connection.createChannel();
            yield channel.assertQueue(queue);
            channel.consume(queue, (message) => {
                const content = message.content.toString();
                callback(content);
                channel.ack(message);
            });
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection)
                yield this.connection.close();
        });
    }
    dispose() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.close();
        });
    }
}
exports.RabbitReceiver = RabbitReceiver;
//# sourceMappingURL=rabbit-receiver.js.map