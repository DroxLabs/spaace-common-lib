"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQCustomModule = void 0;
const common_1 = require("@nestjs/common");
const rabbitmq_client_1 = require("./rabbitmq.client");
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
require("../../config");
const protocol = (_a = process.env.RABBITMQ_PROTOCOL) !== null && _a !== void 0 ? _a : 'amqp';
const host = (_b = process.env.RABBITMQ_HOST) !== null && _b !== void 0 ? _b : 'rabbitmq';
const port = parseInt((_c = process.env.RABBITMQ_PORT) !== null && _c !== void 0 ? _c : '5672', 10);
const username = (_d = process.env.RABBITMQ_USERNAME) !== null && _d !== void 0 ? _d : 'guest';
const password = (_e = process.env.RABBITMQ_PASSWORD) !== null && _e !== void 0 ? _e : 'guest';
let RabbitMQCustomModule = class RabbitMQCustomModule {
};
RabbitMQCustomModule = __decorate([
    (0, common_1.Module)({
        imports: [
            nestjs_rabbitmq_1.RabbitMQModule.forRoot(nestjs_rabbitmq_1.RabbitMQModule, {
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
        providers: [rabbitmq_client_1.RabbitMQClient],
        exports: [rabbitmq_client_1.RabbitMQClient],
    })
], RabbitMQCustomModule);
exports.RabbitMQCustomModule = RabbitMQCustomModule;
//# sourceMappingURL=rabbitmq.module.js.map