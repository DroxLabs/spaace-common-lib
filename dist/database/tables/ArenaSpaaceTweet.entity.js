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
exports.ArenaSpaaceTweet = void 0;
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("typeorm");
const ArenaAdmin_entity_1 = require("./ArenaAdmin.entity");
let ArenaSpaaceTweet = class ArenaSpaaceTweet extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "tweetId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "likePaginationToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "replyPaginationToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "quotePaginationToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "retweetPaginationToken", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], ArenaSpaaceTweet.prototype, "primePost", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], ArenaSpaaceTweet.prototype, "onboardingPost", void 0);
__decorate([
    (0, typeorm_1.Column)('boolean', { default: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", Boolean)
], ArenaSpaaceTweet.prototype, "communityPost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text'),
    (0, typeorm_1.ManyToOne)(() => ArenaAdmin_entity_1.ArenaAdmin, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'adminId', referencedColumnName: 'twitterId' }),
    __metadata("design:type", String)
], ArenaSpaaceTweet.prototype, "adminId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaSpaaceTweet.prototype, "likeNextPageToken", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { nullable: true }),
    __metadata("design:type", Object)
], ArenaSpaaceTweet.prototype, "retweetNextPageToken", void 0);
ArenaSpaaceTweet = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_spaace_tweet' })
], ArenaSpaaceTweet);
exports.ArenaSpaaceTweet = ArenaSpaaceTweet;
//# sourceMappingURL=ArenaSpaaceTweet.entity.js.map