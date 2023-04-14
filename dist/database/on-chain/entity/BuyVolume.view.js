"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyVolume = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let BuyVolume = class BuyVolume extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], BuyVolume.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], BuyVolume.prototype, "currency", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", String)
], BuyVolume.prototype, "volume", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, typeorm_1.ViewColumn)(),
    __metadata("design:type", Date)
], BuyVolume.prototype, "date", void 0);
BuyVolume = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.ViewEntity)({
        materialized: true,
        expression: (dataSource) => {
            return dataSource
                .createQueryBuilder()
                .from(_1.Sale, 'sale')
                .select('"to"', 'user')
                .addSelect('"currency"')
                .addSelect('DATE_TRUNC(\'day\', "timestamp")::DATE', 'date')
                .addSelect('SUM("price")', 'volume')
                .groupBy('"to"')
                .addGroupBy('"currency"')
                .addGroupBy('"date"');
        },
        name: 'buy_volumes',
    })
], BuyVolume);
exports.BuyVolume = BuyVolume;
//# sourceMappingURL=BuyVolume.view.js.map