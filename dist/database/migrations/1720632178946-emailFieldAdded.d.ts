import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class EmailFieldAdded1720632178946 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
