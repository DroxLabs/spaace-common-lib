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
exports.CrewNameAddedInUser1710370714079 = void 0;
class CrewNameAddedInUser1710370714079 {
    constructor() {
        this.name = 'CrewNameAddedInUser1710370714079';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD "crewName" text`);
            yield queryRunner.query(`ALTER TABLE "arena_users" ADD CONSTRAINT "FK_0cece92ebcf29a89687133a476a" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP CONSTRAINT "FK_0cece92ebcf29a89687133a476a"`);
            yield queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "crewName"`);
        });
    }
}
exports.CrewNameAddedInUser1710370714079 = CrewNameAddedInUser1710370714079;
//# sourceMappingURL=1710370714079-crewNameAddedInUser.js.map