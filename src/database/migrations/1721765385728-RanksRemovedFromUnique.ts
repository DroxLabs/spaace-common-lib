import { MigrationInterface, QueryRunner } from 'typeorm';

export class RanksRemovedFromUnique1721765385728 implements MigrationInterface {
  name = 'RanksRemovedFromUnique1721765385728';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "UQ_5f315bc78f0085dbe3b62d3b049"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" DROP CONSTRAINT "UQ_7c1fbf0ca96e484a536f3f09f7d"`,
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
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "UQ_7c1fbf0ca96e484a536f3f09f7d" UNIQUE ("seasonNumber", "rank")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_progress" ADD CONSTRAINT "UQ_5f315bc78f0085dbe3b62d3b049" UNIQUE ("seasonNumber", "league", "leagueRank", "division")`,
    );
  }
}
