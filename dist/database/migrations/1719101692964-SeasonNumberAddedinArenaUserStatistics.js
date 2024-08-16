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
exports.SeasonNumberAddedinArenaUserStatistics1719101692964 = void 0;
class SeasonNumberAddedinArenaUserStatistics1719101692964 {
    constructor() {
        this.name = 'SeasonNumberAddedinArenaUserStatistics1719101692964';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "seasonNumber" numeric(78) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "PK_7bc7563040a22027efb5109f6be"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_08b6c6c47252c66d338a660d198" PRIMARY KEY ("userTwitterId", "seasonNumber")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_3cad81a389dde43c39f76a831b3" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_3cad81a389dde43c39f76a831b3"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "PK_08b6c6c47252c66d338a660d198"`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_7bc7563040a22027efb5109f6be" PRIMARY KEY ("userTwitterId")`);
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN "seasonNumber"`);
        });
    }
}
exports.SeasonNumberAddedinArenaUserStatistics1719101692964 = SeasonNumberAddedinArenaUserStatistics1719101692964;
//# sourceMappingURL=1719101692964-SeasonNumberAddedinArenaUserStatistics.js.map