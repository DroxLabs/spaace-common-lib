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
exports.DefaultValueAddedInUserStarTracking1727971711655 = void 0;
class DefaultValueAddedInUserStarTracking1727971711655 {
    constructor() {
        this.name = 'DefaultValueAddedInUserStarTracking1727971711655';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" TYPE numeric(78)`);
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" SET DEFAULT '1'`);
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" SET DEFAULT '0'`);
            yield queryRunner.query(`ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" TYPE numeric(78,0)`);
        });
    }
}
exports.DefaultValueAddedInUserStarTracking1727971711655 = DefaultValueAddedInUserStarTracking1727971711655;
//# sourceMappingURL=1727971711655-defaultValueAddedInUserStarTracking.js.map