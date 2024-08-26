import { MigrationInterface, QueryRunner } from 'typeorm';

export class NftWalletAddressAdded1724676918270 implements MigrationInterface {
  name = 'NftWalletAddressAdded1724676918270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD "nftWalletAddress" text`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" ADD CONSTRAINT "UQ_efb4dc8566722bf8e624e9b5f2b" UNIQUE ("nftWalletAddress")`,
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
      `ALTER TABLE "arena_users" DROP CONSTRAINT "UQ_efb4dc8566722bf8e624e9b5f2b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_users" DROP COLUMN "nftWalletAddress"`,
    );
  }
}
