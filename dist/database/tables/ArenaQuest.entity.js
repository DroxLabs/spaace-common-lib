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
exports.AreanaQuest = exports.ArenaQuestPeriod = exports.ArenaQuestStep = exports.ArenaQuestRule = exports.ArenaQuestRuleOperator = exports.ArenaQuestTrigger = void 0;
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
})(ArenaQuestTrigger = exports.ArenaQuestTrigger || (exports.ArenaQuestTrigger = {}));
(0, graphql_1.registerEnumType)(ArenaQuestTrigger, {
    name: 'QuestTrigger',
});
var ArenaQuestRuleOperator;
(function (ArenaQuestRuleOperator) {
    ArenaQuestRuleOperator["EQ"] = "EQ";
    ArenaQuestRuleOperator["GT"] = "GT";
    ArenaQuestRuleOperator["GTE"] = "GTE";
    ArenaQuestRuleOperator["LT"] = "LT";
    ArenaQuestRuleOperator["LTE"] = "LTE";
    ArenaQuestRuleOperator["NEQ"] = "NEQ";
})(ArenaQuestRuleOperator = exports.ArenaQuestRuleOperator || (exports.ArenaQuestRuleOperator = {}));
(0, graphql_1.registerEnumType)(ArenaQuestRuleOperator, {
    name: 'QuestRuleOperator',
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
    (0, typeorm_1.ManyToOne)(() => _1.Season),
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
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "count", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], AreanaQuest.prototype, "prime", void 0);
__decorate([
    (0, graphql_1.Field)(() => [ArenaQuestStep]),
    (0, typeorm_1.Column)('jsonb', { default: [] }),
    (0, class_transformer_1.Type)(() => ArenaQuestStep),
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], AreanaQuest.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "loyaltyPoints", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, default: '0' }),
    __metadata("design:type", String)
], AreanaQuest.prototype, "boost", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true }),
    (0, typeorm_1.Column)('numeric', { precision: 78, unsigned: true, nullable: true }),
    __metadata("design:type", Object)
], AreanaQuest.prototype, "boostLimit", void 0);
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
AreanaQuest = AreanaQuest_1 = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena-quests' }),
    (0, typeorm_1.Unique)(['seasonNumber', 'name'])
], AreanaQuest);
exports.AreanaQuest = AreanaQuest;
//# sourceMappingURL=ArenaQuest.entity.js.map