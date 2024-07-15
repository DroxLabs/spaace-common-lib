import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RankAndLeagueRankSetToUnique1721061972172 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
