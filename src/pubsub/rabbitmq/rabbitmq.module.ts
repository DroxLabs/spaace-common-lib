import { Module, OnModuleInit, Global } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import '../../config';

const protocol = process.env.RABBITMQ_PROTOCOL ?? 'amqp';
const host = process.env.RABBITMQ_HOST ?? 'rabbitmq';
const port = parseInt(process.env.RABBITMQ_PORT ?? '5672', 10);
const username = process.env.RABBITMQ_USERNAME ?? 'guest';
const password = process.env.RABBITMQ_PASSWORD ?? 'guest';

@Global()
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
        { name: 'dlx', type: 'direct', options: { durable: true } },
      ],
      uri: `${protocol}://${username}:${password}@${host}:${port}/`,
      enableControllerDiscovery: true,
      connectionInitOptions: {
        timeout: 60000,
      },
      connectionManagerOptions: {
        heartbeatIntervalInSeconds: 60,
      },
    }),
  ],
  providers: [RabbitMQClient],
  exports: [RabbitMQClient],
})
export class RabbitMQCustomModule implements OnModuleInit {
  constructor(private readonly rabbitMQClient: RabbitMQClient) {}

  async onModuleInit() {
    console.log('Setting up RabbitMQ');

    await this.rabbitMQClient.setupQueues();
  }
}
