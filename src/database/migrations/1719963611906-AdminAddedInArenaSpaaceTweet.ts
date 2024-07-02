import { MigrationInterface, QueryRunner } from 'typeorm';

export class AdminAddedInArenaSpaaceTweet1719963611906
  implements MigrationInterface
{
  name = 'AdminAddedInArenaSpaaceTweet1719963611906';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "adminId" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD CONSTRAINT "FK_7c1baa0bea29227e25bebdd84b0" FOREIGN KEY ("adminId") REFERENCES "arena_admins"("twitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP CONSTRAINT "FK_7c1baa0bea29227e25bebdd84b0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "adminId"`,
    );
  }
}
