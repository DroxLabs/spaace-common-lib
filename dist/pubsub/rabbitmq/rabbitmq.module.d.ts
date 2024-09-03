import { OnModuleInit } from '@nestjs/common';
import { RabbitMQClient } from './rabbitmq.client';
import '../../config';
export declare class RabbitMQCustomModule implements OnModuleInit {
    private readonly rabbitMQClient;
    constructor(rabbitMQClient: RabbitMQClient);
    onModuleInit(): Promise<void>;
}
