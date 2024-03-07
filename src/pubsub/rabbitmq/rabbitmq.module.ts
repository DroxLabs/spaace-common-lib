import { Module } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      name: 'default',
      exchanges: [
        {
          name: 'exchang1',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@rabbitmq:5672/',
      enableControllerDiscovery: true,
    }),
  ],
  providers: [RabbitMQClient],
  exports: [RabbitMQClient],
})
export class RabbitMQCustomModule {}
