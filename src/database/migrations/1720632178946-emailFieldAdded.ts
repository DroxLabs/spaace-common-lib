import { MigrationInterface, QueryRunner } from 'typeorm';

export class EmailFieldAdded1720632178946 implements MigrationInterface {
  name = 'EmailFieldAdded1720632178946';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "arena_users" ADD "email" text`);
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(`ALTER TABLE "arena_users" DROP COLUMN "email"`);
  }
}
