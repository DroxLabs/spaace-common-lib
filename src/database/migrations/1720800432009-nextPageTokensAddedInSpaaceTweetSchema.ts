import { MigrationInterface, QueryRunner } from 'typeorm';

export class NextPageTokensAddedInSpaaceTweetSchema1720800432009
  implements MigrationInterface
{
  name = 'NextPageTokensAddedInSpaaceTweetSchema1720800432009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "likeNextPageToken" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" ADD "retweetNextPageToken" text`,
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
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "retweetNextPageToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_spaace_tweet" DROP COLUMN "likeNextPageToken"`,
    );
  }
}
