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
/* eslint-disable @typescript-eslint/no-explicit-any */
// rabbitmq-client.ts
const common_1 = require("@nestjs/common");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const exchangeMap_1 = require("./types/exchangeMap");
let RabbitMQClient = class RabbitMQClient {
    constructor(amqpConnection) {
        this.amqpConnection = amqpConnection;
    }
    setupQueues() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Setup the Dead Letter Exchange
                yield this.amqpConnection.channel.assertExchange('dlx', 'direct', {
                    durable: true,
                });
                console.log('DLX setup successfully');
                // Setup the queue to handle messages after the delay (dead-lettered messages)
                yield this.amqpConnection.channel.assertQueue('delay-queue-process', {
                    durable: true,
                });
                // Bind the delay-queue-process to the DLX exchange with the 'process' routing key
                yield this.amqpConnection.channel.bindQueue('delay-queue-process', 'dlx', 'process');
                console.log('Queue "delay-queue-process" bound to DLX with routing key "process" successfully');
            }
            catch (error) {
                console.error('Failed to setup DLX and delay-queue-process', error);
            }
        });
    }
    delaySubscribe(topic, routingKey, queueName, onMessage, delayTime) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const exchange = exchangeMap_1.exchangeMap[topic];
                // Ensure the exchange is setup for the topic
                yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                    durable: true,
                });
                // Setup the specific queue with x-message-ttl and other DLX related configurations
                yield this.amqpConnection.channel.assertQueue(queueName, {
                    durable: true,
                    arguments: {
                        'x-message-ttl': delayTime,
                        'x-dead-letter-exchange': 'dlx',
                        'x-dead-letter-routing-key': 'process',
                    },
                });
                // Bind the queue to the exchange
                yield this.amqpConnection.channel.bindQueue(queueName, exchange, routingKey);
                // Start consuming messages
                this.amqpConnection.channel.consume('delay-queue-process', (msg) => __awaiter(this, void 0, void 0, function* () {
                    if (msg) {
                        try {
                            const message = JSON.parse(msg.content.toString());
                            yield onMessage(message);
                            this.amqpConnection.channel.ack(msg);
                        }
                        catch (error) {
                            this.amqpConnection.channel.ack(msg);
                        }
                    }
                }), { noAck: false });
                console.log(`Subscribed to ${exchange}:${routingKey} with queue ${queueName} and delay ${delayTime} ms`);
            }
            catch (error) {
                console.error('Failed to subscribe with delay:', error);
            }
        });
    }
    batchPublish(topic, routingKey, messages) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = exchangeMap_1.exchangeMap[topic];
            yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                durable: true,
            });
            this.amqpConnection.channel.publish(exchange, routingKey, messages ? Buffer.from(JSON.stringify(messages)) : Buffer.from(''));
            console.log(`Published message to ${exchange}:${routingKey}`);
        });
    }
    publish(topic, routingKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const exchange = exchangeMap_1.exchangeMap[topic];
            yield this.amqpConnection.channel.assertExchange(exchange, 'topic', {
                durable: true,
            });
            this.amqpConnection.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)));
            console.log(`Published message to ${exchange}:${routingKey} with no delay`);
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
            this.amqpConnection.channel.consume(queueName, (msg) => __awaiter(this, void 0, void 0, function* () {
                if (msg) {
                    try {
                        const message = JSON.parse(msg.content.toString());
                        yield onMessage(message);
                        this.amqpConnection.channel.ack(msg);
                    }
                    catch (e) {
                        this.amqpConnection.channel.ack(msg);
                    }
                }
            }), { noAck: false });
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