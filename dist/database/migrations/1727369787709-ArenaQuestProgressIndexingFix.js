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
exports.ArenaQuestProgressIndexingFix1727369787709 = void 0;
class ArenaQuestProgressIndexingFix1727369787709 {
    constructor() {
        this.name = 'ArenaQuestProgressIndexingFix1727369787709';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_3cd5e9a2a6827f571ad6d7da60"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`CREATE INDEX "IDX_3dcc3487bfcaa864f73207befb" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_3dcc3487bfcaa864f73207befb"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`CREATE INDEX "IDX_3cd5e9a2a6827f571ad6d7da60" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") WHERE completed`);
        });
    }
}
exports.ArenaQuestProgressIndexingFix1727369787709 = ArenaQuestProgressIndexingFix1727369787709;
//# sourceMappingURL=1727369787709-ArenaQuestProgressIndexingFix.js.map