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
var AreanaQuest_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AreanaQuest = exports.ArenaQuestPeriod = exports.ArenaQuestOperation = exports.ArenaQuestStep = exports.ArenaQuestRule = exports.ArenaQuestSubType = exports.ArenaQuestType = exports.ArenaQuestOperator = exports.ArenaQuestRuleOperator = exports.ArenaQuestTrigger = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const _1 = require(".");
const class_validator_1 = require("class-validator");
var ArenaQuestTrigger;
(function (ArenaQuestTrigger) {
    ArenaQuestTrigger["USER"] = "USER";
    ArenaQuestTrigger["USER_QUEST_PROGRESS"] = "USER_QUEST_PROGRESS";
    ArenaQuestTrigger["REFERRAL"] = "REFERRAL";
    ArenaQuestTrigger["SOCIAL"] = "SOCIAL";
    ArenaQuestTrigger["SOCIAL_PRIME"] = "SOCIAL_PRIME";
    ArenaQuestTrigger["USER_LEVEL_PROGRESS"] = "USER_LEVEL_PROGRESS";
    ArenaQuestTrigger["CREW_PROGRESS"] = "CREW_PROGRESS";
    ArenaQuestTrigger["SOCIAL_CREW"] = "SOCIAL_CREW";
    ArenaQuestTrigger["USER_SPECIAL"] = "USER_SPECIAL";
})(ArenaQuestTrigger = exports.ArenaQuestTrigger || (exports.ArenaQuestTrigger = {}));
(0, graphql_1.registerEnumType)(ArenaQuestTrigger, {
    name: 'ArenaQuestTrigger',
});
var ArenaQuestRuleOperator;
(function (ArenaQuestRuleOperator) {
    ArenaQuestRuleOperator["EQ"] = "EQ";
    ArenaQuestRuleOperator["GT"] = "GT";
    ArenaQuestRuleOperator["GTE"] = "GTE";
    ArenaQuestRuleOperator["LT"] = "LT";
    ArenaQuestRuleOperator["LTE"] = "LTE";
    ArenaQuestRuleOperator["NEQ"] = "NEQ";
    ArenaQuestRuleOperator["IN"] = "IN";
    ArenaQuestRuleOperator["NIN"] = "NIN";
})(ArenaQuestRuleOperator = exports.ArenaQuestRuleOperator || (exports.ArenaQuestRuleOperator = {}));
var ArenaQuestOperator;
(function (ArenaQuestOperator) {
    ArenaQuestOperator["SUM"] = "SUM";
    ArenaQuestOperator["SUB"] = "SUB";
    ArenaQuestOperator["MUL"] = "MUL";
    ArenaQuestOperator["DIV"] = "DIV";
})(ArenaQuestOperator = exports.ArenaQuestOperator || (exports.ArenaQuestOperator = {}));
(0, graphql_1.registerEnumType)(ArenaQuestOperator, {
    name: 'ArenaQuestOperator',
});
(0, graphql_1.registerEnumType)(ArenaQuestRuleOperator, {
    name: 'ArenaQuestRuleOperator',
});
var ArenaQuestType;
(function (ArenaQuestType) {
    ArenaQuestType["PRIME"] = "PRIME";
    ArenaQuestType["SPECIAL"] = "SPECIAL";
    ArenaQuestType["ONE_SHOT"] = "ONE_SHOT";
    ArenaQuestType["PROGRESSIVE_STREAK"] = "PROGRESSIVE_STREAK";
    ArenaQuestType["PROGRESSIVE"] = "PROGRESSIVE";
    ArenaQuestType["CREW"] = "CREW";
    ArenaQuestType["ONBOARDING"] = "ONBOARDING";
})(ArenaQuestType = exports.ArenaQuestType || (exports.ArenaQuestType = {}));
(0, graphql_1.registerEnumType)(ArenaQuestType, {
    name: 'ArenaQuestType',
});
var ArenaQuestSubType;
(function (ArenaQuestSubType) {
    ArenaQuestSubType["CREW_ACTION"] = "CREW_ACTION";
    ArenaQuestSubType["CREW_MEMBERS"] = "CREW_MEMBERS";
    ArenaQuestSubType["LEVEL"] = "LEVEL";
    ArenaQuestSubType["POST_OF_THE_DAY"] = "POST_OF_THE_DAY";
    ArenaQuestSubType["PRIME_POST"] = "PRIME_POST";
    ArenaQuestSubType["COMMUNITY_POST"] = "COMMUNITY_POST";
    ArenaQuestSubType["MENTION_METRICS"] = "MENTION_METRICS";
    ArenaQuestSubType["MENTION"] = "MENTION";
    ArenaQuestSubType["ONBOARDING"] = "ONBOARDING";
    ArenaQuestSubType["REFERRAL_SOCIAL"] = "REFERRAL_SOCIAL";
    ArenaQuestSubType["OTHERS"] = "OTHERS";
})(ArenaQuestSubType = exports.ArenaQuestSubType || (exports.ArenaQuestSubType = {}));
(0, graphql_1.registerEnumType)(ArenaQuestSubType, {
    name: 'ArenaQuestSubType',
});
let ArenaQuestRule = class ArenaQuestRule {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArenaQuestRule.prototype, "property", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestRuleOperator),
    __metadata("design:type", String)
], ArenaQuestRule.prototype, "operator", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArenaQuestRule.prototype, "value", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    __metadata("design:type", Object)
], ArenaQuestRule.prototype, "delta", void 0);
ArenaQuestRule = __decorate([
    (0, graphql_1.ObjectType)()
], ArenaQuestRule);
exports.ArenaQuestRule = ArenaQuestRule;
let ArenaQuestStep = class ArenaQuestStep {
};
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestTrigger),
    __metadata("design:type", String)
], ArenaQuestStep.prototype, "trigger", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArenaQuestRule]),
    (0, class_transformer_1.Type)(() => ArenaQuestRule),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], ArenaQuestStep.prototype, "rules", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { defaultValue: false }),
    __metadata("design:type", Boolean)
], ArenaQuestStep.prototype, "cron", void 0);
ArenaQuestStep = __decorate([
    (0, graphql_1.ObjectType)()
], ArenaQuestStep);
exports.ArenaQuestStep = ArenaQuestStep;
let ArenaQuestOperation = class ArenaQuestOperation {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArenaQuestOperation.prototype, "property", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestOperator),
    __metadata("design:type", String)
], ArenaQuestOperation.prototype, "operation", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArenaQuestOperation.prototype, "target", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], ArenaQuestOperation.prototype, "updates", void 0);
ArenaQuestOperation = __decorate([
    (0, graphql_1.ObjectType)()
], ArenaQuestOperation);
exports.ArenaQuestOperation = ArenaQuestOperation;
var ArenaQuestPeriod;
(function (ArenaQuestPeriod) {
    ArenaQuestPeriod["DAILY"] = "DAILY";
    ArenaQuestPeriod["SEASONAL"] = "SEASONAL";
})(ArenaQuestPeriod = exports.ArenaQuestPeriod || (exports.ArenaQuestPeriod = {}));
(0, graphql_1.registerEnumType)(ArenaQuestPeriod, {
    name: 'ArenaQuestPeriod',
});
let AreanaQuest = AreanaQuest_1 = class AreanaQuest extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], AreanaQuest.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], AreanaQuest.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.OneToOne)(() => AreanaQuest_1),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'previousQuestId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "previousQuestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('uuid', { nullable: true }),
    (0, typeorm_1.ManyToOne)(() => AreanaQuest_1),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'referenceQuestId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "referenceQuestId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArenaQuestStep]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => ArenaQuestStep),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], AreanaQuest.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArenaQuestOperation]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => ArenaQuestOperation),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], AreanaQuest.prototype, "operations", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "stars", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '1' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestPeriod),
    (0, typeorm_1.Column)('enum', { enum: ArenaQuestPeriod, enumName: 'quest_period' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "period", void 0);
__decorate([
    (0, graphql_1.Field)(() => _1.LoyaltyRank),
    (0, typeorm_1.Column)('enum', {
        enum: _1.LoyaltyRank,
        enumName: 'loyalty_rank',
        default: _1.LoyaltyRank.BRONZE_5,
    }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "rank", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestType),
    (0, typeorm_1.Column)('enum', { enum: ArenaQuestType, enumName: 'arena_quest_type' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => ArenaQuestSubType),
    (0, typeorm_1.Column)('enum', { enum: ArenaQuestSubType, enumName: 'arena_quest_sub_type' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "subType", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { default: null }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "cronName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { default: null }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "cronParameter", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { default: null, nullable: true }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "link", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { default: null, nullable: true }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "image", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: true }),
    __metadata("design:type", Boolean)
], AreanaQuest.prototype, "isVisible", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('text', { default: null, nullable: true }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "allSeasonId", void 0);
AreanaQuest = AreanaQuest_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_quests' }),
    (0, typeorm_1.Unique)(['seasonNumber', 'name'])
], AreanaQuest);
exports.AreanaQuest = AreanaQuest;
//# sourceMappingURL=ArenaQuest.entity.js.map