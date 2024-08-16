import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeasonNumberAddedinArenaUserStatistics1719101692964
  implements MigrationInterface
{
  name = 'SeasonNumberAddedinArenaUserStatistics1719101692964';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Check if the 'seasonNumber' column exists before adding it
    const seasonNumberColumn = await queryRunner.query(
      `SELECT column_name 
       FROM information_schema.columns 
       WHERE table_name='arena_user_statistics' 
       AND column_name='seasonNumber'`,
    );

    if (!seasonNumberColumn.length) {
      await queryRunner.query(
        `ALTER TABLE "arena_user_statistics" ADD "seasonNumber" numeric(78) NOT NULL`,
      );
    }

    // Drop existing primary key if it exists
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "PK_7bc7563040a22027efb5109f6be"`,
    );

    // Add the composite primary key
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_08b6c6c47252c66d338a660d198" PRIMARY KEY ("userTwitterId", "seasonNumber")`,
    );

    // Modify the probability column default value
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );

    // Add the foreign key constraint if it does not already exist
    const foreignKeyExists = await queryRunner.query(
      `SELECT constraint_name 
       FROM information_schema.table_constraints 
       WHERE table_name = 'arena_user_statistics' 
       AND constraint_type = 'FOREIGN KEY' 
       AND constraint_name = 'FK_3cad81a389dde43c39f76a831b3'`,
    );

    if (!foreignKeyExists.length) {
      await queryRunner.query(
        `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "FK_3cad81a389dde43c39f76a831b3" FOREIGN KEY ("seasonNumber") REFERENCES "arena_seasons"("number") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint if it exists
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "FK_3cad81a389dde43c39f76a831b3"`,
    );

    // Revert the probability column default value
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );

    // Drop the composite primary key constraint if it exists
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP CONSTRAINT IF EXISTS "PK_08b6c6c47252c66d338a660d198"`,
    );

    // Revert to the previous primary key
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" ADD CONSTRAINT "PK_7bc7563040a22027efb5109f6be" PRIMARY KEY ("userTwitterId")`,
    );

    // Drop the 'seasonNumber' column if it exists
    await queryRunner.query(
      `ALTER TABLE "arena_user_statistics" DROP COLUMN IF EXISTS "seasonNumber"`,
    );
  }
}
