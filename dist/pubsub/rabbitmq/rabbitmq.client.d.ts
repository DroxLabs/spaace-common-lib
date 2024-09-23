import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PubSubTopic } from '../types';
export declare class RabbitMQClient {
    private readonly amqpConnection;
    constructor(amqpConnection: AmqpConnection);
    setupQueues(): Promise<void>;
    delaySubscribe<T extends PubSubTopic>(topic: T, routingKey: string, queueName: string, onMessage: (msg: any) => Promise<void>, delayTime: number): Promise<void>;
    batchPublish<T extends PubSubTopic>(topic: T, routingKey: string, messages: any): Promise<void>;
    publish<T extends PubSubTopic>(topic: T, routingKey: string, message: any): Promise<void>;
    subscribe<T extends PubSubTopic>(topic: T, routingKey: string, queueName: string, onMessage: (msg: any) => Promise<void>): Promise<void>;
}
