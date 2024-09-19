import { MigrationInterface, QueryRunner } from 'typeorm';

export class LeaderboardTables1726764735102 implements MigrationInterface {
  name = 'LeaderboardTables1726764735102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_leaderboard" RENAME COLUMN "position" TO "rank"`,
    );
    await queryRunner.query(
      `CREATE TABLE "arena_user_leaderboard" ("userTwitterId" text NOT NULL, "rank" numeric(78) NOT NULL DEFAULT '0', "leagueRank" numeric(78) NOT NULL DEFAULT '0', CONSTRAINT "PK_80db09079f17bd21570ebb9a17b" PRIMARY KEY ("userTwitterId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4ba3d8d0664b920c63674fe9bb" ON "arena_user_leaderboard" ("rank") `,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT '0.00'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_84947bc5ede8fd437310fd0bc1" ON "arena_crew_leaderboard" ("rank") `,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_leaderboard" ADD CONSTRAINT "FK_80db09079f17bd21570ebb9a17b" FOREIGN KEY ("userTwitterId") REFERENCES "arena_users"("userTwitterId") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_crew_leaderboard" ADD CONSTRAINT "FK_68d58841f613bb3363032f3e985" FOREIGN KEY ("crewName") REFERENCES "arena_crews"("name") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "arena_crew_leaderboard" DROP CONSTRAINT "FK_68d58841f613bb3363032f3e985"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_user_leaderboard" DROP CONSTRAINT "FK_80db09079f17bd21570ebb9a17b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84947bc5ede8fd437310fd0bc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "arena_wow_chest_probability" ALTER COLUMN "probability" SET DEFAULT 0.00`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_4ba3d8d0664b920c63674fe9bb"`,
    );
    await queryRunner.query(`DROP TABLE "arena_user_leaderboard"`);
    await queryRunner.query(
      `ALTER TABLE "arena_crew_leaderboard" RENAME COLUMN "rank" TO "position"`,
    );
  }
}
