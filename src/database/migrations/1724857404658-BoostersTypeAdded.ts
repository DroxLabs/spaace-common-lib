import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoostersTypeAdded1724857404658 implements MigrationInterface {
  name = 'BoostersTypeAdded1724857404658';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `ALTER TYPE "public"."booster_type" RENAME TO "booster_type_old"`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."booster_type" AS ENUM('SPECIAL', 'WOW_CHEST', 'ADMIN', 'NFT')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ALTER COLUMN "type" TYPE "public"."booster_type" USING "type"::"text"::"public"."booster_type"`,
    );
    await queryRunner.query(`DROP TYPE "public"."booster_type_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."booster_type_old" AS ENUM('SPECIAL', 'WOW_CHEST')`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users_booster" ALTER COLUMN "type" TYPE "public"."booster_type_old" USING "type"::"text"::"public"."booster_type_old"`,
    );
    await queryRunner.query(`DROP TYPE "public"."booster_type"`);
    await queryRunner.query(
      `ALTER TYPE "public"."booster_type_old" RENAME TO "booster_type"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
  }
}
