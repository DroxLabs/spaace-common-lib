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
exports.NextPageTokensAddedInSpaaceTweetSchema1720800432009 = void 0;
class NextPageTokensAddedInSpaaceTweetSchema1720800432009 {
    constructor() {
        this.name = 'NextPageTokensAddedInSpaaceTweetSchema1720800432009';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "uuid" text`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "likeNextPageToken" text`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" ADD "retweetNextPageToken" text`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetNextPageToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likeNextPageToken"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "uuid"`);
        });
    }
}
exports.NextPageTokensAddedInSpaaceTweetSchema1720800432009 = NextPageTokensAddedInSpaaceTweetSchema1720800432009;
//# sourceMappingURL=1720800432009-nextPageTokensAddedInSpaaceTweetSchema.js.map