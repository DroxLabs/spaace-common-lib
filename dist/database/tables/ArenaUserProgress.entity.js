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
exports.ArenaUserProgress = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const _1 = require(".");
let ArenaUserProgress = class ArenaUserProgress extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaUser),
    (0, typeorm_1.JoinColumn)({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "userTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "stars", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "xp", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "totalReferrals", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "totalReferralStars", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('bigint', { default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "questCompleted", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.ArenaDivisionName, { nullable: true }),
    (0, typeorm_1.Column)('enum', {
        enum: _1.ArenaDivisionName,
        enumName: 'arena_divison_name',
        nullable: true,
    }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "division", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "league", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "leagueRank", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaUserProgress.prototype, "twentyFourHourRank", void 0);
ArenaUserProgress = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_users_progress' }),
    (0, typeorm_1.Index)(['division', 'league', 'leagueRank']),
    (0, typeorm_1.Unique)(['seasonNumber', 'rank']),
    (0, typeorm_1.Unique)(['seasonNumber', 'division', 'league', 'leagueRank'])
], ArenaUserProgress);
exports.ArenaUserProgress = ArenaUserProgress;
//# sourceMappingURL=ArenaUserProgress.entity.js.map