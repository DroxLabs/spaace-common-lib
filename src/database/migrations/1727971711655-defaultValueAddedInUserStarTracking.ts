import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefaultValueAddedInUserStarTracking1727971711655
  implements MigrationInterface
{
  name = 'DefaultValueAddedInUserStarTracking1727971711655';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" TYPE numeric(78)`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" SET DEFAULT '1'`,
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
      `ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" SET DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_stars_tracking" ALTER COLUMN "stars" TYPE numeric(78,0)`,
    );
  }
}
