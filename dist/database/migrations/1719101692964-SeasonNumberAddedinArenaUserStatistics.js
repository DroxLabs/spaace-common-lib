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
            // Check if the 'seasonNumber' column exists before adding it
            const seasonNumberColumn = yield queryRunner.query(`SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name='arena_user_statistics' 
       AND column_name='seasonNumber'`);
            if (!seasonNumberColumn.length) {
                yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD "seasonNumber" numeric(78) NOT NULL`);
            }
            // Drop existing primary key if it exists
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "PK_7bc7563040a22027efb5109f6be"`);
            // Add the composite primary key
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_08b6c6c47252c66d338a660d198" PRIMARY KEY ("userTwitterId", "seasonNumber")`);
            // Modify the probability column default value
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`);
            // Add the foreign key constraint if it does not already exist
            const foreignKeyExists = yield queryRunner.query(`SELECT constraint_name 
       FROM information_schema.table_constraints 
       WHERE table_name = 'arena_user_statistics' 
       AND constraint_type = 'FOREIGN KEY' 
       AND constraint_name = 'FK_3cad81a389dde43c39f76a831b3'`);
            if (!foreignKeyExists.length) {
                yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_3cad81a389dde43c39f76a831b3" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            }
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            // Drop the foreign key constraint if it exists
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "FK_3cad81a389dde43c39f76a831b3"`);
            // Revert the probability column default value
            yield queryRunner.query(`ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`);
            // Drop the composite primary key constraint if it exists
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "PK_08b6c6c47252c66d338a660d198"`);
            // Revert to the previous primary key
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_7bc7563040a22027efb5109f6be" PRIMARY KEY ("userTwitterId")`);
            // Drop the 'seasonNumber' column if it exists
            yield queryRunner.query(`ALTER TABLE "arena_user_statistics" DROP COLUMN IF EXISTS "seasonNumber"`);
        });
    }
}
exports.SeasonNumberAddedinArenaUserStatistics1719101692964 = SeasonNumberAddedinArenaUserStatistics1719101692964;
//# sourceMappingURL=1719101692964-SeasonNumberAddedinArenaUserStatistics.js.map