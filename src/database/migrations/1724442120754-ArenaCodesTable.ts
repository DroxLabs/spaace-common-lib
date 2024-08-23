import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaCodesTable1724442120754 implements MigrationInterface {
  name = 'ArenaCodesTable1724442120754';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_codes" ("name" text NOT NULL, "code" text NOT NULL, CONSTRAINT "PK_f083254f212dc3ca447b4fe0e0e" PRIMARY KEY ("name"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_codes"`);
  }
}
