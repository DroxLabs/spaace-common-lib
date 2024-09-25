import { MigrationInterface, QueryRunner } from 'typeorm';

export class NonceRemovedAsPrimaryKeyFromProgress1727265151418
  implements MigrationInterface
{
  name = 'NonceRemovedAsPrimaryKeyFromProgress1727265151418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "PK_87a03813428ab4a75d856cef528"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "PK_3dcc3487bfcaa864f73207befb6" PRIMARY KEY ("seasonNumber", "questId", "userTwitterId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP COLUMN "nonce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD "nonce" uuid NOT NULL DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" DROP CONSTRAINT "PK_3dcc3487bfcaa864f73207befb6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_quest_progress" ADD CONSTRAINT "PK_87a03813428ab4a75d856cef528" PRIMARY KEY ("seasonNumber", "questId", "nonce", "userTwitterId")`,
    );
  }
}
