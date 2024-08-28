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
exports.BoostersTypeAdded1724857404658 = void 0;
class BoostersTypeAdded1724857404658 {
    constructor() {
        this.name = 'BoostersTypeAdded1724857404658';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TYPE "public"."booster_type" RENAME TO "booster_type_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."booster_type" AS ENUM('SPECIAL', 'WOW_CHEST', 'ADMIN', 'NFT')`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ALTER COLUMN "type" TYPE "public"."booster_type" USING "type"::"text"::"public"."booster_type"`);
            yield queryRunner.query(`DROP TYPE "public"."booster_type_old"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."booster_type_old" AS ENUM('SPECIAL', 'WOW_CHEST')`);
            yield queryRunner.query(`ALTER TABLE "arena_users_booster" ALTER COLUMN "type" TYPE "public"."booster_type_old" USING "type"::"text"::"public"."booster_type_old"`);
            yield queryRunner.query(`DROP TYPE "public"."booster_type"`);
            yield queryRunner.query(`ALTER TYPE "public"."booster_type_old" RENAME TO "booster_type"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
        });
    }
}
exports.BoostersTypeAdded1724857404658 = BoostersTypeAdded1724857404658;
//# sourceMappingURL=1724857404658-BoostersTypeAdded.js.map