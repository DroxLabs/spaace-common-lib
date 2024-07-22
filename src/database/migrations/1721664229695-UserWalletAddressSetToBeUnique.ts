import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserWalletAddressSetToBeUnique1721664229695
  implements MigrationInterface
{
  name = 'UserWalletAddressSetToBeUnique1721664229695';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_cd8c0024f947a453d7b26eda30c" UNIQUE ("userWalletAddress")`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ALTER COLUMN "emailVerified" DROP NOT NULL`,
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
      `ALTER TABLE "arena_users" ALTER COLUMN "emailVerified" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_cd8c0024f947a453d7b26eda30c"`,
    );
  }
}
