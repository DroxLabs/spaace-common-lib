import { MigrationInterface, QueryRunner } from 'typeorm';

export class ArenaTweetWeekAdded1722949838513 implements MigrationInterface {
  name = 'ArenaTweetWeekAdded1722949838513';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arena_tweet_week" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "startTime" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_27ee5f1569ca26f4ad1ce745414" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`DROP TABLE "arena_tweet_week"`);
  }
}
