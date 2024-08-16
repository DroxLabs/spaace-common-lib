import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonNumberAddedinArenaUserStatistics1719101692964
  implements MigrationInterface
{
  name = 'SeasonNumberAddedinArenaUserStatistics1719101692964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD "seasonNumber" numeric(78) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "PK_7bc7563040a22027efb5109f6be"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_08b6c6c47252c66d338a660d198" PRIMARY KEY ("userTwitterId", "seasonNumber")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_3cad81a389dde43c39f76a831b3" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "FK_3cad81a389dde43c39f76a831b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT "PK_08b6c6c47252c66d338a660d198"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_7bc7563040a22027efb5109f6be" PRIMARY KEY ("userTwitterId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN "seasonNumber"`,
    );
  }
}
