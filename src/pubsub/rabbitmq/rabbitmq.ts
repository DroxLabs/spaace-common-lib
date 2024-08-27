import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { RabbitMQClient } from './rabbitmq.client';
import '../../config';

const protocol = process.env.RABBITMQ_PROTOCOL ?? 'amqp';
const host = process.env.RABBITMQ_HOST ?? 'rabbitmq';
const port = parseInt(process.env.RABBITMQ_PORT ?? '5672', 10);
const username = process.env.RABBITMQ_USERNAME ?? 'guest';
const password = process.env.RABBITMQ_PASSWORD ?? 'guest';

export class RabbitMQ {
  static getAmpqConnectionFactory(prefetchCount?: number) {
    return RabbitMQModule.AmqpConnectionFactory({
      name: 'default',
      exchanges: [
        { name: 'triggers-exchange', type: 'topic' },
        { name: 'collection-import-exchange', type: 'topic' },
        { name: 'search-index-exchange', type: 'topic' },
        { name: 'data-exchange', type: 'topic' },
        { name: 'gql-message-exchange', type: 'topic' },

        { name: 'exchange1', type: 'topic' },
        { name: 'dlx', type: 'direct', options: { durable: true } },
      ],
      uri: `${protocol}://${username}:${password}@${host}:${port}/`,
      enableControllerDiscovery: true,
      prefetchCount,
    });
  }

  static async getRabbitMQClient(prefetchCount?: number) {
    const amqpConnection = await RabbitMQ.getAmpqConnectionFactory(
      prefetchCount,
    );

    if (!amqpConnection) throw new Error('Failed to connect to RabbitMQ');

    return new RabbitMQClient(amqpConnection);
  }
}
