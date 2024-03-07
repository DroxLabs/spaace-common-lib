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

  async publish<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    message:
      | PubSubMessage<PubSubTrigger<T>>
      | ArenaPubSubMessage<ArenaPubSubTrigger<T>>,
  ) {
    const exchange = exchangeMap[topic];
    await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
      durable: true,
    });
    this.amqpConnection.channel.publish(
      exchange,
      routingKey,
      Buffer.from(JSON.stringify(message)),
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
        | ArenaPubSubMessage<ArenaPubSubTrigger<T>>,
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
