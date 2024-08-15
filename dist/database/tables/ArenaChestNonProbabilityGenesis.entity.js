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
exports.ArenaChestNonProbabilityGenesis = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
let ArenaChestNonProbabilityGenesis = class ArenaChestNonProbabilityGenesis extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "minLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "maxLevel", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "probability", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "maxChest", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "maxLevelWithoutChest", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaChestNonProbabilityGenesis.prototype, "minLevelBetweenChest", void 0);
ArenaChestNonProbabilityGenesis = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_chest_non_probability_genesis' }),
    (0, typeorm_1.Unique)(['minLevel', 'maxLevel'])
], ArenaChestNonProbabilityGenesis);
exports.ArenaChestNonProbabilityGenesis = ArenaChestNonProbabilityGenesis;
//# sourceMappingURL=ArenaChestNonProbabilityGenesis.entity.js.map