/* eslint-disable @typescript-eslint/no-explicit-any */
// rabbitmq-client.ts
import { Injectable } from '@nestjs/common';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { PubSubTopic } from '../types';
import { exchangeMap } from './types/exchangeMap';

@Injectable()
export class RabbitMQClient {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  async setupQueues() {
    // Declare the delayed queue with TTL and DLX configurations
    try {
      await this.amqpConnection.channel.assertQueue('delayed-queue-1', {
        durable: true,
        arguments: {
          'x-message-ttl': 5000, // TTL for the message delay
          'x-dead-letter-exchange': 'dlx', // Specify the DLX
          'x-dead-letter-routing-key': 'process', // Routing key used by the DLX
        },
      });

      // Ensure the DLX is properly configured
      await this.amqpConnection.channel.assertExchange('dlx', 'direct', {
        durable: true,
      });
      await this.amqpConnection.channel.assertQueue('processing-queue', {
        durable: true,
      });
      await this.amqpConnection.channel.bindQueue(
        'processing-queue',
        'dlx',
        'process',
      );
    } catch (error) {
      console.error('Failed to setup RabbitMQ queues:', error);
    }
  }

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
      Buffer.from(JSON.stringify(message)),
    );
    console.log(`Published message to ${exchange}:${routingKey} with no delay`);
  }

  async subscribe<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    queueName: string,
    onMessage: (msg: any) => void,
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
