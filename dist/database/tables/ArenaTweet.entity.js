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
exports.ArenaTweet = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ArenaUser_entity_1 = require("./ArenaUser.entity");
let ArenaTweet = class ArenaTweet extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ArenaTweet.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.ManyToOne)(() => ArenaUser_entity_1.ArenaUser, { nullable: true }),
    (0, typeorm_1.JoinColumn)({
        name: 'authorId',
        referencedColumnName: 'userTwitterId',
    }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "authorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.Index)({ fulltext: true }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "text", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "likeCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "replyCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "retweetCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "viewCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: 0 }),
    __metadata("design:type", String)
], ArenaTweet.prototype, "quoteCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaTweet.prototype, "quoteTweetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaTweet.prototype, "replyTweetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaTweet.prototype, "repliesLastFetched", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaTweet.prototype, "timestamp", void 0);
ArenaTweet = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_tweet' })
], ArenaTweet);
exports.ArenaTweet = ArenaTweet;
//# sourceMappingURL=ArenaTweet.entity.js.map