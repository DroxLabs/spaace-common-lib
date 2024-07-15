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
exports.RankAndLeagueRankSetToUnique1721061972172 = void 0;
class RankAndLeagueRankSetToUnique1721061972172 {
    constructor() {
        this.name = 'RankAndLeagueRankSetToUnique1721061972172';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "UQ_5f315bc78f0085dbe3b62d3b049" UNIQUE ("seasonNumber", "division", "league", "leagueRank")`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" ADD CONSTRAINT "UQ_7c1fbf0ca96e484a536f3f09f7d" UNIQUE ("seasonNumber", "rank")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "UQ_7c1fbf0ca96e484a536f3f09f7d"`);
            yield queryRunner.query(`ALTER TABLE "arena_users_progress" DROP CONSTRAINT "UQ_5f315bc78f0085dbe3b62d3b049"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
        });
    }
}
exports.RankAndLeagueRankSetToUnique1721061972172 = RankAndLeagueRankSetToUnique1721061972172;
//# sourceMappingURL=1721061972172-RankAndLeagueRankSetToUnique.js.map