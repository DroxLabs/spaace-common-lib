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
exports.NftWalletAddressAdded1724676918270 = void 0;
class NftWalletAddressAdded1724676918270 {
    constructor() {
        this.name = 'NftWalletAddressAdded1724676918270';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "nftWalletAddress" text`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_efb4dc8566722bf8e624e9b5f2b" UNIQUE ("nftWalletAddress")`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_efb4dc8566722bf8e624e9b5f2b"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "nftWalletAddress"`);
        });
    }
}
exports.NftWalletAddressAdded1724676918270 = NftWalletAddressAdded1724676918270;
//# sourceMappingURL=1724676918270-nftWalletAddressAdded.js.map