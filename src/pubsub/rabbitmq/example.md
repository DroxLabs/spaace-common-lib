# Using RabbitMQ with NestJS: Integration Guide

This guide demonstrates how to integrate RabbitMQ for message publishing and subscribing in a NestJS application using the RabbitMQ client and module provided by the `@spaace/common-lib` package.

## Setup

Ensure your project is set up to use RabbitMQ by importing the necessary components from `@spaace/common-lib`.

### Import RabbitMQCustomModule

First, include the `RabbitMQCustomModule` in your application module or any specific module where you want to use RabbitMQ for messaging. This module configures and establishes the connection to your RabbitMQ server.

```typescript
import { Module } from '@nestjs/common';
import { RabbitMQCustomModule } from '@spaace/common-lib';

@Module({
  imports: [RabbitMQCustomModule],
  // other module properties
})
export class AppModule {}
```

## Publishing Messages

To publish messages, you'll utilize the `RabbitMQClient`, also provided by the `@spaace/common-lib`. Here’s how to inject and use it in your service.

### Example: Publishing a Message

Inject the `RabbitMQClient` into your service and call its `publish` method to send messages to a specified topic with a routing key.

```typescript
import { Injectable } from '@nestjs/common';
import {
  PubSubMessage,
  PubSubTopic,
  PubSubTrigger,
  QuestTrigger,
  RabbitMQClient,
} from '@spaace/common-lib';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQClient: RabbitMQClient) {}

  async publishExampleMessage() {
    const topic: PubSubTopic = PubSubTopic.TRIGGERS;
    const routingKey = 'example.routing.token';
    const message: PubSubMessage<PubSubTrigger<typeof topic>> = {
      trigger: QuestTrigger.TOKEN_TRANSFER,
      data: {
        transactionId: '12345',
        amount: 100,
        from: 'UserA',
        to: 'UserB',
      },
    };

    await this.rabbitMQClient.publish(topic, routingKey, message);
    console.log('Message published successfully');
  }
}
```

## Subscribing to Messages

Subscribing to messages allows your application to listen for and process incoming messages from a queue. Here’s an example of setting up a subscription in a service.

### Example: Subscribing to Messages

Define a method in your service that invokes the `subscribe` function of the `RabbitMQClient` to listen for messages on a specific queue, filtered by a routing key.

```typescript
import { Injectable } from '@nestjs/common';
import {
  PubSubTopic,
  RabbitMQClient,
} from '@spaace/common-lib';

@Injectable()
export class AppService {
  constructor(private readonly rabbitMQClient: RabbitMQClient) {}

  async subscribeExampleMessages() {
    const topic: PubSubTopic = PubSubTopic.TRIGGERS;
    const routingKey = 'example.routing.token';
    const queueName = 'example-queue';

    await this.rabbitMQClient.subscribe(topic, routingKey, queueName, (message) => {
      console.log('Received message:', message);
      // Implement your message processing logic here
    });

    console.log('Subscribed successfully');
  }
}
```

## Key Takeaways

- **RabbitMQClient** and **RabbitMQCustomModule**: Central to integrating RabbitMQ in your NestJS application, providing a streamlined approach to publishing and subscribing to messages.
- **Topic and Routing Key**: Essential for directing messages to the correct queues and ensuring they reach the intended subscribers.
- **Message Processing**: Implement custom logic within the subscription callback to handle incoming messages according to your application’s needs.

By following this guide, you can effectively leverage RabbitMQ in your NestJS applications for robust, asynchronous messaging between different parts of your system, facilitated by the utilities provided in `@spaace/common-lib`.