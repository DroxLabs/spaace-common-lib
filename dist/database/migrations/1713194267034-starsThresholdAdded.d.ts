import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class StarsThresholdAdded1713194267034 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
