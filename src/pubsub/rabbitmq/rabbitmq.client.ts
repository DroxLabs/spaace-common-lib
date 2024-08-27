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
    try {
      // Setup the Dead Letter Exchange
      await this.amqpConnection.channel.assertExchange('dlx', 'direct', {
        durable: true,
      });
      console.log('DLX setup successfully');

      // Setup the queue to handle messages after the delay (dead-lettered messages)
      await this.amqpConnection.channel.assertQueue('process-queue', {
        durable: true,
      });

      // Bind the process-queue to the DLX exchange with the 'process' routing key
      await this.amqpConnection.channel.bindQueue(
        'process-queue',
        'dlx',
        'process',
      );
      console.log(
        'Queue "process-queue" bound to DLX with routing key "process" successfully',
      );
    } catch (error) {
      console.error('Failed to setup DLX and process-queue:', error);
    }
  }

  async delaySubscribe<T extends PubSubTopic>(
    topic: T,
    routingKey: string,
    queueName: string,
    onMessage: (msg: any) => void,
    delayTime: number,
  ) {
    try {
      const exchange = exchangeMap[topic];
      // Ensure the exchange is setup for the topic
      await this.amqpConnection.channel.assertExchange(exchange, 'topic', {
        durable: true,
      });

      // Setup the specific queue with x-message-ttl and other DLX related configurations
      await this.amqpConnection.channel.assertQueue(queueName, {
        durable: true,
        arguments: {
          'x-message-ttl': delayTime,
          'x-dead-letter-exchange': 'dlx',
          'x-dead-letter-routing-key': 'process',
        },
      });

      // Bind the queue to the exchange
      await this.amqpConnection.channel.bindQueue(
        queueName,
        exchange,
        routingKey,
      );

      // Start consuming messages
      this.amqpConnection.channel.consume(
        queueName,
        (msg) => {
          if (msg) {
            try {
              const message = JSON.parse(msg.content.toString());
              onMessage(message);
              this.amqpConnection.channel.ack(msg);
            } catch (error) {
              console.error('Error processing message:', error);
              this.amqpConnection.channel.nack(msg, false, false);
            }
          }
        },
        { noAck: false },
      );
      console.log(
        `Subscribed to ${exchange}:${routingKey} with queue ${queueName} and delay ${delayTime} ms`,
      );
    } catch (error) {
      console.error('Failed to subscribe with delay:', error);
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
