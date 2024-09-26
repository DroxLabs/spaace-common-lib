import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaQuestProgressIndexingFix1727369787709
  implements MigrationInterface
{
  name = 'ArenaQuestProgressIndexingFix1727369787709';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3cd5e9a2a6827f571ad6d7da60"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3dcc3487bfcaa864f73207befb" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_3dcc3487bfcaa864f73207befb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_3cd5e9a2a6827f571ad6d7da60" ON "arena_quest_progress" ("userTwitterId", "seasonNumber", "questId") WHERE completed`,
    );
  }
}
