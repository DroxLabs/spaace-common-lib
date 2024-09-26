import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class ArenaQuestProgressIndexingFix1727369787709 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
