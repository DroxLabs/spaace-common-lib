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
exports.UserWalletAddressSetToBeUnique1721664229695 = void 0;
class UserWalletAddressSetToBeUnique1721664229695 {
    constructor() {
        this.name = 'UserWalletAddressSetToBeUnique1721664229695';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_cd8c0024f947a453d7b26eda30c" UNIQUE ("userWalletAddress")`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ALTER COLUMN "emailVerified" DROP NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ALTER COLUMN "emailVerified" SET NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_cd8c0024f947a453d7b26eda30c"`);
        });
    }
}
exports.UserWalletAddressSetToBeUnique1721664229695 = UserWalletAddressSetToBeUnique1721664229695;
//# sourceMappingURL=1721664229695-UserWalletAddressSetToBeUnique.js.map