import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class RanksRemovedFromUnique1721765385728 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
