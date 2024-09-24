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
exports.LeaderboardTables1726764735102 = void 0;
class LeaderboardTables1726764735102 {
    constructor() {
        this.name = 'LeaderboardTables1726764735102';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_leaderboard" RENAME COLUMN "position" TO "rank"`);
            yield queryRunner.query(`CREATE TABLE "arena_user_leaderboard" ("userTwitterId" text NOT NULL, "rank" numeric(78) NOT NULL DEFAULT '0', "leagueRank" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_80db09079f17bd21570ebb9a17b" PRIMARY KEY ("userTwitterId"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_4ba3d8d0664b920c63674fe9bb" ON "arena_user_leaderboard" ("rank") `);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`CREATE INDEX "IDX_84947bc5ede8fd437310fd0bc1" ON "arena_crew_leaderboard" ("rank") `);
            yield queryRunner.query(`ALTER TABLE "arena_user_leaderboard" ADD CONSTRAINT "FK_80db09079f17bd21570ebb9a17b" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_leaderboard" ADD CONSTRAINT "FK_68d58841f613bb3363032f3e985" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_crew_leaderboard" DROP CONSTRAINT "FK_68d58841f613bb3363032f3e985"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_leaderboard" DROP CONSTRAINT "FK_80db09079f17bd21570ebb9a17b"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_84947bc5ede8fd437310fd0bc1"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_4ba3d8d0664b920c63674fe9bb"`);
            yield queryRunner.query(`DROP TABLE "arena_user_leaderboard"`);
            yield queryRunner.query(`ALTER TABLE "arena_crew_leaderboard" RENAME COLUMN "rank" TO "position"`);
        });
    }
}
exports.LeaderboardTables1726764735102 = LeaderboardTables1726764735102;
//# sourceMappingURL=1726764735102-LeaderboardTables.js.map