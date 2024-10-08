"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RabbitMQ = void 0;
const nestjs_rabbitmq_1 = require("@golevelup/nestjs-rabbitmq");
const rabbitmq_client_1 = require("./rabbitmq.client");
require("../../config");
const protocol = (_a = process.env.RABBITMQ_PROTOCOL) !== null && _a !== void 0 ? _a : 'amqp';
const host = (_b = process.env.RABBITMQ_HOST) !== null && _b !== void 0 ? _b : 'rabbitmq';
const port = parseInt((_c = process.env.RABBITMQ_PORT) !== null && _c !== void 0 ? _c : '5672', 10);
const username = (_d = process.env.RABBITMQ_USERNAME) !== null && _d !== void 0 ? _d : 'guest';
const password = (_e = process.env.RABBITMQ_PASSWORD) !== null && _e !== void 0 ? _e : 'guest';
class RabbitMQ {
    static getAmpqConnectionFactory(prefetchCount) {
        return nestjs_rabbitmq_1.RabbitMQModule.AmqpConnectionFactory({
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
    static getRabbitMQClient(prefetchCount) {
        return __awaiter(this, void 0, void 0, function* () {
            const amqpConnection = yield RabbitMQ.getAmpqConnectionFactory(prefetchCount);
            if (!amqpConnection)
                throw new Error('Failed to connect to RabbitMQ');
            return new rabbitmq_client_1.RabbitMQClient(amqpConnection);
        });
    }
}
exports.RabbitMQ = RabbitMQ;
//# sourceMappingURL=rabbitmq.js.map