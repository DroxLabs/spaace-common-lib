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
var ArenaUser_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
let ArenaUser = ArenaUser_1 = class ArenaUser extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.Index)({ fulltext: true }),
    __metadata("design:type", String)
], ArenaUser.prototype, "twitterUsername", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { defaultValue: '' }),
    (0, typeorm_1.Column)('text', { default: '' }),
    __metadata("design:type", String)
], ArenaUser.prototype, "twitterBio", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ArenaUser.prototype, "userTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ArenaUser.prototype, "twitterPicture", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "uuid", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true, default: null }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "imageUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { unique: true }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], ArenaUser.prototype, "referralCode", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaUser.prototype, "referralCodeLastShared", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => ArenaUser_1, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'referrerTwitterId',
        referencedColumnName: 'userTwitterId',
    }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "referrerTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaCrew, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'crewName',
        referencedColumnName: 'name',
    }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "crewName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUser.prototype, "totalXpEarned", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUser.prototype, "totalStarsEarned", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUser.prototype, "level", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], ArenaUser.prototype, "dailyStreak", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaUser.prototype, "lastActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaUser.prototype, "accountCreationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaUser.prototype, "twitterAccountCreationDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { unique: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ArenaUser.prototype, "twitterSecretToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text', { unique: true }),
    (0, class_transformer_1.Exclude)(),
    __metadata("design:type", String)
], ArenaUser.prototype, "twitterAccessToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaUser.prototype, "userWalletAddress", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], ArenaUser.prototype, "isOnboardingChestClaimed", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { nullable: true }),
    (0, typeorm_1.Column)('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], ArenaUser.prototype, "emailVerified", void 0);
ArenaUser = ArenaUser_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_users' })
], ArenaUser);
exports.ArenaUser = ArenaUser;
//# sourceMappingURL=ArenaUser.entity.js.map