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
exports.ArenaQuestProgress = void 0;
const typeorm_1 = require("typeorm");
const graphql_1 = require("@nestjs/graphql");
const _1 = require(".");
let ArenaQuestProgress = class ArenaQuestProgress extends typeorm_1.BaseEntity {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('text'),
    (0, typeorm_1.ManyToOne)(() => _1.ArenaUser),
    (0, typeorm_1.JoinColumn)({ name: 'userTwitterId', referencedColumnName: 'userTwitterId' }),
    __metadata("design:type", String)
], ArenaQuestProgress.prototype, "userTwitterId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('uuid'),
    (0, typeorm_1.ManyToOne)(() => _1.AreanaQuest),
    (0, typeorm_1.JoinColumn)([
        { name: 'seasonNumber', referencedColumnName: 'seasonNumber' },
        { name: 'questId', referencedColumnName: 'id' },
    ]),
    __metadata("design:type", String)
], ArenaQuestProgress.prototype, "questId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    (0, typeorm_1.PrimaryColumn)('numeric', { precision: 78, unsigned: true }) // 78 digits = Maximum uint256 value
    ,
    (0, typeorm_1.ManyToOne)(() => _1.ArenaSeason),
    (0, typeorm_1.JoinColumn)({ name: 'seasonNumber', referencedColumnName: 'number' }),
    __metadata("design:type", String)
], ArenaQuestProgress.prototype, "seasonNumber", void 0);
__decorate([
    (0, graphql_1.Field)(() => [[String]]),
    (0, typeorm_1.Column)('jsonb'),
    __metadata("design:type", Array)
], ArenaQuestProgress.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean),
    (0, typeorm_1.Column)('boolean', { default: false }),
    __metadata("design:type", Boolean)
], ArenaQuestProgress.prototype, "completed", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    (0, typeorm_1.Column)('timestamp without time zone', { default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], ArenaQuestProgress.prototype, "timestamp", void 0);
ArenaQuestProgress = __decorate([
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)({ name: 'arena_quest_progress' }),
    (0, typeorm_1.Index)(['userTwitterId', 'seasonNumber', 'questId'])
], ArenaQuestProgress);
exports.ArenaQuestProgress = ArenaQuestProgress;
//# sourceMappingURL=ArenaQuestProgress.entity.js.map