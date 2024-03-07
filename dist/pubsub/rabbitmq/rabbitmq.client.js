"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
exports.RabbitMQClient = void 0;
// rabbitmq-client.ts
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const exchangeMap_1 = require("./types/exchangeMap");
let RabbitMQClient = class RabbitMQClient {
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    publish(topic, routingKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = exchangeMap_1.exchangeMap[topic];
            yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                durable: true,
            });
            this.amqpConnection.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
            console.log(`Published message to ${exchange}:${routingKey}`);
        });
    }
    subscribe(topic, routingKey, queueName, onMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = exchangeMap_1.exchangeMap[topic];
            yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                durable: true,
            });
            yield this.amqpConnection.channel.assertQueue(queueName, { durable: true });
            yield this.amqpConnection.channel.bindQueue(queueName, exchange, routingKey);
            this.amqpConnection.channel.consume(queueName, (msg) => {
                if (msg) {
                    const message = JSON.parse(msg.content.toString());
                    onMessage(message);
                    this.amqpConnection.channel.ack(msg);
                }
            }, { noAck: false });
            console.log(`Subscribed to ${exchange}:${routingKey} with queue ${queueName}`);
        });
    }
};
RabbitMQClient = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_rabbitmq_1.AmqpConnection])
], RabbitMQClient);
exports.RabbitMQClient = RabbitMQClient;
//# sourceMappingURL=rabbitmq.client.js.map