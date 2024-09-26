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
exports.NonceRemovedAsPrimaryKeyFromProgress1727265151418 = void 0;
class NonceRemovedAsPrimaryKeyFromProgress1727265151418 {
    constructor() {
        this.name = 'NonceRemovedAsPrimaryKeyFromProgress1727265151418';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "PK_87a03813428ab4a75d856cef528"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "PK_3dcc3487bfcaa864f73207befb6" PRIMARY KEY ("seasonNumber", "questId", "userTwitterId")`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP COLUMN "nonce"`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD "nonce" uuid NOT NULL DEFAULT uuid_generate_v4()`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "PK_3dcc3487bfcaa864f73207befb6"`);
            yield queryRunner.query(`ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "PK_87a03813428ab4a75d856cef528" PRIMARY KEY ("seasonNumber", "questId", "nonce", "userTwitterId")`);
        });
    }
}
exports.NonceRemovedAsPrimaryKeyFromProgress1727265151418 = NonceRemovedAsPrimaryKeyFromProgress1727265151418;
//# sourceMappingURL=1727265151418-nonceRemovedAsPrimaryKeyFromProgress.js.map