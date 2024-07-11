import { MigrationInterface, QueryRunner } from 'typeorm';

export class UuidAddedInUserSchema1720703812000 implements MigrationInterface {
  name = 'UuidAddedInUserSchema1720703812000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_users" ADD "uuid" text`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "uuid"`);
  }
}
