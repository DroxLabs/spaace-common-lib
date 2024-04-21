/* eslint-disable @typescript-eslint/no-explicit-any */
// rabbitmq-client.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import {
  ArenaPubSubMessage,
  ArenaPubSubTrigger,
  PubSubMessage,
  PubSubTopic,
  PubSubTrigger,
} from '../types';
import { exchangeMap } from './types/exchangeMap';

@Injectable()
export class RabbitMQClient {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async batchPublish<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    messages: any,
  ) {
    const exchange = exchangeMap[topic];
    await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    this.amqpConnection.channel.publish(
      exchange,
      routingKey,
      messages ? Buffer.from(JSON.stringify(messages)) : Buffer.from(''),
    );
    console.log(`Published message to ${exchange}:${routingKey}`);
  }

  async publish<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    message: any,
  ) {
    const exchange = exchangeMap[topic];
    await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    this.amqpConnection.channel.publish(
      exchange,
      routingKey,
      message ? Buffer.from(JSON.stringify(message)) : Buffer.from(''),
    );
    console.log(`Published message to ${exchange}:${routingKey}`);
  }

  async subscribe<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    queueName: string,
    onMessage: (
      msg:
        | PubSubMessage<PubSubTrigger<T>>
        | ArenaPubSubMessage<ArenaPubSubTrigger<T>>
        | PubSubMessage<PubSubTrigger<T>>[]
        | ArenaPubSubMessage<ArenaPubSubTrigger<T>>[],
    ) => void,
  ) {
    const exchange = exchangeMap[topic];
    await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    await this.amqpConnection.channel.assertQueue(queueName, { durable: true });
    await this.amqpConnection.channel.bindQueue(
      queueName,
      exchange,
      routingKey,
    );
    this.amqpConnection.channel.consume(
      queueName,
      (msg) => {
        if (msg) {
          const message = JSON.parse(msg.content.toString());
          onMessage(message);
          this.amqpConnection.channel.ack(msg);
        }
      },
      { noAck: false },
    );
    console.log(
      `Subscribed to ${exchange}:${routingKey} with queue ${queueName}`,
    );
  }
}
