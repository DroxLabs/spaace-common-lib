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
exports.AdminAddedInArenaSpaaceTweet1719963611906 = void 0;
class AdminAddedInArenaSpaaceTweet1719963611906 {
    constructor() {
        this.name = 'AdminAddedInArenaSpaaceTweet1719963611906';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "adminId" text`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_7c1baa0bea29227e25bebdd84b0" FOREIGN KEY ("adminId") REFERENCES "arena_admins"("twitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_7c1baa0bea29227e25bebdd84b0"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "adminId"`);
        });
    }
}
exports.AdminAddedInArenaSpaaceTweet1719963611906 = AdminAddedInArenaSpaaceTweet1719963611906;
//# sourceMappingURL=1719963611906-AdminAddedInArenaSpaaceTweet.js.map