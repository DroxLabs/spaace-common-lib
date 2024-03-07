"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQCustomModule = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_client_1 = require("./rabbitmq.client");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
let RabbitMQCustomModule = class RabbitMQCustomModule {
};
RabbitMQCustomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
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
        providers: [rabbitmq_client_1.RabbitMQClient],
        exports: [rabbitmq_client_1.RabbitMQClient],
    })
], RabbitMQCustomModule);
exports.RabbitMQCustomModule = RabbitMQCustomModule;
//# sourceMappingURL=rabbitmq.module.js.map