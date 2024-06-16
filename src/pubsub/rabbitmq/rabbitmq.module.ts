import { Module } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import '../../config';

const host = process.env.RABBITMQ_HOST ?? 'localhost';
const port = parseInt(process.env.RABBITMQ_PORT ?? '5672', 10);

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: 'default',
      exchanges: [
        { name: 'triggers-exchange', type: 'topic' },
        { name: 'collection-import-exchange', type: 'topic' },
        { name: 'search-index-exchange', type: 'topic' },
        { name: 'data-exchange', type: 'topic' },
        { name: 'exchange1', type: 'topic' },
        {
          name: 'delayed-triggers-exchange',
          type: 'x-delayed-message',
          options: {
            durable: true,
            arguments: { 'x-delayed-type': 'topic' },
          },
        },
      ],
      uri: `amqp://guest:guest@${host}:${port}/`,
      enableControllerDiscovery: true,
    }),
  ],
  providers: [RabbitMQClient],
  exports: [RabbitMQClient],
})
export class RabbitMQCustomModule {}
