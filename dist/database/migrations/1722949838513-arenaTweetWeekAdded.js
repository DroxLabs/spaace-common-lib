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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArenaTweetWeekAdded1722949838513 = void 0;
class ArenaTweetWeekAdded1722949838513 {
    constructor() {
        this.name = 'ArenaTweetWeekAdded1722949838513';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "arena_tweet_week" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_27ee5f1569ca26f4ad1ce745414" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP TABLE "arena_tweet_week"`);
        });
    }
}
exports.ArenaTweetWeekAdded1722949838513 = ArenaTweetWeekAdded1722949838513;
//# sourceMappingURL=1722949838513-arenaTweetWeekAdded.js.map